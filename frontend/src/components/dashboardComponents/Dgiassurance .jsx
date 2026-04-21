import React, { useRef, useEffect, useState } from "react";

const assurances = [
  {
    label: "DGI Exchange",
    sublabel: "Sell anytime, hassle-free",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
        <circle cx="40" cy="40" r="38" stroke="url(#g1)" strokeWidth="2" fill="url(#bg1)" />
        <defs>
          <radialGradient id="bg1" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
          <linearGradient id="g1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="1" stopColor="#92400e" />
          </linearGradient>
        </defs>
        <path d="M25 40 C25 31 31 25 40 25 C49 25 55 31 55 40" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M55 40 C55 49 49 55 40 55 C31 55 25 49 25 40" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <polyline points="20,36 25,40 30,36" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="60,44 55,40 50,44" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="40" cy="40" r="5" fill="#b45309" />
      </svg>
    ),
  },
  {
    label: "BIS Certified",
    sublabel: "Govt. of India hallmark",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
        <defs>
          <radialGradient id="bg2" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="1" stopColor="#92400e" />
          </linearGradient>
        </defs>
        <polygon points="40,6 72,26 72,54 40,74 8,54 8,26" fill="url(#bg2)" stroke="url(#g2)" strokeWidth="2" />
        <polygon points="40,16 62,30 62,50 40,64 18,50 18,30" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
        <polyline points="28,40 37,49 54,32" stroke="#b45309" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    label: "99.9% Purity",
    sublabel: "Assayed & certified gold",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
        <defs>
          <radialGradient id="bg3" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#bg3)" stroke="#d97706" strokeWidth="2" />
        <rect x="26" y="28" width="28" height="24" rx="3" fill="none" stroke="#b45309" strokeWidth="2" />
        <line x1="33" y1="28" x2="33" y2="22" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <line x1="47" y1="28" x2="47" y2="22" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
        <text x="40" y="44" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold" fontFamily="Georgia, serif">999</text>
        <line x1="30" y1="48" x2="50" y2="48" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Easy Redemption",
    sublabel: "Convert to jewellery or cash",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
        <defs>
          <radialGradient id="bg4" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#bg4)" stroke="#d97706" strokeWidth="2" />
        <path d="M30 50 L40 28 L50 50" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="33" y1="44" x2="47" y2="44" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="56" r="3" fill="#d97706" />
      </svg>
    ),
  },
  {
    label: "Instant Delivery",
    sublabel: "Gold in your account in seconds",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
        <defs>
          <radialGradient id="bg5" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#bg5)" stroke="#d97706" strokeWidth="2" />
        <path d="M44 22 L28 42 H40 L36 58 L56 36 H44 L44 22Z" fill="#b45309" stroke="#92400e" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Secure Vault",
    sublabel: "Insured & SEBI compliant",
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
        <defs>
          <radialGradient id="bg6" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#bg6)" stroke="#d97706" strokeWidth="2" />
        <path d="M40 20 L56 28 V42 C56 52 40 60 40 60 C40 60 24 52 24 42 V28 Z" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="40" cy="40" r="6" fill="none" stroke="#b45309" strokeWidth="2" />
        <circle cx="40" cy="40" r="2.5" fill="#d97706" />
        <line x1="40" y1="42.5" x2="40" y2="48" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function DgiAssurance() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      margin: "48px 0",
      padding: "48px 32px",
      background: "#fff",
      borderRadius: 28,
      border: "1px solid #fde68a",
      boxShadow: "0 8px 40px rgba(202,138,4,0.08)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Decorative corner ornaments */}
      <svg style={{ position: "absolute", top: 16, left: 16, opacity: 0.18 }} width="48" height="48" viewBox="0 0 48 48">
        <path d="M4 44 L4 4 L44 4" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M4 4 L14 14" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <svg style={{ position: "absolute", top: 16, right: 16, opacity: 0.18, transform: "scaleX(-1)" }} width="48" height="48" viewBox="0 0 48 48">
        <path d="M4 44 L4 4 L44 4" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M4 4 L14 14" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <svg style={{ position: "absolute", bottom: 16, left: 16, opacity: 0.18, transform: "scaleY(-1)" }} width="48" height="48" viewBox="0 0 48 48">
        <path d="M4 44 L4 4 L44 4" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M4 4 L14 14" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <svg style={{ position: "absolute", bottom: 16, right: 16, opacity: 0.18, transform: "scale(-1,-1)" }} width="48" height="48" viewBox="0 0 48 48">
        <path d="M4 44 L4 4 L44 4" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M4 4 L14 14" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{
          fontSize: 11, textTransform: "uppercase", letterSpacing: "0.22em",
          color: "#b45309", fontFamily: "Georgia, serif", marginBottom: 8,
        }}>
          Our Promise to You
        </p>
        <h2 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 32, fontWeight: 700,
          color: "#1c1917", margin: 0, lineHeight: 1.2,
        }}>
          The <span style={{
            background: "linear-gradient(90deg, #92400e, #d97706, #92400e)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>DgiGold</span> Assurance
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#78350f", marginTop: 10, fontStyle: "italic" }}>
          Trusted by investors. Backed by the finest standards.
        </p>
        {/* Gold divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16 }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #d97706)" }} />
          <svg width="16" height="16" viewBox="0 0 16 16">
            <polygon points="8,1 10,6 15,6 11,10 13,15 8,12 3,15 5,10 1,6 6,6" fill="#d97706" />
          </svg>
          <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #d97706, transparent)" }} />
        </div>
      </div>

      {/* Icons grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "32px 16px",
      }}>
        {assurances.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
            }}
          >
            {/* Icon ring */}
            <div style={{
              width: 88, height: 88,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fef9c3, #fef3c7)",
              border: "1.5px solid #fcd34d",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(202,138,4,0.13)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(202,138,4,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(202,138,4,0.13)";
              }}
            >
              {item.svg}
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "Georgia, serif",
                fontSize: 14, fontWeight: 700,
                color: "#78350f", margin: 0, lineHeight: 1.3,
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: 11, color: "#a1a1aa",
                margin: "4px 0 0", lineHeight: 1.4,
              }}>
                {item.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}