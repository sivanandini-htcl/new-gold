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
      localStorage.setItem("user", JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      }));
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

        .signup-root {
          font-family: 'Jost', sans-serif;
        }

        .heading-font {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .gold-shimmer-text {
          background: linear-gradient(
            90deg,
            #b8860b 0%,
            #d4a017 20%,
            #f5d06e 40%,
            #e8c547 50%,
            #f5d06e 60%,
            #d4a017 80%,
            #b8860b 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .silver-shimmer-text {
          background: linear-gradient(
            90deg,
            #8a8a8a 0%,
            #b0b0b0 20%,
            #e8e8e8 40%,
            #d0d0d0 50%,
            #e8e8e8 60%,
            #b0b0b0 80%,
            #8a8a8a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .left-panel-bg {
          background: linear-gradient(
            155deg,
            #1a1508 0%,
            #2d2210 15%,
            #1e1a0e 30%,
            #252015 45%,
            #1c1c1c 65%,
            #181818 80%,
            #141414 100%
          );
        }

        .gold-orb {
          background: radial-gradient(circle at 40% 35%, #f5d06e, #c89b2a 50%, #7a5c10 100%);
          animation: float 6s ease-in-out infinite;
        }

        .silver-orb {
          background: radial-gradient(circle at 40% 35%, #f0f0f0, #b0b0b0 50%, #707070 100%);
          animation: float 8s ease-in-out infinite 1s;
        }

        .orb-glow-gold {
          box-shadow: 0 0 60px 20px rgba(212, 160, 23, 0.25), 0 0 120px 40px rgba(212, 160, 23, 0.1);
        }

        .orb-glow-silver {
          box-shadow: 0 0 60px 20px rgba(176, 176, 176, 0.2), 0 0 120px 40px rgba(176, 176, 176, 0.08);
        }

        .feature-row {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }
        .feature-row:nth-child(1) { animation-delay: 0.2s; }
        .feature-row:nth-child(2) { animation-delay: 0.35s; }
        .feature-row:nth-child(3) { animation-delay: 0.5s; }
        .feature-row:nth-child(4) { animation-delay: 0.65s; }

        .divider-line {
          background: linear-gradient(90deg, transparent, #c8a84b, #b0b0b0, #c8a84b, transparent);
        }

        .signup-card {
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(200, 168, 75, 0.2);
          animation: fadeInUp 0.7s ease forwards;
        }

        .input-field {
          background: #fafaf8;
          border: 1.5px solid #e8d5a3;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Jost', sans-serif;
          color: #1a1000;
        }
        .input-field:focus {
          border-color: #c8a84b;
          box-shadow: 0 0 0 3px rgba(200, 168, 75, 0.12);
          outline: none;
          background: #fff;
        }
        .input-field::placeholder {
          color: #b0a080;
        }

        .input-error {
          border-color: #e07070 !important;
          box-shadow: 0 0 0 3px rgba(220, 100, 100, 0.1) !important;
        }

        .error-text {
          color: #c0504a;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          font-family: 'Jost', sans-serif;
        }

        .btn-gold {
          background: linear-gradient(135deg, #c8a84b 0%, #e8c86a 40%, #d4a932 70%, #b8860b 100%);
          color: #1a1000;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          letter-spacing: 0.06em;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(200, 168, 75, 0.35);
        }
        .btn-gold:hover {
          background: linear-gradient(135deg, #d4b55a 0%, #f0d070 40%, #e0b53a 70%, #c8960f 100%);
          box-shadow: 0 6px 28px rgba(200, 168, 75, 0.5);
          transform: translateY(-1px);
        }
        .btn-gold:active { transform: scale(0.98); }

        .btn-disabled {
          background: #e8e0d0;
          color: #b0a080;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: not-allowed;
        }

        .coin-ring {
          border: 2px solid rgba(200, 168, 75, 0.3);
          animation: rotateSlow 20s linear infinite;
        }
        .coin-ring-silver {
          border: 2px solid rgba(176, 176, 176, 0.25);
          animation: rotateSlow 30s linear infinite reverse;
        }

        .mobile-top-bg {
          background: linear-gradient(160deg, #1a1508 0%, #2d2210 50%, #1c1c1c 100%);
        }

        .or-line {
          background: linear-gradient(90deg, transparent, #e0cfa0, transparent);
          height: 1px;
        }

        .login-link {
          color: #b8860b;
          font-weight: 500;
        }
        .login-link:hover { color: #9a6f09; }

        .star-gold { color: #c8a84b; }
        .star-silver { color: #b0b0b0; }
      `}</style>

      <div className="signup-root min-h-screen flex flex-col" style={{ background: '#f7f3eb' }}>

        {/* ── Mobile Top Branding ── */}
        <div className="md:hidden mobile-top-bg w-full py-10 px-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full coin-ring opacity-50" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full coin-ring-silver opacity-40" />

          <div className="relative z-10 text-center mb-8">
            <h1 className="heading-font text-6xl font-bold tracking-wide mb-1">
              <span className="gold-shimmer-text">Dgi</span>
              <span className="silver-shimmer-text">Gold</span>
            </h1>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#8a7a60' }}>  Gold & Silver Investment</p>
          </div>

          <div className="relative z-10 space-y-4 max-w-xs mx-auto">
            {[
              { icon: "◈", label: "Buy 24K Gold & Fine Silver", gold: true },
              { icon: "◈", label: "99.9% Pure • Live Market Rates", gold: true },
              { icon: "◈", label: "Bank-grade Security & Insured Storage", gold: false },
              { icon: "◈", label: "Instant Transactions • Easy Withdrawals", gold: false },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={f.gold ? "star-gold" : "star-silver"} style={{ fontSize: 18 }}>{f.icon}</span>
                <p className="text-sm font-light" style={{ color: '#c8b89a' }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop Split Layout ── */}
        <div className="flex-1 flex flex-col md:flex-row">

          {/* ── Left Panel ── */}
          <div className="hidden md:flex left-panel-bg md:w-1/2 flex-col justify-center items-center p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute top-16 right-12 w-48 h-48 rounded-full gold-orb orb-glow-gold opacity-20 blur-2xl" />
            <div className="absolute bottom-20 left-8 w-36 h-36 rounded-full silver-orb orb-glow-silver opacity-15 blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full coin-ring opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full coin-ring-silver opacity-8" />
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l opacity-30" style={{ borderColor: '#c8a84b' }} />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r opacity-30" style={{ borderColor: '#b0b0b0' }} />

            <div className="relative z-10 max-w-md w-full">
              <div className="mb-2">
                <h1 className="heading-font text-7xl lg:text-8xl font-bold tracking-wide leading-none">
                  <span className="gold-shimmer-text">Dgi</span>
                  <span className="silver-shimmer-text">Gold</span>
                </h1>
                <div className="or-line mt-3 mb-2 w-3/4" />
                <p className="text-xs uppercase tracking-[0.25em]" style={{ color: '#6e6050' }}>
                 Gold  & Silver · Investment Platform
                </p>
              </div>

              <p className="heading-font text-xl lg:text-2xl font-light mt-8 mb-10" style={{ color: '#9a8a70', fontStyle: 'italic' }}>
                Create Your Secure Digital Account
              </p>

              <div className="space-y-6">
                {[
                  { icon: "◈", label: "Buy 24K Gold from just ₹1", sub: "& .999 Fine Silver at Live Rates", gold: true },
                  { icon: "◈", label: "99.9% Pure Metals", sub: "Always priced at live market rates", gold: true },
                  { icon: "◈", label: "Bank-grade Security", sub: "Insured Storage • Zero Hidden Charges", gold: false },
                  { icon: "◈", label: "Instant Transactions", sub: "Easy Withdrawals • Gifting", gold: false },
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
                  Join thousands already investing in digital metals
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Panel — Signup Form ── */}
          <div
            className="flex-1 flex items-center justify-center px-5 py-10 md:py-8 md:px-10 lg:px-16"
            style={{ background: 'linear-gradient(135deg, #f7f3eb 0%, #f0ece0 50%, #ede8da 100%)' }}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(200,168,75,0.15) 1px, transparent 0)`,
                backgroundSize: '28px 28px'
              }}
            />

            <div className="signup-card relative rounded-3xl shadow-2xl w-full max-w-md p-7 lg:p-9">

              <div className="divider-line h-0.5 w-16 mx-auto mb-5 rounded-full" />

              <h2 className="heading-font text-3xl lg:text-4xl font-semibold text-center mb-1" style={{ color: '#2a1f0e' }}>
                Create Account
              </h2>
              <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: '#a09070', fontFamily: 'Jost' }}>
                Start your DigiGold journey today
              </p>

              {/* Form Fields */}
              <div className="space-y-3">

                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && <p className="error-text mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <p className="error-text mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <p className="error-text mt-1">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm ${errors.password ? 'input-error' : ''}`}
                  />
                  {errors.password && <p className="error-text mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: '#7a6a50', fontFamily: 'Jost' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm ${errors.confirmPassword ? 'input-error' : ''}`}
                  />
                  {errors.confirmPassword && <p className="error-text mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isAnyFieldEmpty}
                className={`w-full mt-6 py-3.5 rounded-xl text-sm uppercase tracking-widest ${
                  isAnyFieldEmpty ? 'btn-disabled' : 'btn-gold'
                }`}
              >
                Create Account
              </button>

              <p className="text-center mt-5 text-xs" style={{ color: '#8a7a60', fontFamily: 'Jost' }}>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="login-link underline underline-offset-2"
                >
                  Sign in here
                </button>
              </p>

              <div className="divider-line h-0.5 w-12 mx-auto mt-5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;