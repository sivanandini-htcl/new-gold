import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft, Eye, EyeOff } from 'lucide-react';


const ResetEmail = () => {
    const navigate=useNavigate();
    const [newPassword,SetnewPassword]=useState("");
    const [searchParam]=useSearchParams();
    const token=searchParam.get("token");
    const resetDocId=searchParam.get("rid")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        token,
        resetDocId,
        newPassword,
      };

      const res = await api.post("/auth/reset-password", payload);
      console.log("newPassword reset success:", res.data);
       navigate("/login")
    } catch (err) {
      console.log(error);
      console.log("error"); 
     console.log("RESPONSE:", error.response);
     console.log("DATA:", error.response?.data);
   console.log("MESSAGE:", error.response?.data?.message);
    }
  };

  if (!token || !resetDocId) {
    return <p>Invalid or expired reset link</p>;
  }
  return (
    <div className="min-h-screen max-w-[1440px] m-auto flex flex-col py-8 px-4 sm:px-6 lg:px-10  bg-background items-center justify-center">
        <div className='bg-white/70 p-3 text-black text-center rounded-2xl'>
            <p className='mb-10 text-lg'>Reset You newPassword</p>
            <div className='flex flex-col text-start'>
                <label htmlFor="" > newPassword</label>
            <input   type={showPassword ? 'text' : 'password'} placeholder='Enter the email'
            value={newPassword} onChange={(e)=>SetnewPassword(e.target.value)} className='text-black p-3 border border-white mb-5' />
                 <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </span>
                 <label htmlFor=""> Confirm newPassword</label>
            <input type="text" placeholder='Enter the email' 
            value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
            className='text-black p-3 border border-white mb-5 ' />
                
            <button onClick={handleSubmit}>Reset newPassword</button>
            </div>
            
        </div>
        

    </div>
  )
}

export default ResetEmail