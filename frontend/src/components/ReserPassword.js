import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../constants";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [userOtp, setUserOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { otp: userOtp, password: password };
    axios
      .post( API_URL + "/reset-password", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          toast.success("Your password has been reset.");
          navigate("/login");
        }
        if (res.data.code === 500) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="text-center text-white font-semibold text-xl">
        <div className="login bg-white inline-block shadow-lg justify-center mt-44 rounded-lg  py-3 bg-gradient-to-b from-pink to-blue">
          <div className="login-form w-full px-10 flex flex-col gap-y-10">
            <h1 className=" text-2xl font-bold text-center">Create New Password</h1>
            <form action="" className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
                <div>
                  <input
                    type="text"
                    className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                    placeholder="Enter OTP"
                    name="otp"
                    value={userOtp}
                    onChange={(e) => {
                      setUserOtp(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-x-7 justify-center my-4">
                <button
                  className="text-white bg-blue rounded-full hover:bg-pink py-2 px-5"
                  onClick={handleSubmit}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
