import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import logo from "../../assets/logo_1.svg"; 
import {Smartphone,ArrowLeft} from 'lucide-react'
 
 
// const STEP_LABELS = ["Personal Info", "Phone", "Verify Phone", "Set Password"]; 
// const STEP_PERCENT = [25, 50, 75, 100]; 
const STEP_LABELS = ["Personal Info", "Phone", "Set Password"];
const STEP_PERCENT = [0, 33, 66];
  // const widthClass = {
  //   25: "w-1/4",
  //   50: "w-1/2",
  //   75: "w-3/4",
  //   100: "w-full",
  // };

  const widthClass = {
  0: "w-0",
  33: "w-1/3",
  66: "w-2/3",
  100:"full"

};

 
function ProgressBar({ step }) { 
  const percent = STEP_PERCENT[step]; 
  return ( 
    <div className="mb-6"> 
      <div className="flex justify-between items-center mb-1.5"> 
        <span className="text-[0.65rem] uppercase tracking-widest text-amber-950 opacity-60 font-medium"> 
          {STEP_LABELS[step]} 
        </span> 
        <span className="text-[0.65rem] font-semibold text-yellow-700 opacity-80 tracking-wide"> 
          {percent}% 
        </span> 
      </div> 
      <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden"> 
        <div 
          className={`h-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 rounded-full transition-all duration-700 ease-in-out ${widthClass[percent]}`}
      
        /> 
      </div> 
      
      <div className="flex justify-between mt-2"> 
        {STEP_LABELS.map((_, i) => ( 
          <div key={i} className="flex flex-col items-center"> 
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${ 
                i < step 
                  ? "bg-yellow-600" 
                  : i === step 
                  ? "bg-yellow-500 ring-2 ring-yellow-300" 
                  : "bg-amber-100 border border-amber-200" 
              }`} 
            /> 
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
} 
 
function Signup() { 
  const navigate = useNavigate(); 
 
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    password: "", 
    confirmPassword: "", 
  }); 
  const [step, setStep] = useState(0); 
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false); 
  const [phoneOtp, setPhoneOtp] = useState(""); 
  // const [otpError, setOtpError] = useState(""); 
  const [globalMessage, setGlobalMessage] = useState(""); 
 
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setForm((prev) => ({ ...prev, [name]: value })); 
    setErrors((prev) => ({ ...prev, [name]: "" })); 
    setOtpError(""); 
    setGlobalMessage(""); 
  }; 
 const handleBack=()=>{
  if(step>1)(setStep(step-1))
 };

  const validateStep0 = () => { 
    let e = {}; 
    if (!form.name.trim()) e.name = "Name is required"; 
    else if (!/^[A-Za-z\s'-]+$/.test(form.name)) 
      e.name = "Name can only contain letters, spaces, hyphens or apostrophes"; 
    if (!form.email.trim()) e.email = "Email is required"; 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) 
      e.email = "Invalid email format"; 
    setErrors(e); 
    return Object.keys(e).length === 0; 
  }; 
 
  const validateStep1 = () => { 
    let e = {}; 
    if (!form.phone.trim()) e.phone = "Phone number is required"; 
    else if (!/^[0-9]\d{9}$/.test(form.phone)) 
      e.phone = "Enter valid 10-digit Indian mobile number"; 
    setErrors(e); 
    return Object.keys(e).length === 0; 
  }; 
 
  const validateStep3 = () => { 
    let e = {}; 
    if (!form.password) e.password = "Password is required"; 
    else if (form.password.length < 6) 
      e.password = "Password must be at least 6 characters"; 
    if (!form.confirmPassword) e.confirmPassword = "Please confirm password"; 
    else if (form.password !== form.confirmPassword) 
      e.confirmPassword = "Passwords do not match"; 
    setErrors(e); 
    return Object.keys(e).length === 0; 
  }; 

  // const handleext = async () => { 
  //   setOtpError(""); 
  //   setErrors({}); 
  //   setGlobalMessage(""); 
  //   setLoading(true); 
 
  //   try { 
  //     // ── Step 0: Check if email already exists 
  //     if (step === 0) { 
  //       if (!validateStep0()) { 
  //         setLoading(false); 
  //         return; 
  //       } 
 
  //       const res = await axios.post(`${API_BASE}/api/auth/check-email`, { 
  //         email: form.email.trim().toLowerCase(), 
  //       }); 
 

  //       setStep(1); 
  //     } 
 
  //     // Step 1: otp requ
  //     else if (step === 1) { 
  //       if (!validateStep1()) { 
  //         setLoading(false); 
  //         return; 
  //       } 
 
  //       await axios.post(`${API_BASE}/api/auth/send-otp`, { 
  //         phone: form.phone.trim(), 
  //       }); 
 
  //       // Success → OTP was sent (backend accepted the request) 
  //       setStep(2); 
  //     } 
 
  //     // ── Step 2: Verify OTP (backend checks if entered OTP matches sent one) 
  //     else if (step === 2) { 
  //       if (phoneOtp.length !== 6) { 
  //         setOtpError("Please enter 6-digit OTP"); 
  //         setLoading(false); 
  //         return; 
  //       } 
 
  //       await axios.post(`${API_BASE}/api/auth/verify-otp`, { 
  //         phone: form.phone.trim(), 
  //         otp: phoneOtp, 
  //       }); 
 
  //       // If we reach here → backend confirmed OTP is correct 
  //       setStep(3); 
  //     } 
 
  //     // ── Step 3: Final registration 
  //     else if (step === 3) { 
  //       if (!validateStep3()) { 
  //         setLoading(false); 
  //         return; 
  //       } 
 
  //       const res = await axios.post(`${API_BASE}/api/auth/signup`, { 
  //         name: form.name.trim(), 
  //         email: form.email.trim().toLowerCase(), 
  //         phone: form.phone.trim(), 
  //         password: form.password, 
  //       }); 
 
  //       // Success 
  //       const { token, user } = res.data || {}; 
 
  //       if (token) localStorage.setItem("token", token); 
  //       localStorage.setItem( 
  //         "user", 
  //         JSON.stringify(user || { 
  //           name: form.name, 
  //           email: form.email, 
  //           phone: form.phone, 
  //         }) 
  //       ); 
 
  //       navigate("/"); 
  //     } 
  //   } catch (err) { 
  //     if (axios.isAxiosError(err) && err.response) { 
  //       const { status, data } = err.response; 
  //       const msg = data?.message || "An error occurred. Please try again."; 
 
  //       if (step === 0) { 
  //         if (status === 409 || status === 400) { 
  //           setErrors({ email: msg }); 
  //         } else { 
  //           setGlobalMessage(msg); 
  //         } 
  //       } else if (step === 1) { 
  //         setErrors({ phone: msg }); 
  //       } else if (step === 2) { 
  //         setOtpError(msg); 
  //       } else if (step === 3) { 
  //         setGlobalMessage(msg); 
  //       } 
  //     } else { 
  //       // Network error, timeout, etc. 
  //       setGlobalMessage("Cannot connect to server. Check your internet connection."); 
  //     } 
  //   } finally { 
  //     setLoading(false); 
  //   } 
  // }; 
 const handleNext = () => {
  setErrors({});
  setGlobalMessage("");

  // Step 0 → Name + Email
  if (step === 0) {
    if (!validateStep0()) return;
    setStep(1);
  }

  // Step 1 → Phone
  else if (step === 1) {
    if (!validateStep1()) return;
    setStep(2);
  }

  // Step 2 → Password & Save
  else if (step === 2) {
    if (!validateStep3()) return;

    const newUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    navigate("/");
  }
};


  // const isDisabled = () => { 
  //   if (loading) return true; 
  //   if (step === 0) return !form.name.trim() || !form.email.trim(); 
  //   if (step === 1) return !form.phone.trim(); 
  //   if (step === 2) return phoneOtp.length !== 6; 
  //   if (step === 3) return !form.password || !form.confirmPassword; 
  //   return false; 
  // }; 

  const isDisabled = () => {
  if (loading) return true;
  if (step === 0) return !form.name.trim() || !form.email.trim();
  if (step === 1) return !form.phone.trim();
  if (step === 2) return !form.password || !form.confirmPassword;
  return false;
};
 
  const inputClass = (field) => 
    `w-full px-4 py-3 rounded-xl text-sm bg-white border focus:ring-2 outline-none mt-4 mb-1 
transition-all ${ 
      errors[field] 
        ? "border-red-500 focus:border-red-500 ring-red-200" 
        : "border-amber-200 focus:border-amber-500 focus:ring-amber-300/40 bg-[#fafaf8] text[#1a1000]" 
    }`; 
 
  const btnLabel = () => { 
    if (loading) return "Please wait…"; 
    // if (step === 1) return "Send OTP"; 
    // if (step === 2) return "Verify & Continue"; 
    // if (step === 3) return "Create Account"; 
     if (step === 1) return "Continue";
if (step === 2) return "Create Account";
    return "Continue"; 
  }; 
 

 
  return ( 
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50  via-amber-50 to-amber-50"> 
      <div className="flex-1 flex flex-col md:flex-row"> 
        {/* Left side - branding */} 
         <div className=" md:w-1/2  relative flex flex-col justify-center items-center p-10 lg:p-16
            bg-gradient-to-br from-[#1a1508] via-[#2d2210] to-[#141414] overflow-hidden">
         <img src={logo} alt="logo"  className="w-25  " />
        
          {/* <div className="absolute top-16 right-12 w-48 h-48 rounded-full bg-yellow-400 opacity-20 blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-8 w-36 h-36 rounded-full bg-gray-300 opacity-15 blur-2xl animate-float delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full border-2 border-yellow-400 opacity-10 animate-spin-slow -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full border-2 border-gray-400 opacity-8 animate-spin-slow-reverse -translate-x-1/2 -translate-y-1/2"></div> */}

          <div className=" relative z-10 max-w-md w-full text-center font-serif">           
           <h1 className="text-7xl mt-10 font-serif leading-none">
            <span className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent animate-shimmer ">
              Dgi
            </span>
            <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Gold
            </span>
          </h1>
            <div className="h-0.5  w-full mt-3 mb-2 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 to-transparent"/>
            <p className="text-xs uppercase tracking-widest text-amber-200 opacity-50 ">
              Gold & Silver · Investment Platform
            </p>
            <p className="mt-8 mb-10 text-xl lg:text-2xl font-light italic text-amber-200 opacity-90 ">
              Create Your Secure Digital Account
            </p>

            <div className="hidden md:block space-y-6 text-left text-yellow-100 opacity-99">
              {[
                { icon: "◈", label: "Buy 24K Gold from just ₹1", sub: "& .999 Fine Silver at Live Rates", gold: true },
                { icon: "◈", label: "99.9% Pure Metals", sub: "Always priced at live market rates", gold: true },
                { icon: "◈", label: "Bank-grade Security", sub: "Insured Storage • Zero Hidden Charges", gold: false },
                { icon: "◈", label: "Instant Transactions", sub: "Easy Withdrawals • Gifting", gold: false },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4  animate-fadeInUp" >
                  <span className={`text-lg mt-1 ${f.gold ? "text-yellow-100 opacity-99" : "text-gray-400"}`}>{f.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{f.label}</p>
                    <p className="text-xs font-light text-gray-500">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 pt-8 text-xs uppercase tracking-widest text-amber-200 opacity-50  border-t border-yellow-400">
              Join thousands already investing in digital metals
            </p>
          </div>
        </div>



        {/* Right side - form */} 
        <div className="flex-1 flex items-center justify-center px-5 py-10 md:py-8 md:px-10  
        lg:px-16 relative"> 
          <div className="relative w-full max-w-md bg-white/95 border border-yellow-200  
          rounded-3xl shadow-2xl p-7 lg:p-9"> 
            <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-center mb-1 text
black"> 
              Create Account 
            </h2> 
            <p className="text-center text-xs uppercase tracking-widest mb-6 text-amber-950 opacity-65"> 
              Start your DigiGold journey today 
            </p> 
 
            <ProgressBar step={step} /> 
 
            {globalMessage && ( 
              <div className="mb-4 p-3 bg-red-50 border border-red-200 
               text-red-700 text-sm rounded-xl text-center"> 
                {globalMessage} 
              </div> 
            )} 
 
            {/* Step 0: Name + Email */} 
            {step === 0 && ( 
              <div className="space-y-1"> 
                <div> 
                  <label className="block text-xs uppercase tracking-widest  
                  mb-1.5 font-medium text-amber-950 opacity-65"> 
                    Full Name 
                  </label> 
                  <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Your full name" 
                    className={inputClass("name")} 
                  /> 
                  {errors.name && <p className="text-red-600 text-[0.72rem] mt-1">{errors.name}</p>} 
                </div> 
                <div className="pt-3"> 
                  <label className="block text-xs uppercase tracking-widest mb-1  
                  font-medium text-amber-950 opacity-65"> 
                    Email Address 
                  </label> 
                  <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="you@example.com" 
                    className={inputClass("email")} 
                  /> 
                  {errors.email && <p className="text-red-600 text-[0.72rem] mt
1">{errors.email}</p>} 
                </div> 
              </div> 
            )} 

            {/* Step 1: Phone */} 
            {step === 1 && ( 
              <div className="space-y-1"> 
                <div> 
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium 
text-amber-950 opacity-65"> 
                    Phone Number 
                  </label> 
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="10-digit mobile number" 
                    className={inputClass("phone")} 
                  /> 
                  {errors.phone && <p className="text-red-600 text-[0.72rem] mt-1">{errors.phone}</p>} 
                </div> 
                 <div className="flex justify-between mt-4">
      {/* Back button disabled for step 1 */}
     
    </div>
              </div> 
            )} 
 
            {/* Step 2: OTP verification */} 
            {/* {step === 2 && ( 
              <div className="space-y-3"> 
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs 
text-amber-800"> 
                  <div className="flex">
                    <Smartphone size={16}/>
                    An OTP has been sent to <span className="font-semibold">+91 
{form.phone}</span> 
                    </div> 
                  <br /> 
                  <span className="text-amber-600 opacity-70">Enter the 6-digit code</span> 
                </div> 
                <div> 
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium 
text-amber-950 opacity-65"> 
                    OTP 
                  </label> 
                  <input 
                    type="text" 
                    maxLength={6} 
                    value={phoneOtp} 
                    onChange={(e) => { 
                      setPhoneOtp(e.target.value.replace(/\D/g, "")); 
                      setOtpError(""); 
                    }} 
                    placeholder="6-digit OTP" 
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white border border-amber
200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mt-4 mb-1 tracking
[0.4em] text-center font-semibold text-[#1a1000]" 
                  /> 
                  {otpError && <p className="text-red-600 text-[0.72rem] mt-1">{otpError}</p>} 
                </div> 
                <button 
                  onClick={() => { 
                    setStep(1); 
                    setPhoneOtp(""); 
                    setOtpError(""); 
                  }} 
                  className="text-xs text-yellow-700 underline underline-offset-2 opacity-70 
hover:opacity-100" 
                > 
                  ← Change phone number 
                </button> 
              </div> 
            )} 
  */}
            {/* Step 3: Password */} 
            {step === 2 && ( 
              <div className="space-y-1"> 
                <div> 
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium text-amber-950 opacity-65"> 
                    Password 
                  </label> 
                  <input 
                    type="password" 
                    name="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    placeholder="Min. 6 characters" 
                    className={inputClass("password")} 
                  /> 
                  {errors.password && <p className="text-red-600 text-[0.72rem] mt-1">{errors.password}</p>} 
                </div> 
                <div className="pt-3"> 
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium text-amber-950 opacity-65"> 
                    Confirm Password 
                  </label> 
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={form.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Re-enter your password" 
                    className={inputClass("confirmPassword")} 
                  /> 
                  {errors.confirmPassword && <p className="text-red-600 text-[0.72rem] mt-1">{errors.confirmPassword}</p>} 
                </div> 
              </div> 
            )} 
            {step>0 &&(<div className="flex text-sm text-amber-900/70 gap-2">
     <ArrowLeft size={20} />
      <button
        disabled={step === 0}
        onClick={() => setStep(step-1)}
        className="" >
        Back
      </button>
            </div>)
}
     
            <button 
              onClick={handleNext} 
              disabled={isDisabled()} 
              className={`w-full mt-6 py-3.5 rounded-xl text-sm uppercase tracking-widest font semibold transition-all flex items-center justify-center gap-2 ${ 
                isDisabled() 
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black" 
              }`} 
            > 
              {loading && ( 
                <svg className="animate-spin h-4 w-4 text-yellow-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> 
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/> 
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /> 
                </svg> 
              )} 
              {btnLabel()} 
            </button> 
        

      
<p className="text-center mt-5 text-xs text-gray-600"> 
Already have an account?{" "} 
<button onClick={() => navigate("/")} className="text-yellow-500 underline 
underline-offset-2"> 
Sign in here 
</button> 
</p> 
</div> 
</div> 
</div> 
</div> 
); 
} 
export default Signup; 














