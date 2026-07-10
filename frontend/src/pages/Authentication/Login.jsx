import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Smartphone, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

import { fetchUserProfile } from '../../api/profileapi';
import logo from '../../assets/logo_1.svg';
import { auth, signInwithgoogle, getIdToken } from '../../firebase/firebaseClient';
import { saveFCMTokenToBackend } from '../../firebase/message';

import useAuthStore from '../../store/authStore';
import api from '../../api/axiosInstance';
import { getDeviceFingerprint, saveDeviceFingerprint } from '../../utils/deviceFingerprint';

function Login() {
  const navigate = useNavigate();

  // Form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setError] = useState({});

  // Login flow state
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  // Multi-device login state
  const [sessionId, setSessionId] = useState(null);
  const [otpRequired, setOtpRequired] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [popUp, ShowPopUp] = useState(false);
  const [forgotemail, setForgotEmail] = useState('');
  const [sentEmail, setSentEmail] = useState(false);

  // Auth store
  const setAuth = useAuthStore((state) => state.setAuth);
  useEffect(() => {
    if (step === 2 && otpRequired && sessionId) {
      console.log('Auto-sending OTP...');
      handleSendOtp();
    }
  }, [step, otpRequired, sessionId]);

  // Get device fingerprint info
  // const getDeviceFingerprint = async () => {
  //   const screenResolution = `${window.screen.width}x${window.screen.height}`;
  //   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   const userAgent = navigator.userAgent;
  //   const language = navigator.language;

  //   return {
  //     screenResolution,
  //     timezone,
  //     userAgent,
  //     language,
  //     deviceType: /mobile|android|iphone|ipad/i.test(userAgent) ? 'mobile' : 'web',
  //     deviceName: `${getBrowserName()} on ${getOSName()}`,
  //   };
  // };

  // const getBrowserName = () => {
  //   const ua = navigator.userAgent;
  //   if (ua.indexOf('Chrome') > -1) return 'Chrome';
  //   if (ua.indexOf('Safari') > -1) return 'Safari';
  //   if (ua.indexOf('Firefox') > -1) return 'Firefox';
  //   if (ua.indexOf('Edge') > -1) return 'Edge';
  //   return 'Browser';
  // };

  // const getOSName = () => {
  //   const ua = navigator.userAgent;
  //   if (ua.indexOf('Windows') > -1) return 'Windows';
  //   if (ua.indexOf('Mac') > -1) return 'MacBook';
  //   if (ua.indexOf('Android') > -1) return 'Android';
  //   if (ua.indexOf('iPhone') > -1) return 'iPhone';
  //   return 'Device';
  // };
  // STEP 1: Verify Email/Mobile
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 
  const handleStep1Next = async () => {
    if (!identifier) {
      toast.error('Enter email or mobile number');
      return;
    }

    setLoading(true);
    try {
      const device = getDeviceFingerprint();
      setDeviceInfo(device);
      saveDeviceFingerprint(device);

      // Clean input - remove all spaces
      let emailOrMobile = identifier.trim().replace(/\s/g, '');
      const payload = {
        tenantId: import.meta.env.VITE_TENANT_ID,
        screenResolution: device.screenResolution,
        timezone: device.timezone,
      };

      console.log('Raw input:', identifier); // DEBUG
      console.log('Cleaned input:', emailOrMobile); // DEBUG

      // Check if it's a mobile number (10 digits) or email
      if (/^\d{10}$/.test(emailOrMobile)) {
        // 10 digits only - add country code
        emailOrMobile = `+91${emailOrMobile}`;
        payload.phoneNumber = emailOrMobile;
        console.log('✓ 10-digit mobile detected, sending:', emailOrMobile);
      } else if (/^\+91\d{10}$/.test(emailOrMobile)) {
        // Already has +91 prefix
        payload.phoneNumber = emailOrMobile;
        console.log('✓ +91 mobile detected, sending:', emailOrMobile);
      } else if (/^91\d{10}$/.test(emailOrMobile)) {
        // Has 91 without +
        emailOrMobile = `+${emailOrMobile}`;
        payload.phoneNumber = emailOrMobile;
        console.log(' 91 mobile detected, sending:', emailOrMobile);
      } else if (emailRegex.test(emailOrMobile)) {
        // It's an email
        payload.email = emailOrMobile.toLowerCase();
        console.log(' Email detected, sending:', emailOrMobile);
      } else {
        console.log(' Invalid format - input:', emailOrMobile);
        toast.error('Please enter a valid email or 10-digit mobile number');
        setLoading(false);
        return;
      }

      // DEBUG
      console.log('Payload for step 1:', payload);
      const response = await api.post('/auth/login/step1', payload);
      console.log("login res",response)

      if (response.data && response.data.success === true && response.data.data) {
        const { sessionId: newSessionId, otpRequired: isOtpRequired } = response.data.data;

        setSessionId(newSessionId);
        setOtpRequired(isOtpRequired);

        if (isOtpRequired) {
          toast.info('OTP required for this device');
          setStep(2);
        } else {
          toast.success('Proceeding to password verification');
          setStep(2.5);
        }
      } else {
        console.error('Step 1 verification failed:', response.data);
        toast.error(response.data?.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Step 1 error:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        console.error('Backend validation errors:', error.response.data.errors);
        toast.error(JSON.stringify(error.response.data.errors));
      } else {
        toast.error('Verification failed. Please try again.');
      }
      setLoading(false);
      return;
    }
    setLoading(false);
  };




  // STEP 2a: Send OTP
  const handleSendOtp = async () => {
    if (!sessionId) {
      toast.error('Session not found. Please start over.');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending OTP with sessionId:', sessionId);
      const response = await api.post('/auth/login/step2/send-otp', {
        sessionId,
      });
      console.log('Send OTP response:', response.data);

      // Check for success
      if (response.data && response.data.success === true) {
        toast.success('OTP sent to your email/phone');
      } else {
        console.error('Send OTP failed:', response.data);
        toast.error(response.data?.message || 'Failed to send OTP');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send OTP. Please try again.');
      }
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  // STEP 2b: Verify OTP
  const handleVerifyOtp = async () => {
    if (!sessionId || !otp) {
      toast.error('Please enter OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login/step2/verify-otp', {
        sessionId,
        otp,
      });

      // Only proceed if response is successful
      if (response.data && response.data.success === true) {
        setSessionId(response.data.data.sessionId);
        toast.success('OTP verified successfully');
        setStep(2.5); // Move to password step
        setOtp('');
      } else {
        // If verification failed, show error and STAY on Step 2
        console.error('OTP verification failed:', response.data);
        toast.error(response.data?.message || 'Invalid OTP');
        setLoading(false);
        return; // Explicitly return so we don't proceed
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      // Handle different error types
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status) {
        toast.error(`Error: ${error.response.status} - Invalid OTP`);
      } else {
        toast.error('Invalid OTP or request failed');
      }
      setLoading(false);
      return; // Stay on Step 2 on error
    }
    // Only reach here on success
    setLoading(false);
  };

  // STEP 3: Verify Password & Create Device Session
  const handlePasswordSubmit = async () => {
    if (!password || !sessionId) {
      toast.error('Password and session required');
      return;
    }

    setLoading(true);
    try {
      const device = deviceInfo || (await getDeviceFingerprint());

      const response = await api.post('/auth/login/step3', {
        sessionId,
        password,
        deviceName: device.deviceName,
        deviceType: device.deviceType,
        screenResolution: device.screenResolution,
        timezone: device.timezone,
      });

      // Strict success check before proceeding
      if (response.data && response.data.success === true && response.data.data) {
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user,
        } = response.data.data;

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        // Store tokens
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        // Update auth store
        useAuthStore.getState().setAuth({
          user,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
     

        //  NEW: Fetch and store profile data
        try {
          const profileData = await fetchUserProfile();
          useAuthStore.getState().setProfileData(profileData);
        } catch (profileError) {
          console.error('Failed to fetch profile:', profileError);
          toast.warning("Login successful but couldn't load profile");
          // Optionally, you can still navigate even if profile fetch fails
        }

        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        console.error('Password verification failed:', response.data);
        toast.error(response.data?.message || 'Login failed');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Password verification error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error('Invalid password. Please try again.');
      } else {
        toast.error('Login failed. Please try again.');
      }
      setLoading(false);
      return;
    }
    setLoading(false);
  };
  // Google login
  const handleGoogleLogin = async (provider, fn) => {
    setLoading(true);
    setError('');
    try {
      const result = await fn();
      const backendData = await sendTokenToBackend(result.user, provider);
    } catch (err) {
      console.error(err);
      setError(`Failed with ${provider} login`);
      toast.error(`Failed with ${provider} login`);
    } finally {
      setLoading(false);
    }
  };

  const sendTokenToBackend = async (user, provider) => {
    const idToken = await getIdToken();
    try {
      const res = await api.post('/auth/firebase-login', {
        provider,
        credential: idToken,
        tenantId: import.meta.env.VITE_TENANT_ID,
      });

      if (res.data.success) {
        toast.success('Successfully logged in');
        setCurrentUser(res.data.user || user);
        useAuthStore.getState().setAuth(res.data.data);
        console.log('Notification Permission:', Notification.permission);

        await saveFCMTokenToBackend();
        navigate('/dashboard');
      } else {
        toast.error('Login failed');
        console.error('Backend login failed:', res.data.message);
      }
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Backend error');
    }
  };

  const handleBack = () => {
    if (step === 2 || step === 2.5) {
      setStep(1);
      setOtp('');
      setPassword('');
      setOtpRequired(false);
      setSessionId(null);
    }
  };

  const handleForgotPassword = async () => {
    const payload = {
      email: forgotemail,
      tenantId: import.meta.env.VITE_TENANT_ID,
    };
    try {
      console.log('calling api');
      const forgotRes = await api.post('/auth/forgot-password', payload);
      console.log('called api');
      console.log('password res', forgotRes);
      setSentEmail(true);
    } catch (error) {
      console.log('error');
      console.log('RESPONSE:', error.response);
      console.log('DATA:', error.response?.data);
      console.log('MESSAGE:', error.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="md:hidden py-10 px-6 bg-gradient-to-br from-background via-[#2f2f33] to-[#111112] text-center">
        <img src={logo} alt="logo" className="w-12 mx-auto mb-2" />
        <h1 className="text-6xl font-['Fraunces']">
          <span
            className=" bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent  "
          >
            Dgi
          </span>
          <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent font-['Fraunces']">
            Gold
          </span>
        </h1>
        <div className="h-0.5  w-full mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 to-transparent" />
        <p className="text-xs uppercase tracking-widest text-primary/70 mt-2">
          Gold & Silver Investment
        </p>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* dt */}
        <div
          className="hidden md:flex md:w-1/2 flex-col  p-16
         bg-gradient-to-br from-background via-[#2f2f33] to-[#111112] text-center"
        >
          <img src={logo} alt="logo" className="w-25  mx-auto flex justify-self-auto  mb-0" />
          <h1 className="text-7xl mt-10 font-['Fraunces'] leading-none">
            <span
              className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent "
            >
              Dgi
            </span>
            <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Gold
            </span>
          </h1>
          <div className="h-0.5 w-12 w-full mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 to-transparent" />

          <p className="text-xs uppercase tracking-widest text-primary/70  mt-2  ">
            Gold & Silver Investment
          </p>
          <p className="text-primary mt-3 tracking-widest text-sm font-style: italic  ">
            India's Trusted Digital Metals Platform
          </p>

          <div className="space-y-6 mt-10 text-left  font font-serif text-primary opacity-99">
            {[
              {
                icon: '◈',
                label: 'Buy 24K Gold from just ₹1',
                sub: '& .999 Fine Silver at Live Rates',
                gold: true,
              },
              {
                icon: '◈',
                label: '99.9% Pure Metals',
                sub: 'Always priced at live market rates',
                gold: true,
              },
              {
                icon: '◈',
                label: 'Bank-grade Security',
                sub: 'Insured Storage • Zero Hidden Charges',
                gold: false,
              },
              {
                icon: '◈',
                label: 'Instant Transactions',
                sub: 'Easy Withdrawals • Gifting',
                gold: false,
              },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4  animate-fadeInUp">
                <span
                  className={`text-lg mt-1 ${f.gold ? 'text-yellow-100 opacity-99' : 'text-gray-400'}`}
                >
                  {f.icon}
                </span>
                <div>
                  <p className="font-medium text-sm">{f.label}</p>
                  <p className="text-xs font-light text-secondary">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div></div>

        {/* right side */}
        <div className="flex-1 flex items-center justify-center px-6 py-10 bg-[#111112]">
          <div className="w-full max-w-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] backdrop-blur rounded-3xl shadow-2xl border border-white/20  p-10">
            <div className="h-0.5 w-12 mx-auto mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 " />
            <h2 className=" text-2xl md:text-3xl font-serif text-center text-primary mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-xs  uppercase tracking-widest text-primary/80  opacity-65  mb-8">
              Sign in to your DgiGold account
            </p>
            {/* STEP 1: Email/Mobile */}
            {step === 1 && (
              <div className="w-full space-y-6">
                <input
                  type="text"
                  placeholder="Email or Mobile Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-3  text-gray-200 rounded-xl border border-white/20  focus:border-white/20 focus:ring-2 focus:ring-white/60 outline-none"
                />
                <button
                  onClick={handleStep1Next}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800
              shadow-sm shadow-amber-600/30
              disabled:opacity-50 disabled:cursor-not-allowed text-background"
                >
                  {loading ? 'VERIFYING...' : 'NEXT'}
                </button>

                {/* OR */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                  <span className="text-xs uppercase tracking-widest text-primary/70">or</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                </div>

                <button
                  onClick={() => handleGoogleLogin('google', signInwithgoogle)}
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs text-black md:text-sm flex items-center justify-center gap-1 md:gap-3 p-0
              bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-3 h-3 md:w-5 md:h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.1-4.47 3.1-7.8z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.35-2.63c-1.01.68-2.29 1.08-3.93 1.08-3.02 0-5.58-2.04-6.49-4.79H.96v2.67C2.77 20.39 6.62 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.51 14.21c-.23-.68-.36-1.41-.36-2.21s.13-1.53.36-2.21V7.34H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.66l4.55-2.45z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.97 0 12 0 6.62 0 2.77 2.61.96 6.34l4.55 2.45C6.42 6.02 8.98 4.98 12 4.98z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
            )}

            {/* STEP 2: OTP (Only if required) */}
            {step === 2 && otpRequired && (
              <div className="w-full space-y-6">
                <p className="text-sm text-white/70 text-center mb-4">
                  {loading ? 'Sending OTP...' : 'Enter OTP sent to ' + identifier}
                </p>

                <input
                  type="text"
                  placeholder="Enter OTP (6 digits)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength="6"
                  className="w-full px-4 py-3 rounded-xl text-lg border border-white/20 focus:border-whit-30 focus:ring-2 focus:ring-white/60 outline-none text-center  tracking-widest"
                />

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length < 6}
                  className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-background
              shadow-sm shadow-amber-600/30
              disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'VERIFYING...' : 'VERIFY OTP'}
                </button>
              </div>
            )}

            {/* STEP 2.5 & 3: Password */}
            {(step === 2.5 || (step === 2 && !otpRequired)) && (
              <div className="w-full space-y-6">
                <div>
                  <p className="text-sm text-primary/80 text-center mb-4">{identifier}</p>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl  text-lg border border-white/20 focus:border-white/30 focus:ring-2 focus:ring-white/50 text-secondary outline-none"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </span>
                  </div>
                </div>
                <div className="w-ful text-[#28a0cf] flex  justify-end">
                  <button onClick={() => ShowPopUp(true)} className="text-sm">
                    Forgot Password ?
                  </button>
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  disabled={loading || !password}
                  className="w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-background
              shadow-sm shadow-amber-600/30
              disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
              </div>
            )}

            {/* Back button */}
            {step > 1 && (
              <div className="flex text-sm text-primary/80 gap-2 mt-6">
                <ArrowLeft size={20} />
                <button onClick={handleBack} className="hover:text-amber-900 transition">
                  Back
                </button>
              </div>
            )}

            <p className="text-center mt-7 text-xs text-white/70">
              New here?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary  font-medium underline underline-offset-2"
              >
                Create an account
              </button>
            </p>
            <div className="h-0.5 w-12 mx-auto mt-5 bg-gradient-to-r from-transparent via-yellow-400 to-gray-400 " />
          </div>
        </div>
      </div>
      {popUp && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-[#111117] rounded-2xl shadow-xl w-[90%] max-w-md p-6">
            {!sentEmail ? (
              <div>
                <h2 className="text-2xl font-serif text-white/70 mb-2">Forgot Password</h2>
                <p className="text-gray-500 mb-4">
                  Enter your email address to receive a reset link.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotemail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => ShowPopUp(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleForgotPassword}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      'Send Link'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-green-600 text-5xl mb-3">✓</div>

                  <h2 className="text-xl font-bold text-whit/70">Email Sent Successfully</h2>

                  <p className="text-gray-400 mt-2">
                    A password reset link has been sent to <b>{forgotemail}</b>.
                  </p>

                  <button
                    onClick={() => {
                      ShowPopUp(false);
                      setSentEmail(false);
                      setForgotEmail('');
                    }}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
                  >
                    OK
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
