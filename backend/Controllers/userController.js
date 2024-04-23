const User = require("../Models/userModel.js");
const Role = require("../Models/rolesModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

// signup
module.exports.signup = async (req, res) => {
  const userType = req.body.role || "student";
  const { username, email, gender, password, confirmPassword } = req.body;
  const roleData = await Role.findOne({ role: userType });
  const role = [roleData._id];
  // checking fields
  if (!username || !email || !gender || !password || !confirmPassword) {
    return res.send({ code: 400, message: "All fields are required." });
  }

  // checking passwords
  if (password !== confirmPassword) {
    return res.send({ code: 400, message: "Passwords do not match." });
  }
  // checking length of password
  if (password.length < 6) {
    return res.send({
      code: 400,
      message: "Password must be at least 6 characters long.",
    });
  }
  // finding username in db
  const user = await User.findOne({ email });
  if (user) {
    return res.send({ code: 400, message: "User already exists." });
  }

  // setting avatar for profile picture
  const maleprofile = `https://avatar.iran.liara.run/public/boy?username=${username}`;

  const femaleprofile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  // hashing password
  // creating new user
  const newUser = new User({
    username,
    email,
    gender,
    userType,
    role,
    profile: gender === "male" ? maleprofile : femaleprofile,
    password,
    confirmPassword,
  });
  // saving user in db
  const savedUser = await newUser.save();
  if (savedUser) {
    res.send({
      code: 200,
      message: "User created successfully.",
      data: savedUser,
    });
  } else {
    res.send({ code: 400, message: "Something went wrong." });
  }
};

// login

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // checking fields
  if (!email || !password) {
    return res.send({ code: 400, message: "All fields are required." });
  }

  // finding user in db
  const user = await User.findOne({ email }).populate("role");
  if (!user) {
    return res.send({ code: 400, message: "User not found." });
  }

  // checking password
  if(user.password !== password) {
    return res.send({ code: 400, message: "Password is incorrect." });
  }

  // creating token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  res.send({
    code: 200,
    message: "User logged in successfully.",
    token: token,
    data: user,
  });
};

// logout

module.exports.logout = async (req, res) => {
  // getting token
  const token = req.body;

  if (token) {
    res.send({
      code: 200,
      message: "User logged out successfully.",
      token: null,
    });
  } else {
    res.send({
      code: 400,
      message: "User not logged in.",
    });
  }
};

module.exports.classes = async (req, res) => {
  const { userId, course, startdate, subject , rollNo } = req.body;
  const user = await User.updateOne(
    { _id: userId}, 
    { $push: { course: course, date: startdate, subject: subject } , $set : { rollNo: rollNo}}
  );
  if (user) {
    return res.send({
      code: 200,
      message: "Information added successfully.",
      data: user,
    });
  } else {
    return res.send({
      code: 400,
      message: "Something went wrong.",
    });
  }
};

module.exports.change = async (req, res) => {
  const {userId} = req.body;
  const deleted = await User.updateOne({
    _id : userId
  }, {$set : {course : [] , subject : []}}); 
  if(deleted){
    console.log(deleted)
    return res.send({
      code: 200,
      message: "removed successfully.",
      data: deleted,
    });
  }
  else{
    return res.send({
      code: 400,
      message: "Something went wrong.",
    });
  }
};

module.exports.update = async (req, res) => {
  const { userId, course, subject} = req.body;
  const user = await User.updateOne(
    { _id: userId }, 
    { $push: { course: course , subject: subject }}
  );
  if (user) {
    return res.send({
      code: 200,
      message: "User updated successfully.",
      data: user,
    });
  } else {
    return res.send({
      code: 400,
      message: "Something went wrong.",
    });
  }
};

module.exports.updatePassword = async (req, res) => {
  const { _id, password } = req.body;
  const user = await User.findById(_id);
  
  if (password) {
    user.password = password;
    user.confirmPassword = password;
    
    const updatedPassword = await user.save();
    return res.send({
      code: 200,
      message: "password updated",
      data: updatedPassword,
    });
  } else {
    return res.send({ data: user });
  }
};

// forget password 

module.exports.forgotPassword = async (req, res) => {
  const _otp = Math.floor(100000 + Math.random() * 900000);
  
  const user = await User.findOne({ email: req.body.email });
  
  if(!user){
    res.send({code : 500 , message : 'user not found'});
  }
  else{
    const updateData = await User.findOneAndUpdate({email : req.body.email} , {
      otp : _otp
    } , {
      new : true
    })

    await updateData.save();
  }
  

  let transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : "gunjangarg349@gmail.com",
      pass : "vejr drkb xbvk pfyn"
    }
  }) 

  let info = transporter.sendMail({
    from : "gunjangarg349@gmail.com",
    to : req.body.email,
    subject : "Reset Password",
    text : `Your One-time password is ${_otp}`
  })

  if(info){
    res.send({code : 200, message : 'email sent'});
  }
  else{
    res.send({code : 400, message : 'email not sent'});
  }

 
  
};

// reset password

module.exports.resetPassword = async (req, res) => {
  User.findOne({otp : req.body.otp}).then(result => {
    User.updateOne({email : result.email}, {password : req.body.password, confirmPassword : req.body.password})
    .then(result => { 
      res.send({code : 200, message: "password updated"})
    })
    .catch(err => {
      res.send({code : 500, message:"server error"})
    })
  })

  .catch(err =>{
    res.send({code : 500, message:"Wrong OTP"})
  })
};
