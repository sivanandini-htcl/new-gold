// CoverflowCarousel.jsx
// npm install framer-motion

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  { id: 0, name: "The Roseline Ring",    tag: "Rings",    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=90" },
  { id: 1, name: "The Zoe Earrings",     tag: "Earrings", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=90" },
  { id: 2, name: "The Hibiscus Ring II", tag: "Rings",    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=90" },
  { id: 3, name: "The Chubby Hoops",     tag: "Hoops",    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=90" },
  { id: 4, name: "The Gold Chain",       tag: "Chains",   img: "https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=500&q=90" },
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
        z: positionCfg.z,
        rotateY: positionCfg.rotateY,
        scale: positionCfg.scale,
        opacity: positionCfg.opacity,
        zIndex: positionCfg.zIndex,
      }}
      transition={SPRING}
      onClick={() => offset !== 0 && onClickDir(offset < 0 ? -1 : 1)}
      style={{
        position: "absolute",
        width: cardWidth,
        height: cardHeight,
        borderRadius: 20,
        overflow: "hidden",
        top: "50%",
        left: "50%",
        marginLeft,
        marginTop,
        cursor: offset === 0 ? "default" : "pointer",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
      whileHover={
        offset !== 0
          ? { scale: positionCfg.scale * 1.05, transition: { duration: 0.18 } }
          : {}
      }
    >
      <motion.img
        src={card.img}
        alt={card.name}
        animate={{ filter: `brightness(${positionCfg.brightness})` }}
        transition={SPRING}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        draggable={false}
      />

      <div
        style={{
          position: "absolute", inset: 0, borderRadius: 20,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
        }}
      />

      <motion.div
        animate={{ opacity: offset === 0 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", inset: 0, borderRadius: 20,
          border: "1.5px solid rgba(201,169,122,0.55)",
          pointerEvents: "none",
        }}
      />

      <motion.span
        animate={{ opacity: offset === 0 ? 1 : 0, y: offset === 0 ? 0 : -4 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", top: 14, left: 14,
          background: "rgba(255,255,255,0.93)",
          color: "#1a1008", fontSize: `${Math.max(8, cardWidth * 0.045)}px`,
          fontWeight: 800,
          letterSpacing: "0.14em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: 100,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          whiteSpace: "nowrap",
        }}
      >
        {card.tag}
      </motion.span>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px 16px" }}>
        <motion.p
          animate={{ opacity: offset === 0 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: `${Math.max(8, cardWidth * 0.045)}px`,
            color: "#9a7d54", letterSpacing: "0.22em",
            textTransform: "uppercase", fontFamily: "Georgia, serif", marginBottom: 2,
          }}
        >
          {String(card.id + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
        </motion.p>
        <motion.p
          animate={{ opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.6 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            fontSize: `${Math.max(9, cardWidth * 0.05)}px`,
            fontWeight: 800, color: "#e8c87a",
            letterSpacing: "0.18em", textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {card.name}
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
    if (windowWidth < 768) return 170;
    if (windowWidth < 1024) return 210;
    if (windowWidth < 1280) return 250;
    if (windowWidth < 1536) return 280;
    return 320;
  }, [windowWidth]);

  const cardHeight = cardWidth * 1.5;
  const scaleFactor = cardWidth / 200;

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

  const stageMinHeight = cardHeight * 1.45;

  return (
    <section
      style={{
        background: "#0d0a06",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0", // minimal vertical padding, no horizontal padding
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow - centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: Math.min(700, windowWidth * 0.8),
          height: Math.min(420, windowWidth * 0.5),
          background: "radial-gradient(ellipse, rgba(201,169,122,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header - centered, no side margins */}
      <motion.div
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", marginBottom: 42, zIndex: 2 }}
      >
        <p style={{
          fontSize: `${clamp(9, windowWidth * 0.012, 12)}px`,
          letterSpacing: "0.38em", color: "#c9a97a",
          textTransform: "uppercase", fontFamily: "Georgia, serif", marginBottom: 10,
        }}>
          The Collection
        </p>
        <h2 style={{
          fontSize: `clamp(2rem, ${windowWidth * 0.08}px, 5rem)`,
          fontWeight: 900, color: "#fff",
          textTransform: "uppercase", letterSpacing: "-0.02em",
          fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 0.9, margin: 0,
        }}>
          OUR <span style={{ color: "#c9a97a" }}>WORKS</span>
        </h2>
      </motion.div>

      {/* 3D Stage - full width, no padding, centered perspective */}
      <motion.div
        ref={stageRef}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: 1200,
          perspectiveOrigin: "50% 48%",
          width: "100%",
          minHeight: stageMinHeight,
          position: "relative",
          transformStyle: "preserve-3d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
        }}
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

      {/* Active label */}
      <div style={{ height: 32, marginTop: 16, overflow: "hidden", zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            style={{
              fontSize: `${clamp(9, windowWidth * 0.012, 12)}px`,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "#c9a97a", fontFamily: "Georgia, serif", fontWeight: 700,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
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
        style={{ display: "flex", alignItems: "center", gap: "max(16px, 4vw)", marginTop: 20, zIndex: 2 }}
      >
        <motion.button
          onClick={() => go(-1)}
          whileHover={{ scale: 1.1, borderColor: "#c9a97a" }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid rgba(201,169,122,0.35)",
            background: "transparent", color: "#c9a97a",
            fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Previous item"
        >
          ←
        </motion.button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {CARDS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              animate={{
                width: i === current ? 26 : 7,
                background: i === current ? "#c9a97a" : "rgba(201,169,122,0.28)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                height: 7, borderRadius: 100,
                border: "none", cursor: "pointer", padding: 0,
              }}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => go(1)}
          whileHover={{ scale: 1.1, borderColor: "#c9a97a" }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid rgba(201,169,122,0.35)",
            background: "transparent", color: "#c9a97a",
            fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Next item"
        >
          →
        </motion.button>
      </motion.div>
    </section>
  );
}