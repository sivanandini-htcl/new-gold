
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { PriceContext } from "../components/PriceProvider";
import { toast } from "react-toastify";


function Silver() {
  const [conversionMode, setConversionMode] = useState("rupees-to-grams");
  const [inputValue, setInputValue] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);

 const { silverPrice, silverPercentage } = useContext(PriceContext);
//  const navigate = useNavigate();

  const silverisProfit = Number(silverPercentage) > 0;
  const silverPricePerGram = Number(silverPrice) || 280;

 const calculateConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return 0;

    if (conversionMode === "rupees-to-grams") {
      return (value / silverPricePerGram).toFixed(4);
    } else {
      return (value * silverPricePerGram).toFixed(2);
    }
  };

  const getFinalCalculation = () => {
    let grams, baseAmount;

    if (conversionMode === "rupees-to-grams") {
      grams = parseFloat(calculateConversion());
      baseAmount = Math.round(parseFloat(inputValue));
    } else {
      grams = parseFloat(inputValue);
      baseAmount = Math.round(parseFloat(calculateConversion()));
    }

    const gstRate = 0.03;
    const gstAmount = Math.round(baseAmount * gstRate);
    const totalWithGST = baseAmount + gstAmount;

    return {
      grams: grams.toFixed(4),
      baseAmount,
      gstAmount,
      totalWithGST,
      formattedBase: baseAmount.toLocaleString(),
      formattedGST: gstAmount.toLocaleString(),
      formattedTotal: totalWithGST.toLocaleString(),
    };
  };

  const handleBuyClick = () => {
    const val = parseFloat(inputValue);
    if (!val || val <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setShowBreakdown(true);
  };

  const calc = getFinalCalculation();
  const hasInput = parseFloat(inputValue) > 0;

  return (
    <div className="h-auto flex flex-col py-8 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-500 ">
      
      <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-gray-900 hover:text-gray-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Title */}
        <div className="mb-10 border-b border-gray-700/20 pb-6">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>

          <h1 className="text-5xl bg-gradient-to-r from-gray-700 via-gray-400/80 to-gray-900  md:bg-gradient-to-r from-gray-700 via-gray-200 to-gray-900 font-serif bg-clip-text text-transparent p-2">
            Buy Silver
          </h1>

          <p className="mt-2 text-xs uppercase tracking-widest text-gray-800/70 font-['Fraunces']">
            24K · 99.9% Pure · Live Rates
          </p>
        </div>

      <div className="w-full  flex items-center justify-center">

        {/* Back Button */}
        

  {/* changed width give 250 */}
  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-7 w-250  justify-center ">

          {/* left */}
          <div className="space-y-6  ">

            {/* insight */}
            <div className="rounded-3xl p-6 shadow-md bg-white/90 border border-gray-600/70">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>

              <h2 className="text-2xl font-['Fraunces'] mb-5 text-gray-900">
                Market Insights
              </h2>

              {/* Today's Change */}
              <div
                className={`flex items-center justify-between p-4 rounded-xl mb-6 border ${
                  silverisProfit
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {silverisProfit ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-xs uppercase tracking-widest text-gray-900">
                    Today's Change
                  </span>
                </div>

               {silverPercentage && (
                <span
                  className={`text-sm font-bold ${
                    silverisProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {silverisProfit ? "▲" : "▼"}{" "}
                  {Math.abs(silverPercentage)}%
                </span>
              )}

              </div>

              {/* Price Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-700/10 pb-2">
                  <span className="uppercase tracking-widest text-gray-800/70 text-xs">
                    Current Price
                  </span>
                  <span className=" text-gray-900">
                   ₹{silverPricePerGram.toLocaleString("en-IN")}/gram
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-700/10 pb-2">
                  <span className="uppercase tracking-widest text-gray-800/70 text-xs">
                    Week High
                  </span>
                  <span className=" text-gray-900">
                    ₹290
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="uppercase tracking-widest text-gray-800/70 text-xs">
                    Week Low
                  </span>
                  <span className=" text-gray-900">
                   ₹200
                  </span>
                </div>
              </div>
            </div>

            {/* info card */}
            <div className=" hidden sm:block rounded-3xl p-6 shadow-md bg-white/90 border border-gray-600/70">
              <h3 className="text-lg font-['Fraunces'] mb-4 text-gray-950">
                Why Buy Digital silver?
              </h3>

              <div className="space-y-3 text-sm text-gray-900/80">
                <p>◈ 99.9% pure  silver, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="rounded-3xl p-6 shadow-md bg-white/90 border border-gray-600/70">

            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-4"></div>

            <h2 className="text-2xl font-['Fraunces'] text-gray-900 mb-2">
              Price Converter
            </h2>

            <p className="text-xs uppercase tracking-widest text-gray-800/70 mb-6">
              {conversionMode === "rupees-to-grams"
                ? "Rupees → Grams"
                : "Grams → Rupees"}
            </p>



            {/* button */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-300/60 rounded-xl">
              {[
                { mode: "rupees-to-grams", label: "₹ → Grams" },
                { mode: "grams-to-rupees", label: "Grams → ₹" },
              ].map((btn) => (
                <button
                  key={btn.mode}
                  onClick={() => {
                    setConversionMode(btn.mode);
                    setInputValue("");
                    setShowBreakdown(false);
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs uppercase tracking-widest font-serif transition ${
                    conversionMode === btn.mode
                      ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 "
                      : "text-gray-900 hover:bg-gray-400/50"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>



            {/* inputs*/}
            <input
              type="number"
              placeholder={
                conversionMode === "rupees-to-grams" ? "10000" : "1.5"
              }
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowBreakdown(false);}}
              className="w-full px-4 py-3 rounded-xl text-lg bg-gradient-to-br from-gray-200 via-gray-100 to-gray-100 border-2 border-gray-300 focus:border-gray-400 outline-none transition mb-6 text-gray-900"
            />

            {/* Result */}
            <div className="rounded-2xl p-5 text-center mb-6 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-100 border border-gray-600/70">
              <p className="text-xs uppercase tracking-widest text-gray-800/70 mb-2">
                {conversionMode === "rupees-to-grams"
                  ? "You will get"
                  : "You will pay"}
              </p>

              <div className="text-4xl font-bold text-gray-600">
                {hasInput
                  ? conversionMode === "rupees-to-grams"
                    ? `${calc.grams} g`
                    : `₹${calc.formattedBase}`
                  : "—"}
              </div>
            </div>

            {/* buy button */}
            <button
              onClick={handleBuyClick}
              disabled={!hasInput}
              className={`w-full py-4 rounded-xl text-sm uppercase tracking-widest font-serif transition ${
                hasInput
                  ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 shadow-lg hover:scale-[1.02]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}

              
            >
              Buy Now
            </button>

            {/* order details */}
            {showBreakdown && hasInput && (
              <div className="mt-6 rounded-2xl p-5 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-100  borderborder-gray-600/70">
                <h3 className="text-xl font-serif text-center mb-5 text-gray-950">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-700/10 pb-2">
                    <span className="font-serif">Silver Weight</span>
                    <span>{calc.grams} g</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700/10 pb-2">
                    <span className="font-serif">Silver Value</span>
                    <span>₹{calc.formattedBase}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700/10 pb-2 text-green-700">
                    <span className="font-serif">GST (3%)</span>
                    <span>+ ₹{calc.formattedGST}</span>
                  </div>

                  <div className="flex justify-between  pt-3 text-lg text-gray-700">
                    <span className="font-serif">Total</span>
                    <span>₹{calc.formattedTotal}</span>
                  </div>
                </div>

                <button className="mt-5 w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-serif bg-gradient-to-br from-green-600 to-green-400 text-white shadow-lg hover:scale-[1.02] transition">
                  Confirm & Proceed
                </button>

                <button
                  onClick={() => setShowBreakdown(false)}
                  className="mt-3 w-full text-xs uppercase tracking-widest underline text-gray-700 hover:text-gray-900"
                >
                  Edit Amount
                </button>
              </div>
            )}
          </div>
        </div>
        
            </div>
             <div className="md:hidden rounded-3xl p-6 mt-3 shadow-md bg-white/90 border border-gray-600/70">
              <h3 className="text-lg font-['Fraunces'] mb-4 text-gray-950">
                Why Buy Digital silver?
              </h3>

              <div className="space-y-3 text-sm text-gray-900/80">
                <p>◈ 99.9% pure  silver, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
      
    </div>
    </div>
  );
}

export default Silver;
