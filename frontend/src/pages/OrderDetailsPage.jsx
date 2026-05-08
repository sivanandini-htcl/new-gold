// src/pages/OrderDetailsPage.jsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  Tag,
  Truck,
  Receipt,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import useOrderStore from "../store/useOrderStore";

const STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

const stepIndex = (status) => {
  const map = {
    pending: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
  };

  return map[status?.toLowerCase()] ?? 1;
};

function PricingRow({
  label,
  value,
  muted,
  accent,
  icon: Icon,
  separator,
}) {
  return (
    <>
      {separator && (
        <div className="my-[10px] border-t border-dashed border-[#e2d5c8]" />
      )}

      <div className="flex items-center justify-between py-[6px]">
        <span
          className={`flex items-center gap-[7px] text-[13.5px] ${
            muted
              ? "font-normal text-[#b09b88]"
              : "font-medium text-[#5c4033]"
          }`}
        >
          {Icon && (
            <Icon
              size={14}
              className={muted ? "text-[#c9b8ac]" : "text-[#9c7c6b]"}
            />
          )}

          {label}
        </span>

        <span
          className={`font-mono ${
            accent
              ? "text-[15px] font-bold text-[#3d1f0f]"
              : value?.startsWith?.("−")
              ? "text-[13.5px] font-medium text-[#b34040]"
              : "text-[13.5px] font-medium text-[#5c4033]"
          }`}
        >
          {value}
        </span>
      </div>
    </>
  );
}

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    singleOrder,
    orderStatus,
    delivery,
    fetchOrderById,
    fetchOrderStatus,
    loading,
  } = useOrderStore();

  useEffect(() => {
    if (id) {
      fetchOrderById(id);
      fetchOrderStatus(id);
    }
  }, [id]);

  if (loading || !singleOrder) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fdf6ef] px-4 text-center font-sans text-[14px] tracking-[0.04em] text-[#9c7c6b]">
        Loading order details…
      </div>
    );
  }

  const status =
    orderStatus?.status?.toLowerCase() ||
    delivery?.status?.toLowerCase() ||
    "processing";

  const p = singleOrder.pricing || {};

  const currentStep = stepIndex(status);

  const shippingAddress = singleOrder?.delivery?.shippingAddress || {};
  const billingAddress = singleOrder?.delivery?.billingAddress || {};

  const fmt = (n) =>
    n != null
      ? `₹${Number(n).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}`
      : "—";

  const renderAddress = (address) => {
    if (!address) return "No address available";

    return (
      <>
        {address.addressLine1 && (
          <p className="mt-1 text-[13px] leading-relaxed text-[#5c4033]">
            {address.addressLine1}
          </p>
        )}

        {address.addressLine2 && (
          <p className="mt-1 text-[13px] leading-relaxed text-[#5c4033]">
            {address.addressLine2}
          </p>
        )}

        <p className="mt-1 text-[13px] leading-relaxed text-[#5c4033]">
          {address.city}, {address.state} - {address.pincode}
        </p>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf6ef] pb-[60px] font-sans">
      {/* Header */}
      <div className="flex items-center gap-[14px] bg-[#3d1f0f] px-4 py-[18px] sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-[6px] rounded-[8px] bg-white/10 px-[10px] py-[6px] text-[13px] text-[#f5e6d8] transition hover:bg-white/15"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div>
          <p className="m-0 text-[11px] uppercase tracking-[0.1em] text-[#c9a98c]">
            Order #{id}
          </p>

          <h1 className="m-0 text-[18px] font-semibold text-[#fdf6ef]">
            Order Details
          </h1>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-4 px-4 py-6 sm:px-5">
        {/* Tracking */}
        <div className="rounded-2xl border border-[#ede0d4] bg-white px-4 py-5 sm:px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b09b88]">
            Tracking
          </p>

          <div className="relative flex items-start justify-between">
            {/* Background line */}
            <div className="absolute left-0 right-0 top-[12px] z-0 h-[2px] bg-[#ede0d4]" />

            {/* Active line */}
            <div
              className="absolute left-0 top-[12px] z-[1] h-[2px] bg-[#a0522d] transition-all duration-700 ease-out"
              style={{
                width: `${
                  (currentStep / (STEPS.length - 1)) * 100
                }%`,
              }}
            />

            {STEPS.map((step, i) => {
              const done = i <= currentStep;

              return (
                <div
                  key={step}
                  className="z-[2] flex flex-1 flex-col items-center gap-2 text-center"
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-[3px] ${
                      done
                        ? "border-[#a0522d] bg-[#a0522d]"
                        : "border-[#ede0d4] bg-[#ede0d4]"
                    }`}
                  >
                    {done && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>

                  <span
                    className={`whitespace-nowrap text-[10px] sm:text-[11px] ${
                      done
                        ? "font-semibold text-[#5c4033]"
                        : "font-normal text-[#b09b88]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Address Section */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Shipping Address */}
          <div className="rounded-2xl border border-[#ede0d4] bg-white">
            <div className="flex items-center gap-2 border-b border-[#ede0d4] px-5 py-4">
              <Truck size={15} className="text-[#9c7c6b]" />

              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b09b88]">
                Shipping Address
              </p>
            </div>

            <div className="space-y-2 px-5 py-4">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#9c7c6b]" />

                <p className="text-[14px] font-semibold text-[#3d1f0f]">
                  {shippingAddress.fullName || "—"}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-[2px] text-[#9c7c6b]"
                />

                <div>{renderAddress(shippingAddress)}</div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#9c7c6b]" />

                <p className="text-[13px] text-[#5c4033]">
                  {shippingAddress.phoneNumber || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="rounded-2xl border border-[#ede0d4] bg-white">
            <div className="flex items-center gap-2 border-b border-[#ede0d4] px-5 py-4">
              <Receipt size={15} className="text-[#9c7c6b]" />

              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b09b88]">
                Billing Address
              </p>
            </div>

            <div className="space-y-2 px-5 py-4">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#9c7c6b]" />

                <p className="text-[14px] font-semibold text-[#3d1f0f]">
                  {billingAddress.fullName || "—"}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-[2px] text-[#9c7c6b]"
                />

                <div>{renderAddress(billingAddress)}</div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#9c7c6b]" />

                <p className="text-[13px] text-[#5c4033]">
                  {billingAddress.phoneNumber || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-hidden rounded-2xl border border-[#ede0d4] bg-white">
          <div className="flex items-center gap-2 border-b border-[#ede0d4] px-5 py-4">
            <ShoppingBag size={15} className="text-[#9c7c6b]" />

            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b09b88]">
              Items Ordered
            </p>
          </div>

          {singleOrder.items?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 px-5 py-[14px] sm:flex-row sm:items-center sm:justify-between ${
                index < singleOrder.items.length - 1
                  ? "border-b border-[#f5ece4]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-[#ede0d4] bg-[#fdf0e6]">
                  <Package size={18} className="text-[#a0522d]" />
                </div>

                <div>
                  <p className="m-0 text-[14px] font-semibold text-[#3d1f0f]">
                    {item.type}
                  </p>

                  <p className="mt-[2px] font-mono text-[12px] text-[#b09b88]">
                    Qty {item.quantity} 
                  </p>
                </div>
              </div>

              <p className="m-0 self-end font-mono text-[14px] font-bold text-[#5c4033] sm:self-auto">
                {fmt(item.unitPrice)}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="overflow-hidden rounded-2xl border border-[#ede0d4] bg-white">
          <div className="flex items-center gap-2 border-b border-[#ede0d4] px-5 py-4">
            <Receipt size={15} className="text-[#9c7c6b]" />

            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b09b88]">
              Bill Summary
            </p>
          </div>

          <div className="px-5 py-[14px]">
            <PricingRow
              label="Subtotal"
              value={fmt(p.subtotal)}
              icon={ShoppingBag}
            />

            <PricingRow
              label="Discount"
              value={p.discount ? `− ${fmt(p.discount)}` : "₹0.00"}
              muted={!p.discount}
              icon={Tag}
            />

            <PricingRow
              label={`Shipping${p.shippingGST ? " + GST" : ""}`}
              value={fmt(
                (p.shippingBase || 0) + (p.shippingGST || 0)
              )}
              icon={Truck}
            />

            <PricingRow
              label={`GST ${
                p.gstPercent ? `(${p.gstPercent}%)` : ""
              }`}
              value={fmt(p.gstAmount)}
              muted
            />

            <PricingRow
              label="Handling fee"
              value={fmt(p.handlingFee)}
              muted
            />

            <div className="my-[12px] border-t-2 border-[#ede0d4]" />

            <div className="flex items-center justify-between rounded-[10px] bg-[#fdf0e6] px-3 py-[10px]">
              <span className="text-[13px] font-semibold tracking-[0.04em] text-[#5c4033]">
                Total Payable
              </span>

              <span className="font-mono text-[18px] font-extrabold text-[#3d1f0f] sm:text-[20px]">
                {fmt(p.totalAmount)}
              </span>
            </div>

            {p.totalBeforeDiscount && p.discount > 0 && (
              <p className="mt-2 text-right font-mono text-[12px] text-[#b09b88]">
                You saved {fmt(p.discount)} on this order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}