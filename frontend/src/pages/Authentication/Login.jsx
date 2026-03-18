

import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../firebaseconfigurations/config";
// import dgiLogo from "../../assets/logo 1.svg";
// import Time from "../../assets/time";
import Time from "../../assets/time";
import logo from "../../assets/logo_1.svg";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

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


  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.error("No account found. Please signup first.");
      return;
    }

    if (email !== storedUser.email || password !== storedUser.password) {
      toast.error("Invalid email or password");
      return;
    }

    localStorage.setItem("token", "userLoggedIn");
    navigate("/dashboard");
  };


  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("token", "userLoggedIn");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google login failed");
    }
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
            
          
          {/* <div className="absolute top-16 right-12 w-48 h-48 rounded-full bg-yellow-400 opacity-20 blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-8 w-36 h-36 rounded-full bg-gray-300 opacity-15 blur-2xl animate-float delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full border-2 border-yellow-400 opacity-10 animate-spin-slow -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full border-2 border-gray-400 opacity-8 animate-spin-slow-reverse -translate-x-1/2 -translate-y-1/2"></div> */}
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
        

       
        <div className="flex-1 flex items-center justify-center px-6 py-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">

          <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-amber-200 p-10">
 <div className="h-0.5 w-12 mx-auto mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 " />
            <h2 className=" text-2xl md:text-3xl font-serif text-center text-black mb-2">
              Welcome Back
            </h2>
            
            {/* <h2 className="text-3xl font-serif text-center text-[#2a1f0e] mb-2">
              Welcome Back
            </h2> */}
            <p className="text-center text-xs  uppercase tracking-widest text-amber-950  opacity-65  mb-8">
              Sign in to your DgiGold account
            </p>

            
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm bg-white border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mb-4"
            />

           
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm bg-white border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mb-6"
            />

            <button
              onClick={handleLogin}
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
              onClick={handleGoogleLogin}
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

            {/* PHONE LOGIN */}
            <div className="mt-6">
              <div id="recaptcha-container"></div>

              <input
                type="text"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-xl text-sm bg-white border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mt-4"
              />

              <button
                onClick={sendOtp}
                className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black
              shadow-lg shadow-amber-600/30
              mb-5" >
                SEND OTP
              </button>

              {confirmationResult && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mt-3"
                  />

                  <button
                    onClick={verifyOtp}
                    className="w-full py-3 mt-3 rounded-xl text-sm uppercase tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black
              shadow-lg shadow-amber-600/30
              hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 mb-5"
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>

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