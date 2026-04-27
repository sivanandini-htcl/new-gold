// SilverScroller.jsx (Section.jsx) — Responsive sm → 2xl
// ✅ Matches gold/dark color palette
// ✅ Smooth slide transitions
// ✅ Responsive text and image sizing

import { useState } from "react";
import img1 from "../../assets/silverC1.jpg";
import img2 from "../../assets/silverC2.jpg";
import img3 from "../../assets/silverC2.jpg";
import img4 from "../../assets/silveC4.jpg";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Silver Collection",
    tag: "Handcrafted · 999 Fine",
    desc: "Discover our curated range of 999 fine silver pieces — from investment-grade bars to artisan jewellery, each crafted to perfection and backed by hallmark certification.",
    img: img1,
  },
  {
    title: "Premium Silver Bars",
    tag: "Investment · Certified",
    desc: "High-quality silver bars minted to international standards. Perfect for long-term investment or as a premium corporate gift — each bar ships in a sealed tamper-proof case.",
    img: img2,
  },
  {
    title: "Luxury Silver Coins",
    tag: "Collectible · Limited Edition",
    desc: "Exclusive collectible silver coins bearing traditional motifs and elegant matte finishes. A timeless piece that holds both aesthetic and intrinsic value.",
    img: img3,
  },
  {
    title: "Silver Gift Edition",
    tag: "Gifting · Premium Packaging",
    desc: "Perfect silver gifting sets for festivals, weddings, and corporate occasions. Custom engraving and branded packaging available for bulk orders.",
    img: img4,
  },
];

export default function Section() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-slate-700/30">
      <div className="flex flex-col md:flex-row items-center gap-0">

        {/* LEFT: TEXT ─────────────────── */}
        <div className="w-full md:w-1/2 px-6 py-8 sm:px-8 sm:py-10 2xl:px-14 2xl:py-16 flex flex-col justify-center order-2 md:order-1">

          {/* Slide indicators */}
          <div className="flex gap-1.5 mb-5 2xl:mb-7">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-slate-300" : "w-1.5 bg-slate-600"}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <span className="text-[10px] 2xl:text-xs uppercase tracking-widest font-bold text-slate-400 bg-slate-400/10 border border-slate-400/20 px-2.5 py-0.5 rounded-full">
                {slide.tag}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif font-black text-white mt-3 mb-3 2xl:mt-4 2xl:mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm 2xl:text-base text-slate-300/70 leading-relaxed max-w-sm 2xl:max-w-md font-serif">
                {slide.desc}
              </p>
              <button className="mt-6 2xl:mt-8 self-start text-xs 2xl:text-sm font-bold px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-xl bg-gradient-to-r from-slate-500 to-gray-400 text-white hover:from-slate-600 transition">
                Explore Silver →
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Arrow controls */}
          <div className="flex gap-3 mt-8 2xl:mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:border-slate-400 hover:bg-slate-700/40 transition"
            >
              <ChevronLeft size={16} className="2xl:w-5 2xl:h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:border-slate-400 hover:bg-slate-700/40 transition"
            >
              <ChevronRight size={16} className="2xl:w-5 2xl:h-5" />
            </button>
          </div>
        </div>

        {/* RIGHT: IMAGE ────────────────── */}
        <div className="w-full md:w-1/2 order-1 md:order-2 h-60 sm:h-72 md:h-full 2xl:h-[26rem] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={slide.img}
              alt={slide.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0f1218]/60 hidden md:block" />
        </div>

      </div>
    </div>
  );
}