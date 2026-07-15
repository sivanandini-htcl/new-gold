// CoverflowCarousel.jsx
// npm install framer-motion

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  { id: 0, name: "The Roseline Ring",    tag: "Rings",    img: "/images/products/silverC1.png" },
  { id: 1, name: "The Zoe Earrings",     tag: "Earrings", img: "/images/products/silverC5.png" },
  { id: 2, name: "The Hibiscus Ring II", tag: "Rings",    img: "/images/products/goldcoin2.png" },
  { id: 3, name: "The Chubby Hoops",     tag: "Hoops",    img: "/images/products/silverC2.png" },
  { id: 4, name: "The Gold Chain",       tag: "Chains",   img: "/images/products/goldcoin3.png" },
];

// Base position configs at reference width 200px
const BASE_POS = {
  "-2": { x: -310, z: -260, rotateY:  52, scale: 0.62, opacity: 0.5, brightness: 0.42, zIndex: 2 },
  "-1": { x: -195, z: -120, rotateY:  38, scale: 0.78, opacity: 0.8, brightness: 0.68, zIndex: 4 },
   "0": { x:    0, z:    0, rotateY:   0, scale: 1.0,  opacity: 1.0,  brightness: 1.0,  zIndex: 5 },
   "1": { x:  195, z: -120, rotateY: -38, scale: 0.78, opacity: 0.8, brightness: 0.68, zIndex: 4 },
   "2": { x:  310, z: -260, rotateY: -52, scale: 0.62, opacity: 0.5, brightness: 0.42, zIndex: 2 },
};

const SPRING = { type: "spring", stiffness: 240, damping: 28, mass: 0.85 };

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return size;
}

function CarouselCard({ card, offset, onClickDir, cardWidth, cardHeight, positionCfg }) {
  if (!positionCfg) return null;

  const marginLeft = -cardWidth / 2;
  const marginTop = -cardHeight / 2;

  return (
   <motion.div
  animate={{
    x: positionCfg.x,
   
    rotateY: positionCfg.rotateY,
    scale: positionCfg.scale,
    opacity: positionCfg.opacity,

  }}
  transition={SPRING}
  onClick={() => offset !== 0 && onClickDir(offset < 0 ? -1 : 1)}
  whileHover={
    offset !== 0
      ? {
          scale: positionCfg.scale * 1.05,
          transition: { duration: 0.18 },
        }
      : {}
  }
  className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[20px] [transform-style:preserve-3d] [will-change:transform,opacity] ${
    offset === 0 ? "cursor-default" : "cursor-pointer"
  }`}
  style={{
    width: cardWidth,
    height: cardHeight,
    marginLeft,
    marginTop,
  }}
>
   <motion.img
  src={card.img}
  alt={card.name}
  // animate={{ filter: `brightness(${positionCfg.brightness})` }}
  // transition={SPRING}
  className="block h-full w-full object-contain bg-black p-6"
  draggable={false}
/>

<div className="absolute inset-0 rounded-[20px] border border-[rgba(173,160,140,0.55)]" />

<motion.div
  animate={{ opacity: offset === 0 ? 1 : 0 }}
  transition={{ duration: 0.4 }}
  className="pointer-events-none absolute inset-0 rounded-[20px] border-[1.5px] border-[rgba(201,169,122,0.55)]"
/>

     <motion.span
  animate={{
    opacity: offset === 0 ? 1 : 0,
    y: offset === 0 ? 0 : -4,
  }}
  transition={{ duration: 0.35 }}
  className="absolute left-[14px] top-[14px] whitespace-nowrap 
  rounded-full bg-[rgba(255,255,255,0.93)]
  px-[4px] py-[2px] font-serif font-extrabold  text-xs uppercase tracking-[0.1em] text-[#1a1008]"

>
  {card.tag}
</motion.span>

      <div className="absolute bottom-0 left-0 right-0 px-[14px] pt-3 pb-1">
 

  <motion.p
    animate={{
      opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.6 : 0,
    }}
    transition={{ duration: 0.35 }}
    className="text-[7px] sm:text-xs md:text-sm font-serif font-extrabold uppercase tracking-[0.18em] text-[#e8c87a]"
  >
    {card.name}
  </motion.p>
   <motion.p
    animate={{ opacity: offset === 0 ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="mb-0.5 text-[8px] sm:text-[10px] md:text-xs font-serif uppercase tracking-[0.22em] text-[#9a7d54]"
  >
    {String(card.id + 1).padStart(2, "0")} /{" "}
    {String(CARDS.length).padStart(2, "0")}
  </motion.p>
</div>


    </motion.div>
  );
}

export default function CoverflowCarousel() {
  const [current, setCurrent] = useState(2);
  const { width: windowWidth } = useWindowSize();
  const stageRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeThreshold = 50;

  // Responsive card width based on screen size (no extra margins)
  const cardWidth = useMemo(() => {
    if (windowWidth < 640) return 140;
    if (windowWidth < 768) return 200;
    if (windowWidth < 1024) return 200;
    if (windowWidth < 1280) return 200;
    if (windowWidth < 1536) return 300;
    return 320;
  }, [windowWidth]);

  const cardHeight = cardWidth * 1.4;
  const scaleFactor = cardWidth / 300;

  const positionMap = useMemo(() => {
    const map = {};
    Object.keys(BASE_POS).forEach((key) => {
      const base = BASE_POS[key];
      map[key] = {
        ...base,
        x: base.x * scaleFactor,
        z: base.z * scaleFactor,
      };
    });
    return map;
  }, [scaleFactor]);

  const N = CARDS.length;

  const go = (dir) => setCurrent((p) => ((p + dir) % N + N) % N);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) go(-1);
      else go(1);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const stageMinHeight = cardHeight * 1.4;

  return (

    <section className="bg-black min-h-fit">
    
    
   
      <motion.div
  initial={{ opacity: 0, y: -28 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
  className="flex flex-col items-center p-5 md:10 md:mb-20 "
>
  <p  className="mb-1 md:mt-4 xl:mt-8  uppercase tracking-[0.1em] text-primary/60 text-xs font-serif  ">
    The Collection
  </p>

  <h2
    className="mb-10 md:mb-1 xl:mb-17 font-black uppercase  font-serif text-primary
               text-[2rem] sm:text-[2.8rem] md:text-2xl lg:text-3xl xl:text-5xl tracking-[0.1em]" >
     OUR WORKS 
     {/* <span className="text-[#c9a97a]">WORKS</span> */}
  </h2>
</motion.div>

    <motion.div
  ref={stageRef}
  initial={{ opacity: 0, scale: 0.88 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  className=" 
    relative flex w-full min-h-[200px]
    justify-center items-center
    overflow-visible
    [perspective:700px]
    [perspective-origin:50%_48%]
    [transform-style:preserve-3d]
  "
>
  {CARDS.map((card, i) => {
    let offset = i - current;
    if (offset > N / 2) offset -= N;
    if (offset < -N / 2) offset += N;
    if (Math.abs(offset) > 2) return null;

    const offsetKey = String(offset);
    const positionCfg = positionMap[offsetKey];

    return (
      <CarouselCard
        key={card.id}
        card={card}
        offset={offset}
        onClickDir={(dir) => go(dir)}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        positionCfg={positionCfg}
      />
    );
  })}
</motion.div>


      {/* 3D Stage - full width, no padding, centered perspective */}
   
     {/* Active label */}
    <div className="relative z-[2] mt-15 mb-5 text-center md:mt-30 h-8 overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.p
      key={current}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28 }}
      className="text-center font-serif font-bold uppercase tracking-[0.28em] text-[#c9a97a] whitespace-nowrap"
     
    >
      {CARDS[current].name}
    </motion.p>
  </AnimatePresence>
</div>
    

      {/* Controls - centered, no extra margins */}

      <motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="relative z-[2] flex items-center justify-center  gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-12 "
>
  <motion.button
    onClick={() => go(-1)}
    whileHover={{ scale: 1.1, borderColor: "#c9a97a" }}
    whileTap={{ scale: 0.92 }}
    className="flex h-11 w-11 xl:mb-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(201,169,122,0.35)] bg-transparent text-[18px] text-[#c9a97a]"
    aria-label="Previous item"
  >
    ←
  </motion.button>

  <div className="flex items-center xl:mb-10 gap-2">
    {CARDS.map((_, i) => (
      <motion.button
        key={i}
        onClick={() => setCurrent(i)}
        animate={{
          width: i === current ? 26 : 7,
          background: i === current ? "#c9a97a" : "rgba(201,169,122,0.28)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="h-[7px] rounded-full border-0 p-0 cursor-pointer"
        aria-label={`Go to item ${i + 1}`}
      />
    ))}
  </div>

  <motion.button
    onClick={() => go(1)}
    whileHover={{ scale: 1.1, borderColor: "#c9a97a" }}
    whileTap={{ scale: 0.92 }}
    className="flex h-11 w-11 cursor-pointer xl:mb-10 items-center justify-center rounded-full border border-[rgba(201,169,122,0.35)] bg-transparent text-[18px] text-[#c9a97a]"
    aria-label="Next item"
  >
    →
  </motion.button>
</motion.div>
   
    </section>
  );
}