import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft, Eye, EyeOff,LockKeyholeOpen,LoaderCircle } from 'lucide-react';


const ResetPassword = () => {
    const navigate=useNavigate();
    const [newPassword,SetnewPassword]=useState("");
    const [searchParam]=useSearchParams();
    const token=searchParam.get("token");
    const resetDocId=searchParam.get("rid")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const[buttonLoading,setButtonLoading]=useState(false);

    const rules = {
  uppercase: /[A-Z]/.test(newPassword),
  lowercase: /[a-z]/.test(newPassword),
  number: /[0-9]/.test(newPassword),
  special: /[^A-Za-z0-9]/.test(newPassword),
  length: newPassword.length >= 8,
};

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
const isValidPassword =
  rules.uppercase &&
  rules.lowercase &&
  rules.number &&
  rules.special &&
  rules.length;

if (!isValidPassword) {
  setError("Password does not satisfy all requirements");
  return;
}
setButtonLoading(true)
    try {
      const payload = {
        token,
        resetDocId,
        newPassword,
      };

      const res = await api.post("/auth/reset-password", payload);
      console.log("newPassword reset success:", res.data);
       navigate("/")
    } catch (error) {
      
 setError(
    error.response?.data?.message || "Something went wrong. Please try again.");
      console.log(error);
     console.log("RESPONSE:", error.response);
     console.log("DATA:", error.response?.data);
     console.log("MESSAGE:", error.response?.data?.message);
    }
  };

  if (!token || !resetDocId) {
    return <p>Invalid or expired reset link</p>;
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#111117] px-4">

  <div className="w-full max-w-md bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] 
                  border border-white/20 p-6 text-black rounded-2xl ">
                 <div className="w-full flex justify-center mb-4">
  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center">
    <LockKeyholeOpen className="text-black" />
  </div>
</div>

    <p className="mb-6 text-lg text-white text-center font-serif">
      Reset Your New newPassword
    </p>

    <div className="flex flex-col gap-4">

      <label className="text-white">New newPassword</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter newPassword"
          value={newPassword}
          onChange={(e) => SetnewPassword(e.target.value)}
          className="w-full text-secondary p-3 border border-white rounded"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
        >
          {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
        </span>
      </div>

      <label className="text-white">Confirm newPassword</label>
   <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm newPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full text-secondary p-3 border border-white rounded"
      />
      <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
        >
          {showConfirmPassword ? <Eye size={14} /> : <EyeOff size={14} />}
        </span>
</div>
{error && (
  <p className="text-red-500 text-sm text-center">
    {error}
  </p>
)}
      <button
        onClick={handleSubmit}
        className="bg-primary text-background py-2 rounded mt-2 font-serif"
      >{buttonLoading ?(<div className='animate-spin'><LoaderCircle/></div>):(<p>Reset Password</p>)}
        
      </button>

    </div>
            <div className="mt-2 space-y-1 text-xs w-fit mx-auto font-serif">
  <p className={rules.uppercase ? "text-green-600/90" : "text-gray-400"}>
    {rules.uppercase ? "✔" : "✖"} At least one uppercase letter
  </p>

  <p className={rules.lowercase ? "text-green-600/90" : "text-gray-400"}>
    {rules.lowercase ? "✔" : "✖"} At least one lowercase letter
  </p>

  <p className={rules.number ? "text-green-600/90" : "text-gray-400"}>
    {rules.number ? "✔" : "✖"} At least one number
  </p>

  <p className={rules.special ? "text-green-600/90" : "text-gray-400"}>
    {rules.special ? "✔" : "✖"} At least one special character
  </p>

  <p className={rules.length ? "text-green-600/90" : "text-gray-400"}>
    {rules.length ? "✔" : "✖"} Minimum 8 characters
  </p>
</div>
  </div>
  
</div>
  )
}

export default ResetPassword;