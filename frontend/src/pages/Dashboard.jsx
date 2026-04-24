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
import ProductCarousel from "../components/dashboardComponents/ProductCarousel.JSX";
import dg from "../assets/dg";
import DashboardBar from "../assets/DashboardBar.jpg";
import BackgroundImg1 from "../assets/background1.jpg"
import WorksCarousel from "./ImgaeSlider";
import silver from "../assets/silver.jpg"
import Section from "../components/dashboardComponents/SilverScroller";
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

/* ─── Custom Tooltip ── */
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

/* ─── Featured Product Card ──────── */
export function ProductCard({ product, navigate }) {
  const isGold = product.type === "gold";
  
  return (
    <motion.div
      variants={scaleOnHover}
      whileHover="whileHover"
      onClick={() => navigate(`/productdetails/${product.id}`)}
      className={`bg-white border ${isGold ? "border-amber-200" : "border-gray-200"} rounded- overflow-hidden cursor-pointer flex flex-col h-full`}
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

/* ─── Stat Badge ───*/
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
 

/* ─── Insight Card ──*/
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

  /* ── Products ── */
  const featuredGold = jewelleryProducts.filter(p => p.type === "gold").slice(0, 5);
  const featuredSilver = jewelleryProducts.filter(p => p.type === "silver").slice(0, 5);
  
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
    <div   
      className="min-h-screen font-serif bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50 py-8 px-4"
    >
         <SlidingBanner />
        <div className="flex flex-col md:flex-row gap-4 mb-9">

  {/* GOLD RECTANGLE */}
  <div className="flex-1 bg-white border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">

    {/* LEFT */}
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
        <Coins size={18} color="#b45309" />
      </div>

      <div>
        <p className="text-[10px] text-amber-700 uppercase tracking-wider">
          Gold / 24K
        </p>
        <p className="font-serif font-bold text-amber-800 text-lg leading-tight">
          ₹{Math.round(gram24kGoldPrice)?.toLocaleString("en-IN") || "—"}
        </p>
      </div>

    </div>

    {/* RIGHT */}
    <button
      onClick={() => navigate("/gold")}
      className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-gradient-to-r from-yellow-700 to-yellow-500 text-white"
    >
      Buy
    </button>

  </div>

  {/* SILVER RECTANGLE */}
  <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">

    {/* LEFT */}
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
        <Gem size={18} color="#6b7280" />
      </div>

      <div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
          Silver / 24K
        </p>
        <p className="font-serif font-bold text-gray-700 text-lg leading-tight">
          ₹{Math.round(gram24ksilverPrice)?.toLocaleString("en-IN") || "—"}
        </p>
      </div>

    </div>

    {/* RIGHT */}
    <button
      onClick={() => navigate("/silver")}
      className="text-[11px] font-bold px-3 py-1.5 rounded-md bg-gray-700 text-white"
    >
      Buy
    </button>

  </div>

</div>


         <div className=" flex gap-30 px-40 pt-20 mb-10" >
          <div> <p className=" text-7xl font-serif text-[#3c2415] ">Pure wealth, secured in every bar</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus error tenetur magni praesentium natus,
             quidem harum et a aliquid doloremque, repellat ab alias provident optio, impedit fuga iusto accusantium itaque.</p></div>
          <div className=" flex justify-end"> 
            <img src={DashboardBar} alt="" className="w-190 h-90" />
            </div>
         </div>
         <div className="mb-12   shadow-md p-4 rounded-2xl">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-5">

    <div>
      <h2 className="font-serif text-2xl text-[#3c2415] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text  font-bold">
        Featured Gold Jewellery
      </h2>
      <p className="text-xs text-[#3c2415] mt-1">
        Redeem your holdings as certified gold products
      </p>
    </div>

    <button
      onClick={() => navigate("/redeem")}
      className="flex items-center gap-1.5 border-2  rounded-lg px-4 py-2 text-xs text-yellow-950 font-bold hover:bg-yellow-100/20 transition"
    >
      View All <ChevronRight size={14} />
    </button>

  </div>

  {/* PRODUCT GRID (NO CAROUSEL) */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

    {featuredGold.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        navigate={navigate}
      />
    ))}

  </div>

</div>
         <div className=" flex gap-30 px-40 pt-20 mb-10" >
           <img src={silver} alt="" className="w-190 h-90" />
          <div> <p className=" text-7xl font-serif text-[#3c2415] ">Pure wealth, secured in every bar</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus error tenetur magni praesentium natus,
             quidem harum et a aliquid doloremque, repellat ab alias provident optio, impedit fuga iusto accusantium itaque.</p></div>
          <div className=" flex justify-end"> 
           
            </div>
         </div>
         <Section/>
        <div className="mb-12  rounded-2xl shadow-md p-4">
          

  {/* HEADER */}
  <div className="flex justify-between items-center mb-5">

    <div>
      <h2 className="font-serif text-2xl text-gray-800 font-bold">
        Featured Silver Collection
      </h2>
      <p className="text-xs text-gray-500 mt-1">
        Handpicked silver pieces for every occasion
      </p>
    </div>

    <button
      onClick={() => navigate("/redeem")}
      className="flex items-center gap-1.5 border border-gray-400 rounded-lg px-4 py-2 text-xs text-gray-700 font-bold hover:bg-gray-100 transition"
    >
      View All <ChevronRight size={14} />
    </button>

  </div>

  {/* PRODUCT GRID (NO CAROUSEL) */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

    {featuredSilver.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        navigate={navigate}
      />
    ))}

  </div>

</div>
       
                 <WorksCarousel />
      
    </div>
  );
}

export default Dashboard;