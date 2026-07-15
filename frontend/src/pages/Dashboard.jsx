import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  Award,
  Shield,
  Zap,
  Star,
  ArrowRight,
  ShoppingBag,
  Gem,
  BarChart2,
  Lock,
  ChevronRight,
  Globe,
  Package,
  RefreshCw,
  Clock,
  TrendingDown,
  BadgeCheck,
  Coins,
  Building2,
  Sparkles,
  Tag,
  Heart,
  ShoppingCart,
  Eye,
  ArrowRightCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { useState, useEffect } from 'react';
import usePriceStore from '../store/priceStore';
import useAuthStore from '../store/authStore';
import SlidingBanner from '../components/dashboardComponents/SlidingBanner';
import { jewelleryProducts } from './Data/jewelleryProducts';
import DgiAssurance from '../components/dashboardComponents/Dgiassurance ';
import BlogSection from '../components/dashboardComponents/Blogsection';
import ProductCarousel from '../components/dashboardComponents/ProductCarousel';
import ImgaeSlider from '../components/dashboardComponents/ImgaeSlider';
import silver from '../assets/silver.png';
import Section from '../components/dashboardComponents/SilverScroller';
import banner from '../assets/banner.png';
import GoldSection from '../components/dashboardComponents/GoldScroller';
// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// PRODUCT CARD (Ecommerce Style)
export function ProductCard({ product, navigate }) {
  const isGold = product.type === 'gold';

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/productdetails/${product.id}`)}
      className=" rounded-xl md:rounded-none  border border-black/10 shadow-2xl overflow-hidden cursor-pointer flex flex-col group relative "
    >
  
      <div className="relative h-44 sm:h-48 2xl:h-60  shadow-md hover:shadow-xl hover:shadow-black/20 overflow-hidden flex items-center justify-center p-3 group">
        <img onClick={(e) => {
              e.stopPropagation();
              navigate(`/productdetails/${product.id}`);
            }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition duration-400 group-hover:scale-105"
        />

        {/* Black overlay on hover */}
        <div className="absolute  bg-black/30  translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col p-30 tem-center text-center">
        <p className='whitespace-nowrap'>{product.name}</p>
        <p className='whitespace-nowrap'>{product.purity}</p>
        </div>


        {/* Quick Add overlay */}
        {/* <div className="absolute inset-x-0 bg-black/20  translate-y-full group-hover:translate-y-0 transition-transform duration-300  p-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/productdetails/${product.id}`);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 text-white text-[11px] font-bold py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition backdrop-blur-sm"
          >
            <Eye size={11} /> Quick View
          </button>
        </div> */}
      </div>

      {/* Divider */}
      <div className={`h-px ${isGold ? 'bg-amber-100' : 'bg-gray-100'}`} />

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col gap-1 text-center">
        <p className="font-serif text-xs text-secondary font-bold line-clamp-1 2xl:text-sm">
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


// ─── Section Header ──────
function SectionHeader({ title, subtitle, onViewAll, gold = true }) {
  return (
    <div className="flex-col justify-between items-end mb-5 2xl:mb-7">
      <div>
        <h2
          className={`font-serif text-[20px] sm:text-2xl 2xl:text-3xl font-bold whitespace-nowrap
          ${gold ? 'text-primary ' : 'text-secondary'}`}
        >
          {title}
        </h2>
        {subtitle && <p className="text-xs text-secondary mt-1 2xl:text-sm">{subtitle}</p>}
      </div>

      <div className="flex items-end justify-end mt-2 w-full">
        {onViewAll && (
          <button
            onClick={onViewAll}
            className={`whitespace-nowrap flex items-center text-[10px] gap-1  font-bold font-serif px-4 py-1 rounded-lg transition 2xl:text-sm 2xl:px-4 2xl:py-2
            ${
              gold
                ? 'text-primary border border-white/20 hover:bg-amber-50'
                : 'text-slate-300 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            View All <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

//Main Dashboard
function Dashboard() {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState('6M');
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const ranges = ['1D', '5D', '6M', 'YTD', '1Y', '5Y', 'MAX'];
  const goldPercentage = usePriceStore((state) => state.goldPercentage);
  const silverPercentage = usePriceStore((state) => state.silverPercentage);
  const isProfit = Number(goldPercentage) > 0;
  const silverisProfit = Number(silverPercentage) > 0;
  const [status, setStatus] = useState('Connecting...');
  const prices = usePriceStore((state) => state.prices);
  const goldPrice = prices.find((item) => item.metal === 'GOLD');
  const silverPrice = prices.find((item) => item.metal === 'SILVER');
  // const userEmail = useAuthStore((s) => s.user?.email);
  const gram24kGoldPrice = goldPrice?.caratPrices?.gram24k;
  const gram24ksilverPrice = silverPrice?.caratPrices?.gram24k;
  const profileData = useAuthStore((state) => state.profileData);
  const userName = profileData?.firstName || 'User';
  const featuredGold = jewelleryProducts.filter((p) => p.type === 'gold').slice(0, 4);
  const featuredSilver = jewelleryProducts.filter((p) => p.type === 'silver').slice(0, 4);
  const isLive = status === 'Live Connected';
 

  const insights = [
    {
      icon: Shield,
      title: 'Hedge Against Inflation',
      description:
        'Gold and silver have historically preserved purchasing power through economic downturns and currency devaluation.',
      accent: '#b45309',
      bg: '#fef3c7',
    },
    {
      icon: TrendingUp,
      title: 'Long-term Growth',
      description:
        'Precious metals have appreciated consistently over decades — a proven vehicle for long-term wealth accumulation.',
      accent: '#065f46',
      bg: '#d1fae5',
    },
    {
      icon: DollarSign,
      title: 'Portfolio Diversification',
      description:
        'Low correlation with equities means metals can buffer portfolio volatility during market stress.',
      accent: '#1e40af',
      bg: '#dbeafe',
    },
    {
      icon: Zap,
      title: 'Instant Liquidity',
      description:
        'Convert digital holdings to cash in minutes — no physical storage, no logistics, no delays.',
      accent: '#7c3aed',
      bg: '#ede9fe',
    },
    {
      icon: Lock,
      title: 'Secure & Audited',
      description:
        'Your holdings are backed by physical metals stored in insured, SEBI-compliant vaults and audited regularly.',
      accent: '#dc2626',
      bg: '#fee2e2',
    },
    {
      icon: Globe,
      title: 'Globally Recognised',
      description:
        'Gold and silver are universally accepted stores of value, transcending borders and currencies.',
      accent: '#0369a1',
      bg: '#e0f2fe',
    },
    {
      icon: BadgeCheck,
      title: '99.9% Purity',
      description:
        'All metal purchases are certified with hallmark purity, ensuring you always get the highest quality.',
      accent: '#92400e',
      bg: '#fef9c3',
    },
    {
      icon: RefreshCw,
      title: 'Anytime, Anywhere',
      description:
        'Buy, sell, or redeem your digital gold and silver 24/7 from any device with zero paperwork.',
      accent: '#047857',
      bg: '#d1fae5',
    },
  ];

  return (
    <div className="min-h-screen max-w-[1440px] m-auto font-serif bg-background mb-10 ">
      {/* ── BANNER ─ */}
      <div className="  ">
        <SlidingBanner />
      </div>

      {/* LIVE PRICE STRIP  */}
      <div className=" mb-5 2xl:mb-10">
        <div className="flex flex-col sm:flex-row ">
          {/* GOLD */}
          <motion.div
            
            className="flex-1 bg-[#111117] px-4 py-4 2xl:px-6 2xl:py-5 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3 2xl:gap-4">
           
              <div>
                <p className="text-[10px] md:text-lg 2xl:text-2xl text-primary  tracking-widest font-bold">
                  GOLD · 24K / g
                </p>
                <p className="font-body text-white/70 text-sm md:text-lg 2xl:text-2xl leading-tight">
                  ₹{(gram24kGoldPrice)?.toLocaleString('en-IN') || '—'}
                </p>
                <span
                  className={`text-[11px] 2xl:text-xl font-semibold ${isProfit ? 'text-green-600' : 'text-red-500'}`}
                >
                  {isProfit ? '▲' : '▼'} {goldPercentage}% today
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/gold')}
              className="text-[11px] md:text-sm  hover:scale-105 2xl:text-xl font-black px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-xl border border-white/20 text-primary hover:from-[#754c33] transition shadow"
            >
              Gold
            </button>
          </motion.div>

          {/* SILVER */}
          <motion.div
            
            className="flex-1 bg-[#111117]  px-4 py-4 2xl:px-6 2xl:py-5 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3 2xl:gap-4">
          
              <div>
                <p className="text-[10px] md:text-lg 2xl:text-2xl text-gray-400 tracking-widest font-bold ">
                  SILVER · 24K / g
                </p>
                <p className="font-body md:text-lg  text-white/70 text-sm 2xl:text-2xl leading-tight">
                  ₹{(gram24ksilverPrice)?.toLocaleString('en-IN') || '—'}
                </p>
                <span
                  className={`text-[11px]  2xl:text-xl font-semibold ${silverisProfit ? 'text-green-600' : 'text-red-500'}`}
                >
                  {silverisProfit ? '▲' : '▼'} {silverPercentage}% today
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/silver')}
              className="text-[11px] hover:scale-105 md:text-sm 2xl:text-xl font-black px-3 py-2 2xl:px-5 2xl:py-2.5 rounded-xl border border-white/20 text-white hover:from-slate-800 transition shadow whitespace-nowrap"
            >
              Silver
            </button>
          </motion.div>
        </div>
      </div>

      {/* HERO BANNER: GOLD  */}
      <div className=" mb-5 2xl:mb-14 ">
        <div className="flex flex-col md:flex-row gap-4 2xl:gap-8 bg-[#111117]    overflow-hidden p-6 sm:p-8 2xl:p-12  shadow-2xl">
          <div className="md:w-full 2xl:w-full flex flex-col justify-center item-center">
            <p className="text-primary text-center text-md md:text-2xl mb-2 flex items-center justify-center  gap-1">
              <span>Welcome,</span>
              <span className="truncate max-w-[200px] md:max-w-[300px] inline-block uppercase">
                {userName}
              </span>
            </p>
            <div className="flex justify-center mb-3">
  <span className="inline-block text-[9px] 2xl:text-xs uppercase tracking-widest text-primary bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">
    ✦ Pure · Certified · Hallmarked
  </span>
</div>

            <h1 className="text-2xl sm:text-4xl text-center lg:text-4xl 2xl:text-6xl font-serif uppercase text-primary leading-tight mb-3 2xl:mb-2">
              Pure wealth,
              <br />
              <span className="text-primary lg:text-4xl sm:text-4xl text-2xl 2xl:text-6xl uppercase">
                secured in every bar
              </span>
            </h1>
            <p className="font-serif italic text-sm text-center md:text-lg 2xl:text-base text-secondary  ">
              Invest in certified 24K digital gold backed by physical reserves. Transparent pricing,
              zero making charges, instant delivery to your vault.
            </p>
            <div className="flex  justify-center items-center gap-3 mt-5 2xl:mt-7">
              <button
                onClick={() => navigate('/metals')}
               className="px-2 py-1 md:py-2.5 2xl:px-7 2xl:py-3 rounded-xl border transition-all border-white/20 hover:scale-110  text-secondary font-bold text-sm 2xl:text-base   shadow-xl">
                Invest Now
              </button>
              <button
                onClick={() => navigate('/redeem')}
                className="px-2 py-1 md:py-2.5 2xl:px-7 2xl:py-3 rounded-xl border transition-all border-white/20 hover:scale-110  text-secondary font-bold text-sm 2xl:text-base   shadow-xl"
              >
                View Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED GOLD PRODUCTS ── */}
      {/* <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-5 2xl:mb-14">
        <div className="rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 shadow-sm  p-5 2xl:p-8">
          <SectionHeader
            title="Featured Gold Jewellery"
            subtitle="Redeem your holdings as certified gold products"
            onViewAll={() => navigate('/redeem')}
            gold={true}
          />
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 2xl:gap-5">
            {featuredGold.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </div> */}
        <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-5 2xl:mb-14 aspect-[16/7]">
        <GoldSection />
      </div>

      {/* ── SILVER HERO ──── */}
      <div className="  mb-5 2xl:mb-14">
        <div className="flex flex-col  md:flex-row gap-4 2xl:gap-8 items-center bg-[#25160c]  overflow-hidden p-6 sm:p-8  border border-slate-700/30">
          <div className="md:w-1/2 2xl:w-1/2 order-2 md:order-1">
            <img
              src={silver}
              alt="Silver"
              className="w-full md:w-100 md:h-100 rounded-2xl object-cover"
            />
          </div>
          <div className="md:w-1/2 2xl:w-1/2 order-1 md:order-2">
            <span className="inline-block text-[10px] 2xl:text-xs uppercase tracking-widest text-[#DDD9CE] font-bold mb-3 bg-slate-400/10 px-3 py-1 rounded-full border border-slate-400/20">
              ✦ 999 Fine Silver · Certified
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-serif uppercase text-[#DDD9CE] leading-tight mb-3 2xl:mb-5">
              Silver — the
              <br />
              <span className="text-[#DDD9CE] text-2xl lg:text-5xl uppercase">smart investment</span>
            </h1>
            <p className="font-serif text-xs 2xl:text-base text-slate-300/70 leading-relaxed max-w-md">
              Start from just ₹10. Invest in 999 fine silver with real-time pricing, zero storage
              hassle, and instant redemption.
            </p>
            <div className="flex gap-3 mt-5 2xl:mt-7">
              <button
                onClick={() => navigate('/redeem')}
                className=" px-2 py-2.5 2xl:px-7 2xl:py-3 rounded-xl border border-slate-400/30 bg-gradient-to-r from-slate-500 to-gray-400 text-background  font-bold text-xs md:text-md 2xl:text-base hover:bg-slate-400/10 transition"
              >
                Buy Silver
              </button>
              <button
                onClick={() => navigate('/redeem')}
                className="  px-2 py-2.5 2xl:px-7 2xl:py-3 rounded-xl border border-slate-400/30 text-[#DDD9CE] font-bold text-sm 2xl:text-base hover:bg-slate-400/10 transition"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─ FEATURED SILVER PRODUCTS  */}
      {/* <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-10 2xl:mb-14">
        <div className="text-[#DDD9CE] text-lg rounded-3xl shadow-sm bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 p-5 2xl:p-8">
          <SectionHeader
            title="Featured Silver Collection"
            subtitle="Handpicked silver pieces for every occasion"
            onViewAll={() => navigate('/redeem')}
            gold={false}
          />
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 2xl:gap-5">
            {featuredSilver.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </div> */}
       <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 mb-5 2xl:mb-14 aspect-[16/7]">
        <Section />
      </div>

      {/* ── INSIGHTS GRID ──*/}
      {/* <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 py-10 2xl:py-16 bg-[#111117]">
        <div className="text-center mb-8 2xl:mb-12">
          <span className="text-[10px] 2xl:text-xs uppercase tracking-widest text-primary/60 font-serif">
            Why invest in precious metals
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl 2xl:text-4xl uppercase text-primary/80 mt-1">
            Built for wealth. Designed for trust.
          </h2>
        </div>

        <div>
          <div className="grid grid-cols-2  items-center gap-10">
            <img
              src={Gift}
              alt=""
              className="lg:h-140 lg:w-140 md:pr-2 flex justify-center items-center"
            />

            <div className=" grid items-center">
              <div className="md:flex md:flex-col md:space-y-4">
                <p className=" text-sm md:text-xl font-serif italic text-primary   md:leading-tight md:mb-3 lg:text-4xl 2xl:text-6xl">
                  Celebrate festivals with gifts that carry lasting value and timeless beauty
                </p>
              </div>
              <div>
                <p className=" hidden md:inline-flex text-white/70 font-serif italic text-xs md:font-serif md:text-lg md:leading-relaxed">
                  We make every occasion more meaningful,whether it’s a celebration of tradition,
                  prosperity, or togetherness, these precious metal gifts are a thoughtful way to
                  share blessings while giving something that grows in value over time.
                </p>
                <span className="flex gap-2 mt-3 ">
                  <p className="text-sm text-primary/70 md:text-xl">Customise Now</p>
                  <ArrowRightCircle size={20} className="text-primary/70 mt-1" />
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-10 ">
            <div className=" grid items-center">
              <div className="md:flex md:flex-col md:space-y-4">
                <p className=" text-sm mt-8 md:text-xl font-serif  italic text-primary  md:leading-tight lg:text-4xl 2xl:text-6xl">
                  Reward Excellence. Build Lasting Bonds
                </p>
              </div>
              <div>
                <p className=" hidden  md:inline-flex text-white/70 font-serif text-xs italic md:font-serif md:text-lg md:mt-3 md:leading-relaxed">
                  Dgigold offers pure gold and silver coins that make every occasion more
                  meaningful. Whether it’s a celebration of tradition, prosperity, or togetherness,
                  these precious metal gifts are a thoughtful way to share blessings while giving
                  something that grows in value over time.
                </p>
                <span className="flex gap-1 mt-3 ">
                  <p className="text-sm md:text-xl text-primary/70">Gift Your Employees</p>
                  <ArrowRightCircle size={20} className="text-primary/70 mt-1" />
                </span>
              </div>
            </div>

            <img
              src={banner}
              alt=""
              className="lg:h-140 lg:w-140 flex justify-center items-center"
            />
          </div>
        </div>
      </div> */}
<div className='aspect-[16/7]'>
 <div className="px-3 sm:px-5 lg:px-8 2xl:px-16 py-10 lg:py-5 2xl:py-16 bg-[#111117] w-full max-w-full ">
        <div className="text-center mb-2 2xl:mb-12">
          <span className="text-[10px] 2xl:text-xs uppercase tracking-widest text-primary/60 font-serif">
            Why invest in precious metals
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl 2xl:text-4xl uppercase text-primary/80 mt-1">
           Moments Cast in Gold
          </h2>
        </div>       
      </div>
       <section className="w-full max-w-full  ">          
<div className="relative w-full aspect-[16/10] md:aspect-[16/7] h-full mb-0 ">
  <img
    src="/images/products/Gift.png"
    alt="Banner"
    className="absolute inset-0 w-full max-w-full h-full object-cover"/>

  <div className="absolute inset-0 " />
  <div className=" hidden md:block absolute right-[8%] md:right-[1%] md:top-3/4 lg:top-1/2 xl:top-1/3 top-1/3 -translate-y-1/2 lg:-translate-x-1 xl:-translate-1/11  font-bold text-background">  
    <h1 className="text-xs md:text-[22px] lg:text-[28px] whitespace-normal tracking-tighter lg:text-4xl italic font-serif uppercase text-background">
          Built for wealth
    </h1>
    <h1 className="text-xs md:text-[22px] lg:text-[28px] tracking-tighter lg:text-4xl italic font-serif uppercase text-background">
          Designed for trust
    </h1>
    {/* <h1 className="text-xs md:text-xl lg:text-2xl italic font-serif uppercase">
      Gift Now
    </h1> */}

    <p className="text-xs lg:text-sm mt-0 ">
      Invest in 24K Gold
    </p>

    <button className="text-xs mt-6 rounded bg-white md:px-8 md:py-3 text-black font-semibold">
      Gift Now
    </button>
  </div>
</div>
        </section>
        </div>
      {/* ── WORKS CAROUSEL ── */}
      <div className="mb-0">
        <ImgaeSlider />
      </div>
      {/* BLOG  */}
      <BlogSection />
    </div>
  );
}

export default Dashboard;
