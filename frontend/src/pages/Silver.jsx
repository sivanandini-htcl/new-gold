import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import usePriceStore from '../store/priceStore';
import useCartStore from '../store/cartStore';
import api from '../api/axiosInstance';

function Silver() {
  const [inputValue, setInputValue] = useState('');
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const { cartItems, replaceCartItem, fetchCart } = useCartStore();

  const prices = usePriceStore((state) => state.prices);
  const silverPrice = prices.find((item) => item.metal === 'SILVER');
  const gram24kSilverPrice = silverPrice?.caratPrices?.gram24k || 0;
  const getCartType = () => {
    if (cartItems.length === 0) return null;

    const hasMetal = cartItems.some((item) => item.type === 'METAL');

    const hasProduct = cartItems.some((item) => item.type === 'PRODUCT');

    if (hasMetal && !hasProduct) return 'METAL';
    if (hasProduct && !hasMetal) return 'PRODUCT';

    return 'MIXED';
  };

  // Safe calculation
  const calc = useMemo(() => {
    const grams = parseFloat(inputValue) || 0;
    const baseAmount = grams * gram24kSilverPrice;
    return {
      grams,
      baseAmount: Math.round(baseAmount),
    };
  }, [inputValue, gram24kSilverPrice]);

  const hasValidInput = calc.grams > 0 && gram24kSilverPrice > 0;

  const handleBuyNow = async () => {
    if (!hasValidInput) {
      toast.error('Enter valid grams');
      return;
    }

    const newItem = {
      type: 'METAL',
      metalType: 'SILVER',
      quantityInGrams: calc.grams,
    };

    // Check if there are any conflicting items in cart
    const conflictingItems = cartItems.filter((item) => item.type !== newItem.type);

    if (conflictingItems.length > 0) {
      setPendingItem(newItem);
      setShowReplaceModal(true);
      return;
    }

    // ✅ same type or empty → allow
    try {
      await api.post('/cart/add', newItem);
      await fetchCart();
      toast.success('Added to cart');
      navigate('/cart');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const handleReplaceConfirm = async () => {
    if (!pendingItem || isProcessing) return;

    setIsProcessing(true);
    try {
      console.log('Starting replacement process...');
      // Remove ALL items from cart
      console.log('Items to remove:', cartItems);

      for (const item of cartItems) {
        console.log('Deleting item:', item.id);
        await api.delete(`/cart/items/${item.id}`, {
          data: { reason: 'User cleared cart for new item' },
        });
      }

      console.log('All items deleted, adding new item...');
      // Add new item
      await api.post('/cart/add', pendingItem);
      console.log('New item added, fetching cart...');
      await fetchCart();

      console.log('Cart refreshed, closing modal and navigating...');
      setShowReplaceModal(false);
      setPendingItem(null);
      setIsProcessing(false);

      toast.success('Cart updated');
      navigate('/cart');
    } catch (err) {
      console.error('Error during replacement:', err);
      toast.error('Failed to replace item');
      setIsProcessing(false);
      setShowReplaceModal(false);
      setPendingItem(null);
    }
  };

  const handleReplaceCancel = () => {
    setShowReplaceModal(false);
    setPendingItem(null);
  };

  return (
    // bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 
    <div className="min-h-screen max-w-[1440px] m-auto flex flex-col py-8 px-4 sm:px-6 lg:px-10 ">
      <Link
        to="/dashboard"
        className="inline-flex items-center 2xl:text-xl gap-2 mb-6 text-xs uppercase tracking-widest text-gray-300 hover:text-gray-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Title */}
      <div className="mb-10 border-b border-gray-700/20 pb-6">
        <div className="h-0.5 w-12  bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>

        <h1 className=" text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl  bg-gradient-to-r from-gray-400 via-gray-400/60 to-gray-900 font-serif bg-clip-text text-transparent p-2">
          Buy Silver
        </h1>

        <p className="mt-2 text-xs 2xl:text-xl  uppercase tracking-widest text-gray-300/70 font-['Fraunces']">
          .999 Pure · Live Rates
        </p>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-7 w-full mx-auto mt-1 ">
          {/* LEFT SIDE - Market Insights */}
          <div className="space-y-9">
            <div className="rounded-3xl p-6 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border   border-gray-600/70">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>

              <h2 className="text-2xl 2xl:text-4xl  font-['Fraunces'] mb-5 text-secondary">
                Market Insights
              </h2>

              <div className="flex items-center 2xl:text-2xl  justify-between p-4 rounded-xl mb-6 border   ">
                <p>₹{Math.round(gram24kSilverPrice) || 'Loading...'}</p>
                <p>{silverPrice ? `${silverPrice.changePercent}%` : '—'}</p>
              </div>

              <div className="space-y-3 text-sm ">
                <div className="flex justify-between border-b 2xl:text-xl border-gray-700/10 pb-2 ">
                  <span className="uppercase tracking-widest text-secondary text-xs ">
                    Current Price
                  </span>
                  <span className="text-secondary">
                    ₹{silverPrice ? silverPrice.price.toLocaleString() : '—'}
                  </span>
                </div>

                <div className="flex justify-between border-b 2xl:text-xl  border-gray-700/10 pb-2 ">
                  <span className="uppercase tracking-widest text-secondary text-xs ">
                    Week High
                  </span>
                  <span className="text-secondary">
                    ₹{silverPrice ? silverPrice.high.toLocaleString() : '—'}
                  </span>
                </div>

                <div className="flex justify-between 2xl:text-xl ">
                  <span className="uppercase tracking-widest text-secondary text-xs ">
                    Week Low
                  </span>
                  <span className="text-secondary">
                    ₹{silverPrice ? silverPrice.low.toLocaleString() : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Why Buy Digital Silver - Desktop */}
            <div className="hidden sm:block rounded-3xl p-6 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 ">
              <h3 className="text-lg 2xl:text-3xl mb-4 font-['Fraunces'] text-secondary">
                Why Buy Digital Silver?
              </h3>
              <div className="space-y-3 text-sm 2xl:text-xl  text-secondary">
                <p>◈ 99.9% pure silver, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Converter */}
          <div className="rounded-3xl p-3 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 ">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-4"></div>

            <h2 className="text-2xl  2xl:text-4xl font-['Fraunces']  mb-2  text-secondary">
              Price Converter
            </h2>
            <p className="text-xs  2xl:text-xl uppercase tracking-widest text-gray-300/70 mb-6 ">
              Grams → Rupees
            </p>

            <div className="bg-gray-300/60 h-12 flex justify-center items-center rounded-xl  mb-7">
              <p className="bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 w-full rounded-xl h-10 text-center p-3 font-serif ">
                Grams → ₹
              </p>
            </div>

            <input
              type="number"
              placeholder="Enter grams"
              min="1"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-lg 2xl:text-3xl px-4 py-3 rounded-xl  bg-[#111117] focus:border-gray-400 outline-none transition mb-6 text-secondary"
            />

            {/* Result */}
            <div className="rounded-2xl  p-5 text-center mb-6 bg-[#111117] border-2 border-gray-300 border-gray-600/70">
              <p className="text-xs  uppercase tracking-widest text-secondary mb-2">
                You will pay
              </p>
              <div className="text-4xl 2xl:text-5xl  font-bold text-secondary">
                {hasValidInput ? `₹${calc.baseAmount.toLocaleString('en-IN')}` : '—'}
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={!hasValidInput}
              className={`w-full py-4 2xl:text-3xl 2xl:mt-5  rounded-xl text-sm uppercase tracking-widest font-serif transition ${
                hasValidInput
                  ? 'bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 shadow-lg hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Why Buy Section */}
      <div className="md:hidden rounded-3xl p-6 mt-3 shadow-md bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
        <h3 className="text-lg font-['Fraunces'] mb-4 text-secondary">Why Buy Digital Silver?</h3>
        <div className="space-y-3 text-sm text-secondary">
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
            <h2 className="text-lg font-semibold mb-3">Clear Cart?</h2>
            <p className="text-sm text-gray-600 mb-4">Your cart currently has:</p>
            <div className="bg-gray-50 rounded-lg p-3 mb-6 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="text-sm text-gray-700 py-1.5 border-b border-gray-200 last:border-b-0"
                >
                  • {item.name} {item.weight && `(${item.weight}g)`}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              All items will be removed and replaced with{' '}
              <strong>Digital Silver .999 — {pendingItem.quantityInGrams}g</strong>.
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
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 shadow-lg hover:scale-[1.02] text-white'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Clear & Replace'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Silver;
