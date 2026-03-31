

import { useContext } from "react";
import { useNavigate } from "react-router-dom";


function GoldPrice() {
  const navigate = useNavigate();
  const { goldPrice, goldPercentage }=useContext(PriceContext);

  const isProfit = Number(goldPercentage) > 0;

  return (
    <div className="bg-gray-900/80 border rounded-2xl p-4">
      <div className="text-sm mb-1">Current Gold</div>

      <div className="text-2xl font-bold">
        {goldPrice ? `₹ ${goldPrice}` : "Loading..."}
      </div>

      {goldPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            isProfit ? "text-green-400" : "text-red-400"
          }`}
        >
          {isProfit ? "▲" : "▼"}{" "}
          {Math.abs(goldPercentage)}%
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          className="flex-1 bg-Primary py-2 rounded-xl"
          onClick={() => navigate("/gold")} >
          BUY
        </button>
      </div>
    </div>
  );
}

export default GoldPrice;






















// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// function GoldPrice(){

// const navigate=useNavigate();
// const [goldPrice, setGoldPrice] = useState(null);
// const [percentageChange, setPercentageChange] = useState(null);
// const prevPrice = 12000; //  previous gold price 

//     useEffect(() => {
//       fetchGoldPrice();
//       const interval = setInterval(fetchGoldPrice, 30000); 
//       return () => clearInterval(interval);
//     }, []);
//  const fetchGoldPrice = async () => {
//     try {
//       const response = await fetch("https://api.gold-api.com/price/XAU");
//       const data = await response.json();

//       const usdPricePerOunce = data.price;

//       const usdToInr = 90.62;
//       const importDuty = 1.06; 
//       const gst = 1.03;

//      //calculate usd to gram
//       const pricePerGramInr = (usdPricePerOunce / 31.1035) * usdToInr;
//       const finalPrice = pricePerGramInr * importDuty * gst;
//       setGoldPrice(finalPrice.toFixed(2));

//       // profit or loss%
//       const profitPercent = (((finalPrice - prevPrice) / prevPrice) * 100).toFixed(2);
//       setPercentageChange(profitPercent);
//         } 
//     catch (error) {
//       console.log("Error fetching gold price:", error);
//     }
//   };
//   const isProfit = percentageChange > 0;
  
//       return(<>
//       <div className="flex justify-center   gap-1 w-full py-2 ">


//   <div className="bg-gray-900/80 backdrop-blur-sm border ml-5
//   border-gray-800 rounded-2xl m-2 shadow-xl w-full  px-3">
//   <div className="text-sm  mb-1">Current Gold</div>
//   <div className="text-2xl font-bold text-Primary">
//   </div>

//         <div className="text-2xl font-bold text-Primary">
//           {goldPrice ? `₹ ${goldPrice}` : "Loading..."}
//         </div>

//         {/* graph value */}
//   <p className="tex-sm">graph value</p>
//   {percentageChange && (
//           <p
//             className={`text-sm font-semibold mt-1
//                ${isProfit ? "text-green-400" : "text-red-400"}`}>
//             {isProfit ? "▲" : "▼"}{" "}
//             {Math.abs(percentageChange)}%
//           </p>
//         )}

//   <div className="mt-4 flex gap-3 mb-2">
//     <button className="flex-1 
//      text-gray-950 font-semibold py-3 px-5 rounded-xl transition bg-Primary" onClick={()=>navigate("/gold")}>
//       BUY
//     </button>
//     <button className="flex-1 bg-gray-400
//      hover:bg-gray-600 text-gray-200 font-semibold py-3 px-5 rounded-xl transition">
//       SELL
//     </button>
//   </div>
// </div>
// </div>
//       </>);
//       }
//       export default GoldPrice;
