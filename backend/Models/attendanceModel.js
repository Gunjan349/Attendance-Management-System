const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    subject : [
      {
        type : String,
        attendance : {
          type : Number,
          default : 0
        }
      }
    ],
  }
);

const User = mongoose.model("Attendance", attendanceSchema);

module.exports = User;
