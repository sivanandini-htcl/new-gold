import React, { useContext } from "react";
import { PriceContext } from "../components/PriceProvider";
import { useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, Award, Shield, Zap } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const { goldPrice, goldPercentage, silverPrice, silverPercentage } =useContext(PriceContext);
  const[selectedRange,setSelectedRange]=useState("6M")
  const ranges = ["1D", "5D", "6M", "YTD", "1Y", "5Y", "MAX"];

  const isProfit = Number(goldPercentage) > 0;
  const silverisProfit = Number(silverPercentage) > 0;

 const goldData = {
  "1D": [{ date: "Today", price: 6350 }],

  "5D": [
    { date: "Mon", price: 5800 },
    { date: "Tue", price: 5900 },
    { date: "Wed", price: 6000 },
    { date: "Thu", price: 6200 },
    { date: "Fri", price: 6350 },
  ],

  "6M": [
    { date: "Jan", price: 5800 },
    { date: "Feb", price: 1950 },
    { date: "Mar", price: 850 },
    { date: "Apr", price: 5100 },
    { date: "May", price: 3200 },
    { date: "Jun", price: 6350 },
  ],

  "YTD": [
    { date: "Jan", price: 5800 },
    { date: "Feb", price: 5200 },
    { date: "Mar", price: 6100 },
  ],

  "1Y": [
    { date: "2024", price: 4800 },
    { date: "2025", price: 6350 },
  ],

  "5Y": [
    { date: "2021", price: 3500 },
    { date: "2022", price: 4200 },
    { date: "2023", price: 5000 },
    { date: "2024", price: 5800 },
    { date: "2025", price: 6350 },
  ],

  "MAX": [
    { date: "2018", price: 3000 },
    { date: "2019", price: 3200 },
    { date: "2020", price: 4000 },
    { date: "2021", price: 3500 },
    { date: "2022", price: 4200 },
    { date: "2023", price: 5000 },
    { date: "2024", price: 5800 },
    { date: "2025", price: 6350 },
  ],
};


 const silverData = {
  "1D": [{ date: "Today", price: 6350 }],

  "5D": [
    { date: "Mon", price: 5800 },
    { date: "Tue", price: 5900 },
    { date: "Wed", price: 6000 },
    { date: "Thu", price: 6200 },
    { date: "Fri", price: 6350 },
  ],

  "6M": [
    { date: "Jan", price: 5800 },
    { date: "Feb", price: 1950 },
    { date: "Mar", price: 850 },
    { date: "Apr", price: 5100 },
    { date: "May", price: 3200 },
    { date: "Jun", price: 6350 },
  ],

  "YTD": [
    { date: "Jan", price: 5800 },
    { date: "Feb", price: 5200 },
    { date: "Mar", price: 6100 },
  ],

  "1Y": [
    { date: "2024", price: 4800 },
    { date: "2025", price: 6350 },
  ],

  "5Y": [
    { date: "2021", price: 3500 },
    { date: "2022", price: 4200 },
    { date: "2023", price: 5000 },
    { date: "2024", price: 5800 },
    { date: "2025", price: 6350 },
  ],

  "MAX": [
    { date: "2018", price: 3000 },
    { date: "2019", price: 3200 },
    { date: "2020", price: 4000 },
    { date: "2021", price: 3500 },
    { date: "2022", price: 4200 },
    { date: "2023", price: 5000 },
    { date: "2024", price: 5800 },
    { date: "2025", price: 6350 },
  ],
};


const insights = [
    {
      icon: Shield,
      title: 'Hedge Against Inflation',
      description: 'Gold and silver have historically maintained their value during inflation, protecting your purchasing power.',
      gradient: 'from-yellow-500 to-yellow-600'
    },

    {
      icon: TrendingUp,
      title: 'Long-term Growth',
      description: 'Precious metals have shown consistent appreciation over time, making them ideal for wealth accumulation.',
      gradient: 'from-yellow-500 to-yellow-600'
    },

    {
      icon: DollarSign,
      title: 'Portfolio Diversification',
      description: 'Adding digital gold and silver reduces overall portfolio risk and balances your investment strategy.',
      gradient: 'from-yellow-500 to-yellow-600'
    },

    {
      icon: Zap,
      title: 'Instant Liquidity',
      description: 'Convert your digital gold and silver to cash instantly without the hassle of physical storage.',
      gradient: 'from-yellow-500 to-yellow-600'
    },
  ];

  return (
    <div className="min-h-screen font-serif py-8 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-amber-200">
          <div className="h-1 flex  w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-full mb-4" />
          <h1 className="font-serif text-5xl tracking-wide">
            <span className="bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              Dgi
            </span>
            <span className="bg-gray-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              Gold
            </span>
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-amber-700">
          Gold  & Silver · Investment Platform
          </p>
        </div>
      
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-3xl p-6 shadow-lg bg-white border border-amber-300">
            <div className="flex justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-600">
                    Gold Price
                  </p>
                  <h2 className="font-heading text-2xl font-semibold text-amber-900">
                    {goldPrice ? `₹${goldPrice}/g` : "Loading..."}
                  </h2>
                </div>
              </div>

              {goldPercentage && (
                <span
                  className={`text-xs font-serif px-3 py-1 rounded-full ${
                    isProfit
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {isProfit ? "▲" : "▼"} {Math.abs(goldPercentage)}%
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/gold")}
                className="flex-1 py-3 rounded-xl text-sm uppercase tracking-widest font-serif bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-md hover:opacity-90">
                Buy
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm uppercase tracking-widest font-serif border border-amber-300 bg-white hover:bg-amber-50 text-black">
                Sell
              </button>
            </div>
          </div>

          {/* Silver Card */}
          <div className="rounded-3xl p-6 shadow-lg bg-white border border-gray-300">
            <div className="flex justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
                  <Award className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-600">
                    Silver Price
                  </p>
                  <h2 className="font-serif text-2xl  text-gray-800">
                    {silverPrice ? `₹${silverPrice}/g` : "Loading..."}
                  </h2>
                </div>
              </div>

              {silverPercentage && (
                <span
                  className={`text-xs font-serif px-3 py-1 rounded-full ${
                    silverisProfit
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {silverisProfit ? "▲" : "▼"} {Math.abs(silverPercentage)}%
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/silver")}
                className="flex-1 py-3 rounded-xl text-sm uppercase tracking-widest font-serif bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-black shadow-md hover:opacity-90">
                Buy
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm uppercase tracking-widest font-serif border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                Sell
              </button>
            </div>
          </div>
        </div>
 
 <div className="flex border border-amber-300 rounded-2xl">
  {ranges.map((range) => (
    <button
      key={range}
      onClick={() => setSelectedRange(range)}
      className={`w-full p-2 border border-amber-200
        ${selectedRange === range ? "bg-amber-200 text-black" : ""}
      `}
    >
      {range}
    </button>
  ))}
</div>


        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10 mt-4">
          <div className="rounded-3xl p-6 shadow-lg bg-white border border-amber-200 font-fraunces">
            <h3 className="font-serif text-xl font-bold mb-5 text-amber-900">
              Gold Price Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
             <LineChart data={goldData[selectedRange]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#ca8a04" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl p-6 shadow-lg bg-white border border-gray-200">
            <h3 className="font-serif text-xl font-semibold mb-5 text-gray-800">
              Silver Price Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={silverData[selectedRange]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#9ca3af" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
      

          <div className="mb-8">
          <h2 className="text-3xl font-serif text-amber-900 mb-6">Why Invest in Digital Gold & Silver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-amber-900 gap-6">


            {insights.map((insight, index) => (
              <div 
                key={index}
                className=" text-amber-900 border border-text-amber-900 rounded-xl p-6 backdrop-blur-sm
                 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1">

                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${insight.gradient}
                 flex items-center justify-center mb-4`}>
                  <insight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-serif text-amber-900 mb-2">{insight.title}</h3>
                <p className=" text-sm leading-relaxed text-amber-900/79">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

  );
}

export default Dashboard;