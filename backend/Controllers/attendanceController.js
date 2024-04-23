const User = require("../Models/userModel.js");
const Attendance = require("../Models/attendanceModel.js");

module.exports.getStudents = async (req, res) => {
  const { course, subject } = req.params;
  const students = await User.find({
    course: course,
    subject: subject,
    userType: "student",
  });
  if (students) {
    return res.send({
      code: 200,
      message: "Students fetched successfully.",
      data: students,
    });
  } else {
    return res.send({
      code: 400,
      message: "Something went wrong.",
    });
  }
};

module.exports.attendance = async (req, res) => {
  console.log(req.body);
  const { course, subject, id } = req.body;
  const att = await User.findOneAndUpdate(
    {
      course: course,
      subject: subject,
      _id: id,
    },
    { $inc: { attendance: 1 } }
  );
  if (att) { 
    return res.send({
      code: 200,
      message: "Attendance updated successfully.",
      data: att,
    });
  }
};

module.exports.assignment = async (req, res) => {
  const { course, subject, id } = req.body;
  const assignment = await User.findOneAndUpdate(
    {
      course: course,
      subject: subject,
      _id: id,
    },
    { $inc: { assignment: 1 } }
  );
  if (assignment) {
    return res.send({
      code: 200,
      message: "Assignment updated successfully.",
      data: assignment,
    });
  }
};

module.exports.report = async (req, res) => {
  const {userId} = req.body;
  const user = await User.findById({_id : userId});
  const attendance = user.attendance;
  const assignment = user.assignment;
  if (attendance && assignment){
    return res.send({
      code: 200,
      message: "Report fetched successfully.",
      attendance: attendance,
      assignment: assignment,
    });
  }
  else{
    return res.send({
      code: 400,
      message: "Something went wrong.",
    });
  }
}

module.exports.studentReport = async (req, res) => {
  const {course} = req.body;
  const students = await User.find({
    course: course,
    userType: "student",
  });
  if(students){
    return res.send({
      code: 200,
      message: "Students fetched successfully.",
      data: students,
    });
  }
  else{
    return res.send({
      code: 400,
      message: "Something went wrong.",
    });
  }
}