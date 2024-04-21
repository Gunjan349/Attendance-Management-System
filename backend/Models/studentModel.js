const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 6,
    },
    course : [{
      type: String,
      required: true,
    }],
    date : [{
      type: String,
      required: true,
    }]
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("Student", studentSchema);

module.exports = student;
