import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import {
  TrendingUp, TrendingDown, 
  BarChart3, Award, Sparkles, Activity, Crown, Medal, Gem, ChevronUp
} from 'lucide-react';

import {
   Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
  LineChart, Line
} from 'recharts';

import api from '../api/axiosInstance';
import Performance from '../components/analytics/Performance';
import MonthlyInv from '../components/analytics/MonthlyInv';
import Investment from '../components/analytics/Investment';

//DUMMY DATA 
const portfolioSummary = {
  totalInvested: 31200,
  currentValue: 84472.32,
  unrealizedGain: 53272.32,
  unrealizedGainPercent: 170.74,
  holdingsCount: 3,
  daysActive: 26,
  totalOrders: 3
};

const monthlyTrendsData = [
  { month: "2025-12", monthLabel: "Dec", investedINR: 5000, ordersCount: 1, portfolioValueAtEnd: 12000, gainINR: 7000 },
  { month: "2026-01", monthLabel: "Jan", investedINR: 7000, ordersCount: 1, portfolioValueAtEnd: 24500, gainINR: 17500 },
  { month: "2026-02", monthLabel: "Feb", investedINR: 9200, ordersCount: 1, portfolioValueAtEnd: 45800, gainINR: 36600 },
  { month: "2026-03", monthLabel: "Mar", investedINR: 10000, ordersCount: 1, portfolioValueAtEnd: 68500, gainINR: 58500 },
  { month: "2026-04", monthLabel: "Apr", investedINR: 31200, ordersCount: 3, portfolioValueAtEnd: 84472.32, gainINR: 53272.32 }
];

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-secondary/10 rounded w-3/4"></div>
    <div className="h-24 bg-secondary/5 rounded-xl"></div>
    <div className="space-y-2">
      <div className="h-4 bg-secondary/10 rounded"></div>
      <div className="h-4 bg-secondary/10 rounded w-5/6"></div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A23]/90 backdrop-blur-md border border-secondary/20 rounded-xl p-3 shadow-xl">
        <p className="text-secondary text-sm font-semibold">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="text-sm" style={{ color: entry.color || entry.fill }}>
            {entry.name}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// -- MAIN DASHBOARD --
const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const[portfolio,setPortfolio]=useState('null')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

 useEffect(()=>{
  const fetchPortifolio=async()=>{
    try{
      const res=await api.get("/analytics/customer/portfolio/overview")
      console.log("response: " ,res);
      setPortfolio(res.data?.data);
    }catch(err){
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);
    }
  }
  fetchPortifolio();
 }
,[])

  const sparklineData = monthlyTrendsData.map(item => ({ value: item.portfolioValueAtEnd, month: item.monthLabel }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A23] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[...Array(4)].map((_, i) => <LoadingSkeleton key={i} />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A23] overflow-x-hidden pb-12">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-primary bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-zinc-400 mt-1 text-xs md:text-base">Track your precious metals portfolio in real-time</p>
          </div>
          <div className="flex items-center gap-3 backdrop-blur-md bg-secondary/5 px-4 py-2.5 rounded-full border border-secondary/10">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-zinc-300">Live Data</span>
            {/* <Sparkles size={16} className="text-amber-400" /> */}
          </div>
        </motion.div>

        {/* HERO / PORTFOLIO SUMMARY */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative backdrop-blur-2xl bg-gradient-to-br from-secondary/[0.07] to-secondary/[0.02] border border-secondary/10 rounded-3xl p-6 md:p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5" />
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left: Main numbers */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <p className="text-zinc-400 text-sm tracking-wide">TOTAL PORTFOLIO VALUE</p>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-secondary ">
                      {/* ₹{portfolio?.currentValue}*/} 123456
                    </h2>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30 flex items-center gap-1 mt-2 sm:mt-0">
                      <TrendingUp size={16} /> +{portfolio?.unrealizedGainPercent}% 
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs">Invested</p>
                    <p className="text-secondary text-lg md:text-xl font-semibold">₹{portfolio?.totalInvested}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs">Unrealized Gain</p>
                    <p className="text-green-400 text-lg md:text-xl font-semibold">+₹{portfolio?.unrealizedGain}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs">Holdings</p>
                    <p className="text-secondary text-lg md:text-xl font-semibold">{portfolio?.holdingsCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs">Total Orders</p>
                    <p className="text-secondary text-lg md:text-xl font-semibold">{portfolio?.totalOrders}</p>
                  </div>
                </div>
              </div>

              {/* Sparkline */}
              <div className="bg-secondary/5 rounded-2xl p-4 md:p-6 border border-secondary/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-zinc-400">Last 5 months trend</span>
                  <ChevronUp size={16} className="text-green-400" />
                </div>
                <ResponsiveContainer width="100%" height={130}>
                  <AreaChart data={sparklineData}>
                    <defs>
                      <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F8D9AD" stopOpacity={0.6}/>
                        <stop offset="100%" stopColor="#F8D9AD" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#F8D9AD" strokeWidth={2} fill="url(#sparkGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PORTFOLIO ALLOCATION + METAL PERFORMANCE */}     
         <Performance/>
        {/* MONTHLY INVESTMENT TRENDS */}
       <MonthlyInv/>
        {/* INVESTMENT METRICS + METAL RANKINGS + AI INSIGHTS */}
       <Investment/>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-600 pt-10 mt-12 border-t border-secondary/10">
          © 2026 Precious Metals Platform | Real-time analytics • Secure • Insured
        </div>
      </div>
    </div>
  );
};

export default Analytics;