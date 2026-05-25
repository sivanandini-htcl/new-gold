// src/components/OrderCard.jsx

import { useNavigate } from "react-router-dom";
import {
  Package,
  Calendar,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

const statusConfig = {
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bg: "bg-green-100",
    icon: CheckCircle,
  },
  processing: {
    label: "Processing",
    color: "text-amber-700",
    bg: "bg-amber-100",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color: "text-blue-700",
    bg: "bg-blue-100",
    icon: Truck,
  },
  pending: {
    label: "Pending",
    color: "text-gray-700",
    bg: "bg-gray-100",
    icon: Clock,
  },
  payment_success: {
    label: "Payment Success",
    color: "text-green-700",
    bg: "bg-green-100",
    icon: CheckCircle,
  },
  completed: {
    label: "Payment Success",
    color: "text-green-700",
    bg: "bg-green-100",
    icon: CheckCircle,
  },
};

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  const status = order.status?.toLowerCase() || "pending";
  const cfg = statusConfig[status] || statusConfig.processing;
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-xl text-[#3C2415] p-3 md:p-5 mb-4 shadow-sm">
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-4">
          <div className="w-12 h-9 rounded-xl flex items-center justify-center">
            <Package className="text-secondary" size={18} />
          </div>

          <div>
            <p className="font-bold text-primary/70 text-xs md:text-sm">
              Order #{order.orderNumber || order.id}
            </p>
       

            <div className="flex items-center gap-2 text-xs text-primary/50 mt-1">
              <Calendar size={14} />
              {order.mode || "Jewellery Order"}
            </div>
          </div>
        </div>

        <div className="text-right ">
          <span
            className={`inline-flex  items-center gap-1 px-3 text-background py-1 rounded-full text-xs  ${cfg.bg} ${cfg.color}`}
          >
            <StatusIcon size={14} />
            {order.status}
          </span>

          <p className="font-bold text-sm mt-2 md:text-sm text-white/70">
            ₹{Number(order.pricing?.totalAmount || 0).toLocaleString("en-IN")}
          </p>

          <button
            onClick={() => navigate(`/orders/${order.id}`)}
            className="mt-3 flex items-center gap-1 text-primary/60 font-normal text-xs"
          >
            View Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
