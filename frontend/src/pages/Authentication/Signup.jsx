import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../../assets/logo_1.svg"; 
import {Smartphone,ArrowLeft, CloudCog,Eye,EyeOff} from 'lucide-react'
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";

const STEP_LABELS = [
  "Personal Info",
  "Email or Mobile",
  "OTP Verification",
  "Set Password"
];

const STEP_PERCENT = [0, 33, 66, 100];
const widthClass = {
  0: "w-0",
  33: "w-1/3",
  66: "w-2/3",
  100: "w-full"
};
 
function ProgressBar({ step }) { 
  const percent = STEP_PERCENT[step]; 
  return ( 
    <div className="mb-6"> 
      <div className="flex justify-between items-center mb-1.5"> 
        <span className="text-[0.65rem] uppercase tracking-widest text-secondary opacity-60 font-medium"> 
          {STEP_LABELS[step]} 
        </span> 
        <span className="text-[0.65rem] font-semibold text-secondary opacity-80 tracking-wide"> 
          {percent}% 
        </span> 
      </div> 
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"> 
        <div 
          className={`h-full bg-primary rounded-full transition-all duration-700 ease-in-out ${widthClass[percent]}`}     
        /> 
      </div> 
      
      <div className="flex justify-between mt-2"> 
        {STEP_LABELS.map((_, i) => ( 
          <div key={i} className="flex flex-col items-center"> 
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${ 
                i < step 
                  ? "bg-white border border-background" 
                  : i === step 
                  ? "bg-background ring-2 ring-white/70" 
                  : "bg-amber-100 border border-white" 
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
  const [step, setStep] = useState(0); 
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false); 
  const [phoneOtp, setPhoneOtp] = useState(""); 
  const [otpError, setOtpError] = useState("");
  const [registrationSessionId, setRegistrationSessionId] = useState("");
  const tenantId=import.meta.env.VITE_TENANT_ID;
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [globalMessage, setGlobalMessage] = useState(""); 
  const [form, setForm] = useState({
  name: "",
  lastName: "",
  contact: "",
  otp: "",
  password: "",
  confirmPassword: ""
});
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+91\s?[6-9]\d{9}$/;
 const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: ""
  }));

  setGlobalMessage("");
};

const validateStep0 = () => {
  let e = {};
  if (!form.name.trim())
    e.name = "First name required";

  if (!form.lastName.trim())
    e.lastName = "Last name required";

  setErrors(e);
  return Object.keys(e).length === 0;
};
 
const validateStep1 = () => {
  let e = {};

  if (!form.contact.trim()) {
    e.contact = "Enter email or mobile";
  } 
  else if (
    !emailRegex.test(form.contact) &&
    !phoneRegex.test(form.contact)
  ) {
    e.contact = "Enter valid email or 10 digit Indian mobile";
  }

  setErrors(e);
  return Object.keys(e).length === 0;
};

const validateStep2 = () => {
  let e = {};

  if (!form.otp || form.otp.length !== 6)
    e.otp = "Enter valid 6 digit OTP";

  setErrors(e);
  return Object.keys(e).length === 0;
};

const validateStep3 = () => {

  let e = {};
  if (!form.password) {
    e.password = "Password is required";
  }
  else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      form.password
    )
  ) {
    e.password =
      "Password must contain uppercase, lowercase, number and special character";
  }

  if (!form.confirmPassword) {
    e.confirmPassword = "Confirm password is required";
  }
  else if (
    form.password !== form.confirmPassword
  ) {
    e.confirmPassword =
      "Passwords do not match";
  }
  setErrors(e);
  return Object.keys(e).length === 0;
};

const handleNext=async()=>{
if(step===0){
  console.log("step0 is running");
  if(!validateStep0())return;
  try{
setLoading(true)
console.log("calling api");
const response= await api.post("/auth/register/step1",{
  firstName:form.name,
  lastName:form.lastName,
  tenantId
});
console.log("api called");
setRegistrationSessionId(response.data.data.sessionId);
toast.success("Regestration in process")
setStep(1)
  }

catch(error){
  console.log("error"); 
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
  toast.error(error.response?.data?.message || "Something went wrong");
} 
finally{
  setLoading(false);
}
}

else if(step===1){
  console.log("step 1 is running")
  if(!validateStep1())return;
  
    const isEmail=emailRegex.test(form.contact);
    const contactType=isEmail? "email":"phone";
    console.log("calling api")
    
    try{
      setLoading(true)
      const payload={
           registrationSessionId,
        contactType,
        contactValue:(form.contact).toLowerCase(),
        tenantId
      }
      console.log("payload:", payload)
      const res=await api.post("/auth/register/step2",payload);
      console.log("response:", res.data)
      console.log("api called")
      toast.success("OTP Sent ")
      setStep(2);
  }catch(error){
    console.log("error")
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.response?.data?.message);
    toast.error(error.response?.data?.message||"failed to sent otp")
  }finally{
    setLoading(false)
  }
}
else if(step===2){
if(!validateStep2())return;
try  {
  setLoading(true);
  const otpRes=await api.post("/auth/register/verify-otp",{
    registrationSessionId,
    otp:form.otp.trim(),
    tenantId    
  });
  if(otpRes.data.success){
    toast.success("OTP Verified")
    setStep(3);
  }
  console.log("step 2 ", otpRes)
}
 catch(error){
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
  setErrors({otp: error.response?.data?.message || "Invalid OTP"});
  toast.error(error.response?.data?.message||"otp failed");
}
finally{
  setLoading(false);
}
}
 else if(step===3){
  console.log("step 3 is running")
  if(!validateStep3())return;
  try{
    setLoading(true);
    console.log("calling api")
    const pasRes=await api.post("/auth/register/step3",{
      registrationSessionId,
      tenantId,
      password:form.password
    });
    console.log("api called");
    console.log("data:", pasRes);
    toast.success("registration Successfull")
    navigate("/");
  }
  catch(error){
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
  toast.error(error.response?.data?.message||"Registration failed")
  } 
  finally{
    setLoading(false);
  }
 }
};
 const isDisabled = () => {
  if (loading) return true;

  if (step === 0)
    return !form.name?.trim() || !form.lastName?.trim();

  if (step === 1)
    return !form.contact?.trim();

  if (step === 2)
    return !form.otp?.trim();
  if (step === 3)
    return !form.password?.trim() || !form.confirmPassword?.trim();

  return false;
};

  const inputClass = (field) => 
    `w-full px-4 py-3 rounded-xl text-sm  border focus:ring-2 outline-none mt-4 mb-1 transition-all ${ 
      errors[field] 
        ? "border-red-500 focus:border-red-500 ring-red-200" 
        : "border-white/20 focus:border-white/20 focus:ring-white/30 bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] text-gray-200" 
    }`; 
const btnLabel = () => {

  if (step === 1) return "Send OTP";
  if (step === 2) return "Verify OTP";
  if (step === 3) return "Create Account";
  return "Continue";
};
const password = form.password || "";

const rules = {
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
  length: password.length >= 8,
};

const getStrength = () => {
  const passed = Object.values(rules).filter(Boolean).length;

  if (passed <= 2) return "Weak";
  if (passed <= 4) return "Medium";
  return "Strong";
};


  return ( 
    <div className="min-h-screen flex flex-col bg-[#111112]"> 
      <div className="flex-1 flex flex-col md:flex-row"> 
        {/* Left side - branding */} 
         <div className=" md:w-1/2  relative flex flex-col justify-center items-center p-10 lg:p-16
            bg-gradient-to-br from-background via-[#2f2f33] to-[#111112] overflow-hidden">
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
            <p className="text-xs uppercase tracking-widest text-primary/80 opacity-50 ">
              Gold & Silver · Investment Platform
            </p>
            <p className="mt-8 mb-10 text-xl lg:text-2xl font-light italic text-white/80 opacity-90 ">
              Create Your Secure Digital Account
            </p>

            <div className="hidden md:block space-y-6 text-left  opacity-99">
              {[
                { icon: "◈", label: "Buy 24K Gold from just ₹1", sub: "& .999 Fine Silver at Live Rates", gold: true },
                { icon: "◈", label: "99.9% Pure Metals", sub: "Always priced at live market rates", gold: true },
                { icon: "◈", label: "Bank-grade Security", sub: "Insured Storage • Zero Hidden Charges", gold: false },
                { icon: "◈", label: "Instant Transactions", sub: "Easy Withdrawals • Gifting", gold: false },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4  animate-fadeInUp" >
                  <span className={`text-lg mt-1 ${f.gold ? "text-yellow-100 opacity-99" : "text-gray-400"}`}>{f.icon}</span>
                  <div>
                    <p className="font-medium text-sm text-primary">{f.label}</p>
                    <p className="text-xs font-light text-secondary">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 pt-8 text-xs uppercase tracking-widest text-primary/70 border-t border-yellow-400">
              Join thousands already investing in digital metals
            </p>
          </div>
        </div>

        {/* Right side - form */} 
        <div className="flex-1 flex items-center justify-center px-5 py-10 md:py-8 md:px-10  
        lg:px-16 relative"> 
          <div className="relative w-full max-w-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  
          rounded-3xl shadow-2xl p-7 lg:p-9"> 
            <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-center mb-1 text-primary"> 
              Create Account 
            </h2> 
            <p className="text-center text-xs uppercase tracking-widest mb-6 text-primary/80 opacity-65"> 
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
          <>
             <input
              name="name"
              placeholder="First Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass("name")}
              />

    <input
      name="lastName"
      placeholder="Last Name"
      value={form.lastName}
      onChange={handleChange}
      className={inputClass("lastName")}
    />
  </>
)}
            {/* Step 1: Phone */} 
      {step === 1 && (
  <>
    <input
      name="contact"
      placeholder="your@gmail.com or +91 xxxxxxxxxx"
      value={form.contact}
      onChange={handleChange}
      className={inputClass("contact")}
    />

    {errors.contact && (
      <p className="text-red-600 text-xs">
        {errors.contact}
      </p>
    )}
  </>
)}
 
{step === 2 && (
  <>
    <input
      name="otp"
      placeholder="Enter OTP"
      value={form.otp}
      onChange={handleChange}
      className={inputClass("otp")}
    />
  </>
)}
{step === 3 && (
  <>
   <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    className={`${inputClass("password")} pr-10`}
  />

  {/* Eye Icon */}
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword ? <Eye /> : <EyeOff />}
  </span>
</div>



 <div className="relative mt-2">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={form.confirmPassword}
    onChange={handleChange}
    className={`${inputClass("confirmPassword")} pr-10`}
  />

  <span
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showConfirmPassword ? <Eye /> : <EyeOff />}
  </span>
</div>


       {step>0 &&(<div className="flex text-sm text-primary/70 mt-3 gap-2">
     <ArrowLeft size={20} />
      <button
        disabled={step === 0}
        onClick={() => setStep(step-1)}
        className="" >
        Back
      </button>
        </div>
      )}
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

        <div className="mt-2 font-serif text-sm text-white/60">
      Strength:{" "}
      <span
        className={
          !password
            ? "text-gray-400"
            : getStrength() === "Strong"
            ? "text-green-600"
            : getStrength() === "Medium"
            ? "text-yellow-500"
            : "text-red-600/60"
        }
      >
        {!password ? "Enter password" : getStrength()}
      </span>
    </div>

  </>
  
)}
         
      <button type="button"
       onClick={handleNext} 
       disabled={isDisabled()} 
       className={`w-full mt-6 py-3.5 rounded-xl text-sm uppercase tracking-widest font semibold transition-all flex items-center justify-center gap-2 ${ 
       isDisabled() 
       ? "bg-gray-300 text-gray-400 cursor-not-allowed" 
       : "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black" 
       }`}  > 
        {loading && ( 
        <svg className="animate-spin h-4 w-4 text-yellow-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> 
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/> 
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /> 
        </svg> 
         )} 
        {btnLabel()} 
        </button> 
             
<p className="text-center mt-5 text-xs text-white/70"> 
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
);} 
export default Signup; 
