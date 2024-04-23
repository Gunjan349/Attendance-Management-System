import React, { useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import API_URL from "../constants";

const Login = () => {

    const navigate = useNavigate();

   const [state, setState] = useState({
    email: "",
    password: "",
   })

    const handleSubmit = (e) => {
        e.preventDefault();
        const data =  {email: state.email, password: state.password}
        axios.post(API_URL + '/login', data)
        
        .then(res => {
            if(res.data.code === 200){
              console.log(res.data.data)
                localStorage.setItem('token', res.data.token);
                toast.success(res.data.message);
                navigate('/')
                localStorage.setItem("user" , JSON.stringify(res.data.data))
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
             console.log(err)
 
        })
    }

  return (
    <>
      <div className="flex justify-center relative top-10 z-10 pt-6">
        <GiGraduateCap size={80} className="text-blue" />
      </div>
      <div className="flex justify-center">
        <div className="bg-gradient-to-b from-pink to-blue rounded-md text-white absolute p-5 pt-16 text-center text-xl leading-8">
          <span>
            Welcome back to        
            <span className="text-2xl font-bold text-blue"> Virutal Register
            </span>
          </span>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-7">
            <div className="flex items-center mt-20 bg-white">
              <FaRegUser
                className="relative z-10 text-blue bg-white rounded-full p-2 ml-3"
                size={40}
              />
              <input
                type="email"
                placeholder="email"
                className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                value={state.email}
                onChange={(e) => setState({...state, email: e.target.value})}
              />
            </div>
            <div className="flex items-center mt-5 bg-white">
              <FaEyeSlash
                className="relative z-10 text-blue bg-white rounded-full p-2 ml-3"
                size={40}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-white py-3 rounded-lg text-black w-full pl-3 font-semibold outline-none"
                value={state.password}
                onChange={(e) => setState({...state, password: e.target.value})}
              />
            </div>
            <div>
           <span>
              Don't have an Account?
              <a href="/signup" className="text-pink font-bold"> SIGNUP</a>
            </span>
           </div>
           <div>
           <a href="/forgot-password">
               Forgotten Password?
            </a>
           </div>
            <button>
              <h1 className="bg-purple-300 text-white px-10 py-3 font-bold rounded-full text-xl w-full">
                LOGIN
              </h1>
            </button>
          
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
