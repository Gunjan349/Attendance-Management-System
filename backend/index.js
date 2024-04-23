const express = require("express");
const cors = require("cors");
const port = 3001;
const dotenv = require("dotenv").config();
const db = require('./dbconnection.js')
const bodyParser = require("body-parser");
const user = require('./Controllers/userController.js');
const role = require('./Controllers/rolesController.js')
const attendance = require('./Controllers/attendanceController.js');
const subject = require('./Controllers/subjectController.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', user.signup);
app.post('/login', user.login);
app.post('/logout', user.logout);
app.post('/classes', user.classes);
app.put('/password', user.updatePassword);
app.post('/forgot-password', user.forgotPassword);
app.post('/reset-password', user.resetPassword);
app.post('/attendance/:course/:subject/:date' , attendance.getStudents);
app.post('/attendance' , attendance.attendance);
app.post('/assignment' , attendance.assignment);
app.post('/report', attendance.report);
app.post('/student-report', attendance.studentReport)

app.post('/change' , user.change);
app.post('/update' , user.update);
app.post('/add-role', role.addRole);

app.post('/add-subject' , subject.addSubject);
app.get('/get-subjects', subject.getSubjects);

app.listen(port, () => {
  db;
  console.log(`Server is running on port ${port}`);
});
