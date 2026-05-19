import { useState } from "react";
import Gold from "./Gold";
import Silver from "./Silver";

function Metals() {
  const [selected, setSelected] = useState("gold");

  const isGold = selected === "gold";

  return (
    <div className={`relative transition-colors duration-500 ${isGold ? "bg-background" : "bg-background"}`}>
      
      {/* Toggle — sits at the top of the page content, below the Header */}
      <div className="flex justify-center pt-5 pb-2">
        <div className={`flex items-center gap-1 p-1 rounded-full shadow-md border transition-colors duration-300 ${isGold ? "border-yellow-700/20 bg-white/70" : "border-gray-400/30 bg-white/70"} backdrop-blur-sm`}>
          <button
            onClick={() => setSelected("gold")}
            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-['Fraunces'] transition-all duration-300 ${
              isGold
                ? "bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 text-black shadow-md"
                : "text-yellow-700/50 hover:text-yellow-800"
            }`}
          >
            ◈ Gold
          </button>
          <button
            onClick={() => setSelected("silver")}
            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-['Fraunces'] transition-all duration-300 ${
              !isGold
                ? "bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 text-black shadow-md"
                : "text-gray-500/50 hover:text-gray-700"
            }`}
          >
            ◈ Silver
          </button>
        </div>
      </div>

      {/* Render selected component — strip their outer bg since we handle it here */}
      <div key={selected}>
        {isGold ? <Gold /> : <Silver />}
      </div>

    </div>
  );
}

export default Metals;