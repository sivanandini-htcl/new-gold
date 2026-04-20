import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import usePriceStore from "../store/priceStore";
import { useCart } from "../components/CartContext";
import useCartStore from "../store/cartStore";


function Gold() {
  const [inputValue, setInputValue] = useState("");
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const prices = usePriceStore((state) => state.prices);
  const goldPrice = prices.find((item) => item.metal === "GOLD");
  const gram24kGoldPrice = goldPrice?.caratPrices?.gram24k || 0;

  const navigate = useNavigate();
  const { cartItems, addToCart, replaceCartItem, removeFromCart, updateQuantity } = useCartStore();
  // Safe calculation



  const calc = useMemo(() => {
    const grams = parseFloat(inputValue) || 0;
    const baseAmount = grams * gram24kGoldPrice;
    return { grams, baseAmount: Math.round(baseAmount) };
  }, [inputValue, gram24kGoldPrice]);

  const hasValidInput = calc.grams >= 1 && gram24kGoldPrice > 0;

  // Create digital gold item
  const createDigitalGoldItem = () => ({
    id: `digital-gold-${Date.now()}`,
    name: `Digital Gold 24K - ${calc.grams}g`,
    type: "gold",
    weight: calc.grams,
    price: calc.baseAmount,
    quantity: 1,
    isDigital: true,
    image: "",
    purity: "24K",
    purityText: "99.9% Pure",
  });

  const handleBuyNow = () => {
    if (!hasValidInput) {
      toast.error("Please enter a valid amount (minimum 1 gram)");
      return;
    }

    const digitalItem = createDigitalGoldItem();

    // If cart is empty → add directly
    if (cartItems.length === 0) {
      addToCart(digitalItem);
      toast.success("Digital Gold added to cart!");
      navigate("/cart");
      return;
    }

    // Cart has another item → show replace modal
    setPendingItem(digitalItem);
    setShowReplaceModal(true);
  };

  // Handle Replace from Modal
  const handleReplaceConfirm = () => {
    if (!pendingItem) return;

    replaceCartItem(pendingItem);
    toast.success(`${pendingItem.name} added to cart`);

    setShowReplaceModal(false);
    setPendingItem(null);
    navigate("/cart");
  };

  const handleReplaceCancel = () => {
    setShowReplaceModal(false);
    setPendingItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 sm:px-6 lg:px-10 2xl:p-20 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
      
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 mb-6 text-xs 2xl:text-2xl uppercase tracking-widest text-yellow-900 hover:text-yellow-600 transition font-['Fraunces']"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Title */}
      <div className="mb-15 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
        <div className="h-0.5 w-12 2xl:w-lg 2xl:h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>
        <h1 className="text-xl md:text-2xl xl:text-4xl 2xl:text-9xl font-['Fraunces'] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent p-2">
          Buy Gold
        </h1>
        <p className="mt-2 text-xs 2xl:text-2xl uppercase tracking-widest text-yellow-800/70 font-['Fraunces'] pl-3">
          24K · 99.9% Pure · Live Rates
        </p>
      </div>

      <div className="w-full flex flex-1 items-start justify-center">
        <div className="grid md:grid-cols-2 gap-7 w-full mx-auto mt-1 2xl:p-40 2xl:pt-10">

          {/* LEFT SIDE - Market Insights */}
          <div className="space-y-9">
            <div className="rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70 2xl:h-170 2xl:pt-10">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4"></div>
              <h2 className="text-2xl 2xl:text-7xl font-['Fraunces'] mb-5 text-yellow-950">Market Insights</h2>
              
              <div className="flex items-center justify-between p-4 rounded-xl 2xl:text-3xl mb-6 border">
                <p>₹{Math.round(gram24kGoldPrice) || "Loading..."}</p>
                <p>{goldPrice ? `${goldPrice.changePercent}%` : "—"}</p>
              </div>

              <div className="space-y-3 text-sm 2xl:text-3xl">
                <div className="flex justify-between border-b border-yellow-700/10 pb-2">
                  <span className="uppercase tracking-widest text-yellow-800/70">Current Price</span>
                  <span>₹{goldPrice ? goldPrice.price.toLocaleString() : "—"}</span>
                </div>
                <div className="flex justify-between border-b border-yellow-700/10 pb-2">
                  <span className="uppercase tracking-widest text-yellow-800/70">Week High</span>
                  <span>₹{goldPrice ? goldPrice.high.toLocaleString() : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="uppercase tracking-widest text-yellow-800/70">Week Low</span>
                  <span>₹{goldPrice ? goldPrice.low.toLocaleString() : "—"}</span>
                </div>
              </div>
            </div>

            {/* Why Buy Digital Gold - Desktop */}
            <div className="sm:block hidden rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70">
              <h3 className="text-lg 2xl:text-7xl mb-4 font-['Fraunces'] text-yellow-950">Why Buy Digital Gold?</h3>
              <div className="space-y-3 2xl:space-y-9 text-sm 2xl:text-4xl text-yellow-900/80">
                <p>◈ 99.9% pure 24K gold, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Converter */}
          <div className="rounded-3xl p-2 md:p-5 shadow-md bg-white/90 border border-yellow-700/70">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4 mt-4"></div>
            <h2 className="text-2xl font-['Fraunces'] text-yellow-950 2xl:text-7xl mb-2">Price Converter</h2>
            <p className="text-xs uppercase tracking-widest text-yellow-800/70 mb-6">Grams → Rupees</p>

            <div className="bg-yellow-200 h-12 2xl:h-25 flex justify-center items-center rounded-xl mb-7">
              <p className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-yellow-950 w-full rounded-xl h-10 text-center p-3 font-serif 2xl:text-3xl">
                Grams → ₹
              </p>
            </div>

            <input
              type="number"
              placeholder="Enter grams (min 1)"
              min="1"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-lg 2xl:h-30 2xl:text-3xl bg-gradient-to-br from-amber-50 to-amber-50 border-2 border-yellow-200 focus:border-yellow-600 outline-none mb-6"
            />

            <div className="rounded-2xl p-5 text-center mb-6 bg-gradient-to-br from-amber-50 to-amber-50 border border-yellow-700/70">
              <p className="text-xs uppercase tracking-widest text-yellow-800/70 mb-2">You will pay</p>
              <div className="text-4xl 2xl:text-8xl font-bold text-yellow-600">
                {hasValidInput ? `₹${calc.baseAmount.toLocaleString("en-IN")}` : "—"}
              </div>
            </div>

            {/* Buy Now Button - Directly adds to cart */}
            <button
              onClick={handleBuyNow}
              disabled={!hasValidInput}
              className={`w-full 2xl:text-4xl 2xl:h-30 py-4 rounded-xl text-sm uppercase tracking-widest font-['Fraunces'] transition ${
                hasValidInput
                  ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-lg hover:scale-[1.02]"
                  : "bg-yellow-100 text-yellow-400 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Mobile Why Buy Section */}
          <div className="md:hidden rounded-3xl p-6 shadow-md bg-white/90 border border-yellow-700/70">
            <h3 className="text-lg mb-4 font-['Fraunces'] text-yellow-950">Why Buy Digital Gold?</h3>
            <div className="space-y-3 text-sm text-yellow-900/80">
              <p>◈ 99.9% pure 24K gold, hallmarked</p>
              <p>◈ Stored in insured, secured vaults</p>
              <p>◈ Start investing from just ₹1</p>
              <p>◈ Sell anytime at live market price</p>
            </div>
          </div>
        </div>
      </div>

      {/* Replace Modal */}
      {showReplaceModal && pendingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Replace Cart Item?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your cart already has <strong>{cartItems[0]?.name}</strong>.<br />
              Do you want to replace it with <strong>{pendingItem.name}</strong>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleReplaceCancel}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReplaceConfirm}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-800 shadow-lg hover:scale-[1.02] text-black rounded-xl text-sm font-medium"
              >
                Yes, Replace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gold;