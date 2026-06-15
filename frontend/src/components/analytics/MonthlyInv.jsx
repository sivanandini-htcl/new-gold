
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp, TrendingDown, PieChart as PieChartIcon,
  BarChart3, Award, Sparkles, Activity, Crown, Medal, Gem, ChevronUp
  
} from 'lucide-react';
import api from '../../api/axiosInstance';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area,
  LineChart, Line
} from 'recharts';
const monthlyTrendsData = [
  { month: "2025-12", monthLabel: "Dec", investedINR: 5000, ordersCount: 1, portfolioValueAtEnd: 12000, gainINR: 7000 },
  { month: "2026-01", monthLabel: "Jan", investedINR: 7000, ordersCount: 1, portfolioValueAtEnd: 24500, gainINR: 17500 },
  { month: "2026-02", monthLabel: "Feb", investedINR: 9200, ordersCount: 1, portfolioValueAtEnd: 45800, gainINR: 36600 },
  { month: "2026-03", monthLabel: "Mar", investedINR: 10000, ordersCount: 1, portfolioValueAtEnd: 68500, gainINR: 58500 },
  { month: "2026-04", monthLabel: "Apr", investedINR: 31200, ordersCount: 3, portfolioValueAtEnd: 84472.32, gainINR: 53272.32 }
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A23]/90 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl">
        <p className="text-white text-sm ">{label}</p>
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

const MonthlyInv = () => {
    const [chartType, setChartType] = useState('area');

    useEffect(() => {
  const performances = async () => {
    try {
      const res = await api.get('/analytics/customer/investment');
      console.log("monthly data", res.data);
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data);
      console.log(err.response.message);

    }
  };

  performances();
}, []);

  return (
     <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-md  text-white flex items-center gap-2">
              <BarChart3 size={22} className="text-amber-400" /> Monthly Investment Trends
            </h3>
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
              {['area', 'bar', 'line'].map(type => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${chartType === type ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-zinc-400 hover:text-white'}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={320} className="md:h-[380px]">
            {chartType === 'area' && (
              <AreaChart data={monthlyTrendsData}>
                <defs>
                  <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F8D9AD" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="#F8D9AD" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="monthLabel" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="portfolioValueAtEnd" name="Portfolio Value" stroke="#F8D9AD" fill="url(#valueGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="investedINR" name="Invested" stroke="#C0C0C0" fill="#C0C0C030" strokeWidth={2} />
              </AreaChart>
            )}
            {chartType === 'bar' && (
              <BarChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="monthLabel" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="investedINR" name="Invested (₹)" fill="#C0C0C0" radius={[8,8,0,0]} />
                <Bar dataKey="portfolioValueAtEnd" name="Portfolio Value (₹)" fill="#F8D9AD" radius={[8,8,0,0]} />
              </BarChart>
            )}
            {chartType === 'line' && (
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="monthLabel" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="portfolioValueAtEnd" name="Portfolio Value" stroke="#F8D9AD" strokeWidth={3} dot={{ fill: '#F8D9AD', r: 4 }} />
                <Line type="monotone" dataKey="investedINR" name="Invested" stroke="#C0C0C0" strokeWidth={2} dot={{ fill: '#C0C0C0', r: 3 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </motion.div>

  )
}

export default MonthlyInv