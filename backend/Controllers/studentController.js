const User = require("../Models/studentModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "qsEdJoRD+/bLtZCUnIZgAqBMaYlODiWbE4YDJeQY8+E=";

// signup
module.exports.signup = async (req, res) => {
  const { username, email, gender, password, confirmPassword } = req.body;

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
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  // creating new user
  const newUser = new User({
    username,
    email,
    gender,
    password: hashedPassword,
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
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ code: 400, message: "User not found." });
  }

  // checking password
  const isMatch = await bcryptjs.compare(password, user?.password || "");
  if (!isMatch) {
    return res.send({ code: 400, message: "Password is incorrect." });
  }

  // creating token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: 86400,
  });
  res.send({
    code: 200,
    message: "User logged in successfully.",
    token: token,
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
  const { userId, classes } = req.body;
  const user = await User.updateOne(
    { _id: userId },
    { $push: { classes: classes} }
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

module.exports.attendance = async (req,res) => {
  console.log(req.params);
}