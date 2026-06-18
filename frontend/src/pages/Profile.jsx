import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import {
  User, Phone, Mail,
  Edit,FileText,ShieldCheck,
  MapPin,CreditCard, Receipt,
  Clock, ArrowRightLeft, Gift,
  ShieldUser,Settings,TrendingUp,
  TrendingDown, Zap, BarChart2,
  ArrowUpRight, Wallet,Package,
  ChevronRight,Sparkles, X,
} from 'lucide-react';
import usePriceStore from '../store/priceStore';
import useAuthStore from '../store/authStore';
import usePortfolioStore from '../store/usePortfolioStore';
import api from '../api/axiosInstance';
import useKycStore from '../store/useKYCStore';
import useMpinStore from '../store/useMpinStore';
import fetchHoldingsData from '../api/holdingsApi';
import { fetchUserProfile } from '../api/profileapi';
import { toast } from 'react-toastify';
import QuickAction from './ProfileComponents/QuickAction';
import MpinModal from '../components/MpinModal';


// ─── API helpers ───────
const sendVerificationOtp = async ({
  identifier,
  type,
  userId,
  purpose = 'account-verification',
}) => {
  const payload = { userId, purpose };
  console.log('Identifier:', identifier, 'Type:', type, 'UserID:', userId);
  if (type === 'phone') {
    const formattedPhone = identifier.startsWith('+') ? identifier : `+91${identifier}`;
    payload.phoneNumber = formattedPhone;
  } else {
    payload.email = identifier;
  }
  console.log('Payload for OTP:', payload);
  const response = await api.post('/auth/email-otp/send', payload);
  return response.data;
};

const verifyContactOtp = async ({
  otp,
  identifier,
  type,
  userId,
  purpose = 'account-verification',
}) => {
  const payload = { otp, userId, purpose };

 if (type === 'phone') {
  payload.phoneNumber = identifier.startsWith('+')
    ? identifier
    : `+91${identifier}`;
} else {
    payload.email = identifier;
  }
console.log('Payload for OTP verification:', payload);
  const response = await api.post('/auth/email-otp/verify', payload);
  return response.data;
};

// ─── Constants ────
// const QUICK_ACTIONS = [
//   {
//     icon: BarChart2,
//     label: 'Reports',
//     sub: 'Analytics & insights',
//     iconBg: 'bg-amber-100',
//     iconBorder: 'border-amber-300',
//     iconColor: 'text-amber-700',
//     route: null,
//   },
//   {
//     icon: Package,
//     label: 'My Orders',
//     sub: 'Track deliveries',
//     iconBg: 'bg-green-50',
//     iconBorder: 'border-green-300',
//     iconColor: 'text-green-700',
//     route: '/orders',
//   },
//   {
//     icon: Gift,
//     label: 'Redeem',
//     sub: 'Browse jewellery',
//     iconBg: 'bg-amber-100',
//     iconBorder: 'border-amber-300',
//     iconColor: 'text-amber-700',
//     route: '/redeem',
//   },
//   {
//     icon: Clock,
//     label: 'History',
//     sub: 'All transactions',
//     iconBg: 'bg-stone-100',
//     iconBorder: 'border-stone-300',
//     iconColor: 'text-stone-600',
//     route: null,
//   },
// ];

// ─── Component ─────────
export default function Profile() {
  const navigate = useNavigate();

  // ── Local state ──────
  const [wallet, setWallet] = useState(null);
  const [metalWallet, setMetalWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMpin,setShowMpin]=useState(false);
  const [mpinLoading, setMpinLoading] = useState(false);
  const[kycPopup,setKycPopup]=useState(false);

  // Verification modal state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyType, setVerifyType] = useState(null); // 'phone' | 'email'
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [redirectPath, setRedirectPath] = useState("");

  // ── Store selectors ────────────
  const username = useAuthStore((s) => s.user?.firstName);
  const userEmail = useAuthStore((s) => s.user?.email);
  const userId = useAuthStore((s) => s.user?.uid);
  const prices = usePriceStore((s) => s.prices) || [];
  const profileData = useAuthStore((s) => s.profileData);
  const setProfileData = useAuthStore((s) => s.setProfileData);

  const kycStatus = useKycStore((state) => state.kycStatus);
  const loadKycProgress = useKycStore((state) => state.loadKycProgress);

  const mpinCreated = useMpinStore((state) => state.mpinCreated);

  const mpinStatusLoading = useMpinStore((state) => state.mpinStatusLoading);

  console.log("MPIN Status:", mpinCreated);
  const fetchMPINStatus = useMpinStore((state) => state.fetchMPINStatus);

  // ── Derived data ────
  const isEmailVerified = profileData?.emailVerified || false;
  const isPhoneVerified = profileData?.phoneVerified || false;
  const bothVerified = isEmailVerified && isPhoneVerified;

  const goldPriceData = prices.find((i) => i.metal === 'GOLD');
  const silverPriceData = prices.find((i) => i.metal === 'SILVER');

  // Safe profile display values
  const displayPhone = profileData?.phoneNumber || 'Not added';
  const displayEmail = profileData?.email || userEmail || '—';
  const displayUserId = profileData?.uid || userId || '—';
 const phoneNumber = profileData?.phoneNumber;


const openVerification = (path) => {
  if (kycStatus !== "approved") {
    setKycPopup(true);
    return;
  }

  setRedirectPath(path);
  setShowMpin(true);
};
  // ── Verification handlers ────
  
  const handleKycClick = () => {
    // If both verified → navigate directly
    if (bothVerified) {
      navigate('/kycpage');
      return;
    }

    // Determine which needs verification (prioritize phone if not verified)
    if (!isPhoneVerified) {
      setVerifyType('phone');
    } else {
      setVerifyType('email');
    }

    // Reset modal state
    setIdentifier('');
    setOtp('');
    setOtpSent(false);
    setShowVerifyModal(true);
  };

  const handleSendVerification = async () => {
    if (!identifier.trim()) {
      alert(`Please enter ${verifyType === 'phone' ? 'mobile number' : 'email'}`);
      return;
    }
  
    setVerifyLoading(true);
    try {
      console.log('Calling api');
      const response = await sendVerificationOtp({
        identifier,
        type: verifyType,
        userId,
        purpose: 'account-verification',
      });
      console.log('called api')

      setSessionId(response?.data?.sessionId || response?.sessionId);
      setOtpSent(true);
    } catch (error) {
      console.log('error');
      console.log('RESPONSE:', error.response);
      console.log('DATA:', error.response?.data);
      console.log('MESSAGE:', error.response?.data?.message);
      console.error('Error sending OTP:', error.response?.data || error.message);

      alert('Failed to send OTP: ' + (error.response?.data?.message || error.message));
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      alert('Enter 6-digit OTP');
      return;
    }

    setVerifyLoading(true);
    try {
      await verifyContactOtp({
        otp,
        identifier,
        type: verifyType,
        userId,
        purpose: 'account-verification',
      });

      // Update profile data with verified status
      const updatedProfile = {
        ...profileData,
        ...(verifyType === 'phone' ? { phoneVerified: true } : { emailVerified: true }),
      };
      setProfileData(updatedProfile);

      setShowVerifyModal(false);
      navigate('/kycpage');
    } catch (error) {
        console.log("error"); 
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
      console.error('OTP verification error:', error.response?.data || error.message);
      alert('OTP verification failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowVerifyModal(false);
    setVerifyType(null);
    setIdentifier('');
    setOtp('');
    setOtpSent(false);
  };
  

const handleReset=async ()=>{
  const payload={
  phoneNumber,
  tenantId: import.meta.env.VITE_TENANT_ID
}
  try{
const res=await api.post('/auth/otp/send',payload);
if(res.data.success){
  console.log( "response success",res)
  toast.success("OTP sent")
  navigate('/resetmpin')
}
  }
  catch(error){  console.log("error"); 
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);

  }
}
  // ── Effects ────────
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const data = await fetchHoldingsData();
        setWallet(data?.wallet || null);
        setMetalWallet(data?.metalWallet || null);
      } catch (err) {
        console.error('Failed to fetch holdings:', err);
      }
    };

    fetchUserProfile();
    fetchHoldings();
    loadKycProgress();
    fetchMPINStatus();
  }, []);

  // ── Loading skeleton ────
  if (loading) {
    return (
      <div className="animate-pulse min-h-screen bg-background p-4">
        <div className="flex gap-4 mt-10">
          <div className="h-50 w-160 bg-secondary/8 rounded-lg p-4 grid md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 w-20 bg-secondary/8 rounded-2xl" />
            ))}
          </div>
          <div className="h-50 w-70 bg-secondary/7 rounded-lg" />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full h-60 bg-secondary/7 rounded-lg" />
          <div className="w-full h-60 bg-secondary/7 rounded-lg" />
        </div>
      </div>
    );
  }

  // ─── Render ────────────
  return (
    <>
      <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* ROW 1 — Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3 rounded-2xl bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm">
              {/* User info */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 pb-4 border-b border-white/20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 flex items-center justify-center shrink-0">
                  <User className="text-amber-700" size={22} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary truncate">
                      {username || profileData?.firstName || 'User Name'||profileData.firstname}
                    </h2>
                    <span className="text-xs font-medium bg-amber-100 text-background border border-primary/70 px-2 py-0.5 rounded-full shrink-0">
                      Premium
                    </span>
                    {kycStatus === 'approved' && (
                      <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        KYC Verified
                      </span>
                    )}
                    {kycStatus === 'pending' && (
                      <span className="text-[10px] px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        KYC Pending
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {[
                      { icon: Phone, val: displayPhone },
                      { icon: Mail, val: displayEmail },
                      { icon: ShieldUser, val: displayUserId },
                    ].map(({ icon: Icon, val }, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 text-xs text-primary/80">
                        <Icon size={11} className="text-primary shrink-0" />
                        <span className="truncate font-normal max-w-[180px]">{val}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center gap-2 mb-3">
                  <div className="flex gap-2">
                    <Wallet size={14} className="text-primary/70" />
                    <p className="text-xs uppercase tracking-widest text-primary font-normal">
                      Total Portfolio
                    </p>
                  </div>
                  <p className="text-sm md:text-xl text-center sm:text-3xl font-normal text-primary mb-1">
                    {wallet?.portfolio?.currentValueINR || '₹0'}
                  </p>
                </div>
              </div>
{kycStatus==='approved' &&(
   <div className="flex items-center justify-center gap-3 md:items-start md:justify-start">
                
             {mpinCreated?(
                  <p className='bg-green-500/20 text-green-400 border border-green-500/30 rounded-2xl px-1  text-xs'>
                  Mpin Verified ✓
                </p>                  

                ):(
                  <button
                  onClick={() => navigate('/mpin-setup')}
                  className="text-xs text-primary/80 hover:text-primary transition-colors">
                  Set Up MPIN
                </button>
                )}
                <button
                  onClick={() => navigate('/changempin')}
                  className="text-xs text-primary/80 hover:text-primary transition-colors">
                  Change MPIN
                </button>
                <button
                  onClick={ handleReset}
                  className="text-xs text-primary/80 hover:text-primary transition-colors"
                >
                  Reset MPIN
                </button>
              </div>
  
)}
              {/* MPIN actions */}
             
            </div>
          </div>

          {/* ROW 2 — Menu Items */}
          <div className="w-full bg-[#111117] p-4 rounded-2xl grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {[
              { icon: Edit, label: 'Profile', onClick: () => navigate('/profile') },
              { icon: FileText, label: 'KYC', onClick: handleKycClick },
              { icon: MapPin, label: 'Address', onClick: () => navigate('/delivery') },
              { icon:  ShieldCheck, label: 'Account', onClick: () => navigate('/account') },
              { icon: CreditCard, label: 'Wallet', onClick: () => openVerification('/wallet') },
              { icon: ArrowRightLeft,label: 'Transfers',onClick: () => navigate('/transactions'),},
            ].map(({ icon: Icon, label, onClick }) => (
              <div key={label} className="flex items-center gap-1.5 p-2 sm:p-3 cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all">
                  <Icon size={17} className="text-secondary" />
                </div>
                <button
                  className="text-center text-xs md:text-sm text-secondary font-medium leading-tight hover:text-primary transition-colors"
                  onClick={onClick}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>

          {/* ROW 3 — Gold & Silver Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gold Card */}
            <div className="rounded-2xl bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4" />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-serif text-primary">Gold</h3>
                    <span className="text-xs border border-white/20 bg-[#111112] text-primary/70 px-2 py-0.5 rounded-full font-medium">
                      24K
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-secondary">
                      Live · ₹{metalWallet?.metals?.[0]?.livePriceINRPerGram || 'Loading...'}/g
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary uppercase tracking-widest mb-0.5">
                    Holdings
                  </p>
                  <p className="text-lg text-secondary">
                    {metalWallet?.metals?.[0]?.quantityGrams || '0'}/g
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  {
                    label: 'Current Value',
                    val: `₹${metalWallet?.metals?.[0]?.currentValueINR ?? 'Loading..'}`,
                    bold: true,
                  },
                  {
                    label: 'Invested',
                    val: `₹${metalWallet?.metals?.[0]?.investedINR ?? 'Loading..'}`,
                  },
                ].map((s, i) => (
                  <div key={i} className="bg-[#111112] border border-white/20 rounded-xl p-2.5">
                    <p className="text-xs uppercase tracking-wider mb-1">{s.label}</p>
                    <p
                      className={`text-sm  ${s.bold ? 'text-secondary' : 'text-secondary'}`}
                    >
                      {s.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/gold')}
                  className="flex-1 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-stone-900 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition shadow-sm"
                >
                  <Zap size={13} /> Buy
                </button>
                <button
                  onClick={() => openVerification('/goldsell')}
                  className="flex-1 border border-amber-200 text-amber-700 bg-amber-50 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-100 transition"
                >
                  <ArrowUpRight size={13} /> Sell
                </button>
              </div>
            </div>

            {/* Silver Card */}
            <div className="rounded-2xl bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4" />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-serif text-primary">Silver</h3>
                    <span className="text-xs border border-white/20 bg-[#111112] text-primary/70 px-2 py-0.5 rounded-full font-medium">
                      .999
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-white/70">
                      Live · ₹{metalWallet?.metals?.[1]?.livePriceINRPerGram || 'Loading...'}/g
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary uppercase tracking-widest mb-0.5">
                    Holdings
                  </p>
                  <p className="text-lg  text-secondary">
                    {metalWallet?.metals?.[1]?.quantityGrams || '0'}/g
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  {
                    label: 'Current Value',
                    val: `₹${metalWallet?.metals?.[1]?.currentValueINR ?? 'Loading..'}`,
                    bold: true,
                  },
                  {
                    label: 'Invested',
                    val: `₹${metalWallet?.metals?.[1]?.investedINR ?? 'Loading..'}`,
                  },
                ].map((s, i) => (
                  <div key={i} className="bg-[#111112] border border-white/20 rounded-xl p-2.5">
                    <p className="text-xs text-secondary uppercase tracking-wider mb-1">
                      {s.label}
                    </p>
                    <p
                      className={`text-sm  ${s.bold ? 'text-secondary' : 'text-secondary'}`}
                    >
                      {s.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/silver')}
                  className="flex-1 bg-gradient-to-r from-stone-600 via-stone-300 to-stone-600 text-stone-900 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition shadow-sm"
                >
                  <Zap size={13} /> Buy
                </button>
                <button
                  onClick={() => openVerification('/silversell')}
                  className="flex-1 border border-stone-200 text-background bg-white/90 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-100 transition"
                >
                  <ArrowUpRight size={13} /> Sell
                </button>
              </div>
            </div>
          </div>

          {/* ROW 4 — Quick Actions */}
          <QuickAction/>
        
        </div>
      </div>

      {/* ─── Verification Modal ──────── */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#0f0f17] border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Verify {verifyType === 'phone' ? 'Mobile Number' : 'Email'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {!otpSent ? (
              <>
                <label className="block text-sm text-white/70 mb-2">
                  {verifyType === 'phone' ? 'Mobile number' : 'Email address'}
                </label>
                <input
                  type={verifyType === 'phone' ? 'tel' : 'email'}
                  value={identifier}
                  onChange={(e) => {
                    const val = e.target.value;
                    setIdentifier(
                      verifyType === 'phone' ? val.replace(/\D/g, '').slice(0, 10) : val
                    );
                  }}
                  placeholder={verifyType === 'phone' ? 'Enter mobile (10 digits)' : 'Enter email'}
                  className="w-full rounded-lg border border-white/20 px-4 py-3 bg-[#111112] text-white mb-4 focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleSendVerification}
                  disabled={verifyLoading || !identifier.trim()}
                  className="w-full bg-accent py-3 rounded-lg text-white/70 border border-white/20 font-semibold disabled:opacity-50 transition-opacity"
                >
                  {verifyLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </>
            ) : (
              <>
                <label className="block text-sm text-white/70 mb-2">Enter OTP (6 digits)</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full rounded-lg border border-white/20 px-4 py-3 bg-[#111112] text-white mb-4 focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={verifyLoading || otp.length < 6}
                  className="w-full bg-accent py-3 rounded-lg text-black font-semibold disabled:opacity-50 transition-opacity"
                >
                  {verifyLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </>
            )}

            <button
              onClick={handleCloseModal}
              className="w-full mt-3 border border-white/20 py-2 rounded-lg text-white/70 hover:text-white/90 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
<MpinModal
        open={showMpin}
        loading={mpinLoading}
        onClose={() => setShowMpin(false)}
      
        onSubmit={async (mpin) => {
          try {
            setMpinLoading(true);
           
            const payload = {
              
              mpin,
            };
            console.log(payload);
            const response = await api.post('security/mpin/verify-mpin',payload);
            console.log('RESPONSE:', response);
            setShowMpin(false);
              if (redirectPath) {
        navigate(redirectPath);
      }
          } catch (err) {
            console.log('err');
            console.log('RESPONSE:', err.response);
            console.log('DATA:', err.response?.data);
            console.log('MESSAGE:', err.response?.data?.message);

            throw err;
          } finally {
            setMpinLoading(false);
          }
        }}
      />
{kycPopup && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#111117] border border-white/20 rounded-2xl p-6 w-[90%] max-w-sm">
      <h2 className="text-xl text-white mb-3">
        KYC Verification Required
      </h2>

      <p className="text-white/70 mb-6">
        Please verify your KYC before proceeding.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setKycPopup(false)}
          className="flex-1 py-3 border border-white/20 rounded-xl text-white"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setKycPopup(false);
            navigate("/kycpage");
          }}
          className="flex-1 py-3 rounded-xl bg-gray-500 text-black font-semibold"
        >
          Verify KYC
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}
