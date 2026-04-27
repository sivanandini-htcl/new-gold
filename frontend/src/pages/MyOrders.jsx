// src/pages/OrdersPage.jsx

import { useEffect } from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/useOrderStore";
import OrderCard from "../components/OrderCard";

export default function OrdersPage() {
  const navigate = useNavigate();

  const { orders, fetchOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-amber-700">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-[#3C2415] font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl text-[#3C2415] font-bold mb-6">My Orders</h1>

        {orders.length > 0 && (
          <div className="flex gap-4 mb-8">
            <div className="bg-white text-[#3C2415] p-4 rounded-xl shadow-xl">
              <p>Total Orders</p>
              <p className="font-bold text-xl">{orders.length}</p>
            </div>

            <div className="bg-white text-[#3C2415] p-4 rounded-xl shadow-xl">
              <p>Total Spent</p>
              <p className="font-bold text-xl">
                ₹{totalSpent.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center border">
            <ShoppingBag size={40} className="mx-auto mb-4 text-amber-700" />
            <h2 className="font-bold text-xl mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-4">
              Your jewellery orders will appear here
            </p>

            <button
              onClick={() => navigate("/redeem")}
              className="bg-amber-700 text-white px-6 py-3 rounded-lg"
            >
              Explore Jewellery
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
