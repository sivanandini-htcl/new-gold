import { useEffect, useState } from "react";

import dg from "../assets/dg";
import banner from "../assets/banner.jpg";
import banner2 from "../assets/banner2.jpg";   
import banner3 from "../assets/banner3.jpg";   

   


const banners = [
  {
    title: "Invest in Digital Gold",
    subtitle: "Secure • 24K • 99.9% Pure",
   image: banner3
  },
  {
    title: "Silver Prices Rising",
    subtitle: "Start investing from ₹10",
   image: banner
  },
  {
    title: "Instant Buy & Sell",
    subtitle: "No storage worries",
   image: banner2

   
  },
];


export default function SlidingBanner() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
 
  <div className="relative overflow-hidden rounded-2xl mb-6">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${current * 100}%)` }}
    >
      {banners.map((banner, index) => (
        <div key={index} className="min-w-full h-40 md:h-96 relative">

          {/* Background Image */}
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-center"
          />

          {/* Dark Overlay (important for readability) */}
          <div className="absolute inset-0 " />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
            <h2 className="text-lg md:text-2xl font-bold">
              {banner.title}
            </h2>
            <p className="text-sm md:text-base opacity-90">
              {banner.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Dots */}
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
      {banners.map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i === current ? "bg-white" : "bg-white/40"
          }`}
        />
      ))}
    </div>
  </div>
);

}
