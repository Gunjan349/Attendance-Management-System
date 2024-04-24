import React, { useEffect, useState } from "react";
import Courses from "./Courses.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_URL from "../constants";

const Home = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [startdate, setStartDate] = useState([]);
  const [subject, setSubject] = useState([""]);
  const [rollNo, setRollNo] = useState("");
  const [qclass, setqclass] = useState("");
  const [qdate, setqdate] = useState("");
  const [qsubject, setqsubject] = useState([]);
  const [data, setData] = useState([]);
  const [sub, setSub] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [assignment, setAssignment] = useState("");
  const [students, setStudents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");

  const handleClick = () => {
    const data = {
      userId: user._id,
      course: course,
      startdate: startdate,
      subject: qsubject,
      rollNo: rollNo,
    };
    axios
      .post(API_URL + "/classes", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          if (user.userType === "teacher") {
            navigate("/attendance/" + qclass + "/" + sub + "/" + qdate);
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubject = (value, i) => {
    const newArray = subject.map((item, index) => {
      return index === i ? value : item;
    });
    setSubject(newArray);
  };

  const addSubject = () => {
    const data = { subject: subject, teacher: user.username };
    axios
      .post(API_URL + "/add-subject", data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
    axios
      .get(API_URL + "/get-subjects")
      .then((res) => {
        if (res.data.code === 200) {
          setData(res.data.data);
          setRefresh(!refresh);
        }
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleChange = () => {
    setCourse([]);
    setqsubject([]);
    const data = { userId: user._id };
    axios
      .post(API_URL + "/change", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    const data = {
      userId: user._id,
      course: course,
      subject: qsubject,
    };
    axios
      .post(API_URL + "/update", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReports = () => {
    if (user.userType === "student") {
      const data = { userId: user._id };
      axios
        .post(API_URL + "/report", data)
        .then((res) => {
          if (res.data.code === 200) {
            toast.success(res.data.message);
            setAttendance(res.data.attendance);
            setAssignment(res.data.assignment);
          }
        })
        .catch((err) => console.log(err));
    } else {
      const data = { course: qclass };
      axios
        .post(API_URL + "/student-report", data)
        .then((res) => {
          if (res.data.code === 200) {
            setStudents(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-col gap-y-16 pt-10 bg-gradient-to-b from-pink to-blue min-h-screen">
      <div className="flex justify-center items-center gap-6">
        <img src={user.profile} className="h-16 w-16" />
        <h1 className="text-xl font-bold text-violet-400">
          Welcome {user.username}!!
        </h1>
      </div>
      <div className="flex justify-around  items-center flex-wrap gap-y-4">
        <details className="dropdown">
          <summary className="m-1 btn bg-blue text-xl font-semibold text-white">
            Select Course
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              {Courses &&
                Courses.length > 0 &&
                Courses.map((crs) => {
                  return (
                    <a
                      onClick={() => {
                        setqclass(crs);
                        setCourse([...course, crs]);
                      }}
                    >
                      {crs}
                    </a>
                  );
                })}
            </li>
          </ul>
        </details>
        {user.userType === "teacher" && (
          <div className="flex items-center gap-x-3">
            <h1 className="text-xl font-semibold text-white">Select Date</h1>
            <input
              className="bg-blue p-2 rounded-md text-xl font-semibold text-white"
              type="date"
              onChange={(e) => {
                setqdate(e.target.value);
                setStartDate([...startdate, e.target.value]);
              }}
            />
          </div>
        )}
        {user.userType !== "teacher" && (
          <input
            className=" py-2 rounded-lg bg-blue placeholder-white text-xl font-bold text-white w-44 pl-4  outline-none"
            type="number"
            placeholder="Enter roll no."
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        )}
        <div>
          <details className="dropdown">
            <summary className="m-1 btn bg-blue text-xl font-semibold text-white">
              Select Subject
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                {data &&
                  data.length > 0 &&
                  data.map((item) => {
                    return (
                      <a
                        onClick={() => {
                          setqsubject([...qsubject, item.subject.toString()]);
                          setSub(item.subject.toString());
                        }}
                      >
                        {item.subject} by {item.teacher}
                      </a>
                    );
                  })}
              </li>
            </ul>
          </details>
        </div>
      </div>

      {user.userType === "teacher" && (
        <div className="text-center text-xl font-semibold tracking-wide text-white">
          Want to add more subjects?{" "}
          <button
            className="text-indigo-500"
            onClick={() => {
              setSubject([...subject, ""]);
            }}
          >
            Add more
          </button>
        </div>
      )}

      {user.userType === "teacher" &&
        subject.map((item, index) => {
          return (
            <div className="flex gap-x-6 items-center justify-center">
              <input
                type="text"
                className=" py-2 rounded-lg text-violet-400 placeholder-white w-[27rem] pl-4 font-semibold outline-none"
                value={item}
                onChange={(e) => handleSubject(e.target.value, index)}
              />
              <button
                onClick={addSubject}
                className="bg-blue text-white text-xl font-semibold rounded-md p-2"
              >
                Add subject
              </button>
            </div>
          );
        })}

      <div className="flex justify-around items-center flex-wrap gap-y-6">
        <button
          onClick={handleClick}
          className="bg-pink text-white text-xl font-semibold rounded-md p-2"
        >
          Proceed
        </button>

        <button
          onClick={handleChange}
          className="bg-pink text-white text-xl font-semibold rounded-md p-2"
        >
          Remove class and subjects added
        </button>

        <button
          onClick={handleUpdate}
          className="bg-pink text-white text-xl font-semibold rounded-md p-2"
        >
          Update information
        </button>
      </div>

      <button
        className="bg-pink text-white text-xl font-semibold rounded-md p-2"
        onClick={handleReports}
      >
        See Record
      </button>
      {user && user.userType === "student" && (
        <h1 className="text-2xl font-semibold text-white tracking-wide text-center mb-5">
          Attendance : {attendance}
          <br /> Assignment : {assignment}
        </h1>
      )}
      {students && students.length > 0 && <div className="flex justify-around text-xl font-semibold text-white">
        <h1>Roll No.</h1>
        <h1>Name</h1>
        <h1>Attendance</h1>
        <h1>Assignment</h1>
      </div>}
      {user &&
        user.userType === "teacher" &&
        students.map((student) => {
          return <div className="flex justify-around text-xl font-semibold text-white">
            <h1>{student.rollNo}</h1>
            <h1>{student.username}</h1>
            <h1>{student.attendance}</h1>
            <h1>{student.assignment}</h1>
          </div>
        })}
    </div>
  );
};

export default Home;
