// src/pages/OrderDetailsPage.jsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  CheckCircle,
} from "lucide-react";
import useOrderStore from "../store/useOrderStore";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    singleOrder,
    orderStatus,
    fetchOrderById,
    fetchOrderStatus,
    loading,
  } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
    fetchOrderStatus(id);
  }, [id]);

  if (loading || !singleOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        Loading order details...
      </div>
    );
  }

  const status = orderStatus?.status?.toLowerCase() || "processing";

  const progressMap = {
    pending: 25,
    processing: 50,
    shipped: 75,
    delivered: 100,
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-amber-700 font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">
          Order Details
        </h1>

        {/* Progress */}
        <div className="bg-white p-6 rounded-xl border mb-6">
          <h3 className="font-bold mb-4">Order Status</h3>

          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-amber-700 rounded"
              style={{
                width: `${progressMap[status] || 50}%`,
              }}
            />
          </div>

          <p className="mt-3 font-semibold capitalize">
            {status}
          </p>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">Items Ordered</h3>

          {singleOrder.items?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-4"
            >
              <div className="flex gap-3">
                <Package className="text-amber-700" />

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-bold">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}

          <div className="pt-4 text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">
              ₹{Number(singleOrder.totalAmount).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
