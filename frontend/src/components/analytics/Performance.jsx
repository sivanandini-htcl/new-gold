
import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosInstance';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp, TrendingDown, PieChart as PieChartIcon,
  BarChart3, Award, Sparkles, Activity, Crown, Medal, Gem, ChevronUp
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
  LineChart, Line
} from 'recharts';

const allocationData = [
  { metal: "SILVER", valueINR: 40989, allocationPercent: 48.52, grams: 150, color: "#C0C0C0", gradient: "url(#silverGradient)" },
  { metal: "GOLD", valueINR: 36888.8, allocationPercent: 43.66, grams: 2.5, color: "#F8D9AD", gradient: "url(#goldGradient)" }
];

const metalPerformanceData = [
  {
    metal: "SILVER",
    grams: 150,
    totalInvestedINR: 12300,
    currentValueINR: 40989,
    unrealizedGainINR: 28689,
    unrealizedGainPercent: 233.24,
    currentLivePrice: 273.26,
    allocationPercent: 48.52,
    trend: "up",
    sparklineData: [150, 220, 280, 310, 380, 40989]
  },
  {
    metal: "GOLD",
    grams: 2.5,
    totalInvestedINR: 15500,
    currentValueINR: 36888.8,
    unrealizedGainINR: 21388.8,
    unrealizedGainPercent: 137.99,
    currentLivePrice: 14755.52,
    allocationPercent: 43.66,
    trend: "up",
    sparklineData: [18000, 22000, 28000, 32000, 35000, 36888.8]
  }
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A23]/90 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl">
        <p className="text-white text-sm font-semibold">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} className="text-sm" style={{ color: entry.color || entry.fill }}>
            {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
const Performance = () => {
    const[performanceData, setPerformanceData] = useState([]);
    const[loading,setLoading]=useState(true)


useEffect(()=>{
  const fetchPerformance=async()=>{
    try{
      const res=await api.get('/analytics/customer/portfolio/allocation' )
      console.log("portfolio allocation:" ,res.data);
      setPerformanceData(res.data?.data);

    } 
    catch(err){
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);
    }
  }
  fetchPerformance();
 }
,[])

  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Allocation Donut Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm md:text-xl font-semibold text-white flex items-center gap-2">
                <PieChartIcon size={22} className="text-amber-400" /> Portfolio Allocation
              </h3>
              <span className="text-xs text-zinc-400">by value</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F8D9AD" />
                    <stop offset="100%" stopColor="#E4C48C" />
                  </linearGradient>
                  <linearGradient id="silverGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#B5ADAA" />
                    <stop offset="100%" stopColor="#B5ADAA" />
                  </linearGradient>
                </defs>
                <Pie
                  data={allocationData}
                  dataKey="valueINR"
                  nameKey="metal"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={115}
                  paddingAngle={5}
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.metal === "GOLD" ? "url(#goldGradient)" : "url(#silverGradient)"} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  formatter={(value) => <span className="text-zinc-300">{value}</span>}
                  wrapperStyle={{ paddingTop: 20 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-6">
              {allocationData.map(metal => (
                <div key={metal.metal} className="text-center">
                  <p className="text-sm font-medium text-zinc-300">{metal.metal}</p>
                  <p className="text-lg font-bold text-white">{metal.grams} {metal.metal === "GOLD" ? "g" : "g"}</p>
                  <p className="text-xs text-zinc-500">{metal.allocationPercent}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metal Performance Analytics Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {metalPerformanceData.map((metal) => (
              <motion.div
                key={metal.metal}
                whileHover={{ scale: 1.02, y: -2 }}
                className="relative group backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/3 border border-white/10 rounded-3xl p-6 md:p-7 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl" />
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${metal.metal === 'GOLD' ? 'bg-amber-500/20' : 'bg-gray-400/20'}`}>
                      <Gem size={24} className={metal.metal === 'GOLD' ? 'text-amber-400' : 'text-gray-300'} />
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-white">{metal.metal}</h4>
                      <span className="text-sm text-zinc-400">{metal.allocationPercent}% portfolio</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl flex items-center gap-1 ${metal.unrealizedGainPercent > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <TrendingUp size={16} />
                    <span className="text-xs ">{metal.unrealizedGainPercent}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                  <div><p className="text-zinc-400 text-xs">Current Value</p><p className="text-white font-semibold">₹{metal.currentValueINR.toLocaleString()}</p></div>
                  <div><p className="text-zinc-400 text-xs">Invested</p><p className="text-white font-semibold">₹{metal.totalInvestedINR.toLocaleString()}</p></div>
                  <div><p className="text-zinc-400 text-xs">Live Price</p><p className="text-white font-semibold">₹{metal.currentLivePrice.toLocaleString()}/g</p></div>
                  <div><p className="text-zinc-400 text-xs">Gain</p><p className="text-green-400 font-semibold">+₹{metal.unrealizedGainINR.toLocaleString()}</p></div>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-6">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: `${Math.min(metal.unrealizedGainPercent, 100)}%` }} />
                </div>
                <p className="text-right text-xs text-zinc-500 mt-2">ROI: {metal.unrealizedGainPercent}%</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
  )
}

export default Performance