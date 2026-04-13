import React, { useContext } from "react";
// import { PriceContext } from "../components/PriceProvider";
import { useNavigate } from "react-router-dom";
import { TrendingUp, DollarSign, Award, Shield, Zap } from "lucide-react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useState,useEffect } from "react";
import usePriceStore from "../store/priceStore";
import { subscribeMetalPrices } from "../api/livestreamapi";
import useAuthStore from "../store/authStore";

function Dashboard() {
  const navigate = useNavigate();
 
  const[selectedRange,setSelectedRange]=useState("6M")
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
    
    <div className="min-h-screen xl:min-h-fit 2xl:py-9   font-serif py-8 px-4 sm:px-6 lg:px-10  bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
      <div className="max-w-7xl mx-auto 2xl:max-w-full 2xl:min-h-fit  ">
        {/* Header */}
        <div className="mb-8 2xl:mb-20 pb-6 border-b border-amber-200 bg-blu">
          <div className="h-1 flex  w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-full mb-4" />
          <h1 className="font-serif  text-5xl xl:text-5xl 2xl:text-7xl tracking-wide">
            <span className="bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              Dgi
            </span>
            <span className="bg-gray-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              Gold
            </span>
          </h1>
          <p className="mt-2 text-xs 2xl:text-xl uppercase tracking-widest text-amber-700">
          Gold  & Silver · Investment Platform
          </p>
          <h2 className="mt-2 text-xs 2xl:text-xl  tracking-widest text-gray-900">Welcome {userName||profileData?.email}</h2>
        </div>
        <p style={{ color: status === "Live Connected" ? "green" : "red" }}>
                ● {status}
            </p>
      
        <div className="grid md:grid-cols-2 gap-6 mb-10 2xl:mb-40  2xl:h-60">
          <div className="rounded-3xl p-6 shadow-lg bg-white border border-amber-300">
            <div className="flex justify-between mb-5 2xl:mb-10 ">
              <div className="flex items-center gap-3 2xl:mb-10">
                <div className="w-11 h-11 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs 2xl:text-xl uppercase tracking-widest text-amber-600">
                    Gold Price
                  </p>
                  <h2 className="font-heading text-2xl 2xl:font-heading 2xl:text-4xl 2xl:font-semibold font-semibold text-amber-900">
                    
                     ₹ {Math.round(gram24kGoldPrice)||"Loading..."}
                     
                     <p className="text-xs text-gray-500 mt-2">
             Updated: {goldPrice ? new Date(goldPrice.timestamp).toLocaleString() : "Loading..."}
</p>
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
                className="flex-1 py-3 rounded-xl text-sm 2xl:text-xl uppercase tracking-widest font-serif bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-md hover:opacity-90">
                Buy
              </button>
              <button className="flex-1 py-3 rounded-xl 2xl:text-xl text-sm uppercase tracking-widest font-serif border border-amber-300 bg-white hover:bg-amber-50 text-black">
                Sell
              </button>
            </div>
          </div>

          {/* Silver Card */}
          <div className="rounded-3xl p-6 shadow-lg bg-white border border-gray-300">
            <div className="flex justify-between mb-10">
              <div className="flex items-center gap-3 2xl:mb-10">
                <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
                  <Award className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs 2xl:text-xl uppercase tracking-widest text-gray-600">
                    Silver Price
                  </p>
                  <h2 className="font-heading text-2xl 2xl:font-heading 2xl:text-4xl 2xl:font-semibold font-semibold  text-gray-800">
                    
                    ₹ { Math.round(gram24ksilverPrice) || "Loading..."}
                    <p className="text-xs text-gray-500 mt-2">
  Updated: {silverPrice ? new Date(silverPrice.timestamp).toLocaleString() : "Loading..."}
</p>
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
                className="flex-1 py-3 rounded-xl text-sm 2xl:text-xl uppercase tracking-widest font-serif bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-black shadow-md hover:opacity-90">
                Buy
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm 2xl:text-xl uppercase tracking-widest font-serif border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                Sell
              </button>
            </div>
          </div>
        </div>
 
 <div className="flex border border-amber-300 2xl:text-4xl rounded-2xl mb-3 2xl:mb-10">
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16 mb-10 2xl:mb-30 mt-4">

  {/* Gold Chart */}
  <div className="rounded-3xl p-4 md:p-6 2xl:p-8 shadow-lg bg-white border border-amber-200 font-fraunces">
    
    <h3 className="font-serif text-xl md:text-2xl 2xl:text-3xl font-bold mb-5 2xl:mb-20 text-amber-900">
      Gold Price Trend
    </h3>

    <ResponsiveContainer width="100%" height={250} className="2xl:h-[350px]">
      <LineChart data={goldData[selectedRange]}>
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis dataKey="date" tick={{ fontSize: 16 }} />
        <YAxis tick={{ fontSize: 16 }} />
        
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "16px" }} />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#ca8a04"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Silver Chart */}
  <div className="rounded-3xl p-4 md:p-6 2xl:p-8 shadow-lg bg-white border border-gray-200">
    
    <h3 className="font-serif text-xl md:text-2xl 2xl:text-3xl font-semibold mb-5 2xl:mb-20 text-gray-800">
      Silver Price Trend
    </h3>

    <ResponsiveContainer width="100%" height={250} className="2xl:h-[350px]">
      <LineChart data={silverData[selectedRange]}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" tick={{ fontSize: 16 }} />
        <YAxis tick={{ fontSize: 16 }} />

        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "16px" }} />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#9ca3af"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>

  </div>
</div>

        {/* Insights */}
      

          <div className="mb-8 2xl:mb-30">
          <h2 className="text-xl md:text-3xl 2xl:text-5xl font-serif text-amber-900 mb-6 2xl:mb-25">Why Invest in Digital Gold & Silver?</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-amber-900 gap-6 2xl:gap-9 p-1">


            {insights.map((insight, index) => (
              <div 
                key={index}
                className=" text-amber-900 border border-text-amber-900 rounded-xl p-3 md:p-6 backdrop-blur-sm
                 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1 text-sm ">

                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${insight.gradient}
                 flex items-center justify-center mb-4`}>
                  <insight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xs md:text-lg xl:text-xl 2xl:text-3xl font-serif text-amber-900 mb-2">{insight.title}</h3>
                <p className=" text-xs  leading-relaxed xl:text-xl 2xl:text-2xl text-amber-900/79">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

  );
}

export default Dashboard;