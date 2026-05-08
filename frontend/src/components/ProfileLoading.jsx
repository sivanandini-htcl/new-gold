"use client";

import { motion } from "framer-motion";

function ShimmerBlock({ className = "", delay = 0 }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#ede0d4] ${className}`}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "220%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
    </div>
  );
}

function SkeletonCard({ delay = 0 }) {
  return (
    <div className="flex-[1_1_160px] max-w-[200px] overflow-hidden rounded-[14px] border border-[#ede0d4] bg-white pb-[14px]">
      
      <ShimmerBlock
        delay={delay}
        className="mb-3 h-[130px]"
      />

      <div className="flex flex-col gap-2 px-3">
        <ShimmerBlock
          delay={delay}
          className="h-3 w-[80%] rounded-[6px]"
        />

        <ShimmerBlock
          delay={delay}
          className="h-[10px] w-[55%] rounded-[6px]"
        />

        <ShimmerBlock
          delay={delay}
          className="mt-1 h-[14px] w-[40%] rounded-[6px]"
        />
      </div>
    </div>
  );
}

export default function ProductLoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fdf6ef] px-5 py-10 font-['DM_Sans']">

      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-5"
      >
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[20px] bg-[#3d1f0f]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fdf6ef"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
      </motion.div>

      {/* Text */}
      <p className="mb-2 text-[15px] font-semibold text-[#5c4033]">
        Fetching products
      </p>

      {/* Loading Dots */}
      <div className="mb-11 flex gap-[6px]">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className="h-[7px] w-[7px] rounded-full bg-[#a0522d]"
          />
        ))}
      </div>

      {/* Skeleton Cards */}
    
    </div>
  );
}