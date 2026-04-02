import { useContext } from "react";
import { PriceContext } from "../context/PriceContext";

function SilverPrice() {
  const { silverPrice, silverPercentage } =
    useContext(PriceContext);

  const silverIsProfit = Number(silverPercentage) > 0;

  return (
    <div className="bg-gray-900/80 border rounded-2xl p-4">
      <div className="text-sm mb-1">Current Silver</div>

      <div className="text-2xl font-bold">
        {silverPrice ? `₹ ${silverPrice}` : "Loading..."}
      </div>

      {silverPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            silverIsProfit ? "text-green-400" : "text-red-400"
          }`}
        >
          {silverIsProfit ? "▲" : "▼"}{" "}
          {Math.abs(silverPercentage)}%
        </p>
      )}
    </div>
  );
}

export default SilverPrice;













// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";

// function SilverPrice(){
 
    
//   const navigate=useNavigate();

//       useEffect(() => {
//         fetchSilverPrice();
//         const interval = setInterval(fetchSilverPrice, 30000); 
//         return () => clearInterval(interval);
//       }, []);
//     const fetchSilverPrice = async () => {
//     try {
  
//     } catch (error) {
//       console.log("Error fetching gold price:", error);
//     }
//   };
//   const silverIsProfit=silverPercentage> 0;

//     return(<>

//   <div className="text-sm mb-1">Current Silver</div>
//   <div className="text-2xl font-bold text-Primary">
//           {silverPrice ? `₹ ${silverPrice}` : "Loading..."}
//   </div>
//   <p className="tex-sm">graph value</p>
//   {silverPercentage&&(
//      <p
//             className={`text-sm font-semibold mt-1
//                ${silverIsProfit ? "text-green-400" : "text-red-400"}`}>
//             {silverIsProfit ? "▲" : "▼"}{" "}
//             {Math.abs(silverPercentage)}%
//           </p>
//         )}



//     </>);
// }export default SilverPrice;