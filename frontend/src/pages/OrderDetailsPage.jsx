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
              ? "font-normal text-gray-600"
              : "font-medium text-primary"
          }`}
        >
          {Icon && (
            <Icon
              size={14}
              className={muted ? "text-gray-600" : "text-[#9c7c6b]"}
            />
          )}

          {label}
        </span>

        <span
          className={`font-mono ${
            accent
              ? "text-[15px] font-bold text-white/70"
              : muted
              ? "text-[13.5px] font-medium text-gray-600"
              : "text-[13.5px] font-medium text-white/70"
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
  const seconds = singleOrder?.updatedAt?._seconds;

const formattedDate = seconds
  ? new Date(seconds * 1000).toLocaleString("en-IN")
  : "";

  useEffect(() => {
    if (id) {
      fetchOrderById(id);
      fetchOrderStatus(id);
    }
  }, [id]);

  if (loading || !singleOrder) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center font-sans text-[14px] tracking-[0.04em] text-primary">
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
          <p className="mt-1 text-[13px] leading-relaxed text-white/70">
            {address.addressLine1}
          </p>
        )}

        {address.addressLine2 && (
          <p className="mt-1 text-[13px] leading-relaxed text-white/70">
            {address.addressLine2}
          </p>
        )}

        <p className="mt-1 text-[13px] leading-relaxed text-white/70">
          {address.city}, {address.state} - {address.pincode}
        </p>
      </>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-[60px] font-sans">
      {/* Header */}
      <div className="flex items-center gap-[14px]  px-4 py-[18px] sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-[6px] rounded-[8px]  px-[10px] py-[6px] md:px-25 text-[13px] md:text-[17px] text-primary/70 transition hover:bg-white/15"
        >
          <ArrowLeft size={15} />
          Back To Orders
        </button>

      
      </div>
       <h1 className="text-[30px]  text-center font-serif font-semibold leading-none text-white-40 sm:text-[38px]">
            Order <span className="text-primary"> Details</span> 
          </h1>

            <div>
          <p className="m-0 text-[11px] text-center mt-4 text-primary/60  uppercase tracking-[0.1em]">
            Order #{id}
          </p>    
          
        </div>
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-4 px-4 py-6 sm:px-5">
        {/* Tracking */}
        <div className="rounded-2xl  bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 px-4 py-5 sm:px-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary/70">
            Tracking
          </p>

          <div className="relative flex items-start justify-between">
            {/* Background line */}
            <div className="absolute left-0 right-0 top-[12px] z-0 h-[2px] bg-[#ede0d4]" />

            {/* Active line */}
            <div
              className="absolute left-0 top-[12px] z-[1] h-[2px] bg-[#111112] transition-all duration-700 ease-out"
              style={{
                width: `${
                  (currentStep / (STEPS.length -1)) * 100
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
                        ? "border-[#111112] bg-[#111112]"
                        : "border-[#ede0d4] bg-[#dfac7e]"
                    }`}
                  >
                    {done && (
                      <div className="h-2 w-2 rounded-full bg-white/50" />
                    )}
                  </div>

                  <span
                    className={`whitespace-nowrap text-[10px] sm:text-[11px] ${
                      done
                        ? "font-semibold text-primary/60"
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
          <div className="rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
            <div className="flex items-center gap-2 border-b border-white/20 px-5 py-4">
              <Truck size={15} className="text-primary" />

              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                Shipping Address
              </p>
            </div>

            <div className="space-y-2 px-5 py-4">
              <div className="flex items-center gap-2">
                <User size={14} className="text-primary" />

                <p className="text-[14px] font-semibold text-white/70">
                  {shippingAddress.fullName || "—"}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-[2px] text-primary"
                />

                <div className="text-white/70">{renderAddress(shippingAddress)}</div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />

                <p className="text-[13px] text-white/70">
                  {shippingAddress.phoneNumber || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="rounded-2xl  bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
            <div className="flex items-center gap-2 border-b border-white/20 px-5 py-4">
              <Receipt size={15} className="text-primary" />

              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                Billing Address
              </p>
            </div>

            <div className="space-y-2 px-5 py-4">
              <div className="flex items-center gap-2">
                <User size={14} className="text-primary" />

                <p className="text-[14px] font-semibold text-white/70">
                  {billingAddress.fullName || "—"}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-[2px] text-primary"
                />

                <div>{renderAddress(billingAddress)}</div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />

                <p className="text-[13px] text-white/70">
                  {billingAddress.phoneNumber || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-hidden rounded-2xl  bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
          <div className="flex items-center gap-2 border-b border-white/20 px-5 py-4">
            <ShoppingBag size={15} className="text-primary" />

            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
              Items Ordered
            </p>
          </div>

          {singleOrder.items?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 px-5 py-[14px] sm:flex-row sm:items-center sm:justify-between ${
                index < singleOrder.items.length - 1
                  ? "border-b border-white/20"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/20 bg-[#111112]">
                  <Package size={18} className="text-primary" />
                </div>

                <div>
                  <p className="m-0 text-[14px] font-semibold text-primary">
                    {item.type}
                  </p>

                  <p className="mt-[2px] font-mono text-[12px] text-white/60">
                    Qty {item.quantity} 
                  </p>
                  <p className="mt-[2px] font-mono text-[12px] text-white/60">
             
                      {formattedDate}
                  </p>
                </div>
              </div>

              <p className="m-0 self-end font-mono text-[14px] font-bold text-white sm:self-auto">
                {fmt(item.unitPrice)}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="overflow-hidden rounded-2xl border bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
          <div className="flex items-center gap-2 border-b border-white/20 px-5 py-4">
            <Receipt size={15} className="text-primary" />

            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
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
              label={`GST ${
                p.gstPercent ? `(${p.gstPercent}%)` : ""
              }`}
              value={fmt(p.gstAmount)}
              
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
              muted={!p.shippingBase}

              
              icon={Truck}
            />

          

            <PricingRow
              label="Handling fee"
              value={fmt(p.handlingFee)}
              muted={!p.handlingFee}
              
            />

            <div className="my-[12px] border-t-2 border-[#ede0d4]" />

            <div className="flex items-center justify-between rounded-[10px] bg-[#111112] px-3 py-[10px]">
              <span className="text-[13px] font-semibold tracking-[0.04em] text-primary">
                Total Payable
              </span>

              <span className="font-mono text-[18px] font-extrabold text-white/70 sm:text-[20px]">
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