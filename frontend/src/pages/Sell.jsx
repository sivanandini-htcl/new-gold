import React, { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

const Sell = () => {
  // USER DATA FROM BACKEND
  const goldBalance = 12; // grams
  const totalValue = 30000; // INR
  const goldRate = 2500; // per gram

  // INPUT
  const [amount, setAmount] = useState("");

  // CALCULATIONS
  const goldToSell = useMemo(() => {
    if (!amount) return 0;
    return Number(amount) / goldRate;
  }, [amount]);

  const remainingGold = useMemo(() => {
    return goldBalance - goldToSell;
  }, [goldToSell]);

  const remainingValue = useMemo(() => {
    return totalValue - Number(amount || 0);
  }, [amount]);

  // VALIDATION
  const isInvalid =
    Number(amount) <= 0 ||
    Number(amount) > totalValue ||
    goldToSell > goldBalance;

  const handleReview = () => {
    if (isInvalid) return;

    console.log({
      sellAmount: amount,
      goldDeducted: goldToSell,
    });

    // navigate("/verify-mpin")
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white px-5 py-4">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-xl font-semibold">
          Sell Gold
        </h1>
      </div>

      {/* BALANCE CARD */}
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 mb-6">

        <p className="text-white/50 text-sm mb-2">
          Your Gold Balance
        </p>

        <h2 className="text-4xl font-bold">
          {goldBalance.toFixed(3)} g
        </h2>

        <p className="text-green-400 mt-2">
          ≈ ₹{totalValue.toLocaleString()}
        </p>

        <div className="h-px bg-white/10 my-5" />

        <div className="flex items-center justify-between">
          <span className="text-white/50 text-sm">
            Live Gold Rate
          </span>

          <span className="text-[#c9a84c] font-semibold">
            ₹{goldRate.toLocaleString()} / gram
          </span>
        </div>

      </div>

      {/* INPUT */}
      <div className="mb-6">

        <label className="text-sm text-white/50 mb-2 block">
          Enter Amount to Sell
        </label>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-4 flex items-center">

          <span className="text-3xl mr-2 text-white/40">
            ₹
          </span>

          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent outline-none w-full text-3xl font-semibold"
          />

        </div>

      </div>

      {/* QUICK BUTTONS */}
      <div className="flex gap-3 mb-6 overflow-auto">

        {[500, 1000, 5000].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="px-5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm"
          >
            ₹{amt}
          </button>
        ))}

        <button
          onClick={() => setAmount(totalValue)}
          className="px-5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm"
        >
          Sell All
        </button>

      </div>

      {/* PREVIEW */}
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 mb-6">

        <div className="flex items-center justify-between mb-4">
          <p className="text-white/50">
            Gold Deducted
          </p>

          <p className="font-semibold text-lg">
            {goldToSell > 0
              ? `${goldToSell.toFixed(3)} g`
              : "--"}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-white/50">
            Remaining Gold
          </p>

          <p className="font-semibold text-lg">
            {remainingGold > 0
              ? `${remainingGold.toFixed(3)} g`
              : "--"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white/50">
            Remaining Value
          </p>

          <p className="font-semibold text-lg text-green-400">
            ₹
            {remainingValue > 0
              ? remainingValue.toLocaleString()
              : "--"}
          </p>
        </div>

      </div>

      {/* ERROR */}
      {Number(amount) > totalValue && (
        <p className="text-red-500 text-sm mb-5">
          Insufficient gold balance
        </p>
      )}

      {/* BUTTON */}
      <button
        disabled={isInvalid}
        onClick={handleReview}
        className={`
          w-full h-14 rounded-2xl font-semibold text-lg transition-all
          ${
            isInvalid
              ? "bg-white/10 text-white/30"
              : "bg-[#c9a84c] text-black"
          }
        `}
      >
        Review Sell
      </button>

    </div>
  );
};

export default Sell;