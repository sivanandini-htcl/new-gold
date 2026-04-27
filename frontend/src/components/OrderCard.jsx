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
};

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  const status = order.status?.toLowerCase() || "processing";
  const cfg = statusConfig[status] || statusConfig.processing;
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white rounded-xl text-[#3C2415] p-5 mb-4 shadow-sm">
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Package className="text-amber-700" />
          </div>

          <div>
            <p className="font-bold text-[#3C2415]">
              Order #{order.orderNumber || order.id}
            </p>

            <div className="flex items-center gap-2 text-sm text-[#3C2415] mt-1">
              <Calendar size={14} />
              {order.mode || "Jewellery Order"}
            </div>
          </div>
        </div>

        <div className="text-right">
          <span
            className={`inline-flex items-center gap-1 px-3 text-[#3C2415] py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color}`}
          >
            <StatusIcon size={14} />
            {cfg.label}
          </span>

          <p className="font-bold text-lg mt-2 text-[#3C2415]">
            ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
          </p>

          <button
            onClick={() => navigate(`/orders/${order.id}`)}
            className="mt-3 flex items-center gap-1 text-[#3C2415] font-semibold"
          >
            View Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
