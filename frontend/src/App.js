import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Attendance from './components/Attendance.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ReserPassword.js';

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/attendance/:course/:subject/:date' element={<Attendance />}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
};

export default App;
