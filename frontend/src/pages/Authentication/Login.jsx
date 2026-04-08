import axios from "axios";
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Smartphone,ArrowLeft} from 'lucide-react'


import Time from "../../assets/time";
import logo from "../../assets/logo_1.svg";
import { auth,sendMagicLink,signInwithgoogle,getIdToken} from "../../firebaseconfigurations/firebaseClient";

import useAuthStore from "../../store/authStore";
import api from "../../api/axiosInstance";



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({});

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);


  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [identifier, setIdentifier] = useState(""); // email or mobile
  const [step, setStep] = useState(1);


 const handleNext = () => {
    if (!identifier) return alert("Enter email or mobile");
    setStep(2);
  };

  // STEP 2 → Verify password
  const handlePasswordSubmit = async () => {
    // try {
    //   await axios.post("/api/", { identifier, password });

  
      // await axios.post("/api/", { identifier });

      setStep(3);
    // } catch {
    //   alert("Invalid credentials");
    // }
  };

  // STEP 3 → Verify OTP
  const handleOtpSubmit = async () => {
    try {
      // await axios.post("/api/verify-otp", { identifier, otp });
      navigate("/dashboard");
    } catch {
      alert("Invalid OTP");
    }
  };

// for phone number
  const sendOtp = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      setConfirmationResult(confirmation);
      toast.success("OTP Sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      localStorage.setItem("token", "userLoggedIn");
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };



const handleGoogleLogin = async (provider, fn) => {
    setLoading(true);
    setError("");
    try{
        const result = await fn();
       const backendData= await sendTokenToBackend(result.user, provider);
     

     
      //  console.log("Backend Response:", backendData);
    
   
      useAuthStore.getState().setAuth(backendData.data);
          // console.log("Zustand:", useAuthStore.getState());
        
    }catch(err){
        console.error(err);
        setError(`Failed with ${provider} login`);
    }
    finally {
        setLoading(false);
    }
}

const sendTokenToBackend = async (user, provider) => {
    const idToken = await getIdToken();
    try {
        const res = await api.post(
            "/auth/firebase-login",
             { provider, credential: idToken, tenantId : "vendor_abc" },
       
        );
        
        if (res.data.success) {
        toast.success("Successfully logged in");
        setCurrentUser(res.data.user || user);
        navigate("/dashboard")
    }else{
        toast.error("Login failed");
        console.error("Backend login failed:", res.data.message);
    } 
    
  return res.data;
  
  }catch(err)
{ console.error(err)}
  }

  const handleMagicLink = async (e) => {
    
  e.preventDefault();

  console.log(" Email entered:", email);

  if (!email) {
    toast.error("Enter email");
    return;
  }

  await sendMagicLink(email);
  console.log("send magic link ")
};

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">

      <div className="md:hidden py-10 px-6 bg-gradient-to-br from-[#1a1508]
       via-[#2d2210] to-[#141414] text-center">
       <img src={logo} alt="logo" className="w-12 mx-auto mb-2" />
        <h1 className="text-6xl font-['Fraunces']">
          <span className=" bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent  ">
            Dgi
          </span>
          <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent font-['Fraunces']">
            Gold
          </span>
        </h1>
        <div className="h-0.5  w-full mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 to-transparent"/>
        <p className="text-xs uppercase tracking-widest text-amber-200 mt-2">
          Gold & Silver Investment
        </p>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        
        {/* dt */}
        <div className="hidden md:flex md:w-1/2 flex-col  p-16
          bg-gradient-to-br from-[#1a1508] via-[#2d2210] to-[#141414] text-center">
            
      <img src={logo} alt="logo" className="w-25 mx-auto flex justify-self-auto  mb-0" />
          <h1 className="text-7xl mt-10 font-['Fraunces'] leading-none">
            <span className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent ">
              Dgi
            </span>
            <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Gold
            </span>
          </h1>
           <div className="h-0.5 w-12 w-full mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 to-transparent"/>
 
           <p className="text-xs uppercase tracking-widest text-amber-200 opacity-50 mt-2  mt-0">
          Gold & Silver Investment
        </p>
          <p className="text-amber-200 mt-3 tracking-widest text-sm font-style: italic  opacity-30">
            India's Trusted Digital Metals Platform
          </p>

                  <div className="space-y-6 mt-10 text-left  font font-serif text-yellow-100 opacity-99">
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
          
        </div>
        <div>
        </div>
        

       

       {/* right side */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">

          <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-amber-200 p-10">
 <div className="h-0.5 w-12 mx-auto mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 " />
            <h2 className=" text-2xl md:text-3xl font-serif text-center text-black mb-2">
              Welcome Back
            </h2>
            
          
            <p className="text-center text-xs  uppercase tracking-widest text-amber-950  opacity-65  mb-8">
              Sign in to your DgiGold account
            </p>

            
             {step === 1 && (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Enter Email or Mobile
          </h2>

          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mb-6"
          />

       
          <button
              onClick={handleNext}
             className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
              shadow-lg shadow-amber-600/30
              mb-5" >
               NEXT
            
            </button>
          <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm bg-white border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mb-4"
            />
            {errors.email && (
  <p className="text-red-500 text-xs mt-1">
    {errors.email}
  </p>)}
            <button
              onClick={handleMagicLink}
             className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
              shadow-lg shadow-amber-600/30
              mb-5" >
              SIGN IN
            
            </button>
             
            

            {/* OR */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
              <span className="text-xs uppercase tracking-widest text-amber-700">
                or
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </div>

           
            <button
              onClick={() => handleGoogleLogin("google",signInwithgoogle)}
              className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-3
              bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.1-4.47 3.1-7.8z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.35-2.63c-1.01.68-2.29 1.08-3.93 1.08-3.02 0-5.58-2.04-6.49-4.79H.96v2.67C2.77 20.39 6.62 23 12 23z"/>
                <path fill="#FBBC05" d="M5.51 14.21c-.23-.68-.36-1.41-.36-2.21s.13-1.53.36-2.21V7.34H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.66l4.55-2.45z"/>
                <path fill="#EA4335" d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.97 0 12 0 6.62 0 2.77 2.61.96 6.34l4.55 2.45C6.42 6.02 8.98 4.98 12 4.98z"/>
              </svg>
              Continue with Google
            </button>
        </div>
      )}

      {/* 2->password */}
      {step === 2 && (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Enter Password
          </h2>

          {/* Show entered email/phone */}
          <p className="text-sm text-gray-500 text-center mb-4">
            {identifier}
          </p>

          <input
            type="password"
            placeholder="Password"
            value={password}
            
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mb-6"
          />

        
          <button
          onClick={handlePasswordSubmit}
             className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
              shadow-lg shadow-amber-600/30
              mb-5" >
               NEXT
            
            </button>
        </div>
      )}
       
      {/* 3 → otp only */}
      {step === 3 && (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Enter OTP
          </h2>

          <p className="text-sm text-gray-500 text-center mb-4">
            Sent to {identifier}
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mb-6"
          />

          <button
            onClick={handleOtpSubmit}
            className="w-full py-3 rounded-xl bg-green-500 text-white"
          >
            VERIFY OTP
          </button>

        </div>
      )}
            
            {step>1 &&(<div className="flex text-sm text-amber-900/70 gap-2">
     <ArrowLeft size={20} />
      <button
        disabled={step === 0}
        onClick={() => setStep(step-1)}
        className="" >
        Back
      </button>
            </div>)}


            <p className="text-center mt-7 text-xs text-gray-600">
              New here?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-yellow-500  font-medium underline underline-offset-2"
              >
                Create an account
              </button>
            </p>
             <div className="h-0.5 w-12 mx-auto mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 " />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;