import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import usePriceStore from "../store/priceStore";
import useCartStore from "../store/cartStore";
import api from "../api/axiosInstance";

function Silver() {
  const [inputValue, setInputValue] = useState("");
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const navigate = useNavigate();

  const { cartItems, replaceCartItem, fetchCart } = useCartStore();

  const prices = usePriceStore((state) => state.prices);
  const silverPrice = prices.find((item) => item.metal === "SILVER");
  const gram24kSilverPrice = silverPrice?.caratPrices?.gram24k || 0;

  // Safe calculation
  const calc = useMemo(() => {
    const grams = parseFloat(inputValue) || 0;
    const baseAmount = grams * gram24kSilverPrice;
    return {
      grams,
      baseAmount: Math.round(baseAmount),
    };
  }, [inputValue, gram24kSilverPrice]);

  const hasValidInput = calc.grams >= 1 && gram24kSilverPrice > 0;

  const handleBuyNow = async () => {
    if (!hasValidInput) {
      toast.error("Minimum 1 gram required");
      return;
    }

    const newItem = {
      type: "METAL",
      metalType: "SILVER",
      quantityInGrams: calc.grams,
    };

    // If cart has items, show replace modal
    if (cartItems.length > 0) {
      setPendingItem(newItem);
      setShowReplaceModal(true);
      return;
    }

    try {
      await api.post("/cart/add", newItem);
      await fetchCart();
      toast.success("Added to cart");
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleReplaceConfirm = async () => {
    if (!pendingItem) return;
    try {
      const oldItemId = cartItems[0]?.id;
      await replaceCartItem(oldItemId, pendingItem);
      toast.success("Cart updated");
      setShowReplaceModal(false);
      setPendingItem(null);
      navigate("/cart");
    } catch (err) {
      toast.error("Failed to replace item");
    }
  };

  const handleReplaceCancel = () => {
    setShowReplaceModal(false);
    setPendingItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 sm:px-6 lg:px-10 2xl:p-20 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-500">

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 mb-6 text-xs 2xl:text-2xl uppercase tracking-widest text-gray-900 hover:text-gray-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Title */}
      <div className="mb-10 border-b border-gray-700/20 pb-6">
        <div className="h-0.5 w-12 2xl:w-lg 2xl:h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>

        <h1 className="text-5xl 2xl:text-9xl bg-gradient-to-r from-gray-700 via-gray-400/80 to-gray-900 font-serif bg-clip-text text-transparent p-2">
          Buy Silver
        </h1>

        <p className="mt-2 text-xs 2xl:text-2xl uppercase tracking-widest text-gray-800/70 font-['Fraunces']">
          .999 Pure · Live Rates
        </p>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-7 w-full mx-auto mt-1 2xl:p-40 2xl:pt-10">

          {/* LEFT SIDE - Market Insights */}
          <div className="space-y-9">
            <div className="rounded-3xl p-6 shadow-md bg-white/90 border border-gray-600/70 2xl:h-170 2xl:pt-10">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>

              <h2 className="text-2xl 2xl:text-7xl font-['Fraunces'] mb-5 text-gray-900">
                Market Insights
              </h2>

              <div className="flex items-center justify-between p-4 rounded-xl mb-6 border 2xl:text-3xl 2xl:w-full 2xl:h-30 2xl:p-8">
                <p>₹{Math.round(gram24kSilverPrice) || "Loading..."}</p>
                <p>{silverPrice ? `${silverPrice.changePercent}%` : "—"}</p>
              </div>

              <div className="space-y-3 text-sm 2xl:text-3xl 2xl:gap-10 2xl:mt-20">
                <div className="flex justify-between border-b border-gray-700/10 pb-2 2xl:pb-10">
                  <span className="uppercase tracking-widest text-gray-800/70 text-xs 2xl:text-3xl">Current Price</span>
                  <span className="text-gray-900">₹{silverPrice ? silverPrice.price.toLocaleString() : "—"}</span>
                </div>

                <div className="flex justify-between border-b border-gray-700/10 pb-2 2xl:pb-10">
                  <span className="uppercase tracking-widest text-gray-800/70 text-xs 2xl:text-3xl">Week High</span>
                  <span className="text-gray-900">₹{silverPrice ? silverPrice.high.toLocaleString() : "—"}</span>
                </div>

                <div className="flex justify-between 2xl:pb-10">
                  <span className="uppercase tracking-widest text-gray-800/70 text-xs 2xl:text-3xl">Week Low</span>
                  <span className="text-gray-900">₹{silverPrice ? silverPrice.low.toLocaleString() : "—"}</span>
                </div>
              </div>
            </div>

            {/* Why Buy Digital Silver - Desktop */}
            <div className="hidden sm:block rounded-3xl p-6 shadow-md bg-white/90 border border-gray-600/70">
              <h3 className="text-lg 2xl:text-7xl mb-4 font-['Fraunces'] text-gray-950">
                Why Buy Digital Silver?
              </h3>
              <div className="space-y-3 text-sm 2xl:space-y-9 2xl:text-4xl text-gray-900/80">
                <p>◈ 99.9% pure silver, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Converter */}
          <div className="rounded-3xl p-3 shadow-md bg-white/90 border border-gray-600/70">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-4"></div>

            <h2 className="text-2xl font-['Fraunces'] 2xl:text-7xl mb-2 2xl:mb-5 text-gray-900">
              Price Converter
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-800/70 mb-6 2xl:text-3xl 2xl:mb-15">
              Grams → Rupees
            </p>

            <div className="bg-gray-300/60 h-12 flex justify-center items-center rounded-xl 2xl:h-25 2xl:mb-15 mb-7">
              <p className="bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 w-full rounded-xl h-10 text-center p-3 font-serif 2xl:w-full 2xl:h-full 2xl:text-3xl">
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
              className="w-full 2xl:h-30 2xl:text-3xl px-4 py-3 rounded-xl text-lg bg-gradient-to-br from-gray-200 via-gray-100 to-gray-100 border-2 border-gray-300 focus:border-gray-400 outline-none transition mb-6 text-gray-900"
            />

            {/* Result */}
            <div className="rounded-2xl 2xl:h-60 p-5 text-center mb-6 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-100 border border-gray-600/70">
              <p className="text-xs 2xl:text-xl uppercase tracking-widest text-gray-800/70 mb-2">
                You will pay
              </p>
              <div className="text-4xl 2xl:text-8xl font-bold text-gray-600">
                {hasValidInput ? `₹${calc.baseAmount.toLocaleString("en-IN")}` : "—"}
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={!hasValidInput}
              className={`w-full py-4 2xl:text-4xl 2xl:h-30 rounded-xl text-sm uppercase tracking-widest font-serif transition ${
                hasValidInput
                  ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 shadow-lg hover:scale-[1.02]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Why Buy Section */}
      <div className="md:hidden rounded-3xl p-6 mt-3 shadow-md bg-white/90 border border-gray-600/70">
        <h3 className="text-lg font-['Fraunces'] mb-4 text-gray-950">
          Why Buy Digital Silver?
        </h3>
        <div className="space-y-3 text-sm text-gray-900/80">
          <p>◈ 99.9% pure silver, hallmarked</p>
          <p>◈ Stored in insured, secured vaults</p>
          <p>◈ Start investing from just ₹1</p>
          <p>◈ Sell anytime at live market price</p>
        </div>
      </div>

      {/* Replace Modal */}
      {showReplaceModal && pendingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Replace Cart Item?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your cart already has <strong>{cartItems[0]?.name}</strong>.<br />
              Replace it with{" "}
              <strong>Digital Silver .999 — {pendingItem.quantityInGrams}g</strong>?
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
                className="flex-1 py-3 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 shadow-lg hover:scale-[1.02] text-white rounded-xl text-sm font-medium"
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

export default Silver;