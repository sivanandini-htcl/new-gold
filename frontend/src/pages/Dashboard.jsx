

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  TrendingUp, DollarSign, Award, Shield, Zap, Star,
  ArrowRight, ShoppingBag, Gem, BarChart2, Lock,
  ChevronRight, Globe, Package, RefreshCw, Clock,
  TrendingDown, BadgeCheck, Coins, Building2,
  Sparkles, Tag, Heart, ShoppingCart, Eye
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
import ProductCarousel from "../components/dashboardComponents/ProductCarousel.JSX";
import dg from "../assets/dg";
// import DashboardBar from "../assets/coins.png";
import BackgroundImg1 from "../assets/background1.jpg";
import WorksCarousel from "./ImgaeSlider";
import silver from "../assets/silver.png";
import Section from "../components/dashboardComponents/SilverScroller";
import Gift from "../assets/Gift.png";
import banner from "../assets/banner.png";


// ─── Animation Variants ─
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// ─── GIFT CATEGORY DATA ──
const corporateGiftCategories = [
  {
    id: "cg1",
    title: "Executive Gold Coins",
    subtitle: "Premium 24K · Hallmarked",
    tag: "Best Seller",
    tagColor: "bg-amber-600",
    icon: "🏆",
    price: "₹4,999",
    moq: "Min. 10 units",
    gradient: "from-amber-900 via-amber-800 to-yellow-900",
  },
  {
    id: "cg2",
    title: "Silver Ingot Sets",
    subtitle: "999 Fine Silver · Gift Boxed",
    tag: "Corporate",
    tagColor: "bg-slate-600",
    icon: "🥈",
    price: "₹2,499",
    moq: "Min. 25 units",
    gradient: "from-slate-800 via-slate-700 to-gray-800",
  },
  {
    id: "cg3",
    title: "Branded Bar Collection",
    subtitle: "Customizable Engraving",
    tag: "Custom",
    tagColor: "bg-emerald-700",
    icon: "✨",
    price: "₹8,999",
    moq: "Min. 5 units",
    gradient: "from-emerald-900 via-teal-900 to-slate-900",
  },
  {
    id: "cg4",
    title: "Festival Gifting Kits",
    subtitle: "Gold + Silver Combo",
    tag: "Seasonal",
    tagColor: "bg-rose-700",
    icon: "🎁",
    price: "₹6,499",
    moq: "Min. 15 units",
    gradient: "from-rose-900 via-pink-900 to-slate-900",
  },
];

const personalGiftCategories = [
  {
    id: "pg1",
    title: "Birthday Gold Coin",
    subtitle: "Personalised · 24K Pure",
    emoji: "🎂",
    price: "From ₹1,499",
    badge: "Popular",
  },
  {
    id: "pg2",
    title: "Wedding Silver Set",
    subtitle: "Elegant Gift Box",
    emoji: "💍",
    price: "From ₹3,999",
    badge: "Trending",
  },
  {
    id: "pg3",
    title: "New Baby Blessing",
    subtitle: "22K Gold Charm",
    emoji: "👶",
    price: "From ₹2,199",
    badge: "New",
  },
  {
    id: "pg4",
    title: "Anniversary Pack",
    subtitle: "Gold & Silver Duo",
    emoji: "❤️",
    price: "From ₹5,499",
    badge: "Gifting",
  },
];

// ─── PRODUCT CARD (Ecommerce Style) ──────────────────────────────
export function ProductCard({ product, navigate }) {
  const isGold = product.type === "gold";
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/productdetails/${product.id}`)}
      className="bg-white rounded-full md:rounded-none  border border-gray-100 shadow-2xl overflow-hidden cursor-pointer flex flex-col group relative "
   
    >
      {/* Wishlist Button */}


      {/* Purity Badge */}
      {/* <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full font-serif tracking-wider ${isGold ? "bg-[#3C2415] text-amber-50" : "bg-slate-600 text-slate-50"}`}>
        {product.purity}
      </span> */}

      {/* Image Area */}
      <div className="relative  h-44 sm:h-48 2xl:h-60 bg-white overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition duration-400 group-hover:scale-105"
        />

        {/* Quick Add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent p-3 flex gap-2">
          <button
            onClick={e => { e.stopPropagation(); navigate(`/productdetails/${product.id}`); }}
            className="flex-1 flex items-center justify-center gap-1.5 text-white text-[11px] font-bold py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition backdrop-blur-sm"
          >
            <Eye size={11} /> Quick View
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px ${isGold ? "bg-amber-100" : "bg-gray-100"}`} />

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col gap-1 text-center">
        <p className="font-serif text-xs font-bold text-stone-800 line-clamp-1 2xl:text-sm">
          {product.name}
        </p>
       

        {/* Rating stub */}


        <div className="mt-auto pt-2 flex items-center justify-center">
          <div>
            {/* <p className={`font-serif text-sm font-bold  text-center 2xl:text-base ${isGold ? "text-amber-900" : "text-slate-700"}`}>
              ₹{product.price.toLocaleString("en-IN")}
            </p> */}
          
          </div>
       
        </div>
      </div>
    </motion.div>
  );
}

// ─── Corporate Gift Card ──────────────────────────────────────────
function CorporateGiftCard({ item, navigate }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.22 }}
      onClick={() => navigate("/corporate-gifting")}
      className={`relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${item.gradient} p-5 flex flex-col gap-3 min-h-[180px] 2xl:min-h-[220px] border border-white/10`}
    >
      <span className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white ${item.tagColor} tracking-wider uppercase`}>
        {item.tag}
      </span>
      <div className="text-3xl 2xl:text-4xl">{item.icon}</div>
      <div>
        <p className="text-white font-serif font-bold text-sm 2xl:text-base leading-tight">{item.title}</p>
        <p className="text-white/60 text-[11px] mt-0.5 2xl:text-xs">{item.subtitle}</p>
      </div>
      <div className="mt-auto flex items-end justify-between">
        <div>
          <p className="text-amber-300 font-bold text-sm 2xl:text-base font-serif">{item.price}</p>
          <p className="text-white/40 text-[10px]">{item.moq}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <ArrowRight size={14} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Personal Gift Card ──────────────────────────────────────────
function PersonalGiftCard({ item, navigate }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate("/gifting")}
      className="bg-white border border-amber-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 cursor-pointer hover:border-amber-300 hover:shadow-md transition group 2xl:p-6"
    >
      <div className="text-3xl 2xl:text-4xl group-hover:scale-110 transition">{item.emoji}</div>
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 tracking-wider uppercase">
        {item.badge}
      </span>
      <p className="font-serif font-bold text-stone-800 text-xs 2xl:text-sm leading-tight">{item.title}</p>
      <p className="text-[11px] text-gray-400 2xl:text-xs">{item.subtitle}</p>
      <p className="text-amber-800 font-serif font-bold text-xs mt-auto 2xl:text-sm">{item.price}</p>
    </motion.div>
  );
}

// ─── Section Header ───────────────────────────────────────────────
function SectionHeader({ title, subtitle, onViewAll, gold = true }) {
  return (
    <div className="flex justify-between items-end mb-5 2xl:mb-7">
      <div>
        <h2 className={`font-serif text-xl sm:text-2xl 2xl:text-3xl font-bold leading-tight
          ${gold
            ? "text-[#3C2415] "
            : "text-slate-800"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1 2xl:text-sm">{subtitle}</p>
        )}
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className={`flex items-center gap-1 text-xs font-bold font-serif px-2 py-1 rounded-lg transition 2xl:text-sm 2xl:px-4 2xl:py-2
            ${gold
              ? "text-[#3C2415] border border-[#3C2415] hover:bg-amber-50"
              : "text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
        >
          View All <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

// ─── Main Dashboard 
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

  const featuredGold = jewelleryProducts.filter(p => p.type === "gold").slice(0, 4);
  const featuredSilver = jewelleryProducts.filter(p => p.type === "silver").slice(0, 4);
  const isLive = status === "Live Connected";

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

  return (
    <div className="min-h-screen font-serif bg-[#faf7f2]">

      {/* ── BANNER ─ */}
      <div className="  ">
        <SlidingBanner />
      </div>

      {/* ── LIVE PRICE STRIP  */}
      <div className=" mb-6 2xl:mb-10">
        <div className="flex flex-col sm:flex-row ">

          {/* GOLD */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex-1 bg-gradient-to-br from-slate-50 to-gray-50   px-4 py-4 2xl:px-6 2xl:py-5 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3 2xl:gap-4">
              <div className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-xl bg-[#3c2415] flex items-center justify-center shadow">
                <Coins size={20} color="#fff" className="2xl:w-7 2xl:h-7" />
              </div>
              <div>
                <p className="text-[10px] 2xl:text-xs text-[#3c2415] uppercase tracking-widest font-bold">Gold · 24K / gram</p>
                <p className="font-serif font-black text-[#6b4228] text-sm 2xl:text-2xl leading-tight">
                  ₹{Math.round(gram24kGoldPrice)?.toLocaleString("en-IN") || "—"}
                </p>
                <span className={`text-[11px] 2xl:text-xs font-semibold ${isProfit ? "text-green-600" : "text-red-500"}`}>
                  {isProfit ? "▲" : "▼"} {goldPercentage}% today
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/gold")}
              className="text-[11px] 2xl:text-sm font-black px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl bg-[#3C2415] text-white hover:from-[#754c33] transition shadow"
            >
              Buy Gold
            </button>
          </motion.div>

          {/* SILVER */}
          <motion.div
            whileHover={{ y: -2 }}
            className="flex-1 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200  px-4 py-4 2xl:px-6 2xl:py-5 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3 2xl:gap-4">
              <div className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-xl bg-gradient-to-br from-slate-600 to-gray-500 flex items-center justify-center shadow">
                <Gem size={20} color="#fff" className="2xl:w-7 2xl:h-7" />
              </div>
              <div>
                <p className="text-[10px] 2xl:text-xs text-slate-500 uppercase tracking-widest font-bold">Silver · 24K / gram</p>
                <p className="font-serif font-black text-slate-800 text-sm 2xl:text-2xl leading-tight">
                  ₹{Math.round(gram24ksilverPrice)?.toLocaleString("en-IN") || "—"}
                </p>
                <span className={`text-[11px] 2xl:text-xs font-semibold ${silverisProfit ? "text-green-600" : "text-red-500"}`}>
                  {silverisProfit ? "▲" : "▼"} {silverPercentage}% today
                </span>
              </div>
            </div>
           <button
  onClick={() => navigate("/silver")}
  className="text-[11px] 2xl:text-sm font-black px-3 py-2 2xl:px-5 2xl:py-2.5 rounded-xl bg-gradient-to-r from-slate-700 to-gray-600 text-white hover:from-slate-800 transition shadow whitespace-nowrap"
>
  Buy Silver
</button>
          </motion.div>

        </div>
      </div>

      {/* ── HERO BANNER: GOLD ────── */}
      <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-10 2xl:mb-14 ">
        <div className="flex flex-col md:flex-row gap-4 2xl:gap-8 items-center bg-[#DDD9CE] rounded-3xl overflow-hidden p-6 sm:p-8 2xl:p-12 shadow-xl">
          <div className="md:w-1/2 2xl:w-1/2">
            <span className="inline-block text-[10px] 2xl:text-xs uppercase tracking-widest text-[#3C2415] font-bold mb-3 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              ✦ Pure · Certified · Hallmarked
            </span>
            <h1 className="text-3xl sm:text-4xl 2xl:text-6xl font-serif font-black text-[#3C2415] leading-tight mb-3 2xl:mb-5">
              Pure wealth,<br />
              <span className="text-[#3C2415]">
                secured in every bar
              </span>
            </h1>
            <p className="font-serif text-sm 2xl:text-base text-[#3C2415] leading-relaxed max-w-md">
              Invest in certified 24K digital gold backed by physical reserves. Transparent pricing, zero making charges, instant delivery to your vault.
            </p>
            <div className="flex gap-3 mt-5 2xl:mt-7">
              <button
                onClick={() => navigate("/gold")}
                className="px-2 py-1 md:py-2.5 2xl:px-7 2xl:py-3 rounded-xl bg-[#3C2415] text-white font-bold text-sm 2xl:text-base hover:from-amber-700 transition shadow-lg"
              >
                Invest  Now
              </button>
              <button
                onClick={() => navigate("/redeem")}
                className="px-1 py-1 md:py-2.5 2xl:px-7 2xl:py-3 rounded-xl border text-[#3C2415] shadow-2xl font-bold text-sm 2xl:text-base hover:bg-amber-400/10 transition"
              >
                View Catalogue
              </button>
            </div>
          </div>
          <div className="md:w-1/2 2xl:w-1/2">
            {/* <img src={DashboardBar} alt="Gold Bar" className="w-full rounded-2xl object-cover" /> */}
          </div>
        </div>
      </div>

      {/* ── FEATURED GOLD PRODUCTS ── */}
      <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-10 2xl:mb-14  text-[#3C2415]">
        <div className=" rounded-3xl bg-[#DDD9CE] shadow-sm  p-5 2xl:p-8">
          <SectionHeader
            title="Featured Gold Jewellery"
            subtitle="Redeem your holdings as certified gold products"
            onViewAll={() => navigate("/redeem")}
            gold={true}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 2xl:gap-5">
            {featuredGold.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SILVER HERO ──── */}
      {/* <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-10 2xl:mb-14">
        <Section />
      </div> */}

      <div className="  mb-10 2xl:mb-14">
        <div className="flex flex-col  md:flex-row gap-4 2xl:gap-8 items-center bg-[#25160c]  overflow-hidden p-6 sm:p-8  border border-slate-700/30">
          <div className="md:w-1/2 2xl:w-1/2 order-2 md:order-1">
            <img src={silver} alt="Silver" className="w-full md:w-100 md:h-100 rounded-2xl object-cover" />
          </div>
          <div className="md:w-1/2 2xl:w-1/2 order-1 md:order-2">
            <span className="inline-block text-[10px] 2xl:text-xs uppercase tracking-widest text-[#DDD9CE] font-bold mb-3 bg-slate-400/10 px-3 py-1 rounded-full border border-slate-400/20">
              ✦ 999 Fine Silver · Certified
            </span>
            <h1 className="text-3xl sm:text-4xl 2xl:text-6xl font-serif font-black text-[#DDD9CE] leading-tight mb-3 2xl:mb-5">
              Silver — the<br />
              <span className="text-[#DDD9CE]">
                smart investment
              </span>
            </h1>
            <p className="font-serif text-sm 2xl:text-base text-slate-300/70 leading-relaxed max-w-md">
              Start from just ₹10. Invest in 999 fine silver with real-time pricing, zero storage hassle, and instant redemption.
            </p>
            <div className="flex gap-3 mt-5 2xl:mt-7">
              <button
                onClick={() => navigate("/silver")}
                className="px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-xl bg-gradient-to-r from-slate-500 to-gray-400 text-[#DDD9CE] font-bold text-sm 2xl:text-base hover:from-slate-600 transition shadow-lg"
              >
                Buy Silver
              </button>
              <button
                onClick={() => navigate("/redeem")}
                className="px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-xl border border-slate-400/30 text-[#DDD9CE] font-bold text-sm 2xl:text-base hover:bg-slate-400/10 transition"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED SILVER PRODUCTS ─────────────────────── */}
      <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-10 2xl:mb-14">
        <div className="text-[#DDD9CE] rounded-3xl shadow-sm border border-slate-100  bg-[#DDD9CE] p-5 2xl:p-8">
          <SectionHeader
            title="Featured Silver Collection"
            subtitle="Handpicked silver pieces for every occasion"
            onViewAll={() => navigate("/redeem")}
            gold={false}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 2xl:gap-5">
            {featuredSilver.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>

    

      {/* ── CORPORATE GIFTING ───── */}
      {/* <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-6 2xl:mb-10">
        <div className="rounded-3xl overflow-hidden border border-stone-200">
        
          <div className="bg-gradient-to-r from-[#1a1208] to-[#2d1f0a] px-5 py-4 2xl:px-8 2xl:py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-amber-400 2xl:w-6 2xl:h-6" />
              <div>
                <p className="font-serif font-bold text-white text-sm 2xl:text-base">Corporate Gifting</p>
                <p className="text-amber-300/70 text-[10px] 2xl:text-xs">Bulk orders · Custom engraving · Branded packaging</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/corporate-gifting")}
              className="flex items-center gap-1 text-[11px] 2xl:text-xs font-bold text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-lg hover:bg-amber-400/10 transition"
            >
              Get Quote <ArrowRight size={11} />
            </button>
          </div>
       
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-stone-50 2xl:gap-5 2xl:p-6">
            {corporateGiftCategories.map(item => (
              <CorporateGiftCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        </div>
      </div> */}

      {/* ── PERSONAL GIFTING ─── */}
      {/* <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-10 2xl:mb-14">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl border border-amber-100 p-5 2xl:p-8">
          <div className="flex items-center justify-between mb-5 2xl:mb-7">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-600 2xl:w-5 2xl:h-5" />
              <div>
                <p className="font-serif font-bold text-amber-900 text-sm 2xl:text-base">Personal Gifting</p>
                <p className="text-amber-700/60 text-[10px] 2xl:text-xs">Celebrate moments with pure gold & silver</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/gifting")}
              className="text-[11px] 2xl:text-xs font-bold text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition flex items-center gap-1"
            >
              All Gifts <ChevronRight size={11} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-5">
            {personalGiftCategories.map(item => (
              <PersonalGiftCard key={item.id} item={item} navigate={navigate} />
            ))}
          </div>
        </div>
      </div> */}

      {/* ── WORKS CAROUSEL ── */}
      <div className="mb-0">
        <WorksCarousel />
      </div>

      {/* ── INSIGHTS GRID ──*/}
      <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 py-10 2xl:py-16 bg-white">
        <div className="text-center mb-8 2xl:mb-12">
          <span className="text-[10px] 2xl:text-xs uppercase tracking-widest text-amber-600 font-bold">Why invest in precious metals</span>
          <h2 className="font-serif text-2xl sm:text-3xl 2xl:text-4xl font-black text-stone-800 mt-1">Built for wealth. Designed for trust.</h2>
        </div>
      

      <div>

        <div className="grid grid-cols-2  items-center gap-10">
        <img src={Gift} alt="" className="lg:h-140 lg:w-140 flex justify-center items-center" />
        
          <div className=" grid items-center">
            <div className="md:flex md:flex-col md:space-y-4">
              <p className=" md:text-2xl font-serif font-bold text-[#3C2415]  md:font-semibold md:leading-tight md:mb-3 lg:text-4xl 2xl:text-6xl">Celebrate festivals with gifts that carry lasting value and timeless beauty</p>
            </div>
            <div>
              <p className=" hidden md:inline-flex font-serif text-xs md:font-serif md:text-lg md:leading-relaxed">We make every occasion more meaningful,whether it’s a celebration of tradition, prosperity, or togetherness, these precious metal gifts are a
   thoughtful way to share blessings while giving something that grows in value over time.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-10 ">
          <div className=" grid items-center">
            <div className="md:flex md:flex-col md:space-y-4">
              <p className=" md:text-2xl font-serif font-bold text-[#3C2415]  md:font-semibold md:leading-tight lg:text-4xl 2xl:text-6xl">Reward Excellence. Build Lasting Bonds</p>
            </div>
            <div>
              <p className=" hidden md:inline-flex font-serif text-xs md:font-serif md:text-lg md:mt-3 md:leading-relaxed">Dgigold offers pure gold and silver coins that make every occasion more meaningful. Whether it’s a celebration of tradition, prosperity, or togetherness, these precious metal gifts are a
   thoughtful way to share blessings while giving something that grows in value over time.</p>
            </div>
          </div>

          
          <img src={banner} alt="" className="lg:h-140 lg:w-140 flex justify-center items-center"/>
        </div>
        

      </div>

      

      </div>

      {/* BLOG  */}
      <BlogSection />

    </div>
  );
}

export default Dashboard;