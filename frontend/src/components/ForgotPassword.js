import React , {useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../constants";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: userEmail };
    axios
      .post(API_URL + "/forgot-password", data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success("OTP has been sent to Email");
          navigate(API_URL + "/reset-password");
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
        <div className="login bg-gradient-to-b from-pink to-blue shadow-lg mt-44 rounded-lg  py-3 inline-block">
          <div className="login-form w-full px-10 flex flex-col gap-y-6">
            <h1 className="font-medium tracking-wide text-2xl text-center">
              Reset Your Password
            </h1>
            <p>
              Enter your email we will send a code <br /> to reset your password
            </p>
            <form action="" className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-7">
                <div>
                  <input
                    type="email"
                    className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                    placeholder="Email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-7 justify-center">
                <button
                  className="text-white bg-brown rounded-lg hover:bg-pink py-2 px-5"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Send OTP
                </button>
                <Link
                  to="/login"
                  className=" bg-purple-300 rounded-lg hover:bg-blue py-2 px-5"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
