import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../constants";

const Attendance = () => {
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedAttendance, setCheckedAttendance] = useState([]);

  useEffect(() => {
    const data = { userType: user.userType };
    axios
      .post(
        API_URL + "/attendance/" +
          params.course +
          "/" +
          params.subject +
          "/" +
          params.date,
        data
      )
      .then((res) => {
        if (res.data.code === 200) {
          setStudents(res.data.data);
          setRefresh(!refresh);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const markAttendance = (id, attendance) => {
    if (attendance) {
      const data = { subject: params.subject, course: params.course, id: id };
      axios
        .post(API_URL + "/attendance", data)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const markAssignment = (id, assignment, name) => {
    if (assignment) {
      const data = { subject: params.subject, course: params.course, id: id };
      axios
        .post(API_URL + "/assignment", data)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedValues((prev) => {
      if (checked) {
        return [...prev, name];
      } else {
        return prev.filter((value) => value !== name);
      }
    });
  };

  useEffect(() => {
    const storedValues = localStorage.getItem("checkedValues");
    if (storedValues) {
      setCheckedValues(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedValues", JSON.stringify(checkedValues));
  }, [checkedValues]);

  const handleAttendance = (e) => {
    const { name, checked } = e.target;
    setCheckedAttendance((prev) => {
      if (checked) {
        return [...prev, name];
      } else {
        return prev.filter((value) => value !== name);
      }
    });
  };

  useEffect(() => {
    const storedValues = localStorage.getItem("checkedAttendance");
    if (storedValues) {
      setCheckedAttendance(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "checkedAttendance",
      JSON.stringify(checkedAttendance)
    );
  }, [checkedAttendance]);

  return (
    <>
      <div className="overflow-x-auto overflow-y-scroll bg-gradient-to-b from-pink to-blue min-h-screen">
        <table className="table text-lg">
          <thead>
            <tr className="text-xl">
              <th>Roll No</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>Assignment</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.length > 0 &&
              students.map((student, index) => {
                return (
                  <>
                    <tr>
                      <th>{student.rollNo}</th>
                      <td>{student.username}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={student._id}
                          checked={checkedAttendance.includes(student._id)}
                          onClick={(e) => {
                            markAttendance(student._id, e.target.checked);
                          }}
                          onChange={handleAttendance}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          name={student._id}
                          checked={checkedValues.includes(student._id)}
                          onClick={(e) => {
                            markAssignment(student._id, e.target.checked);
                          }}
                          onChange={handleChange}
                        />
                      </td>
                      <td></td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Attendance;
