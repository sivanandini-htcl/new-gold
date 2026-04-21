import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  TrendingUp, DollarSign, Award, Shield, Zap, Star,
  ArrowRight, ShoppingBag, Gem, BarChart2, Lock,
  ChevronRight, Globe, Package, RefreshCw, Clock,
  TrendingDown, BadgeCheck, Coins
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import { useState, useEffect } from "react";
import usePriceStore from "../store/priceStore";
import useAuthStore from "../store/authStore";
import SlidingBanner from "../components/dashboardComponents/SlidingBanner";
import { jewelleryProducts } from "./Data/jewelleryProducts";
import DgiAssurance from "../components/dashboardComponents/Dgiassurance ";
import BlogSection from "../components/dashboardComponents/Blogsection";
// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.2 }
};

/* ─── Custom Tooltip ─────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/97 border border-amber-300 rounded-xl px-4 py-2.5 shadow-lg">
        <p className="text-yellow-950 text-xs mb-1">{label}</p>
        <p className="text-amber-700 font-bold text-lg">
          ₹{payload[0].value?.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

/* ─── Featured Product Card ──────────────────────────────── */
function ProductCard({ product, navigate }) {
  const isGold = product.type === "gold";
  
  return (
    <motion.div
      variants={scaleOnHover}
      whileHover="whileHover"
      onClick={() => navigate(`/productdetails/${product.id}`)}
      className={`bg-white border ${isGold ? "border-amber-200" : "border-gray-200"} rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full`}
    >
      <div className={`h-40 ${isGold ? "bg-white" : "bg-white"} flex items-center justify-center p-4 relative`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
        
        <span className={`absolute top-2.5 right-2.5 ${isGold ? "bg-gradient-to-r from-amber-700 to-amber-600" : "bg-gradient-to-r from-gray-600 to-gray-500"} text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-serif tracking-wider`}>
          {product.purity}
        </span>
        
      </div>
      <div className="w-full h-0.5 bg-gray-100"/>
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-serif text-sm font-bold text-stone-800 mb-0.5 line-clamp-1">
          {product.name}
        </p>
        <p className="text-xs text-gray-400 mb-2.5">
          {product.weight}g · {product.productType}
        </p>
        <div className="mt-auto">
          <p className={`font-serif text-base font-bold mb-2.5 ${isGold ? "text-yellow-950" : "text-gray-700"}`}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={e => { e.stopPropagation(); navigate(`/productdetails/${product.id}`); }}
            className={`w-full py-2 ${isGold ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-yellow-950" : "bg-gradient-to-r from-gray-600 via-gray-400 to-gray-500 text-gray-900"} border-none rounded-lg font-serif text-[11px] font-bold tracking-wider uppercase cursor-pointer`}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Stat Badge ───────*/
function StatBadge({ label, value, accent }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`bg-white border border-${accent === "#b45309" ? "amber" : accent === "#065f46" ? "emerald" : "blue"}-200 rounded-xl p-3.5 flex flex-col gap-1`}
    >
      <span className="text-xs text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <span className={`font-serif text-xl font-bold text-[${accent}]`}>
        {value}
      </span>
    </motion.div>
  );
}
 

/* ─── Insight Card ───────────────────────────────────────── */
function InsightCard({ icon: Icon, title, description, accent, bg }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(202,138,4,0.13)" }}
      className="bg-white border border-amber-200 rounded-xl p-5 cursor-default transition-all"
    >
      <div className={`w-11 h-11 rounded-xl bg-[${bg}] flex items-center justify-center mb-3.5`}>
        <Icon size={22} color={accent} />
      </div>
      <h4 className="font-serif text-[15px] font-bold text-yellow-950 mb-2">
        {title}
      </h4>
      <p className="text-xs text-yellow-900 leading-relaxed opacity-80">
        {description}
      </p>
    </motion.div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────── */
function Dashboard() {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState("6M");
  const [selectedMetal, setSelectedMetal] = useState("gold");
  const ranges = ["1D", "5D", "6M", "YTD", "1Y", "5Y", "MAX"];
  const goldPercentage = usePriceStore((state) => state.goldPercentage);
  const silverPercentage = usePriceStore((state) => state.silverPercentage);
  const isProfit = Number(goldPercentage) > 0;
  const silverisProfit = Number(silverPercentage) > 0;
  const [status, setStatus] = useState("Connecting...");
  const prices = usePriceStore((state) => state.prices);
  const goldPrice = prices.find((item) => item.metal === "GOLD");
  const silverPrice = prices.find((item) => item.metal === "SILVER");
  const userName = useAuthStore((state) => state.user?.name);
  const gram24kGoldPrice = goldPrice?.caratPrices?.gram24k;
  const gram24ksilverPrice = silverPrice?.caratPrices?.gram24k;
  const profileData = useAuthStore((state) => state.profileData);
  
  /* ── Chart Data ── */
  const goldData = {
    "1D": [{ date: "9AM", price: 6200 }, { date: "11AM", price: 6280 }, { date: "1PM", price: 6310 }, { date: "3PM", price: 6350 }],
    "5D": [{ date: "Mon", price: 5800 }, { date: "Tue", price: 5900 }, { date: "Wed", price: 6000 }, { date: "Thu", price: 6200 }, { date: "Fri", price: 6350 }],
    "6M": [{ date: "Jan", price: 5800 }, { date: "Feb", price: 5950 }, { date: "Mar", price: 5850 }, { date: "Apr", price: 6100 }, { date: "May", price: 6200 }, { date: "Jun", price: 6350 }],
    "YTD": [{ date: "Jan", price: 5800 }, { date: "Feb", price: 5200 }, { date: "Mar", price: 6100 }],
    "1Y": [{ date: "Q1 24", price: 4800 }, { date: "Q2 24", price: 5100 }, { date: "Q3 24", price: 5600 }, { date: "Q4 24", price: 6000 }, { date: "Q1 25", price: 6350 }],
    "5Y": [{ date: "2021", price: 3500 }, { date: "2022", price: 4200 }, { date: "2023", price: 5000 }, { date: "2024", price: 5800 }, { date: "2025", price: 6350 }],
    "MAX": [{ date: "2018", price: 3000 }, { date: "2019", price: 3200 }, { date: "2020", price: 4000 }, { date: "2021", price: 3500 }, { date: "2022", price: 4200 }, { date: "2023", price: 5000 }, { date: "2024", price: 5800 }, { date: "2025", price: 6350 }],
  };
  
  const silverData = {
    "1D": [{ date: "9AM", price: 82 }, { date: "11AM", price: 84 }, { date: "1PM", price: 83 }, { date: "3PM", price: 86 }],
    "5D": [{ date: "Mon", price: 78 }, { date: "Tue", price: 80 }, { date: "Wed", price: 82 }, { date: "Thu", price: 84 }, { date: "Fri", price: 86 }],
    "6M": [{ date: "Jan", price: 72 }, { date: "Feb", price: 75 }, { date: "Mar", price: 70 }, { date: "Apr", price: 78 }, { date: "May", price: 82 }, { date: "Jun", price: 86 }],
    "YTD": [{ date: "Jan", price: 72 }, { date: "Feb", price: 68 }, { date: "Mar", price: 80 }],
    "1Y": [{ date: "Q1 24", price: 62 }, { date: "Q2 24", price: 67 }, { date: "Q3 24", price: 73 }, { date: "Q4 24", price: 80 }, { date: "Q1 25", price: 86 }],
    "5Y": [{ date: "2021", price: 52 }, { date: "2022", price: 60 }, { date: "2023", price: 68 }, { date: "2024", price: 78 }, { date: "2025", price: 86 }],
    "MAX": [{ date: "2018", price: 38 }, { date: "2019", price: 44 }, { date: "2020", price: 60 }, { date: "2021", price: 52 }, { date: "2022", price: 60 }, { date: "2023", price: 68 }, { date: "2024", price: 78 }, { date: "2025", price: 86 }],
  };
  
  const chartData = selectedMetal === "gold" ? goldData : silverData;
  const chartColor = selectedMetal === "gold" ? "#b45309" : "#6b7280";
  const chartGradientId = selectedMetal === "gold" ? "goldGrad" : "silverGrad";
  
  /* ── Products ── */
  const featuredGold = jewelleryProducts.filter(p => p.type === "gold").slice(0, 4);
  const featuredSilver = jewelleryProducts.filter(p => p.type === "silver").slice(0, 4);
  
  /* ── Insights ── */
  const insights = [
    { icon: Shield, title: "Hedge Against Inflation", description: "Gold and silver have historically preserved purchasing power through economic downturns and currency devaluation.", accent: "#b45309", bg: "#fef3c7" },
    { icon: TrendingUp, title: "Long-term Growth", description: "Precious metals have appreciated consistently over decades — a proven vehicle for long-term wealth accumulation.", accent: "#065f46", bg: "#d1fae5" },
    { icon: DollarSign, title: "Portfolio Diversification", description: "Low correlation with equities means metals can buffer portfolio volatility during market stress.", accent: "#1e40af", bg: "#dbeafe" },
    { icon: Zap, title: "Instant Liquidity", description: "Convert digital holdings to cash in minutes — no physical storage, no logistics, no delays.", accent: "#7c3aed", bg: "#ede9fe" },
    { icon: Lock, title: "Secure & Audited", description: "Your holdings are backed by physical metals stored in insured, SEBI-compliant vaults and audited regularly.", accent: "#dc2626", bg: "#fee2e2" },
    { icon: Globe, title: "Globally Recognised", description: "Gold and silver are universally accepted stores of value, transcending borders and currencies.", accent: "#0369a1", bg: "#e0f2fe" },
    { icon: BadgeCheck, title: "99.9% Purity", description: "All metal purchases are certified with hallmark purity, ensuring you always get the highest quality.", accent: "#92400e", bg: "#fef9c3" },
    { icon: RefreshCw, title: "Anytime, Anywhere", description: "Buy, sell, or redeem your digital gold and silver 24/7 from any device with zero paperwork.", accent: "#047857", bg: "#d1fae5" },
  ];
  
  /* ── Why DGI Stats ── */
  const stats = [
    { label: "Customers", value: "2.5L+", accent: "#b45309" },
    { label: "Assets Under Management", value: "₹480Cr+", accent: "#b45309" },
    { label: "Purity Guaranteed", value: "99.9%", accent: "#065f46" },
    { label: "Years of Trust", value: "8+", accent: "#1e40af" },
  ];
  
  const isLive = status === "Live Connected";
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen font-serif bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50 py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Banner ── */}
        <SlidingBanner />
        
        {/* ── Header ── */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-10 pb-6 border-b border-amber-200"
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-full mb-4" />
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-5xl mb-0 tracking-tight leading-none">
                <span className="bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                  Dgi
                </span>
                <span className="text-gray-500">Gold</span>
              </h1>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-amber-700">
                Gold &amp; Silver · Investment Platform
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Welcome back, <strong>{userName || profileData?.email || "Investor"}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 shadow-[0_0_0_3px_#bbf7d0]" : "bg-red-500 shadow-[0_0_0_3px_#fecaca]"}`} />
              <span className={`text-xs ${isLive ? "text-green-600" : "text-red-600"}`}>{status}</span>
            </div>
          </div>
        </motion.div>
        
        {/* ── Price Cards ── */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-9"
        >
          {/* Gold */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white border-2 border-amber-300/10 rounded-2xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-gradient-radial from-amber-100 to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <Coins size={22} color="#b45309" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-amber-700 mb-0">Gold · 24K / gram</p>
                  <h2 className="font-serif text-[30px] font-bold text-amber-800 mb-0 leading-tight">
                    ₹{Math.round(gram24kGoldPrice)?.toLocaleString("en-IN") || "—"}
                  </h2>
                </div>
              </div>
              {goldPercentage && (
                <span className={`${isProfit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} font-serif text-xs font-bold px-3 py-1.5 rounded-full`}>
                  {isProfit ? "▲" : "▼"} {Math.abs(goldPercentage)}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mb-4">
              Updated: {goldPrice ? new Date(goldPrice.timestamp).toLocaleString() : "Loading..."}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/gold")}
                className="py-3 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-white border-none rounded-xl font-serif text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                Buy Gold
              </motion.button>
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-transparent text-yellow-950 border-2 border-amber-300/30 rounded-xl font-serif text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                Sell Gold
              </motion.button>
            </div>
          </motion.div>
          
          {/* Silver */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md relative overflow-hidden"
          >
            <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-gradient-radial from-gray-100 to-transparent pointer-events-none" />
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Gem size={22} color="#6b7280" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-0">Silver · 24K / gram</p>
                  <h2 className="font-serif text-[30px] font-bold text-gray-700 mb-0 leading-tight">
                    ₹{Math.round(gram24ksilverPrice)?.toLocaleString("en-IN") || "—"}
                  </h2>
                </div>
              </div>
              {silverPercentage && (
                <span className={`${silverisProfit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} font-serif text-xs font-bold px-3 py-1.5 rounded-full`}>
                  {silverisProfit ? "▲" : "▼"} {Math.abs(silverPercentage)}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mb-4">
              Updated: {silverPrice ? new Date(silverPrice.timestamp).toLocaleString() : "Loading..."}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/silver")}
                className="py-3 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white border-none rounded-xl font-serif text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                Buy Silver
              </motion.button>
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-transparent text-gray-700 border-2 border-gray-200 rounded-xl font-serif text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                Sell Silver
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* ── Stats Row ── */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10"
        >
          {stats.map((s, i) => <StatBadge key={i} {...s} />)}
        </motion.div>
        
        {/* ── Chart Section ── */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="bg-white border border-amber-200 rounded-2xl p-7 mb-10 shadow-md"
        >
          <div className="flex items-center justify-between flex-wrap gap-3.5 mb-5">
            <div>
              <h3 className="font-serif text-xl text-yellow-950 mb-0 font-bold">
                Price Trend
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 mb-0">
                {selectedMetal === "gold" ? "Gold" : "Silver"} · {selectedRange}
              </p>
            </div>
            <div className="flex gap-2.5 flex-wrap items-center">
              {/* Metal toggle */}
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <motion.button
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMetal("gold")}
                  className={`px-4 py-1.5 rounded-md border-none font-serif text-xs font-bold cursor-pointer transition-all ${
                    selectedMetal === "gold" 
                      ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-white" 
                      : "bg-transparent text-gray-500"
                  }`}
                >
                  Gold
                </motion.button>
                <motion.button
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMetal("silver")}
                  className={`px-4 py-1.5 rounded-md border-none font-serif text-xs font-bold cursor-pointer transition-all ${
                    selectedMetal === "silver" 
                      ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white" 
                      : "bg-transparent text-gray-500"
                  }`}
                >
                  Silver
                </motion.button>
              </div>
              {/* Range selector */}
              <div className="flex gap-1">
                {ranges.map(r => (
                  <motion.button
                    key={r}
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedRange(r)}
                    className={`px-2.5 py-1.5 rounded-md border-none font-serif text-[11px] font-bold cursor-pointer transition-all ${
                      selectedRange === r 
                        ? "bg-amber-100 text-yellow-950" 
                        : "bg-transparent text-gray-400"
                    }`}
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData[selectedRange]}>
              <defs>
                <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#a1a1aa", fontFamily: "serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#a1a1aa", fontFamily: "serif" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={2.5}
                fill={`url(#${chartGradientId})`}
                dot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: chartColor }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* ── Featured Products ── */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="font-serif text-2xl text-amber-800 mb-0 font-bold">
                Featured Gold Jewellery
              </h2>
              <p className="text-xs text-yellow-900/60 mt-1 mb-0">Redeem your holdings as certified gold products</p>
            </div>
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/redeem")}
              className="flex items-center gap-1.5 bg-transparent border-2 border-amber-300 rounded-lg px-4 py-2 font-serif text-xs text-yellow-950 cursor-pointer font-bold"
            >
              View All <ChevronRight size={14} />
            </motion.button>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {featuredGold.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </motion.div>
        </motion.div>
        
        {/* ── Featured Silver Products ── */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="font-serif text-2xl text-gray-700 mb-0 font-bold">
                Featured Silver Collection
              </h2>
              <p className="text-xs text-gray-500 mt-1 mb-0">Handpicked silver pieces for every occasion</p>
            </div>
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/redeem")}
              className="flex items-center gap-1.5 bg-transparent border-2 border-gray-200 rounded-lg px-4 py-2 font-serif text-xs text-gray-700 cursor-pointer font-bold"
            >
              View All <ChevronRight size={14} />
            </motion.button>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {featuredSilver.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </motion.div>
        </motion.div>
        
        {/* ── Why Invest ── */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="font-serif text-[30px] text-yellow-950 mb-0 font-bold">
              Why Invest in Digital Gold &amp; Silver?
            </h2>
            <p className="text-xs text-yellow-900 mt-2">
              Trusted by 2.5 lakh+ investors across India
            </p>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {insights.map((item, i) => <InsightCard key={i} {...item} />)}
          </motion.div>
        </motion.div>
        <div className="mb-12">
  <DgiAssurance />
</div>

<div className="mb-12">
  <BlogSection />
</div>
        {/* ── Quick Actions Banner ── */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-[#1a1508] via-[#3f2e10] to-[#141414] rounded-2xl p-9 flex items-center justify-between flex-wrap gap-5 mb-8"
        >
          <div>
            <h3 className="font-serif text-2xl text-white mb-0 font-bold">
              Start Investing Today
            </h3>
            <p className="text-white/75 text-xs mt-1.5">
              As low as ₹1 · Instant delivery to your account
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/gold")}
              className="px-7 py-3 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black text-amber-800 border-none rounded-xl font-serif text-xs font-bold cursor-pointer tracking-wide"
            >
              Buy Gold
            </motion.button>
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/silver")}
              className="px-7 py-3 bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 rounded-xl font-serif text-xs font-bold cursor-pointer tracking-wide"
            >
              Buy Silver
            </motion.button>
          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
}

export default Dashboard;