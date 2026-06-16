// src/pages/TransactionHistoryPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Layers,
} from "lucide-react";
 import { Link } from "react-router-dom";
const PAGE_SIZE = 10;

const METAL_CONFIG = {
  gold: {
    label: "Gold",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    symbol: "Au",
  },

  silver: {
    label: "Silver",
    color: "text-slate-300",
    bg: "bg-slate-300/10",
    border: "border-slate-300/20",
    symbol: "Ag",
  },
};

function groupByMonth(txns) {
  const groups = {};

  txns.forEach((t) => {
    const d = new Date(t.createdAt);

    const key = d.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });

    if (!groups[key]) groups[key] = [];

    groups[key].push(t);
  });

  return groups;
}

function fmt(n) {
  return Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDate(iso) {
  const d = new Date(iso);

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const WalletTransaction = () => {
    const navigate = useNavigate();
    
      const [transactions, setTransactions] = useState([]);
      const[data,setdata]=useState({});
      
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    

   
    
      const [filter, setFilter] = useState("all");
      const [metal, setMetal] = useState("all");
      const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
      const fetchDetails = async () => {
        try {
            setLoading(true)
          console.log("calling api")
          const res = await api.post("/holdings/wallet/ledger");
          console.log("called api")
    
          console.log("FULL RESPONSE:", res);
          console.log("DATA:", res.data);
          console.log("wallet data:", res.data?.data);
     
           setdata(res.data?.data)
          setTransactions(res.data?.data?.transactions|| []);
        } catch (err) {
          console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);
        }
        finally{
            setLoading(false);
        }
      };
    
      fetchDetails();
    }, []);
    
    
      const filtered = Array.isArray(transactions)
      ? transactions.filter((t) => {
          const typeOk = filter === "all" || t.type === filter;
          const metalOk = metal === "all" || t.metalType === metal;
    
          return typeOk && metalOk;
        })
      : [];
    
      const totalPages = Math.ceil(
        filtered.length / PAGE_SIZE
      );
    
      const paginated = filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      );
    
      const grouped = groupByMonth(paginated);
    
    
      const totalWITHDRAWAL_HOLD = filtered
        .filter((t) => t.type === "WITHDRAWAL_HOLD")
        .reduce((s, t) => s + t.amount, 0);
    
      const totalGrams = filtered
        .filter((t) => t.type === "CREDIT")
        .reduce((s, t) => s + t.grams, 0);
    
      useEffect(() => {
        setCurrentPage(1);
      }, [filter, metal]);
    
      if (loading) {
        return (
          <div className="min-h-screen  flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4 animate-spin inline-block text-yellow-500">
                ◈
              </div>
    
              <p className="text-xs tracking-[0.14em] uppercase text-zinc-500">
                Loading transactions
              </p>
            </div>
          </div>
        );
      }
    
  return (
<div className="min-h-screen  text-zinc-100 overflow-x-hidden pb-20">

      {/* HEADER */}
      <div className="sticky top-0 z-20 backdrop-blur-xl">
      <div className=" mx-auto px-5 py-5">
      <div className="max-w-7xl mx-auto">
         
  <Link to="/dashboard" 
  className="inline-flex items-center 2xl:text-xl gap-2 mb-6 text-xs  uppercase tracking-widest text-primary/60 hover:text-yellow-600 transition font-['Fraunces']">
  <ArrowLeft className="w-4 h-4" />
  Back to Dashboard
  </Link>

      {/* Title */}
      <div className="mb-5 border-b border-yellow-700/20 pb-6 font-['Fraunces']">
        <div className="h-0.5 w-12  bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-serif text-primary p-2">
         Wallet History
        </h1>
        <p className="mt-2 text-xs 2xl:text-xl  uppercase tracking-widest text-primary/50 font-['Fraunces'] pl-3">
          24K · 99.9% Pure · Live Rates
        </p>
      </div>
</div>
        

          <div className="flex items-end justify-end gap-3 flex-wrap">
            <span className="text-xs tracking-[0.08em] text-zinc-500">
              {filtered.length} record
              {filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-4 pt-7">

        {/* EMPTY */}
        {transactions.length === 0 && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">

            <div className="w-[90px] h-[90px] rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center mb-7 animate-pulse">
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d4a017"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="3"/>
                <path d="M2 10h20" />
                <path d="M6 15h4" />
                <path d="M14 15h4" />
              </svg>
            </div>

            <h2 className="text-[26px] font-extrabold font-heading text-textSecondary tracking-[-0.02em] mb-3">
              No Transactions{" "}
              <span className="text-primary italic">
                Yet
              </span>
            </h2>

            <p className="text-sm text-zinc-500 leading-7 max-w-[280px] mb-8">
              Your gold & silver purchases will appear
              here once you make your first investment.
            </p>

            <div className="flex items-center gap-3 w-full max-w-[260px] mb-8">
              <div className="flex-1 h-px bg-yellow-500/10" />

              <span className="text-yellow-500/40">
                ✦
              </span>

              <div className="flex-1 h-px bg-yellow-500/10" />
            </div>

    
          </div>
        )}

        {/* CONTENT */}
        {transactions.length > 0 && (
          <>

            {/* STATS */}
            <div className="flex md:flex md:gap-10 items-center justify-center gap-3 mb-7">

              <div className="flex-col justify-center items-center">
                <div>
                   <TrendingUp size={15} />
                  <p className="text-[12px] md:text-sm uppercase text-zinc-500 mb-2 flex items-center md:tracking-[0.12em]">                 
                  Total In
                </p>
                 
                </div>
                

                <p className="text-sm md:text-lg font-bold text-successLight">
                  ₹{data?.summary?.totalCredits}
                </p>
              </div>

              <div className="w-px h-15 bg-white/10 mx-1" />

              <div className="flex-col justify-center items-center">
                <div>
<TrendingDown size={15} />
                <p className="text-[12px] md:text-sm uppercase text-zinc-500 mb-2 flex items-center md:tracking-[0.12em]">                
                  Total Out
                </p>
                </div>
                

               <p className="text-sm md:text-lg font-bold text-errorLight"> 
                  ₹{fmt(totalWITHDRAWAL_HOLD)}
                </p>
              </div>

             

              
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap items-center gap-2 mb-6">

              {["all", "CREDIT", "WITHDRAWAL_HOLD"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs tracking-[0.04em] border transition-all
                    ${
                      filter === f
                        ? "bg-primaryGoldGradient text-black font-bold"
                        : "bg-[#111117] border-white/10 text-zinc-500 hover:border-yellow-500 hover:text-yellow-500"
                    }`}
                >
                  {f === "all"
                    ? "All"
                    : f === "CREDIT"
                    ? "↓ CREDIT"
                    : "↑ WITHDRAWAL"}
                </button>
              ))}

              <div className="w-px h-5 bg-white/10 mx-1" />

              {["all", "gold", "silver"].map((m) => {
                const config = METAL_CONFIG[m];

                return (
                  <button
                    key={m}
                    onClick={() => setMetal(m)}
                    className={`px-4 py-1.5 rounded-full text-xs tracking-[0.04em] border transition-all
                    ${
                      metal === m
                        ? m === "all"
                          ? "bg-primaryGoldGradient text-black font-bold"
                          : `${config.bg} ${config.border} ${config.color} font-bold`
                        : "bg-[#11171] border-white/10 text-zinc-500 hover:border-yellow-500 hover:text-yellow-500"
                    }`}
                  >
                    {m === "all"
                      ? "All Metals"
                      : config.label}
                  </button>
                );
              })}
            </div>

            {/* EMPTY FILTER */}
            {paginated.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-2xl text-center py-16 px-6">
                <p className="text-sm text-zinc-500 mb-2">
                  No transactions found
                </p>

                <p className="text-xs text-zinc-600">
                  Try changing the filters above
                </p>
              </div>
            ) : (
              Object.entries(grouped).map(
                ([month, txns]) => (
                  <div key={month}>

                    <div className="flex items-center gap-3 my-6">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 whitespace-nowrap">
                        {month}
                      </p>

                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {txns.map((t) => {
                      const mc =
                        METAL_CONFIG[t.metalType];

                      const isCredit =
                        t.type === "CREDIT";

                      return (
                        <div
                          key={t.id}
                          className="bg-[#111117] border border-white/10 rounded-2xl p-4 mb-2 grid grid-cols-[42px_1fr_auto] gap-3 items-center hover:border-yellow-500/20 hover:translate-x-1 transition-all"
                        >

                          {/* ICON */}
                          <div
                            className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center
                          ${
                            isCredit
                              ? "bg-green-500/10"
                              : "bg-red-500/10"
                          }`}
                          >
                            {isCredit ? (
                              <ArrowDownLeft
                                size={18}
                                className="text-green-500"
                              />
                            ) : (
                              <ArrowUpRight
                                size={18}
                                className="text-red-500"
                              />
                            )}
                          </div>

                          {/* META */}
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate">
                              {t.note ||
                                "Transaction"}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mt-1">

                              {/* <span
                                className={`${mc.bg} ${mc.color} px-2 py-0.5 rounded-md text-[10px] uppercase tracking-[0.06em] font-bold`}
                              >
                                {mc.symbol}{" "}
                                {mc.label}
                              </span> */}

                              <span
                                className={`text-[10px] uppercase tracking-[0.06em] font-bold
                              ${
                                isCredit
                                  ? "text-successLight"
                                  : "text-errorLight"
                              }`}
                              >
                                {isCredit
                                  ? "CREDIT"
                                  : "WITHDRAWAL"}
                              </span>
                            </div>

                            <p className="text-[11px] text-zinc-500 mt-1">
                              {fmtDate(t.createdAt)}
                            </p>
                          </div>

                          {/* amount */}
                          <div className="text-right">
                            <p
                              className={`text-[15px] font-bold
                            ${
                              isCredit
                                ? "text-successLight"
                                : "text-errorLight"
                            }`}
                            >
                              {isCredit
                                ? "+"
                                : "−"}
                              ₹{fmt(t.amount)}
                            </p>

                            {/* <p className="text-[11px] text-zinc-500 mt-1">
                              {fmt(t.grams)} g
                            </p> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <>
                <div className="flex items-center justify-center flex-wrap gap-2 mt-10">

                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => p - 1);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-[#111117] text-zinc-500 flex items-center justify-center disabled:opacity-30 hover:border-yellow-500 hover:text-yellow-500 transition-all"
                  >
                    <ArrowLeft size={14} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setCurrentPage(p);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className={`w-9 h-9 rounded-xl border text-sm flex items-center justify-center transition-all
                      ${
                        p === currentPage
                          ? "bg-yellow-500 border-yellow-500 text-black font-bold"
                          : "border-white/10 bg-[#111117] text-zinc-500 hover:border-yellow-500 hover:text-yellow-500"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() => {
                      setCurrentPage((p) => p + 1);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-[#111117] text-zinc-500 flex items-center justify-center disabled:opacity-30 hover:border-yellow-500 hover:text-yellow-500 transition-all"
                  >
                    <ArrowLeft
                      size={14}
                      className="rotate-180"
                    />
                  </button>
                </div>

                <p className="text-center text-[11px] tracking-[0.08em] text-zinc-500 mt-3">
                  Showing{" "}
                  {(currentPage - 1) *
                    PAGE_SIZE +
                    1}
                  –
                  {Math.min(
                    currentPage * PAGE_SIZE,
                    filtered.length
                  )}{" "}
                  of {filtered.length}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default WalletTransaction