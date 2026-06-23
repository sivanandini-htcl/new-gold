import React from "react";
import {
  Check,
  Truck,
  Package,
  MapPin,
  Home,
} from "lucide-react";

const TrackingProgress = ({ currentStatus }) => {
  const steps = [
    {
      key: "ORDER_CONFIRMED",
      title: "Order Confirmed",
      icon: Package,
    },
    {
      key: "SHIPPED",
      title: "Shipped",
      icon: Truck,
    },
    {
      key: "AT_SORTING_FACILITY",
      title: "At Sorting Facility",
      icon: MapPin,
    },
    {
      key: "OUT_FOR_DELIVERY",
      title: "Out For Delivery",
      icon: Truck,
    },
    {
      key: "DELIVERED",
      title: "Delivered",
      icon: Home,
    },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.key === currentStatus
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
        Tracking Progress
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200"></div>

        {steps.map((step, index) => {
          let status;

          if (index < currentIndex) {
            status = "done";
          } else if (index === currentIndex) {
            status = "active";
          } else {
            status = "pending";
          }

          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={`relative flex items-start gap-4 pb-8 ${
                status === "pending" && "opacity-50"
              }`}
            >
              {/* Circle */}
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2
                ${
                  status === "done"
                    ? "bg-green-100 border-green-600"
                    : status === "active"
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                {status === "done" ? (
                  <Check className="h-4 w-4 text-green-700" />
                ) : (
                  <Icon
                    className={`h-4 w-4 ${
                      status === "active"
                        ? "text-blue-700"
                        : "text-gray-500"
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {status === "done"
                      ? "Completed"
                      : status === "active"
                      ? "Current Step"
                      : "Pending"}
                  </p>
                </div>

                {status === "active" && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    Current
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingProgress;