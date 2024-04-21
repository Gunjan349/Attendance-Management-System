import React, { useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    gender: "",
    role : "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: state.username,
      email: state.email,
      gender: state.gender,
      role: state.role,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };
    axios
      .post("http://localhost:3001/signup", data)
      .then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex justify-center relative top-5 z-10">
        <GiGraduateCap size={80} className="text-blue" />
      </div>
      <div className="flex justify-center">
        <div className="bg-gradient-to-b from-pink to-blue rounded-md text-white absolute p-5 pt-8 pb-2 text-center text-xl leading-8 top-16">
          <span>
            Welcome to
            <span className="text-2xl font-bold text-blue"> Virtual Register
            </span>
          </span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-7">
            <div className="mt-10">
              <input
                type="text"
                placeholder="Username"
                className="bg-white py-3 rounded-lg text-black pl-3 font-semibold outline-none w-full"
                value={state.username}
                onChange={(e) =>
                  setState({ ...state, username: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div>
              <input
              className="h-4 w-4 text-xl font-semibold accent-pink"
                type="radio"
                name="gender"
                id="male"
                value={"male"}
                onChange={(e) => setState({ ...state, gender: e.target.value })}
              />
              <label htmlFor="male" className="mr-10 ml-3">Male</label>
              <input
                 className="h-4 w-4 text-xl font-semibold accent-pink"
                type="radio"
                name="gender"
                id="female"
                value={"female"}
                onChange={(e) => setState({ ...state, gender: e.target.value })}
              />
              <label htmlFor="female" className=" ml-3">Female</label>
            </div>
            <div>
              <input
              className="h-4 w-4 text-xl font-semibold accent-pink"
                type="radio"
                name="role"
                id="teacher"
                value={"teacher"}
                onChange={(e) => setState({ ...state, role: e.target.value })}
              />
              <label htmlFor="teacher" className="mr-10 ml-3">Teacher</label>
              <input
                 className="h-4 w-4 text-xl font-semibold accent-pink"
                type="radio"
                name="role"
                id="student"
                value={"student"}
                onChange={(e) => setState({ ...state, role: e.target.value })}
              />
              <label htmlFor="student" className=" ml-3">Student</label>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                value={state.confirmPassword}
                onChange={(e) =>
                  setState({ ...state, confirmPassword: e.target.value })
                }
              />
            </div>
            <div>
              <span>
                Already have an Account?{" "}
                <a href="/login" className="text-pink font-bold">
                  LOGIN
                </a>
              </span>
            </div>
            <button>
              <h1 className="bg-purple-300 text-white px-10 py-3 font-bold rounded-full text-xl">
                SIGNUP
              </h1>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
