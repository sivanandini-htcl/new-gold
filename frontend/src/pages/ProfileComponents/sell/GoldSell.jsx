import React, { useMemo, useState, useEffect } from 'react';
import { CreditCard, Eye, EyeOff } from 'lucide-react';
import dgiLogo from '../../../assets/dgiLogo.png';
import fetchHoldingsData from '../../../api/holdingsApi';
import api from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const GoldSell = () => {
  const navigate=useNavigate();
  const [amount, setAmount] = useState('');
  const [showSection, setShowSection] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [metalWallet, setMetalWallet] = useState(null);
  const [error, setError] = useState(null);
  const[successModal,setSuccessModal]=useState(false);

  const totalValue = metalWallet?.metals?.[0]?.currentValueINR; 

  const handleReview = async() => {
    const amountValue = Number(amount);
    if (!amount || Number.isNaN(amountValue)) {
      setError('Enter a valid amount to sell.');
      return;
    }

    if (amountValue < 100) {
      setError('Minimum sell amount is ₹100.');
      return;
    }

    if (amountValue > totalValue) {
      setError(`Sell amount cannot exceed your current value of ₹${totalValue.toLocaleString()}.`);
      return;
    }

    setError(null);
    setShowSection(true);

const payload = {
  metal: 'GOLD',
  amountINR: amountValue, 
};
try{

const response = await api.post('/orders/sell', payload);
console.log('Sell order response:', response.data);
setSuccessModal(true);
}
catch(error){
  console.log("error"); 
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
}
    
    
  };

  useEffect(() => {
    const fetchHoldings = async () => {
      const data = await fetchHoldingsData();
      setWallet(data.wallet);
      console.log('Wallet Data:', data.wallet);
      setMetalWallet(data.metalWallet);
      console.log('Metal Wallet Data:', data.metalWallet);
    };

    fetchHoldings();
  }, []);
  return (
    <div className="min-h-screen bg-[#0f0f17] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl flex flex-col gap-5">
        {/* first row */}
        <div className=" grid md:grid-cols-2 gap-4">
          {/* credit card */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-[#0a0a12]">
            <div className="absolute inset-0 flex flex-col gap-1.5 p-3 opacity-[0.04]">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="w-full h-2 bg-white rounded-full" />
              ))}
            </div>
            <div className="absolute -top-16 -right-16 w-52 h-52 font-mono rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full p-5">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <img src={dgiLogo} alt="" className="h-10 w-20" />
                </div>
                <div className="flex items-center gap-1.5 text-[#c9a84c] text-xs  tracking-widest">
                  <CreditCard />
                  GOLD CREDIT
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">
                    Current Value
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 mb-1">
                    Holdings
                  </p>
                </div>

                <div className=" items-center gap-2.5">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-white tracking-tight">
                   
                      ₹{metalWallet?.metals?.[0]?.currentValueINR || "Loading..."}
                    </span>
                    <span className="text-xl font-bold text-white tracking-tight">
                      {metalWallet?.metals?.[0]?.quantityGrams}/g
                    </span>
                  </div>

                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    {/* {balanceVisible ? <Eye /> : <EyeOff />} */}
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
                  <p className="text-sm  text-white/80">SIVA</p>
                </div>
              </div>
            </div>
          </div>

          {/* input and button container */}
          <div className="border border-white/7 p-3 relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a12]">
            {/* input field */}
            <div>
              <div className="mb-6">
                <label className="text-sm text-white/50 mb-2 block">Enter Amount to Sell</label>

                <div className="bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-4 flex items-center">
                  <span className="text-3xl mr-2 text-white/40">₹</span>

                  <input
                    type="number"
                    placeholder="Minimum 100"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError(null);
                    }}
                    className="bg-transparent outline-none w-full text-xl "
                  />
                </div>

                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>
            </div>
            {/* QUICK BUTTONS */}
            <div className="flex justify-center gap-3 mb-6 overflow-auto">
              {[500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="px-5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm"
                >
                  ₹{amt}
                </button>
              ))}

              {/* <button
                onClick={() => setAmount(String(totalValue))}
                className="px-5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm"
              >
                Sell All
              </button> */}
             
            </div>
            <div className="flex justify-end">
             <button
                onClick={handleReview}
                disabled={!amount || Number(amount) < 100 || Number(amount) > totalValue}
                className={`px-5 py-2 rounded-xl border border-white/10 text-sm flex justify-end ${
                  !amount || Number(amount) < 100 || Number(amount) > totalValue
                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-primary text-background hover:bg-amber-500/90 transition'
                }`}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
        {/* {showSection && (
          <div className="bg-[#111117] border border-white/10 rounded-3xl p-5 mb-6 ">
            <h1 className="text-xl font-bold ">Sell Summary</h1>
            <div className=" border-b 2xl:text-xl border-white/20 pb-2 mb-2" />

            <div className="flex items-center justify-between mb-3  ">
              <p className="text-white/50">Sell Amount</p>

              <p className=" text-sm">10000</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-white/50">Gold Deducted</p>

              <p className=" text-sm">12/g</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-white/50">Remaining Value</p>

              <p className=" text-sm text-green-400">₹ 20000</p>
            </div>

            <div className=" border-b 2xl:text-xl border-white/20 pb-2 mb-2" />

            <div className="flex items-center justify-between mb-3">
              <p className="text-white/70">Platform fee</p>

              <p className=" text-sm text-white/70">₹ 50</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-white/70">Extra fee</p>

              <p className=" text-sm text-white/70">₹ 215</p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-white/70">deduction</p>

              <p className=" text-sm text-white/70">₹ 320</p>
            </div>

            <div className=" border-b 2xl:text-xl border-white/20 pb-2 mb-5" />
            <div className="flex items-center justify-between mb-3">
              <p className="  font-bold text-green-800">You will recieve</p>

              <p className=" text-sm text-green-500">₹ 1000</p>
            </div>
            <div className="flex justify-end">
              <button className="px-5 py-2 rounded-xl bg-primary text-background border  text-sm flex justify-center item-center">
                sell now
              </button>
            </div>
          </div>
        )} */}
             { successModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4">
    <div className="w-full max-w-sm rounded-3xl bg-[#0f0f17] border border-white/10 p-6 text-center">
      <h2 className="text-lg font-bold text-white">Sell Successful</h2>
      <p className="mt-3 text-sm text-white/70">
        Your sell request has been submitted successfully.Amount will be credited to your DGI Gold wallet within 24 hours
      </p>
      <button
        onClick={() => {
          setSuccessModal(false);
          navigate('/profile')
     
        }}
        className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-background transition hover:brightness-110"
      >
        OK
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};
export default GoldSell;
