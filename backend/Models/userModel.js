const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    profile: {
      type: String,
      default: "",
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
    course: [
      {
        type: String,
        required: true,
      },
    ],
    date: [
      {
        type: String,
        required: true,
      },
    ],
    userType: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    subject: [
      {
        type: String,
      },
    ],
    rollNo: {
      type: Number,
      
      default: 0,
    },
    attendance: {
      type: Number,
      default: 0,
    },
    assignment: {
      type: Number,
      default: 0,
    },
    otp: {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
