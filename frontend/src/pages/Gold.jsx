import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import usePriceStore from '../store/priceStore';

import useCartStore from '../store/cartStore';
import api from '../api/axiosInstance';

function Gold() {
  const [inputValue, setInputValue] = useState('');
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const prices = usePriceStore((state) => state.prices);
  const goldPrice = prices.find((item) => item.metal === 'GOLD');
  const gram24kGoldPrice = goldPrice?.caratPrices?.gram24k || 0;

  const navigate = useNavigate();
  const { cartItems, addToCart, replaceCartItem, removeFromCart, updateQuantity, fetchCart } =
    useCartStore();
  // Safe calculation

  const getCartType = () => {
    if (cartItems.length === 0) return null;

    const hasMetal = cartItems.some((item) => item.type === 'METAL');

    const hasProduct = cartItems.some((item) => item.type === 'PRODUCT');

    if (hasMetal && !hasProduct) return 'METAL';
    if (hasProduct && !hasMetal) return 'PRODUCT';

    return 'MIXED';
  };

  const calc = useMemo(() => {
    const grams = parseFloat(inputValue) || 0;
    const baseAmount = grams * gram24kGoldPrice;
    return { grams, baseAmount: baseAmount };
  }, [inputValue, gram24kGoldPrice]);

  const hasValidInput = calc.grams > 0 && gram24kGoldPrice > 0;

  const handleBuyNow = async () => {
    if (!hasValidInput) {
      toast.error('Enter valid grams');
      return;
    }

    const newItem = {
      type: 'METAL',
      metalType: 'GOLD',
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
    <div className="min-h-screen max-w-[1440px] m-auto flex flex-col py-8 px-4 sm:px-6 lg:px-10  bg-background">
      <Link
        to="/dashboard"
        className="inline-flex items-center 2xl:text-xl gap-2 mb-6 text-xs  uppercase tracking-widest text-primary/60 hover:text-yellow-600 transition font-['Fraunces']"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Title */}
      <div className="mb-15 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
        <div className="h-0.5 w-12  bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-['Fraunces'] text-primary p-2">
          Buy Gold
        </h1>
        <p className="mt-2 text-xs 2xl:text-xl  uppercase tracking-widest text-primary/50 font-['Fraunces'] pl-3">
          24K · 99.9% Pure · Live Rates
        </p>
      </div>

      <div className="w-full flex flex-1 items-start justify-center">
        <div className="grid md:grid-cols-2 gap-7 w-full mx-auto mt-1 ">
          {/* LEFT SIDE - Market Insights */}
          <div className="space-y-9">
            <div className="rounded-3xl p-6 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  ">
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4"></div>
              <h2 className="text-2xl 2xl:text-4xl font-['Fraunces'] mb-5 text-primary/80">
                Market Insights
              </h2>

              <div className="flex items-center 2xl:text-2xl text-white/70 justify-between p-4 rounded-xl  mb-6 border border-white/20">
                <p>₹{Math.round(gram24kGoldPrice) || 'Loading...'}</p>
                <p>{goldPrice ? `${goldPrice.changePercent}%` : '—'}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b 2xl:text-xl border-yellow-700/10 pb-2">
                  <span className="uppercase tracking-widest text-white/70 text-xs 2xl:text-lg  ">
                    Current Price
                  </span>
                  <span className="text-white/70">
                    ₹{goldPrice ? goldPrice.price.toLocaleString() : '—'}
                  </span>
                </div>
                <div className="flex justify-between 2xl:text-xl border-b border-yellow-700/10 pb-2">
                  <span className="uppercase tracking-widest text-xs text-white/70 2xl:text-lg">
                    Week High
                  </span>
                  <span className="text-white/70">
                    ₹{goldPrice ? goldPrice.high.toLocaleString() : '—'}
                  </span>
                </div>
                <div className=" text-white/70 flex justify-between 2xl:text-xl">
                  <span className="uppercase tracking-widest text-xs text-white/70 2xl:text-lg ">
                    Week Low
                  </span>
                  <span>₹{goldPrice ? goldPrice.low.toLocaleString() : '—'}</span>
                </div>
              </div>
            </div>

            {/* Why Buy Digital Gold - Desktop */}
            <div className="sm:block hidden rounded-3xl p-6 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 ">
              <h3 className="text-lg 2xl:text-3xl  text-primary mb-4 font-['Fraunces']  ">
                Why Buy Digital Gold?
              </h3>
              <div className="space-y-3 text-sm 2xl:text-xl text-white/70 text-seconadry">
                <p>◈ 99.9% pure 24K gold, hallmarked</p>
                <p>◈ Stored in insured, secured vaults</p>
                <p>◈ Start investing from just ₹1</p>
                <p>◈ Sell anytime at live market price</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Converter */}
          <div className="rounded-3xl p-2 md:p-5 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 ">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4 mt-4"></div>
            <h2 className="text-2xl 2xl:text-4xl font-['Fraunces'] text-primary/80 mb-2">
              Price Converter
            </h2>
            <p className="text-xs 2xl:text-xl uppercase tracking-widest text-primary/50 mb-6">
              Grams → Rupees
            </p>

            <div className="h-12  flex justify-center items-center rounded-xl mb-7">
              <p className="2xl:text-2xl bg-primaryGoldGradient w-full rounded-xl h-10 text-background text-center p-3 font-serif ">
                Grams → ₹
              </p>
            </div>

            <input
              type="number"
              placeholder="Enter grams "
              min="1"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-lg 2xl:text-3xl text-white bg-[#111117]  border border-white/30  outline-none mb-6"
            />

            <div className="rounded-2xl p-5 text-center mb-6 bg-[#111117] border border-white/30">
              <p className="text-xs uppercase tracking-widest text-primary/80 mb-2">
                You will pay
              </p>
              <div className="text-3xl xl:text-4xl 2xl:text-5xl mb-7 font-bold text-primary">
                {hasValidInput ? `₹${calc.baseAmount.toLocaleString('en-IN')}` : '—'}
              </div>
            </div>

            {/* Buy Now Button - Directly adds to cart */}
            <button
              onClick={handleBuyNow}
              disabled={!hasValidInput}
              className={`w-full py-4 rounded-xl text-sm 2xl:text-3xl 2xl:mt-5  uppercase tracking-widest font-['Fraunces'] transition ${
                hasValidInput
                  ? 'bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-lg hover:scale-[1.02]'
                  : 'bg-yellow-100 text-yellow-400 cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Mobile Why Buy Section */}
          <div className="md:hidden rounded-3xl p-6 shadow-md bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
            <h3 className="text-lg mb-4 font-['Fraunces'] text-primary">
              Why Buy Digital Gold?
            </h3>
            <div className="space-y-3 text-sm text-white/70">
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
            <h2 className="text-lg font-semibold mb-3">Clear Cart?</h2>
            <p className="text-sm text-gray-600 mb-4">Your cart currently has:</p>
            <div className="bg-amber-50 rounded-lg p-3 mb-6 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="text-sm text-gray-700 py-1.5 border-b border-yellow-200 last:border-b-0"
                >
                  • {item.name} {item.weight && `(${item.weight}g)`}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              All items will be removed and replaced with{' '}
              <strong>Digital Gold 24K — {pendingItem.quantityInGrams}g</strong>.
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
                    ? 'bg-yellow-400 text-yellow-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-800 shadow-lg hover:scale-[1.02] text-black'
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

export default Gold;
// text-primary/80
// bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 