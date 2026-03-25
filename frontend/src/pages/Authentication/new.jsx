import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth, googleProvider } from "../../firebaseconfigurations/configs";
import dgLogo from "../../assets/dgLogo.png";
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

 

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
        {
          size: "invisible",
        }
      );
    }

    const appVerifier = window.recaptchaVerifier;

    const confirmation = await signInWithPhoneNumber(
      auth,
      phone,
      appVerifier
    );

    setConfirmationResult(confirmation);
    alert("OTP Sent!");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};


const verifyOtp = async () => {
  try {
    const result = await confirmationResult.confirm(otp);

   
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
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google User:", user);
      localStorage.setItem("token", "userLoggedIn");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      toast.error("Google login failed");
    }
  };

  return (
    <>
      

      <div className="login-root min-h-screen flex flex-col" style={{ background: '#f7f3eb' }}>
<div className="">

</div>
      
        <div className="md:hidden mobile-top-bg w-full py-10 px-6 relative overflow-hidden">
         
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full coin-ring opacity-50" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full coin-ring-silver opacity-40" />

          <div className="relative z-10 text-center mb-8">
            <h1 className="heading-font text-6xl font-bold tracking-wide mb-1">
              <span className="gold-shimmer-text">Dgi</span>
              <span className="silver-shimmer-text">Gold</span>
            </h1>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#8a7a60' }}>Gold & Silver Investment</p>
          </div>

          <div className="relative z-10 space-y-4 max-w-xs mx-auto">
            {[
              { icon: "◈", label: "24K 99.9% Pure Gold & .999 Fine Silver", gold: true },
              { icon: "◈", label: "Invest from just ₹1", gold: true },
              { icon: "◈", label: "Bank-grade Security • Insured Vaults", gold: false },
              { icon: "◈", label: "Instant Buy/Sell • Easy Gifting", gold: false },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={f.gold ? "star-gold" : "star-silver"} style={{ fontSize: 18 }}>{f.icon}</span>
                <p className="text-sm font-light" style={{ color: '#c8b89a' }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex-1 flex flex-col md:flex-row">

          <div className="hidden md:flex left-panel-bg md:w-1/2 flex-col justify-center items-center p-10 lg:p-16 relative overflow-hidden">

            
            <div className="absolute top-16 right-12 w-48 h-48 rounded-full gold-orb orb-glow-gold opacity-20 blur-2xl" />
            <div className="absolute bottom-20 left-8 w-36 h-36 rounded-full silver-orb orb-glow-silver opacity-15 blur-2xl" />

         
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full coin-ring opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full coin-ring-silver opacity-8" />

       
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l opacity-30" style={{ borderColor: '#c8a84b' }} />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r opacity-30" style={{ borderColor: '#b0b0b0' }} />

            <div className="relative z-10 max-w-md w-full">
              <img className="w-10 top-0.5 flex item" src={dgLogo} alt="" />
              {/* Logo */}
              <div className="mb-2">
                <h1 className="heading-font text-7xl lg:text-8xl font-bold tracking-wide leading-none">
                  <span className="gold-shimmer-text">Dgi</span>
                  <span className="silver-shimmer-text">Gold</span>
                </h1>
                <div className="or-line mt-3 mb-2 w-3/4" />
                <p className="text-xs uppercase tracking-[0.25em]" style={{ color: '#6e6050' }}>
                 Gold & Silver · Investment Platform
                </p>
              </div>

              <p className="heading-font text-xl lg:text-2xl font-light mt-8 mb-10" style={{ color: '#9a8a70', fontStyle: 'italic' }}>
                India's Most Trusted Digital Metals Platform
              </p>



              {/* Features */}
              <div className="space-y-6">
                {[
                  { icon: "◈", label: "24K 99.9% Pure Gold", sub: "& .999 Fine Silver at Live Rates", gold: true },
                  { icon: "◈", label: "Start from just ₹1", sub: "No minimum. No barriers.", gold: true },
                  { icon: "◈", label: "Bank-grade Security", sub: "Insured Vaults • Zero Making Charges", gold: false },
                  { icon: "◈", label: "Instant Buy / Sell", sub: "Easy Gifting for every occasion", gold: false },
                ].map((f, i) => (
                  <div key={i} className="feature-row flex items-start gap-4">
                    <span style={{ fontSize: 20, marginTop: 2, color: f.gold ? '#c8a84b' : '#a0a0a0' }}>{f.icon}</span>
                    <div>
                      <p className="font-medium text-sm" style={{ color: '#d4c4a0' }}>{f.label}</p>
                      <p className="text-xs font-light" style={{ color: '#6e6050' }}>{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(200,168,75,0.15)' }}>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: '#5a4e3a' }}>
                  Join thousands building wealth with digital metals
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Panel — Login Form ── */}
          <div
            className="flex-1 flex items-center justify-center px-5 py-10 md:py-0 md:px-10 lg:px-16"
            style={{ background: 'linear-gradient(135deg, #f7f3eb 0%, #f0ece0 50%, #ede8da 100%)' }}
          >
            
            <div className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(200,168,75,0.15) 1px, transparent 0)`,
                backgroundSize: '28px 28px'
              }}
            />

            <div className="login-card relative rounded-3xl shadow-2xl w-full max-w-md p-8 lg:p-10">

             
              <div className="divider-line h-0.5 w-16 mx-auto mb-6 rounded-full" />

              <h2 className="heading-font text-3xl lg:text-4xl font-semibold text-center mb-1" style={{ color: '#2a1f0e' }}>
                Welcome Back
              </h2>
              <p className="text-center text-xs uppercase tracking-widest mb-8" style={{ color: '#a09070', fontFamily: 'Jost' }}>
                Sign in to your DigiGold account
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[oklch(55.4%_0.135_66.442)] w-full px-4 py-3.5 rounded-xl text-sm"
                    
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-[oklch(55.4%_0.135_66.442)] w-full px-4 py-3.5 rounded-xl text-sm"
                    
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                className=" relative
   font-semibold  text-[#1a1000] bg-gradient-to-br from-[#cca633] via-[#e8c86a] to-[#b8860b]
  shadow-[0_4px_20px_rgba(200,168,75,0.35)] transition-all duration-250
  hover:from-[#d4b55a] hover:via-[#f0d070] hover:to-[#c8960f]
  hover:shadow-[0_6px_28px_rgba(200,168,75,0.5)]
  hover:-translate-y-1
  active:scale-98
  px-6  w-full py-4 rounded-xl text-sm uppercase tracking-widest mb-5"
              >
                Sign In
              </button>

              
              <div className="flex items-center gap-3 mb-5">
                <div className="or-line flex-1" />
                <span className="or-text">or</span>
                <div className="or-line flex-1" />
              </div>

              <button
                onClick={handleGoogleLogin}
                className="border border-[oklch(55.4%_0.135_66.442)] w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-3 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.1-4.47 3.1-7.8z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.35-2.63c-1.01.68-2.29 1.08-3.93 1.08-3.02 0-5.58-2.04-6.49-4.79H.96v2.67C2.77 20.39 6.62 23 12 23z" />
                  <path fill="#FBBC05" d="M5.51 14.21c-.23-.68-.36-1.41-.36-2.21s.13-1.53.36-2.21V7.34H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.66l4.55-2.45z" />
                  <path fill="#EA4335" d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.97 0 12 0 6.62 0 2.77 2.61.96 6.34l4.55 2.45C6.42 6.02 8.98 4.98 12 4.98z" />
                </svg>
                Continue with Google
              </button>
{/* Phone Login Section */}
<div className="mt-6 text-amber-900">

  <div id="recaptcha-container"></div>

  <input
    type="text"
    placeholder="+91XXXXXXXXXX"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="input-field w-full px-4 py-3.5 rounded-xl text-sm mb-3"
  />

  <button
    onClick={sendOtp}
    className="relative
   font-semibold  text-[#1a1000] bg-gradient-to-br from-[#cca633] via-[#e8c86a] to-[#b8860b]
  shadow-[0_4px_20px_rgba(200,168,75,0.35)] transition-all duration-250
  hover:from-[#d4b55a] hover:via-[#f0d070] hover:to-[#c8960f]
  hover:shadow-[0_6px_28px_rgba(200,168,75,0.5)]
  hover:-translate-y-1
  active:scale-98
  px-6 w-full py-3 rounded-xl text-sm tracking-widest mb-3"
  >
    SEND OTP
  </button>

  {confirmationResult && (
    <>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="input-field w-full px-4 py-3.5 rounded-xl text-sm mb-3"
      />

      <button
        onClick={verifyOtp}
        className="relative
   font-semibold  text-[#1a1000] bg-gradient-to-br from-[#cca633] via-[#e8c86a] to-[#b8860b]
  shadow-[0_4px_20px_rgba(200,168,75,0.35)] transition-all duration-250
  hover:from-[#d4b55a] hover:via-[#f0d070] hover:to-[#c8960f]
  hover:shadow-[0_6px_28px_rgba(200,168,75,0.5)]
  hover:-translate-y-1
  active:scale-98
  px-6 mb-3 w-full py-3 rounded-xl text-sm uppercase tracking-widest"
      >
        Verify OTP
      </button>
    </>
  )}
</div>

              <p className="text-center mt-7 text-xs" style={{ color: '#8a7a60', fontFamily: 'Jost' }}>
                New here?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="signup-link underline underline-offset-2"
                >
                  Create an account
                </button>
              </p>

              {/* Card bottom accent */}
              <div className="divider-line h-0.5 w-12 mx-auto mt-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;