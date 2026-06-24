import React, { useState } from "react";
import GatewayTransaction from "./transactions/GatewayTransaction";
import WalletTransaction from "./transactions/WalletTransaction";

const Transaction = () => {
  const [selectedState, setSelectedState] = useState("gateway");

  return (
    <div className="min-h-screen bg-background text-zinc-100 overflow-x-hidden ">
      {/* Header */}
     <div className="flex justify-center md:justify-end px-7 py-2 border-b border-[#2A2A36]">
 
        {/* Toggle */}
        <div className="grid grid-cols-2 items-center md:items-end md:justify-end  p-1 bg-[#111117] border border-[#2A2A36] rounded-xl">
          <button
            onClick={() => setSelectedState("gateway")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedState === "gateway"
                ? "bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  text-white"
                : "text-zinc-400"
            }`}
          >
            ⇄ Gateway
          </button>

          <button
            onClick={() => setSelectedState("wallet")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedState === "wallet"
                ? "bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  text-white"
                : "text-zinc-400"
            }`}
          >
            ◈ Wallet
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-6">
        {selectedState === "gateway" ? (
          <GatewayTransaction />
        ) : (
          <WalletTransaction />
        )}
      </div>
    </div>
  );
};

export default Transaction;