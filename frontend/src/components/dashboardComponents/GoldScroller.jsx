
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Gold Collection",
    tag: "Handcrafted · 999 Fine",
    desc: "Discover our curated range of 24k fine gold pieces — from investment-grade bars to artisan jewellery, each crafted to perfection and backed by hallmark certification.",
    img: "images/products/goldcoin3.png",
  },
  {
    title: "Premium Gold Bars",
    tag: "Investment · Certified",
    desc: "High-quality gold bars minted to international standards. Perfect for long-term investment or as a premium corporate gift — each bar ships in a sealed tamper-proof case.",
    img: "images/products/goldcoin2.png",
  },
  {
    title: "Luxury Gold Bar",
    tag: "Collectible · Limited Edition",
    desc: "Exclusive collectible gold coins bearing traditional motifs and elegant matte finishes. A timeless piece that holds both aesthetic and intrinsic value.",
    img: "images/products/goldbar1.png",
  },
  {
    
  title: "Premium Gold Coins",
  tag: "Investment · 999.9 Pure",
  desc: "Discover our exclusive range of 999.9 pure gold coins, crafted with exceptional precision and certified for purity. Ideal for investment, gifting, and celebrating life's special occasions with lasting value.",
  img: "images/products/goldcoin3.png",
}  
];

export default function GoldSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const navigate =useNavigate();

  const slide = slides[index];

  return (
    <div className="rounded-3xl overflow-hidden  border border-slate-700/30  md:aspect-16/10 lg:aspect-[16/7]">
      <div className="flex flex-col md:flex-row items-center gap-0">

        {/* LEFT: TEXT */}
        <div className="w-full md:w-1/2 px-6 py-8 sm:px-8 sm:py-10 2xl:px-14 2xl:py-16 flex flex-col justify-center order-2 md:order-1">

          {/* Slide indicators */}
          <div className="flex gap-1.5 mb-5 2xl:mb-7">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/50"}`}
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
              <span className="text-[10px] 2xl:text-xs uppercase tracking-widest font-bold text-primary bg-slate-400/10 border border-slate-400/20 px-2.5 py-0.5 rounded-full">
                {slide.tag}
              </span>
              <h1 className="text-2xl text-primary sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif uppercase text- mt-3 mb-3 2xl:mt-4 2xl:mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm italic 2xl:text-base text-primary/60 leading-relaxed max-w-sm 2xl:max-w-md font-serif">
                {slide.desc}
              </p>
              <button onClick={()=>navigate("/redeem")} className="mt-6 2xl:mt-8 self-start text-xs 2xl:text-sm font-bold px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-xl bg-primary text-background transition">
                Explore Now →
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Arrow controls */}
          <div className="flex gap-3 mt-8 2xl:mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full 
              border border-primary/70 flex items-center justify-center text-primary/50 hover:border-primary/40 hover:bg-primary/30 transition"
            >
              <ChevronLeft size={16} className="2xl:w-5 2xl:h-5 " />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border border-primary/70 text-primary/50 flex items-center justify-center  hover:border-primary/40 hover:bg-primary/30 transition"
            >
              <ChevronRight size={16} className="2xl:w-5 2xl:h-5 " />
            </button>
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="w-full md:w-1/2 order-1 md:order-2 p-3 h-60 sm:h-72 md:h-full 2xl:h-[26rem] relative overflow-hidden group">
  <AnimatePresence mode="wait">
    <motion.img
      key={index}
      src={slide.img}
      alt={slide.title}
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full h-full object-contain xl:object-contain xl:p-19"
    />
  </AnimatePresence>

  <div className="absolute inset-0 bg-black/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center justify-center text-white">
    <p>Name</p>
    <p>Purity</p>
  </div>
</div>

      </div>
    </div>
  );
}