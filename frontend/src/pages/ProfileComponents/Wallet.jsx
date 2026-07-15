import { Eye, EyeOff, CreditCard, X,Plus,CirclePlus,ArrowLeft} from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dgiLogo from '../../assets/dgiLogo.png';
import { useNavigate } from 'react-router-dom';
import useBankAccountStore from '../../store/bankAccountStore';
import { useEffect } from 'react';
import MpinModal from '../../components/MpinModal';
import api from '../../api/axiosInstance';
import { v4 as uuidv4 } from 'uuid';
import { getDeviceFingerprint, loadDeviceFingerprint } from '../../utils/deviceFingerprint';
import { Link } from 'react-router-dom';

const Wallet = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const[addBalance,showAddBalance]=useState(false);
  const[addWalletAmount,setAddWalletAmount]=useState('')

  const [showBankSection, setShowBankSection] = useState(false);
  const [showMpin, setShowMpin] = useState(false);
  const [nloading, setnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [saved, setSaved] = useState(false);
  const [selectedBank, setSelectedBank] = useState(1);
  const [amountConfirmed, setAmountConfirmed] = useState(false); // NEW
  const [mpinLoading, setMpinLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const[successModal,setSuccessModal] = useState(false);
  const navigate = useNavigate();
  const balance =walletBalance?.availableBalance||0


  const {
    bankAccounts,
    loading,
    addBankAccount,
    getBankAccounts,
    deleteBankAccount,
    updateBankAccount,
  } = useBankAccountStore();

  const fetchWallet = async () => {
    try {
      const response = await api.post('/wallet/balance');

      console.log('Wallet Balance:', response.data);
      setWalletBalance(response.data.data);
    } catch (error) {
      console.log('Error:', error);

      console.log('RESPONSE:', error.response);
      console.log('DATA:', error.response?.data);
      console.log('MESSAGE:', error.response?.data?.message);
    }
  };

  useEffect(() => {
    getBankAccounts();
    fetchWallet();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await addBankAccount(data);
  };

  const handleNext = () => {
    if (!amount || Number(amount) <= 0) return;

     if (!amount) {
      setError('Enter a valid amount to sell.');
      return;
    }

    if (amount < 100) {
      setError('Minimum sell amount is ₹100.');
      return;
    }

    if (amount > balance) {
      setError(`Sell amount cannot exceed your current value of ₹${balance.toLocaleString()}.`);
      return;
    }
    setAmountConfirmed(true); // hide Continue button
    setShowBankSection(true);
  };
 
  const handleAdd=async()=>{
    const payload={
       amount:Number(addWalletAmount),
       paymentMethod:"UPI",
      idempotencyKey:uuidv4(),
    }
    try{
      console.log("calling topup api")
      const res=await api.post("/wallet/topup",payload)
      console.log(res.data.data);
      // const transactionId=res.data.data.transactionId
      // console.log(transactionId)
      console.log("Transaction ID:", res.data.data.transactionId);
      console.log("Backend Order ID:", res.data.data.razorpayOrderId);

      console.log("called topup api")
    if (res.data.success) {

      openRazorpayPopup({
        order_id: res.data.data.razorpayOrderId,
        currency: "INR",
        topupId: res.data.data.transactionId,
      });
      }

    }catch(error){
    console.log("error"); 
    console.log("RESPONSE:", error.response);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.response?.data?.message);
    }
  }



const openRazorpayPopup = ({ order_id, currency ,topupId}) => {
  const rzp = new window.Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    order_id,
    currency,
    name: "DigiGold",
    description: "Wallet Topup",

    handler: async (response) => {
     
      try{
      console.log("Payment Success");
      console.log(response);

      const payload={
       razorpay_orderId:response.razorpay_order_id,
      razorpay_paymentId:response.razorpay_payment_id,
      razorpaySignature:response.razorpay_signature
      }
      console.log("calling complete")
      const res =await api.post(`wallet/topup/${topupId}/complete`,payload)
      console.log("called complete")
      console.log("complete res",res.data)


      }catch(error){
     console.log("error"); 
     console.log("RESPONSE:", error.response);
     console.log("DATA:", error.response?.data);
     console.log("MESSAGE:", error.response?.data?.message);
      }
    
   //api 
    },
  });

  rzp.open();
};



  // When Withdraw is toggled off, reset everything
const handleWithdrawToggle = () => {
  setShowWithdraw((prev) => {
    const next = !prev;

    if (next) {
      // Opening Withdraw → close Add Wallet
      showAddBalance(false);
    } else {
      // Closing Withdraw → reset data
      setAmount('');
      setAmountConfirmed(false);
      setShowBankSection(false);
    }
    return next;
  });
};

const handleAddWalletToggle = () => {
  showAddBalance((prev) => {
    const next = !prev;

    if (next) {
      // Opening Add Wallet → close Withdraw
      setShowWithdraw(false);
      setAmount('');
      setAmountConfirmed(false);
      setShowBankSection(false);
    } else {
      // Closing Add Wallet → reset amount
      setAddWalletAmount('');
    }

    return next;
  });
};

  return (
          <div className="min-h-screen bg-background  py-4 px-4">

            <div className=" px-4 py-4 backdrop-blur-[20px] sm:px-6 sm:py-5">
        <div className="mx-auto max-w-7xl">
        <Link
        to="/dashboard"
        className="inline-flex items-center 2xl:text-xl gap-2 mb-6 text-xs  uppercase tracking-widest text-primary/60 hover:text-yellow-600 transition font-['Fraunces']"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      {/* Title */}
      <div className="mb-1 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
        <div className="h-0.5 w-12  bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-['Fraunces'] text-primary p-2">
         My Wallet
        </h1>
        <p className="mt-2 text-xs 2xl:text-xl  uppercase tracking-widest text-primary/50 font-['Fraunces'] pl-3">
          24K · 99.9% Pure · Live Rates
        </p>
      </div>
         
        </div>
      </div>
      
             <div className=" flex flex-col gap-3 2xl:pr-90 items-center justify-center">           
             <div className='w-full flex justify-end items-end max-w-2xl md:mr-70 2xl:mr-1'>
            <button className="flex items-center text-xs justify-center gap-1 py-2 px-1 rounded-xl font-semibold  text-secondary bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all">
           <CirclePlus/>
            Buy More
          </button>
          </div>
        {/* ── Credit Card ── */}
        <div className="relative w-full md:w-100 2xl:w-170 2xl:h-70 h-52 rounded-2xl overflow-hidden bg-[#0a0a12]">
          
          <div className="absolute inset-0 flex flex-col gap-1.5 p-3 opacity-[0.04]">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="w-full h-2 bg-white rounded-full" />
            ))}
          </div>
          <div className="absolute -top-16 -right-16 w-52 h-52  rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full p-5">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={dgiLogo} alt="" className="h-10 w-20" />
              </div>
              <div className="flex items-center gap-1.5 text-[#c9a84c] text-xs font-semibold tracking-widest">
                <CreditCard />
                CREDIT
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">
                Available Balance
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-3xl  text-white ">
                  {balanceVisible ? `₹ ${walletBalance?.availableBalance}` : '₹ ••••••'}
                </span>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white/40 hover:text-white/80 transition-colors"
                >
                  {balanceVisible ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase text-white/30 mb-1">Card Number</p>
                <p className="text-sm text-white/50 font-normal">XXXX XXXX 3456</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/30 mb-1">
                  Card Holder
                </p>
                <p className="text-sm font-semibold text-white/80">SIVA</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="grid grid-cols-2 gap-3">
         <button
  disabled={balance <= 0}
  onClick={handleWithdrawToggle}
  className={`flex items-center text-xs justify-center gap-1 py-2 px-1 rounded-xl font-semibold
    text-white bg-[#0a0a12] border border-white/10 hover:bg-[#1a1a2e]
    active:scale-95 transition-all
    ${balance <= 0
      ? "cursor-not-allowed opacity-50"
      : " text-white"
    }`}
>
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
  Withdraw
</button>
          
         
         <button onClick={handleAddWalletToggle} className="flex items-center text-xs justify-center gap-1 py-2 px-1 rounded-xl font-semibold  text-secondary bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all">
           <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H5a2 2 0 0 0-2 2V7z" />
      <path d="M21 10v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 11v4" />
      <path d="M10 13h4" />
           </svg>
          Add Wallet
        </button>


        </div>
{addBalance &&(
     <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 font-semibold">
              Add Amount To your wallet
            </p>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4">
              <span className="text-white/50 text-lg font-semibold">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={addWalletAmount}
                onChange={(e) => setAddWalletAmount(e.target.value)}
                disabled={amountConfirmed}
                className="bg-transparent text-white text-xl font-medium py-3 w-full outline-none placeholder:text-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
              <button
                onClick={handleAdd}
                className="w-full py-3 rounded-xl bg-primary text-background font-bold text-sm hover:brightness-110 active:scale-98 transition-all"
              >
               Add+
              </button>
            </div>
  
)}
        {/* ── Amount Input ── */}
        {showWithdraw && (
          <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 font-semibold">
              Withdrawal Amount
            </p>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4">
              <span className="text-white/50 text-lg font-semibold">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={amountConfirmed}
                className="bg-transparent text-white font-normal text-xl  py-3 w-full outline-none placeholder:text-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Continue button — hidden once confirmed */}
            {!amountConfirmed && (
              <button
                onClick={handleNext}
                className={`px-5 py-2 rounded-xl border border-white/10 text-sm flex justify-end ${
                  !amount || Number(amount) < 100 || Number(amount) > balance
                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-primary text-background hover:bg-primary/70 transition'
                }`}
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* ── Bank Accounts ── */}
        {showBankSection && (
          <div className="flex flex-col gap-2  w-full md:max-w-xl 2xl:max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 font-semibold px-1">
              Select Bank Account
            </p>
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
              {bankAccounts.map((bank, index) => {
                const isSelected = selectedBank === bank.id;
                return (
                  <button
                    key={bank.id || index}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-white/10 transition-all
                      ${isSelected ? 'bg-[#c9a84c]/10 border-[#c9a84c]/30' : 'hover:bg-white/5'}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'bg-[#c9a84c]/20 border-[#c9a84c]/30' : 'bg-[#0a0a12] border-white/10'}`}
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isSelected ? '#c9a84c' : '#888'}
                        strokeWidth="2"
                      >
                        <rect x="3" y="11" width="18" height="10" rx="1" />
                        <path d="M3 11l9-7 9 7" />
                        <line x1="9" y1="21" x2="9" y2="15" />
                        <line x1="15" y1="21" x2="15" y2="15" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p
                        className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}
                      >
                        {bank.bankName}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{bank.accountNumber}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${isSelected ? 'border-[#c9a84c]' : 'border-white/20'}`}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />}
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-white/40 hover:text-white/70 hover:bg-white/5 transition-all text-sm font-semibold"
              >
                <div className="w-10 h-10 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-lg text-white/30">
                  +
                </div>
                Add Bank Account
              </button>
              
            </div>
            <button
            onClick={() => setShowMpin(true)}
            className="w-full py-3 rounded-xl bg-primary text-background font-bold text-sm"
          >
            Submit
          </button>
          </div>
        )}

        {/* ── Submit ── */}
       

        {/* ── Modal ── */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-sm bg-[#0f0f17] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-white">Add Bank Account</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                {[
                  {
                    id: 'accountHolderName',
                    label: 'Account Holder Name',
                    placeholder: 'Name',
                    type: 'text',
                    rules: {
                      required: 'Name is required',
                    },
                  },

                  {
                    id: 'bankName',
                    label: 'Bank Name',
                    placeholder: 'Bank',
                    type: 'text',
                    rules: {
                      required: 'Bank name is required',
                    },
                  },

                  {
                    id: 'accountNumber',
                    label: 'Account Number',
                    placeholder: 'Enter account number',
                    type: 'number',
                    rules: {
                      required: 'Account number is required',
                    },
                  },

                  {
                    id: 'confirmAccountNumber',
                    label: 'Confirm Account Number',
                    placeholder: 'Confirm account number',
                    type: 'number',
                    rules: {
                      required: 'Confirm account number is required',
                    },
                  },

                  {
                    id: 'ifscCode',
                    label: 'IFSC Code',
                    placeholder: 'e.g. HDFC0001234',
                    type: 'text',
                    rules: {
                      required: 'IFSC code is required',
                    },
                  },
                ].map(({ id, label, placeholder, type, rules }) => (
                  <div key={id} className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-[0.1em] text-white/40 font-semibold">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      {...register(id, rules)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
                    />
                    {errors[id] && <p className="text-red-400 text-xs">{errors[id].message}</p>}
                  </div>
                ))}

                <button
                  type="submit"
                  className="mt-1 w-full py-3.5 rounded-xl font-bold text-sm text-background bg-primary hover:brightness-110 active:scale-98 transition-all"
                >
                  {saved ? '✓ Saved!' : 'Save Bank Account'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <MpinModal
        open={showMpin}
        loading={mpinLoading}
        onClose={() => setShowMpin(false)}
        title="Confirm Withdrawal"
        subtitle={`Withdraw ₹${amount}`}
        onSubmit={async (mpin) => {
          try {
            setMpinLoading(true);
            const storedFingerprint = loadDeviceFingerprint();
            const deviceFingerprint = storedFingerprint
              ? typeof storedFingerprint === 'string'
                ? storedFingerprint
                : JSON.stringify(storedFingerprint)
              : JSON.stringify(getDeviceFingerprint());
            const payload = {
              amount: Number(amount),
              accountId: selectedBank,
              mpin,
              deviceFingerprint,
              idempotencyKey: uuidv4(),
            };

            console.log(payload);

            const response = await api.post('/wallet/withdrawals/request', payload);
            console.log('RESPONSE:', response);
            setShowMpin(false);
            setSuccessModal(true);
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
      { successModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4">
    <div className="w-full max-w-sm rounded-3xl bg-[#0f0f17] border border-white/10 p-6 text-center">
      <h2 className="text-lg font-bold text-white">Withdrawal Successful</h2>
      <p className="mt-3 text-sm text-white/70">
        Your withdrawal request has been submitted successfully.Amount will be credited to yourbank account within 24 hours
      </p>
      <button
        onClick={() => {
          setSuccessModal(false);
     
        }}
        className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-background transition hover:brightness-110"
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Wallet;
