import React from 'react';
import  {useNavigate} from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import {toast} from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logout successfully.");
        navigate('/login')
    };
    return(
        <>
           <LuLogOut size={30} className='text-white' onClick={handleLogout}/>
        </>
    );
};

export default Logout;