// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeft, TrendingUp } from "lucide-react";
// import { PriceContext } from "../components/PriceProvider";
// import { toast } from "react-toastify";

// function Silver() {
//   const [conversionMode, setConversionMode] = useState("rupees-to-grams");
//   const [inputValue, setInputValue] = useState("");
//   const [showBreakdown, setShowBreakdown] = useState(false);

//   const { silverPrice, silverPercentage } = useContext(PriceContext);
//   const navigate = useNavigate();

//   const silverisProfit = Number(silverPercentage) > 0;
//   const silverPricePerGram = Number(silverPrice) || 80;

//   const calculateConversion = () => {
//     const value = parseFloat(inputValue);
//     if (isNaN(value) || value <= 0) return 0;

//     if (conversionMode === "rupees-to-grams") {
//       return (value / silverPricePerGram).toFixed(4);
//     } else {
//       return (value * silverPricePerGram).toFixed(2);
//     }
//   };

//   const getFinalCalculation = () => {
//     let grams, baseAmount;

//     if (conversionMode === "rupees-to-grams") {
//       grams = parseFloat(calculateConversion());
//       baseAmount = Math.round(parseFloat(inputValue));
//     } else {
//       grams = parseFloat(inputValue);
//       baseAmount = Math.round(parseFloat(calculateConversion()));
//     }

//     const gstRate = 0.03;
//     const gstAmount = Math.round(baseAmount * gstRate);
//     const totalWithGST = baseAmount + gstAmount;

//     return {
//       grams: grams.toFixed(4),
//       baseAmount,
//       gstAmount,
//       totalWithGST,
//       formattedBase: baseAmount.toLocaleString(),
//       formattedGST: gstAmount.toLocaleString(),
//       formattedTotal: totalWithGST.toLocaleString(),
//     };
//   };

//   const handleBuyClick = () => {
//     const val = parseFloat(inputValue);
//     if (isNaN(val) || val <= 0) {
//       toast.success("Please enter a valid amount");
//       return;
//     }
//     setShowBreakdown(true);
//   };

//   const proceedToBuy = () => {
//     const calc = getFinalCalculation();
//     navigate("/buysilver", {
//       state: {
//         grams: calc.grams,
//         baseAmount: calc.baseAmount,
//         totalWithGST: calc.totalWithGST,
//         silverPricePerGram,
//       },
//     });
//   };

//   const calc = getFinalCalculation();
//   const hasInput = parseFloat(inputValue) > 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-stone-100 to-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Back Button */}
//         <Link to="/">
//           <button className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition">
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </button>
//         </Link>

//         {/* Heading */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900">
//             Buy Silver
//           </h1>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">

//           {/* Market Insights */}
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">
//               Market Insights
//             </h2>

//             <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-4">
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="h-5 w-5 text-gray-700" />
//                 <span className="font-semibold text-gray-700">
//                   Today's Change
//                 </span>
//               </div>

//               {silverPercentage && (
//                 <span
//                   className={`text-sm font-bold ${
//                     silverisProfit ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {silverisProfit ? "▲" : "▼"}{" "}
//                   {Math.abs(silverPercentage)}%
//                 </span>
//               )}
//             </div>

//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Current Price</span>
//                 <span className="font-semibold text-gray-900">
//                   ₹{silverPricePerGram.toLocaleString()}/gram
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Week High</span>
//                 <span className="font-semibold text-gray-800">₹105</span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-600">Week Low</span>
//                 <span className="font-semibold text-gray-800">₹92</span>
//               </div>
//             </div>
//           </div>

//           {/* Converter Section */}
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Price Converter
//             </h2>

//             <p className="text-gray-600 mb-6">
//               {conversionMode === "rupees-to-grams"
//                 ? "Convert Rupees to Grams"
//                 : "Convert Grams to Rupees"}
//             </p>

//             {/* Toggle */}
//             <div className="flex gap-2 mb-6">
//               <button
//                 onClick={() => {
//                   setConversionMode("rupees-to-grams");
//                   setInputValue("");
//                   setShowBreakdown(false);
//                 }}
//                 className={`flex-1 py-2 rounded-lg font-semibold transition ${
//                   conversionMode === "rupees-to-grams"
//                     ? "bg-gray-700 text-white"
//                     : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 ₹ → Grams
//               </button>

//               <button
//                 onClick={() => {
//                   setConversionMode("grams-to-rupees");
//                   setInputValue("");
//                   setShowBreakdown(false);
//                 }}
//                 className={`flex-1 py-2 rounded-lg font-semibold transition ${
//                   conversionMode === "grams-to-rupees"
//                     ? "bg-gray-700 text-white"
//                     : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Grams → ₹
//               </button>
//             </div>

//             {/* Input */}
//             <input
//               type="number"
//               placeholder={
//                 conversionMode === "rupees-to-grams" ? "10000" : "100"
//               }
//               value={inputValue}
//               onChange={(e) => {
//                 setInputValue(e.target.value);
//                 setShowBreakdown(false);
//               }}
//               className="w-full h-12 px-4 border border-gray-200 rounded-lg mb-6 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
//             />

//             {/* Result */}
//             <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
//               <p className="text-sm text-gray-600 mb-2">
//                 {conversionMode === "rupees-to-grams"
//                   ? "You will get (grams)"
//                   : "You will pay (₹)"}
//               </p>

//               <div className="text-3xl font-bold text-gray-900">
//                 {hasInput ? (
//                   conversionMode === "rupees-to-grams" ? (
//                     `${calc.grams} g`
//                   ) : (
//                     `₹${calc.formattedBase}`
//                   )
//                 ) : (
//                   <span className="text-gray-300">0</span>
//                 )}
//               </div>
//             </div>

//             {/* Buy Button */}
//             <div className="mt-4 mb-2">
//               <button
//                 className={`w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition ${
//                   !hasInput ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handleBuyClick}
//                 disabled={!hasInput}
//               >
//                 BUY
//               </button>
//             </div>

//             {/* Order Summary */}
//             {showBreakdown && hasInput && (
//               <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
//                   Order Summary
//                 </h3>

//                 <div className="space-y-3 text-sm text-gray-700">
//                   <div className="flex justify-between">
//                     <span>Silver Weight:</span>
//                     <span className="font-semibold">{calc.grams} grams</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Base Amount:</span>
//                     <span className="font-semibold">
//                       ₹{calc.formattedBase}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>GST (3%):</span>
//                     <span className="font-semibold text-green-600">
//                       + ₹{calc.formattedGST}
//                     </span>
//                   </div>
//                   <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
//                     <span>Total Payable:</span>
//                     <span>₹{calc.formattedTotal}</span>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-col gap-3">
//                   <button
//                     onClick={proceedToBuy}
//                     className="bg-gray-700 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
//                   >
//                     Confirm & Proceed
//                   </button>

//                   <button
//                     onClick={() => setShowBreakdown(false)}
//                     className="text-gray-500 hover:text-gray-700 text-sm underline"
//                   >
//                     Edit / Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Silver;