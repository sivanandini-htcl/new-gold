// src/pages/OrdersPage.jsx

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/useOrderStore";
import OrderCard from "../components/OrderCard";

const PAGE_SIZE = 10;

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mb-4 text-5xl text-[#5f3e0d] animate-pulse">
          ✦
        </div>

        <p className="text-[#5f3e0d] text-[18px] tracking-[0.15em] uppercase font-light">
          Loading orders
        </p>
      </div>
    </div>
  );
}

function EmptyState({ onExplore }) {
  return (
    <div className="text-center px-6 py-16 sm:py-[72px] rounded-[20px] border border-[#c9a97a26] bg-white/[0.03]">
      <div className="w-20 h-20 rounded-full bg-[#c9a97a1a] border border-[#c9a97a33] flex items-center justify-center mx-auto mb-6">
        <ShoppingBag size={32} color="#c9a97a" />
      </div>

      <h2 className="text-[#f5e6d2] text-[24px] sm:text-[28px] font-semibold mb-[10px]">
        No Orders Yet
      </h2>

      <p className="text-[#8a7060] text-[14px] leading-[1.6] mb-8 max-w-md mx-auto">
        Your jewellery orders will appear here
      </p>

      <button
        onClick={onExplore}
        className="bg-[linear-gradient(135deg,#c9a97a,#a07840)] text-[#1a0a00] rounded-xl px-8 py-[14px] text-[14px] font-semibold uppercase tracking-[0.06em] hover:opacity-95 transition-all duration-200"
      >
        Explore Jewellery
      </button>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="flex-1 min-w-[140px] rounded-2xl border border-[#c9a97a2e] bg-white/[0.04] p-5 sm:p-6">
      <p className="text-[#5f3e0d] text-[11px] uppercase tracking-[0.12em] mb-2">
        {label}
      </p>

      <p className="text-[#5f3e0d] text-[28px] sm:text-[32px] leading-none font-semibold break-words">
        {value}
      </p>

      {sub && (
        <p className="text-[#5f3e0d] text-[12px] mt-[6px]">
          {sub}
        </p>
      )}
    </div>
  );
}

function PaginationBar({
  current,
  total,
  onPrev,
  onNext,
  onPage,
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <button
        onClick={onPrev}
        disabled={current === 1}
        className={`
          w-[38px] h-[38px] rounded-[10px]
          flex items-center justify-center
          border transition-all duration-200
          ${
            current === 1
              ? "bg-white/[0.03] border-[#c9a97a33] text-[#4a3a2a] cursor-not-allowed"
              : "bg-[#c9a97a1f] border-[#c9a97a33] text-[#c9a97a] hover:bg-[#c9a97a2a]"
          }
        `}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`
            w-[38px] h-[38px] rounded-[10px]
            text-[13px] transition-all duration-200
            ${
              p === current
                ? "bg-[linear-gradient(135deg,#c9a97a,#a07840)] text-[#1a0a00] font-bold"
                : "bg-white/[0.04] border border-[#c9a97a26] text-[#8a7060] hover:bg-white/[0.06]"
            }
          `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={current === total}
        className={`
          w-[38px] h-[38px] rounded-[10px]
          flex items-center justify-center
          border transition-all duration-200
          ${
            current === total
              ? "bg-white/[0.03] border-[#c9a97a33] text-[#4a3a2a] cursor-not-allowed"
              : "bg-[#c9a97a1f] border-[#c9a97a33] text-[#c9a97a] hover:bg-[#c9a97a2a]"
          }
        `}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();

  const { orders, fetchOrders, loading } = useOrderStore();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [orders.length]);

  const totalSpent = orders.reduce(
    (sum, o) => sum + Number(o.totalAmount || 0),
    0
  );

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  const pageOrders = orders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePrev = () =>
    setCurrentPage((p) => Math.max(1, p - 1));

  const handleNext = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100  pb-20 font-sans">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#c9a97a14] blur-3xl" />

        <div className="absolute bottom-[10%] right-[10%] h-[500px] w-[500px] rounded-full bg-[#a0784010] blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[#c9a97a1f] bg-[rgba(26,10,0,0.85)] px-4 py-4 backdrop-blur-[20px] sm:px-6 sm:py-5">
        <div className="mx-auto max-w-[720px]">
          <button
            className="mb-3 inline-flex items-center gap-[6px] text-[13px] tracking-[0.04em] text-[#8a7060] transition-colors duration-200 hover:text-[#c9a97a]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div className="flex flex-wrap items-end justify-between gap-2">
            <h1 className="text-[30px] font-semibold leading-none text-[#f5e6d2] sm:text-[38px]">
              My{" "}
              <span className="font-normal italic text-[#c9a97a]">
                Orders
              </span>
            </h1>

            {orders.length > 0 && (
              <p className="pb-1 text-[12px] uppercase tracking-[0.1em] text-[#6a5040]">
                {orders.length} order
                {orders.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[1]  mx-auto max-w-[720px] px-[14px] pt-5 sm:px-5 sm:pt-8">
        {/* Stats */}
        {orders.length > 0 && (
          <div className="mb-8 flex   flex-wrap gap-2 sm:gap-3">
            <StatCard
              label="Total Orders"
              value={orders.length}
            />

            {/* <StatCard
              label="Total Spent"
              value={`₹${totalSpent.toLocaleString(
                "en-IN"
              )}`}
              sub="across all orders"
            /> */}

            <StatCard
              label="This Page"
              value={`${
                (currentPage - 1) * PAGE_SIZE + 1
              }–${Math.min(
                currentPage * PAGE_SIZE,
                orders.length
              )}`}
              sub={`of ${orders.length}`}
            />
          </div>
        )}

        {orders.length === 0 ? (
          <EmptyState
            onExplore={() => navigate("/redeem")}
          />
        ) : (
          <>
            {/* Divider */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#c9a97a26]" />

              <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-[#6a5040]">
                Page {currentPage} of {totalPages}
              </span>

              <div className="h-px flex-1 bg-[#c9a97a26]" />
            </div>

            {/* Orders */}
            <div className="space-y-3">
              {pageOrders.map((order) => (
                <div
                  key={order.id}
                  className="transition-all duration-300"
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationBar
                current={currentPage}
                total={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
                onPage={(p) => {
                  setCurrentPage(p);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            )}

            {/* Footer */}
            <p className="mt-5 text-center text-[12px] tracking-[0.08em] text-[#6a5040]">
              Showing{" "}
              {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(
                currentPage * PAGE_SIZE,
                orders.length
              )}{" "}
              of {orders.length} orders
            </p>
          </>
        )}
      </div>
    </div>
  );
}