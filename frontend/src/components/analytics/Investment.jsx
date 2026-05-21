import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import api from '../../api/axiosInstance';
import {
  TrendingUp, TrendingDown, PieChart as PieChartIcon,
  BarChart3, Award, Sparkles, Activity, Crown, Medal, Gem, ChevronUp
} from 'lucide-react';


const investmentMetrics = {
  averageOrderValue: 10400,
  investmentFrequency: "monthly",
  metalDiversity: 3,
  concentrationRisk: "low",
  mostActiveMonth: "2026-04"
};
const metalRankings = [
  { metal: "SILVER", gainPercent: 233.24, gainINR: 28689, rank: 1 },
  { metal: "GOLD", gainPercent: 137.99, gainINR: 21388.8, rank: 2 }
];

const aiInsights = [
  " Excellent portfolio performance! Keep up the strategy.",
  " SILVER is performing exceptionally well (+233.24%)",
  " Consider increasing GOLD exposure for long-term stability.",
  " Your investment frequency is optimal for wealth creation."
];
const Investment = () => {

const [invest,setInvest]=useState([]);

    useEffect(()=>{
    const fetchInvestment=async()=>{
    try{
      const res=await api.get("/analytics/customer/investment/metrics")
      console.log("inves: " ,res.data);
     setInvest(res.data?.data);

    }catch(err){
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);
    }
  }
 fetchInvestment();
 }
,[])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} className="text-amber-400" />
                <h4 className="font-semibold text-white">Investment Metrics</h4>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-zinc-400">Avg. Order Value</span><span className="text-white font-medium">₹{invest?.averageOrderValue}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Frequency</span><span className="text-white font-medium capitalize">{invest?.investmentFrequency}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Metal Diversity</span><span className="text-white font-medium">{invest?.metalDiversity} metals</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Concentration Risk</span><span className={`px-3 py-1 rounded-full text-xs font-medium ${invest?.concentrationRisk === 'low' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{invest?.concentrationRisk}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Most Active Month</span><span className="text-white font-medium">Apr 2026</span></div>
              </div>
            </div>
          </motion.div>

          {/* Metal Rankings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Award size={20} className="text-amber-400" />
              <h4 className="font-semibold text-white">Metal Rankings</h4>
            </div>
            <div className="space-y-4">
              {metalRankings.map((item) => (
                <div key={item.metal} className={`relative flex items-center justify-between p-4 rounded-2xl transition-all ${item.rank === 1 ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20' : 'bg-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full ${item.rank === 1 ? 'bg-amber-500/30 text-amber-400' : 'bg-white/10 text-zinc-300'}`}>
                      {item.rank === 1 ? <Crown size={18} /> : <Medal size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-white">{item.metal}</p>
                      <p className="text-xs text-zinc-400">+₹{item.gainINR.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+{item.gainPercent}%</p>
                    <div className="w-20 h-1 bg-white/10 rounded-full mt-1">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(item.gainPercent / 3, 100)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-purple-500/5 border border-white/10 rounded-3xl p-6 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={20} className="text-amber-400" />
              <h4 className="font-semibold text-white">AI Insights</h4>
            </div>
            <div className="space-y-3 relative z-10">
              {aiInsights.slice(0, 3).map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all"
                >
                  <p className="text-sm text-zinc-200">{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

  )
}

export default Investment