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
import OrderCard from "./orderCommponents/OrderCard";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

function EmptyState({ onExplore }) {
  return (
    <div className="text-center px-6 py-16 sm:py-[72px] rounded-[20px] border border-[#c9a97a26] bg-white/[0.03]">
      <div className="w-20 h-20 rounded-full bg-[#c9a97a1a] border border-[#c9a97a33] flex items-center justify-center mx-auto mb-6">
        <ShoppingBag size={32} color="#c9a97a" />
      </div>

      <h2 className="text-primary text-[24px] sm:text-[28px] font-semibold mb-[10px]">
        No Orders Yet
      </h2>

      <p className="text-primary/70 text-[14px] leading-[1.6] mb-8 max-w-md mx-auto">
        Your orders will appear here
      </p>

      <button
        onClick={onExplore}
        className="bg-[linear-gradient(135deg,#c9a97a,#a07840)] text-background rounded-xl px-8 py-[14px] text-[14px] font-semibold uppercase tracking-[0.06em] hover:opacity-95 transition-all duration-200"
      >
        Explore Jewellery
      </button>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="flex-1 min-w-[140px] rounded-2xl border border-[#c9a97a2e] bg-white/[0.04] p-5 sm:p-6">
      <p className="text-primary text-xs uppercase tracking-[0.12em] mb-2">
        {label}
      </p>

      <p className="text-white text-xs sm:text-[32px] leading-none font-semibold ">
        {value}
      </p>

      {sub && (
        <p className="text-primary/50 text-[12px] mt-[6px]">
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

  const {  orders, fetchOrders,loading, totalOrders, limit, hasMore, } = useOrderStore();

  const [currentPage, setCurrentPage] = useState(1);

 useEffect(() => {
  fetchOrders(currentPage, PAGE_SIZE);
}, [currentPage]);

  const totalSpent = orders.reduce(
    (sum, o) => sum + Number(o.totalAmount || 0),
    0
  );

  // const sortedOrders=orders.sort((a,b)=>new Date(b.createdAt._seconds)-new Date(a.createdAt._seconds))

  const totalPages = Math.ceil(totalOrders / limit);

  // const pageOrders = orders.slice(
  //   (currentPage - 1) * PAGE_SIZE,
  //   currentPage * PAGE_SIZE
  // );

const handlePrev = () => {
  if (currentPage > 1) {
    setCurrentPage((p) => p - 1);
  }
};

  const handleNext=()=>{
    if(hasMore){
      setCurrentPage((p)=>p+1);
    }

  }

  if (loading) {
    return(
    <>
     <div className="px-60 md:px-40 rounded-2xl m-2 gap-3 flex">
      <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
      <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
     </div>
    <div className="animate-pulse grid  grid-cols-1 md:grid-cols-1 gap-3 px-60 md:px-40 rounded-2xl  m-2">
    <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
    <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
    <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
    <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
    <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
    <div className="h-30 bg-secondary/10 rounded-2xl w-full"></div>
    </div>
      </> 
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background  pb-20 font-sans">
      {/* Background Glow */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#c9a97a14] blur-3xl" />

        <div className="absolute bottom-[10%] right-[10%] h-[500px] w-[500px] rounded-full bg-[#a0784010] blur-3xl" />
      </div> */}

      {/* Header */}
      <div className="sticky top-0 z-10  px-4 py-4 backdrop-blur-[20px] sm:px-6 sm:py-5">
        <div className="mx-auto max-w-7xl">
        <Link
        to="/dashboard"
        className="inline-flex items-center 2xl:text-xl gap-2 mb-6 text-xs  uppercase tracking-widest text-primary/60 hover:text-yellow-600 transition font-['Fraunces']"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      {/* Title */}
      <div className="mb-1 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
        <div className="h-0.5 w-12  bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-['Fraunces'] text-primary p-2">
         My Orders
        </h1>
        <p className="mt-2 text-xs 2xl:text-xl  uppercase tracking-widest text-primary/50 font-['Fraunces'] pl-3">
          24K · 99.9% Pure · Live Rates
        </p>
      </div>
         
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[1]  mx-auto max-w-[720px] px-[14px] pt-5 sm:px-5 sm:pt-8">
        {/* Stats */}
        {orders.length > 0 && (
          <div className="mb-8 flex  text-primary flex-wrap gap-2 sm:gap-3">
            <StatCard
              label="Total Orders"
              value={totalOrders}
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
  totalOrders
)}`}
sub={`of ${totalOrders}`}
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

              <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-[#6a5040] text-xs">
                Page {currentPage} of {totalPages}
              </span>

              <div className="h-px flex-1 bg-[#c9a97a26]" />
            </div>

            {/* Orders */}
         <div className="space-y-3">
  {[...orders]
    .sort(
      (a, b) =>
        b.createdAt._seconds - a.createdAt._seconds
    )
    .map((order) => (
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
               totalOrders
              )}{" "}
              of {totalOrders} orders
            </p>
          </>
        )}
      </div>
    </div>
  );
}