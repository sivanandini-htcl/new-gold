import { data, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  User, Phone, Mail, Edit, FileText, ShieldCheck, MapPin, CreditCard,
  Receipt, Clock, ArrowRightLeft, Gift, ShieldUser, Settings,
  TrendingUp, TrendingDown, Zap, BarChart2, ArrowUpRight,
  Wallet, Package, ChevronRight, Sparkles
} from "lucide-react";
import usePriceStore from "../store/priceStore";
import useAuthStore from "../store/authStore";
import usePortfolioStore from "../store/usePortfolioStore";
import api from "../api/axiosInstance";
import useKycStore from "../store/useKYCStore.JS";
import useMpinStore from "../store/useMpinStore";

const MENU_ITEMS = [
  { icon: Edit,           label: "Profile",    route: "/edit" },
  { icon: FileText,       label: "Nominee",    route: "/nominee" },
  { icon: ShieldCheck,    label: "KYC",        route: "/kycpage" },
  { icon: MapPin,         label: "Address",    route: "/delivery" },
  { icon: CreditCard,     label: "Account",    route: "/account" },
  { icon: Receipt,        label: "Billing",    route: "/billing" },
  { icon: ArrowRightLeft, label: "Transfers",  route: "/transactions" },
  { icon: Settings,       label: "Settings",   route: null },
];

const QUICK_ACTIONS = [
  { icon: BarChart2, label: "Reports",   sub: "Analytics & insights",  iconBg: "bg-amber-100",   iconBorder: "border-amber-300",   iconColor: "text-amber-700", route: null },
  { icon: Package,   label: "My Orders", sub: "Track deliveries",       iconBg: "bg-green-50",    iconBorder: "border-green-300",   iconColor: "text-green-700", route: "/orders" },
  { icon: Gift,      label: "Redeem",    sub: "Browse jewellery",       iconBg: "bg-amber-100",   iconBorder: "border-amber-300",   iconColor: "text-amber-700", route: "/redeem" },
  { icon: Clock,     label: "History",   sub: "All transactions",       iconBg: "bg-stone-100",   iconBorder: "border-stone-300",   iconColor: "text-stone-600", route: null },
];

export default function Profile() {
  const navigate = useNavigate();
  const[wallet,setWallet]=useState(null);
  const[metalWallet,setMetalWallet]=useState(null)
  const username  = useAuthStore((s) => s.user?.name);
  const userEmail = useAuthStore((s) => s.user?.email);
  const prices    = usePriceStore((s) => s.prices) || [];
  const { goldPercentage, silverPercentage } = usePriceStore();


  const goldPriceData   = prices.find((i) => i.metal === "GOLD");
  const silverPriceData = prices.find((i) => i.metal === "SILVER");
  const gram24kGold     = goldPriceData?.caratPrices?.gram24k   || 0;
  const gram24kSilver   = silverPriceData?.caratPrices?.gram24k || 0;

  const user = { phone: "9876543210", userId: "QWF12345678XXXX", gold: 12, silver: 14 };

  const goldValue      = user.gold   * gram24kGold;
  const silverValue    = user.silver * gram24kSilver;
  const totalValue     = goldValue + silverValue;
  const totalInvested  = 940000;
  const goldInvested   = 920000;
  const silverInvested = 20000;
  const goldPnL        = goldValue   - goldInvested;
  const silverPnL      = silverValue - silverInvested;
  const totalPnL       = totalValue  - totalInvested;
  const isProfit       = totalPnL >= 0;
  const goldAlloc   = totalValue > 0 ? ((goldValue   / totalValue) * 100).toFixed(0) : 50;
  const silverAlloc = totalValue > 0 ? ((silverValue / totalValue) * 100).toFixed(0) : 50;
  const kycStatus = useKycStore((state) => state.kycStatus);
const loadKycProgress = useKycStore((state) => state.loadKycProgress);
const mpinCreated = useMpinStore((state) => state.mpinCreated);
const fetchMPINStatus = useMpinStore((state) => state.fetchMPINStatus);

useEffect(() => {
  const fetchHoldings = async () => {
    try {
      const res = await api.post("/holdings");
      setWallet(res.data?.data);
      console.log("Wallet Response:", res.data);
      const holdRes=await api.get("/holdings/summary")
      setMetalWallet(holdRes.data?.data);
      console.log("metals res",holdRes.data)
      
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);

    }
  };

  fetchHoldings();
   loadKycProgress();
  fetchMPINStatus();


}, []);

  const fmt = (n) => n > 0 ? `₹${Math.round(n).toLocaleString("en-IN")}` : "—";
  

  return (
    <>

      <div className="pf-root  min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-4">

          {/*
              ROW 1 — Profile + Portfolio
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* ── Profile Card (2/3) ── */}
            <div className="md:col-span-2  rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm">

              {/* User info */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 pb-4 border-b border-white/20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 flex items-center justify-center shrink-0">
                  <User className="text-amber-700" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary truncate">
                      {username || "User Name"}
                    </h2>
                    <span className="text-xs font-medium bg-amber-100 text-background border border-primary/70 px-2 py-0.5 rounded-full shrink-0">
                      Premium
                    </span>
                      {kycStatus === "approved" && (
    <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
      KYC Verified
    </span>
  )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {[
                      { icon: Phone,      val: user.phone },
                      { icon: Mail,       val: userEmail || "—" },
                      { icon: ShieldUser, val: user.userId },
                    ].map(({ icon: Icon, val }) => (
                      <span key={val} className="flex items-center  gap-1.5 text-xs text-primary/80">
                        <Icon size={11} className="text-primary shrink-0" />
                        <span className="truncate  font-normal max-w-[180px]">{val}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu grid */}
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
         {/* {MENU_ITEMS
  .filter((item) => {
    if (
      item.label === "KYC" &&
      kycStatus === "approved" &&
      mpinCreated
    ) {
      return false;
    }

    return true;
  })
  .map(({ icon: Icon, label, route }) => ( */}
         {MENU_ITEMS.map(({ icon: Icon, label, route }) => (
                  <button
                    key={label}
                    className=" flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border border-white/20 bg-[#111112] cursor-pointer"
                    onClick={() => route && navigate(route)}
                  >
                    <div className="mico w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#111112] border border-white/20 flex items-center justify-center transition-all">
                      <Icon size={17} className="text-" />
                    </div>
                    <span className="text-center text-xs md:text-sm text-secondary font-medium leading-tight">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Portfolio Summary (1/3) ── */}
            <div className="md:col-span-1 rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm relative overflow-hidden">
              {/* Decorative bg circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gray-800 pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <Wallet size={14} className="text-primary/70" />
                <p className="text-xs uppercase tracking-widest text-primary font-medium">Total Portfolio</p>
              </div>

              <p className="hf text-2xl sm:text-3xl font-normal text-primary mb-1">
               {wallet?.portfolio?.currentValueINR}
              </p>

              <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-4 ${
                isProfit ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {isProfit
                  ? <TrendingUp size={11} />
                  : <TrendingDown size={11} />}
                {isProfit ? "+" : ""}
                {totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : "0"}%
                &nbsp;·&nbsp;
                {isProfit ? "+" : ""}₹{Math.abs(Math.round(totalPnL)).toLocaleString("en-IN")}
              </div>

              {/* Allocation bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-secondary mb-1">
                  <span>Gold {goldAlloc}%</span>
                  <span>Silver {silverAlloc}%</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden bg-secondary flex">
                  <div
                    className="h-full rounded-l-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all"
                    style={{ width: `${goldAlloc}%` }}
                  />
                  <div className="h-full flex-1 rounded-r-full bg-gradient-to-r from-stone-400 to-stone-300" />
                </div>
              </div>

              <div className="flex justify-between mt-3">
                {[
                  { col: "bg-amber-400", label: "Gold",   val: fmt(goldValue) },
                  { col: "bg-stone-400", label: "Silver", val: fmt(silverValue) },
                ].map(a => (
                  <div key={a.label} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${a.col}`} />
                    <span className="text-xs text-secondary">{a.label}</span>
                    <span className="text-xs font-semibold text-secondary">{a.val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex justify-between">
                <div>
                  <p className="text-xs text-secondary mb-0.5">Invested</p>
                  <p className="text-sm font-bold text-secondary">₹{wallet?.portfolio?.totalInvestedINR}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary mb-0.5">Unrealised P&L</p>
                  <p className={`text-sm font-bold ${isProfit ? "text-green-600" : "text-red-500"}`}>
                    {isProfit ? "+" : ""}₹{wallet?.portfolio?.unrealizedPnLINR}
                  </p>
                </div>
              </div>
            </div>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* ── Gold Card ── */}
            <div className=" rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm">
              {/* top accent */}
              {/* <div className="h-1 w-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 mb-4" /> */}
         <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-4"></div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className=" text-2xl sm:text-3xl font-bold text-primary">Gold</h3>
                    <span className="text-xs border border-white/20 bg-[#111112] text-primary/70 px-2 py-0.5 rounded-full font-medium">24K</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-secondary">
                      Live · ₹{metalWallet?.metals?.[0]?.livePriceINRPerGram || "Loading..."}/g
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary uppercase tracking-widest mb-0.5">Holdings</p>
                  <p className="hf text-xl font-bold text-secondary">{user.gold}g</p>
                </div>
              </div>

              {/* 2×2 stat grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: "Current Value", val:  `₹${metalWallet?.metals?.[0]?.currentValueINR ??"Loading.."}`, bold: true },
                  { label: "P&L",           val: `₹${metalWallet?.metals?.[0]?.profitLossINR ??"Loading.."}`},
                  { label: "Invested",      val: `₹${metalWallet?.metals?.[0]?.investedINR ??"Loading.."}`},
                  { label: "Return",        val: `₹${metalWallet?.metals?.[0]?.returnPercent ??"Loading.."}` },
                ].map((s, i) => (
                  <div key={i} className="bg-[#111112] border border-white/20 rounded-xl p-2.5">
                    <p className="text-xs  uppercase tracking-wider mb-1" >{s.label}</p>
                    <p className={`text-sm font-bold ${
                      s.profit !== undefined
                        ? s.profit ? "text-green-600" : "text-red-500/70"
                        : s.bold ? "text-secondary" : "text-secondary"
                    }`}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* progress bar */}
              <div className="mb-4">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-yellow-600"
                    style={{ width: `${Math.min(100, Math.abs(goldInvested > 0 ? (goldPnL/goldInvested)*100 : 0))}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/gold")}
                  className="flex-1 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-stone-900 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition shadow-sm"
                >
                  <Zap size={13} /> Buy
                </button>
                <button className="flex-1 border border-amber-200 text-amber-700 bg-amber-50 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-100 transition">
                  <ArrowUpRight size={13} /> Sell
                </button>
              </div>
            </div>

            {/* ── Silver Card ── */}
            <div className="hcard  rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-4 sm:p-5 shadow-sm">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="hf text-2xl sm:text-3xl font-bold ss">Silver</h3>
                    <span className="text-xs border border-white/20 bg-[#111112] text-primary/70 px-2 py-0.5 rounded-full font-medium">.999</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-white/70">
                      Live · ₹{metalWallet?.metals?.[1]?.livePriceINRPerGram || "Loading..."}/g
                    
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary uppercase tracking-widest mb-0.5">Holdings</p>
                  <p className=" text-secondary text-xl font-bold text-stone-8">{user.silver}g</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: "Current Value", val: `₹${metalWallet?.metals?.[1]?.currentValueINR ??"Loading.."}`,bold: true },
                  { label: "P&L",           val: `₹${metalWallet?.metals?.[1]?.profitLossINR ??"Loading.."}`},
                  { label: "Invested",      val: `₹${metalWallet?.metals?.[1]?.investedINR ??"Loading.."}` },
                  { label: "Return",        val:`₹${metalWallet?.metals?.[1]?.returnPercent ??"Loading.."}`},
                ].map((s, i) => (
                  <div key={i} className="bg-[#111112] border border-white/20 rounded-xl p-2.5">
                    <p className="text-xs text-secondary uppercase tracking-wider mb-1">{s.label}</p>
                    <p className={`text-sm font-bold ${
                      s.profit !== undefined
                        ? s.profit ? "text-green-600" : "text-red-500/70"
                        : s.bold ? "text-secondary" : "text-secondary"
                    }`}>{s.val}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-stone-700 "
                    style={{ width: `${Math.min(100, Math.abs(silverInvested > 0 ? (silverPnL/silverInvested)*100 : 0))}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/silver")}
                  className="flex-1 bg-gradient-to-r from-stone-600 via-stone-300 to-stone-600 text-stone-900 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition shadow-sm"
                >
                  <Zap size={13} /> Buy
                </button>
                <button className="flex-1 border border-stone-200 text-background bg-white/90 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-100 transition">
                  <ArrowUpRight size={13} /> Sell
                </button>
              </div>
            </div>
          </div>

          {/* ════════════════════════════
              ROW 3 — Quick Actions
          ════════════════════════════ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(({ icon: Icon, label, sub, iconBg, iconBorder, iconColor, route }) => (
              <div
                key={label}
                className={`qcard bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl  p-4 shadow-sm ${route ? "cursor-pointer" : ""}`}
                onClick={() => route && navigate(route)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-9 h-9 rounded-xl ${iconBg} border ${iconBorder} flex items-center justify-center`}>
                    <Icon size={16} className={iconColor} />
                  </div>
                  <ChevronRight size={13} className="text-stone-300 mt-0.5" />
                </div>
                <p className="text-sm font-semibold text-secondary mb-0.5">{label}</p>
                <p className="text-xs text-stone-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-amber-400 text-xs">◈</span>
            <p className="text-xs text-stone-400 tracking-wide">Prices updated live · Values indicative only</p>
            <span className="text-stone-300 text-xs">◈</span>
          </div>

        </div>
      </div>
    </>
  );
}