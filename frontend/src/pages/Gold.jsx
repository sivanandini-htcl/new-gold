import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
// import { PriceContext } from "../components/PriceProvider";
import { toast } from "react-toastify";
import usePriceStore from "../store/priceStore";

function Gold() {
  const [conversionMode, setConversionMode] = useState("rupees-to-grams");
  const [inputValue, setInputValue] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);

  // const { goldPrice, goldPercentage } = useContext(PriceContext);
  const{ goldPrice,goldPercentage } = usePriceStore();


  const isProfit = Number(goldPercentage) > 0;
  const GOLD_PRICE_PER_GRAM = Number(goldPrice) || 6500;

  const calculateConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return 0;

    return conversionMode === "rupees-to-grams"
      ? value / GOLD_PRICE_PER_GRAM
      : value * GOLD_PRICE_PER_GRAM;
  };

  const getFinalCalculation = () => {
    const grams =
      conversionMode === "rupees-to-grams"
        ? calculateConversion()
        : parseFloat(inputValue);

    const baseAmount = Math.round(grams * GOLD_PRICE_PER_GRAM);
    const gstAmount = Math.round(baseAmount * 0.03);
    const totalWithGST = baseAmount + gstAmount;

    return {
      grams: grams.toFixed(4),
      formattedBase: baseAmount.toLocaleString("en-IN"),
      formattedGST: gstAmount.toLocaleString("en-IN"),
      formattedTotal: totalWithGST.toLocaleString("en-IN"),
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
    <div className="h-auto flex flex-col py-8 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100  ">
     
     <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-yellow-900 hover:text-yellow-600 transition font-['Fraunces']"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Title */}
        <div className="mb-10 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>

          <h1 className="text-5xl font-['Fraunces'] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent p-2">
            Buy Gold
          </h1>

          <p className="mt-2 text-xs uppercase tracking-widest text-yellow-800/70 font-['Fraunces']">
            24K · 99.9% Pure · Live Rates
          </p>
        </div>
     
      <div className="w-full  flex items-center justify-center">

        {/* Back Button */}

         <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-7 w-250  justify-center ">
          {/* LEFT SIDE */}
          <div className="space-y-6  ">

            {/* Market Insights Card */}
            <div className="rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4"></div>

              <h2 className="text-2xl font-['Fraunces'] mb-5 text-yellow-950">
                Market Insights
              </h2>

              {/* Today's Change */}
              <div
                className={`flex items-center justify-between p-4 rounded-xl mb-6 border ${
                  isProfit
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isProfit ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-xs uppercase tracking-widest text-yellow-900">
                    Today's Change
                  </span>
                </div>

                {goldPercentage && (
                  <span
                    className={`text-xs font-['Fraunces'] px-3 py-1 rounded-full ${
                      isProfit
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isProfit ? "▲" : "▼"} {Math.abs(goldPercentage)}%
                  </span>
                )}
              </div>

              {/* Price Stats */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-yellow-700/10 pb-2">
                  <span className="uppercase tracking-widest text-yellow-800/70 text-xs font-['Fraunces']">
                    Current Price
                  </span>
                  <span className="text-yellow-700">
                    ₹{GOLD_PRICE_PER_GRAM.toLocaleString("en-IN")}/g
                  </span>
                </div>

                <div className="flex justify-between border-b border-yellow-700/10 pb-2">
                  <span className="uppercase tracking-widest text-yellow-800/70 text-xs font-['Fraunces']">
                    Week High
                  </span>
                  <span className="text-yellow-900">
                    ₹6,580
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="uppercase tracking-widest text-yellow-800/70 text-xs font-['Fraunces']">
                    Week Low
                  </span>
                  <span className="text-yellow-900">
                    ₹6,420
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="sm:block hidden rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70 ">
              <h3 className="text-lg mb-4 font-['Fraunces'] text-yellow-950">
                Why Buy Digital Gold?
              </h3>

              <div className="space-y-3 text-sm text-yellow-900/80 ">
                <p>◈ 99.9% pure 24K gold, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
            
          </div>

          {/* right */}
          <div className="rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70">

            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4"></div>

            <h2 className="text-2xl font-['Fraunces'] text-yellow-950 mb-2">
              Price Converter
            </h2>

            <p className="text-xs uppercase tracking-widest text-yellow-800/70 mb-6">
              {conversionMode === "rupees-to-grams"
                ? "Rupees → Grams"
                : "Grams → Rupees"}
            </p>

            {/* button */}
            <div className="flex gap-2 mb-6 p-1 bg-yellow-100 rounded-xl">
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
                  className={`flex-1 py-2.5 rounded-lg text-xs uppercase tracking-widest font-['Fraunces'] transition ${
                    conversionMode === btn.mode
                      ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950"
                      : "text-yellow-900 hover:bg-yellow-200"
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
                setShowBreakdown(false);
              }}
              className="w-full px-4 py-3 rounded-xl text-lg bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50 border-2 border-yellow-200 focus:border-yellow-600 outline-none transition mb-6 "
            />

            {/* Result */}
            <div className="rounded-2xl p-5 text-center mb-6 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50 border border-yellow-700/70">
              <p className="text-xs uppercase tracking-widest text-yellow-800/70 mb-2">
                {conversionMode === "rupees-to-grams"
                  ? "You will get"
                  : "You will pay"}
              </p>

              <div className="text-4xl font-bold text-yellow-600">
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
              className={`w-full py-4 rounded-xl text-sm uppercase tracking-widest font-['Fraunces'] transition ${
                hasInput
                  ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950 text-black shadow-lg hover:scale-[1.02]"
                  : "bg-yellow-100 text-yellow-400 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>

            {/* order details */}
            {showBreakdown && hasInput && (
              <div className="mt-6 rounded-2xl p-5 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50 border border-yellow-700/70">
                <h3 className="text-xl font-['Fraunces'] text-center mb-5 text-yellow-950">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-yellow-700/10 pb-2">
                    <span className="font-['Fraunces']">Gold Weight</span>
                    <span>{calc.grams} g</span>
                  </div>

                  <div className="flex justify-between border-b border-yellow-700/10 pb-2">
                    <span className="font-['Fraunces']">Gold Value</span>
                    <span>₹{calc.formattedBase}</span>
                  </div>

                  <div className="flex justify-between border-b border-yellow-700/10 pb-2 text-green-700">
                    <span className="font-['Fraunces']">GST (3%)</span>
                    <span>+ ₹{calc.formattedGST}</span>
                  </div>

                  <div className="flex justify-between  pt-3 text-lg text-yellow-700">
                    <span className="font-['Fraunces']">Total</span>
                    <span>₹{calc.formattedTotal}</span>
                  </div>
                </div>

                <button className="mt-5 w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-['Fraunces'] bg-gradient-to-br from-green-600 to-green-400 text-white shadow-lg hover:scale-[1.02] transition">
                  Confirm & Proceed
                </button>

                <button
                  onClick={() => setShowBreakdown(false)}
                  className="mt-3 w-full text-xs uppercase tracking-widest underline text-yellow-700 hover:text-yellow-900"
                >
                  Edit Amount
                </button>
              </div>
            )}
            
          </div>
          <div className="md:hidden rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70 ">
              <h3 className="text-lg mb-4 font-['Fraunces'] text-yellow-950">
                Why Buy Digital Gold?
              </h3>

              <div className="space-y-3 text-sm text-yellow-900/80 ">
                <p>◈ 99.9% pure 24K gold, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Gold;
