import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dgLogo from "../../assets/dgLogo.png";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(form.name))
      newErrors.name = "Name should contain only letters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be exactly 10 digits";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        })
      );
      navigate("/");
    }
  };

  const isAnyFieldEmpty =
    !form.name.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.password ||
    !form.confirmPassword;

  return (
    <div className="min-h-screen flex flex-col font-serif bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">

      <div className="hidden relative py-10 px-6 bg-gradient-to-br from-[#1a1508] via-[#2d2210] to-[#141414] ">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border-2 border-yellow-500 opacity-50 animate-spin-slow"></div>
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full border-2 border-gray-400 opacity-40 animate-spin-slow-reverse"></div>

        <div className="relative z-10 text-center mb-8">

         <h1 className="text-7xl mt-20 font-serif leading-none">
            <span className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent ">
              Dgi
            </span>
            <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Gold
            </span>
          </h1>

          <p className="text-xs uppercase tracking-widest text-amber-200 opacity-50 ">
            Gold & Silver Investment
          </p>
        </div>

        <div className="relative z-10 space-y-4 max-w-xs mx-auto text-yellow-100 opacity-99">
          {[
            { icon: "◈", label: "Buy 24K Gold & Fine Silver", gold: true },
            { icon: "◈", label: "99.9% Pure • Live Market Rates", gold: true },
            { icon: "◈", label: "Bank-grade Security & Insured Storage", gold: false },
            { icon: "◈", label: "Instant Transactions • Easy Withdrawals", gold: false },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className={f.gold ? "text-yellow-100 opacity-99" : "text-gray-400"}>{f.icon}</span>
              <p className="font-light">{f.label}</p>
            </div>
          ))}
        </div>
      </div>




    {/* dt */}
      <div className="flex-1 flex flex-col md:flex-row  ">
      
        <div className=" md:w-1/2  relative flex flex-col justify-center items-center p-10 lg:p-16 bg-gradient-to-br from-[#1a1508] via-[#2d2210] to-[#141414] overflow-hidden">
         <img src={dgLogo} alt="logo"  className="w-12  " />
        
          {/* <div className="absolute top-16 right-12 w-48 h-48 rounded-full bg-yellow-400 opacity-20 blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-8 w-36 h-36 rounded-full bg-gray-300 opacity-15 blur-2xl animate-float delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full border-2 border-yellow-400 opacity-10 animate-spin-slow -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full border-2 border-gray-400 opacity-8 animate-spin-slow-reverse -translate-x-1/2 -translate-y-1/2"></div> */}

          <div className=" relative z-10 max-w-md w-full text-center font-serif">
            
           <h1 className="text-7xl mt-10 font-serif leading-none">
            <span className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent ">
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




{/* 
login details */}
       
        <div className="flex-1 flex items-center justify-center px-5 py-10 md:py-8 md:px-10 lg:px-16 relative">
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(200,168,75,0.15)_1px,transparent_0)] bg-[length:28px_28px] pointer-events-none opacity-30" /> */}
          <div className="relative w-full max-w-md bg-white/95 border border-yellow-200 rounded-3xl shadow-2xl p-7 lg:p-9">

            <div className="h-0.5 w-16 mx-auto mb-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 rounded-full" />

            <h2 className="text-3xl lg:text-4xl font-serif text-center mb-1  text-black">Create Account</h2>
            <p className="text-center text-xs uppercase tracking-widest mb-6  text-amber-950  opacity-65">Start your DigiGold journey today</p>

           <div className="space-y-3">

  {/* Full Name */}
  <div>
    <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium  text-amber-950  opacity-65">
      Full Name
    </label>
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Your full name"
      className={`w-full px-4 py-3 mb-3 rounded-xl text-sm bg-white 
        border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30
         outline-none mt-4 ${
        errors.name
          ? "border-red-400 ring-red-100"
          : "bg-[#fafaf8] text-[#1a1000]"
      }`}
    />
    {errors.name && (
      <p className="text-red-600 text-[0.72rem] mt-1">{errors.name}</p>
    )}
  </div>

  {/* Email */}
  <div>
    <label className="block text-xs uppercase tracking-widest mb-1 font-medium  text-amber-950  opacity-65">
      Email Address
    </label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="you@example.com"
      className={`w-full px-4 py-3 mb-4 rounded-xl text-sm bg-white 
        border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30
         outline-none mt-4 ${
        errors.email
          ? "border-red-400 ring-red-100"
          : "bg-[#fafaf8] text-[#1a1000]"
      }`}
    />
    {errors.email && (
      <p className="text-red-600 text-[0.72rem] mt-1">{errors.email}</p>
    )}
  </div>

  {/* Phone */}
  <div>
    <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium  text-amber-950  opacity-65">
      Phone Number
    </label>
    <input
      type="text"
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="10-digit mobile number"
      className={`w-full px-4 py-3 mb-4 rounded-xl text-sm bg-white 
        border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30
         outline-none mt-4 ${
        errors.phone
          ? "border-red-400 ring-red-100"
          : "bg-[#fafaf8] text-[#1a1000]"
      }`}
    />
    {errors.phone && (
      <p className="text-red-600 text-[0.72rem] mt-1">{errors.phone}</p>
    )}
  </div>

  {/* Password */}
  <div>
    <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium  text-amber-950  opacity-65">
      Password
    </label>
    <input
      type="password"
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Min. 6 characters"
      className={`w-full px-4 py-3 mb-4 rounded-xl text-sm bg-white 
        border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30
         outline-none mt-4 ${
        errors.password
          ? "border-red-400 ring-red-100"
          : "bg-[#fafaf8] text-[#1a1000]"
      }`}
    />
    {errors.password && (
      <p className="text-red-600 text-[0.72rem] mt-1">{errors.password}</p>
    )}
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium  text-amber-950  opacity-65">
      Confirm Password
    </label>
    <input
      type="password"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      placeholder="Re-enter your password"
      className={`w-full px-4 py-3 mb-4 rounded-xl text-sm bg-white 
        border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 outline-none mt-4 ${
        errors.confirmPassword
          ? "border-red-400 ring-red-100"
          : "bg-[#fafaf8] text-[#1a1000]"
      }`}
    />
    {errors.confirmPassword && (
      <p className="text-red-600 text-[0.72rem] mt-1">
        {errors.confirmPassword}
      </p>
    )}
  </div>

</div>


            <button
              onClick={handleSubmit}
              disabled={isAnyFieldEmpty}
              className={`w-full mt-6 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition-all ${
                isAnyFieldEmpty ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black"
              }`}
            >
              Create Account
            </button>

            <p className="text-center mt-5 text-xs text-gray-600">
              Already have an account?{" "}
              <button onClick={() => navigate("/")} className="text-yellow-500 underline underline-offset-2">Sign in here</button>
            </p>

            <div className="h-0.5 w-12 mx-auto mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
