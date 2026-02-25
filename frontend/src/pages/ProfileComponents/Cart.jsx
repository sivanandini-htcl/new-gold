// src/pages/Cart.jsx
import { useCart } from "../../components/CartContext"; // adjust path
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalAmount } =
    useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 p-6 md:p-8 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold  text-slate-950 text-secondary mb-6">Your Cart</h1>
        <p className="text-xl text-slate-950 mb-8">
          Your cart is empty. Start shopping!
        </p>
        <button
          onClick={() => navigate("/redeem")}
          className="bg-secondary text-accent font-semibold
           py-4 px-10 rounded-xl hover:opacity-90 transition text-lg" >
          Browse Jewellery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-8 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-10 text-center">
          Your Shopping Cart
        </h1>

        {/* Cart Items List */}
        <div className="space-y-6 mb-12">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-5 flex 
              flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg" >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl flex shrink-0"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/128?text=No+Image";
                }}
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-secondary mb-1">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm mb-2">
                  {item.purity} • {item.weight}
                </p>
                <p className="text-lg font-semibold text-white mb-3">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mb-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-10 h-10 bg-slate-700 text-white rounded-full
                     hover:bg-slate-600 transition flex items-center justify-center text-xl font-bold">
                    −
                  </button>

                  <span className="text-xl font-semibold w-12 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="w-10 h-10 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition flex items-center justify-center text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="text-right min-w-[140px]">
                <p className="text-2xl font-bold text-secondary mb-4">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium underline transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Checkout */}
        <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6 text-2xl font-bold text-secondary">
            <span>Total ({totalItems} items)</span>
            <span>₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>

          <p className="text-slate-400 text-sm mb-8 text-center">
            Shipping, taxes & GST will be calculated at checkout
          </p>

          <button
            onClick={() => alert("Proceeding to checkout... (payment page next)")}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-5 rounded-xl text-xl transition shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/redeem")}
            className="text-accent hover:underline text-lg"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;