import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function About() {
  const navigate = useNavigate();
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      },
      { threshold: 0.2 }
    );
    barsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { val: '2L+', label: 'Trusted Investors' },
    { val: '₹500Cr+', label: 'Assets Managed' },
    { val: '99.9%', label: 'Purity Guaranteed' },
    { val: '24/7', label: 'Live Market Access' },
  ];

  const commitments = [
    { num: '01', title: 'Remove every barrier', desc: 'Invest from ₹1. No minimum, no lock-in, no hassle.' },
    { num: '02', title: '24K purity, always', desc: 'Hallmarked, certified, and independently audited gold.' },
    { num: '03', title: 'Transparent pricing', desc: 'No hidden fees, no spread, no surprises — ever.' },
    { num: '04', title: 'Yours to redeem', desc: 'Convert to physical jewellery, coins, or cash anytime.' },
  ];

  const steps = [
    { icon: 'ti-user-plus', title: 'Create account', desc: 'Sign up in under 2 minutes. KYC verified instantly with Aadhaar.' },
    { icon: 'ti-wallet', title: 'Add funds', desc: 'UPI, net banking, or card. Any amount from ₹1 works.' },
    { icon: 'ti-diamond', title: 'Buy metals', desc: 'Purchase gold or silver at live market rates, zero markup.' },
    { icon: 'ti-building-bank', title: 'Earn & redeem', desc: 'Sell anytime or redeem as jewellery, coins, or gifting.' },
  ];

  const trust = [
    { icon: 'ti-certificate', val: 'SEBI', label: 'Regulated & compliant\nfully certified platform' },
    { icon: 'ti-file-check', val: '100%', label: 'Reserve backed\nquarterly audits published' },
    { icon: 'ti-lock', val: 'AES-256', label: 'Military-grade encryption\nzero data breaches' },
  ];

  const timeline = [
    { year: '2023', title: 'Founded', event: 'DgiGold born in Bengaluru. Mission: make precious metals accessible to all Indians.' },
    { year: '2024', title: 'Gold launch', event: 'Platform launched. ₹10 Cr AUM crossed in just 6 months. 10,000 early users.' },
    { year: '2025', title: 'Silver + scale', event: 'Silver added. 50,000 active users. Vault capacity expanded across 3 cities.' },
    { year: '2026', title: 'Redeem & gift', event: 'Jewellery redemption, digital gifting, live price alerts, and SIP investing.' },
  ];

  const team = [
    { initial: 'A', name: 'Founder A', role: 'CEO & Co-Founder', delay: '0s' },
    { initial: 'B', name: 'Founder B', role: 'Co-Founder', delay: '0.5s' },
    { initial: 'C', name: 'Ops Lead', role: 'Head of Operations', delay: '1s' },
    { initial: 'D', name: 'Compliance Lead', role: 'Head of Compliance', delay: '1.5s' },
  ];

  const bars = [
    { label: 'Gold', pct: 88, val: '+8.8%', delay: '0.2s' },
    { label: 'Silver', pct: 64, val: '+6.4%', delay: '0.4s' },
    { label: 'Returns', pct: 92, val: '+9.2%', delay: '0.6s' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

        :root {
          --gold: #EBB97D;
          --gold2: #C9943A;
          --bg: #1A1A23;
          --bg2: #1E1E28;
          --bg3: #22222E;
          --white: rgba(255,255,255,0.82);
          --muted: rgba(255,255,255,0.42);
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Inter', system-ui, sans-serif;
        }

        @keyframes dgi-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dgi-fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes dgi-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes dgi-pulse {
          0%,100% { opacity: 0.4; } 50% { opacity: 1; }
        }
        @keyframes dgi-orb {
          0% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.4); opacity: 0.06; }
          100% { transform: scale(1); opacity: 0.15; }
        }
        @keyframes dgi-lineGrow {
          from { width: 0; } to { width: 100%; }
        }

        .dgi-page { background: #1A1A23; font-family: 'Inter', system-ui, sans-serif; color: #EBB97D; width: 100%; overflow-x: hidden; }

        /* HERO */
        .dgi-hero { position: relative; padding: 72px 40px 80px; text-align: center; overflow: hidden; }
        .dgi-orb1 { position: absolute; top: -60px; left: -60px; width: 300px; height: 300px; border-radius: 50%; background: rgba(235,185,125,0.08); animation: dgi-orb 6s ease-in-out infinite; }
        .dgi-orb2 { position: absolute; bottom: -80px; right: -40px; width: 360px; height: 360px; border-radius: 50%; background: rgba(235,185,125,0.05); animation: dgi-orb 8s 2s ease-in-out infinite; }
        .dgi-hero-inner { position: relative; z-index: 2; }
        .dgi-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(235,185,125,0.08); border: 1px solid rgba(235,185,125,0.2); border-radius: 100px; padding: 7px 18px; margin-bottom: 36px; animation: dgi-fadeIn 0.8s ease both; }
        .dgi-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #EBB97D; animation: dgi-pulse 2s ease-in-out infinite; }
        .dgi-badge span { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(235,185,125,0.7); font-weight: 400; }
        .dgi-logo { font-family: 'Playfair Display', Georgia, serif; font-size: 96px; line-height: 1; letter-spacing: -3px; margin-bottom: 4px; animation: dgi-fadeUp 0.9s 0.1s ease both; }
        .dgi-logo-dgi { background: linear-gradient(135deg,#EBB97D,#F5D4A0,#C9943A); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .dgi-logo-g { color: rgba(180,180,195,0.6); }
        .dgi-hero-sub { font-size: 12px; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.42); margin-bottom: 40px; animation: dgi-fadeUp 0.9s 0.2s ease both; }
        .dgi-hero-quote { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 20px; color: rgba(255,255,255,0.82); max-width: 560px; margin: 0 auto 48px; line-height: 1.7; animation: dgi-fadeUp 0.9s 0.3s ease both; }
        .dgi-scroll-hint { display: inline-flex; flex-direction: column; align-items: center; gap: 6px; color: rgba(255,255,255,0.42); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; animation: dgi-fadeUp 0.9s 0.5s ease both; }
        .dgi-scroll-line { width: 1px; height: 36px; background: linear-gradient(180deg,rgba(235,185,125,0.5),transparent); animation: dgi-float 2s ease-in-out infinite; }

        /* STATS */
        .dgi-ticker { border-top: 1px solid rgba(235,185,125,0.1); border-bottom: 1px solid rgba(235,185,125,0.1); display: grid; grid-template-columns: repeat(4,1fr); background: #1E1E28; }
        .dgi-tick { padding: 28px 24px; text-align: center; border-right: 1px solid rgba(235,185,125,0.08); position: relative; overflow: hidden; transition: background 0.3s; cursor: default; }
        .dgi-tick:last-child { border-right: none; }
        .dgi-tick:hover { background: rgba(235,185,125,0.04); }
        .dgi-tick::before { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 2px; background: #EBB97D; transition: width 0.4s; }
        .dgi-tick:hover::before { width: 60%; }
        .dgi-tick-val { font-family: 'Playfair Display', Georgia, serif; font-size: 32px; color: #EBB97D; line-height: 1; margin-bottom: 6px; }
        .dgi-tick-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.42); }

        /* VIS CARDS */
        .dgi-vis-row { padding: 64px 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .dgi-vis-card { border-radius: 20px; padding: 36px 28px; position: relative; overflow: hidden; border: 1px solid rgba(235,185,125,0.1); background: #1E1E28; transition: transform 0.35s, border-color 0.35s; }
        .dgi-vis-card:hover { transform: translateY(-6px); border-color: rgba(235,185,125,0.28); }
        .dgi-vis-card.big { grid-column: span 2; background: #22222E; }
        .dgi-vc-icon { width: 52px; height: 52px; border-radius: 14px; background: rgba(235,185,125,0.08); border: 1px solid rgba(235,185,125,0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .dgi-vc-icon i { font-size: 22px; color: #EBB97D; }
        .dgi-vc-title { font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: rgba(255,255,255,0.82); margin-bottom: 10px; line-height: 1.25; }
        .dgi-vc-text { font-size: 12px; color: rgba(255,255,255,0.42); line-height: 1.8; }
        .dgi-bar-vis { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
        .dgi-bar-row { display: flex; align-items: center; gap: 12px; }
        .dgi-bar-label { font-size: 11px; color: rgba(255,255,255,0.42); min-width: 52px; text-align: right; }
        .dgi-bar-track { flex: 1; height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
        .dgi-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg,#C9943A,#EBB97D); animation: dgi-lineGrow 1.2s ease both; animation-play-state: paused; }
        .dgi-bar-pct { font-size: 11px; color: #EBB97D; min-width: 40px; }

        /* MISSION */
        .dgi-mission-wrap { padding: 0 40px 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .dgi-mission-text { padding: 48px 40px; background: #22222E; border-radius: 20px; border: 1px solid rgba(235,185,125,0.08); }
        .dgi-mission-list { margin-top: 28px; display: flex; flex-direction: column; }
        .dgi-m-item { display: flex; align-items: flex-start; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(235,185,125,0.06); }
        .dgi-m-item:last-child { border-bottom: none; padding-bottom: 0; }
        .dgi-m-num { font-family: 'Playfair Display', Georgia, serif; font-size: 13px; color: rgba(235,185,125,0.3); min-width: 24px; margin-top: 2px; }
        .dgi-m-title { font-size: 14px; color: #EBB97D; margin-bottom: 4px; font-weight: 500; }
        .dgi-m-desc { font-size: 12px; color: rgba(255,255,255,0.42); line-height: 1.7; }
        .dgi-mission-right { display: flex; flex-direction: column; gap: 20px; }
        .dgi-quote-card { background: #22222E; border-radius: 20px; padding: 36px; border: 1px solid rgba(235,185,125,0.1); position: relative; overflow: hidden; }
        .dgi-quote-bg { position: absolute; top: -12px; left: 20px; font-family: 'Playfair Display', Georgia, serif; font-size: 120px; color: rgba(235,185,125,0.07); line-height: 1; pointer-events: none; }
        .dgi-quote-text { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 17px; color: rgba(255,255,255,0.82); line-height: 1.7; position: relative; z-index: 1; }
        .dgi-quote-author { font-size: 11px; color: rgba(255,255,255,0.42); margin-top: 16px; letter-spacing: 0.1em; text-transform: uppercase; }
        .dgi-metals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .dgi-metal-card { border-radius: 16px; padding: 24px; border: 1px solid rgba(235,185,125,0.1); background: #1E1E28; display: flex; flex-direction: column; gap: 8px; transition: border-color 0.3s; }
        .dgi-metal-card:hover { border-color: rgba(235,185,125,0.3); }
        .dgi-metal-symbol { font-family: 'Playfair Display', Georgia, serif; font-size: 36px; line-height: 1; }
        .dgi-metal-name { font-size: 11px; color: rgba(255,255,255,0.42); letter-spacing: 0.08em; }
        .dgi-metal-price { font-size: 20px; color: #EBB97D; font-weight: 300; }
        .dgi-metal-price span { font-size: 12px; color: rgba(255,255,255,0.42); }
        .dgi-metal-change { font-size: 11px; color: #4ADE80; }

        /* PROCESS */
        .dgi-process-wrap { padding: 0 40px 64px; }
        .dgi-sec-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(235,185,125,0.35); margin-bottom: 10px; }
        .dgi-sec-title { font-family: 'Playfair Display', Georgia, serif; font-size: 38px; color: rgba(255,255,255,0.82); margin-bottom: 40px; line-height: 1.15; }
        .dgi-sec-title em { color: #EBB97D; font-style: normal; }
        .dgi-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; position: relative; }
        .dgi-steps::before { content: ''; position: absolute; top: 28px; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg,transparent,rgba(235,185,125,0.2),transparent); }
        .dgi-step { padding: 0 16px; text-align: center; }
        .dgi-step-circle { width: 56px; height: 56px; border-radius: 50%; background: #1E1E28; border: 1px solid rgba(235,185,125,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transition: border-color 0.3s, background 0.3s; }
        .dgi-step:hover .dgi-step-circle { background: rgba(235,185,125,0.08); border-color: #EBB97D; }
        .dgi-step-circle i { font-size: 20px; color: #EBB97D; }
        .dgi-step-title { font-size: 13px; color: rgba(255,255,255,0.82); margin-bottom: 8px; font-weight: 500; }
        .dgi-step-desc { font-size: 11px; color: rgba(255,255,255,0.42); line-height: 1.7; }

        /* TRUST */
        .dgi-trust-wrap { padding: 0 40px 64px; display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .dgi-trust-card { background: #1E1E28; border-radius: 16px; padding: 32px 24px; border: 1px solid rgba(235,185,125,0.08); text-align: center; transition: transform 0.3s; }
        .dgi-trust-card:hover { transform: translateY(-4px); }
        .dgi-trust-icon { font-size: 32px; color: #EBB97D; margin-bottom: 16px; }
        .dgi-trust-val { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #EBB97D; margin-bottom: 6px; }
        .dgi-trust-label { font-size: 11px; color: rgba(255,255,255,0.42); line-height: 1.6; white-space: pre-line; }

        /* TIMELINE */
        .dgi-tl-wrap { padding: 0 40px 64px; }
        .dgi-tl-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 40px; }
        .dgi-tl-card { background: #1E1E28; border-radius: 16px; padding: 28px 22px; border: 1px solid rgba(235,185,125,0.08); position: relative; overflow: hidden; transition: border-color 0.3s; }
        .dgi-tl-card:hover { border-color: rgba(235,185,125,0.22); }
        .dgi-tl-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,transparent,#EBB97D,transparent); opacity: 0; transition: opacity 0.3s; }
        .dgi-tl-card:hover::after { opacity: 1; }
        .dgi-tl-year { font-family: 'Playfair Display', Georgia, serif; font-size: 40px; color: rgba(235,185,125,0.18); line-height: 1; margin-bottom: 12px; }
        .dgi-tl-title { font-size: 13px; color: #EBB97D; font-weight: 500; margin-bottom: 8px; }
        .dgi-tl-event { font-size: 11px; color: rgba(255,255,255,0.42); line-height: 1.75; }

        /* TEAM */
        .dgi-team-wrap { padding: 0 40px 64px; }
        .dgi-team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 40px; }
        .dgi-team-card { background: #1E1E28; border-radius: 18px; padding: 32px 20px; text-align: center; border: 1px solid rgba(235,185,125,0.08); transition: transform 0.3s, border-color 0.3s; }
        .dgi-team-card:hover { transform: translateY(-5px); border-color: rgba(235,185,125,0.22); }
        .dgi-avatar { width: 64px; height: 64px; border-radius: 50%; border: 1px solid rgba(235,185,125,0.22); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; background: rgba(235,185,125,0.06); animation: dgi-float 4s ease-in-out infinite; }
        .dgi-avatar span { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #EBB97D; }
        .dgi-member-name { font-size: 14px; color: rgba(255,255,255,0.82); font-weight: 500; margin-bottom: 4px; }
        .dgi-member-role { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3); }

        /* CTA */
        .dgi-cta-outer { margin: 0 40px 64px; }
        .dgi-cta-wrap { border-radius: 24px; padding: 64px 40px; background: #22222E; border: 1px solid rgba(235,185,125,0.12); text-align: center; position: relative; overflow: hidden; }
        .dgi-cta-orb { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 500px; height: 500px; border-radius: 50%; background: rgba(235,185,125,0.03); animation: dgi-orb 6s ease-in-out infinite; pointer-events: none; }
        .dgi-cta-inner { position: relative; z-index: 1; }
        .dgi-cta-label { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(235,185,125,0.35); margin-bottom: 16px; }
        .dgi-divider { width: 48px; height: 1px; background: linear-gradient(90deg,transparent,#EBB97D,transparent); margin: 0 auto 32px; }
        .dgi-cta-title { font-family: 'Playfair Display', Georgia, serif; font-size: 44px; color: rgba(255,255,255,0.82); line-height: 1.15; margin-bottom: 16px; }
        .dgi-cta-title em { color: #EBB97D; font-style: normal; }
        .dgi-cta-sub { font-size: 14px; color: rgba(255,255,255,0.42); margin-bottom: 36px; max-width: 420px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .dgi-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .dgi-btn-primary { background: #EBB97D; color: #1A1A23; border: none; padding: 14px 36px; border-radius: 100px; font-family: 'Playfair Display', Georgia, serif; font-size: 15px; cursor: pointer; letter-spacing: 0.04em; transition: opacity 0.2s, transform 0.2s; }
        .dgi-btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }
        .dgi-btn-ghost { background: transparent; color: #EBB97D; border: 1px solid rgba(235,185,125,0.3); padding: 14px 36px; border-radius: 100px; font-family: 'Playfair Display', Georgia, serif; font-size: 15px; cursor: pointer; transition: border-color 0.2s, transform 0.2s; }
        .dgi-btn-ghost:hover { border-color: #EBB97D; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .dgi-logo { font-size: 64px; }
          .dgi-hero { padding: 48px 20px 56px; }
          .dgi-ticker { grid-template-columns: repeat(2,1fr); }
          .dgi-vis-row { padding: 40px 20px; grid-template-columns: 1fr; }
          .dgi-vis-card.big { grid-column: span 1; }
          .dgi-mission-wrap { padding: 0 20px 40px; grid-template-columns: 1fr; }
          .dgi-process-wrap, .dgi-tl-wrap, .dgi-team-wrap, .dgi-trust-wrap { padding: 0 20px 40px; }
          .dgi-steps { grid-template-columns: repeat(2,1fr); gap: 24px; }
          .dgi-steps::before { display: none; }
          .dgi-tl-grid, .dgi-team-grid { grid-template-columns: repeat(2,1fr); }
          .dgi-trust-wrap { grid-template-columns: 1fr; }
          .dgi-cta-outer { margin: 0 20px 48px; }
          .dgi-cta-title { font-size: 32px; }
          .dgi-sec-title { font-size: 28px; }
        }
      `}</style>

      <div className="dgi-page">

        {/* HERO */}
        <div className="dgi-hero">
          <div className="dgi-orb1" />
          <div className="dgi-orb2" />
          <div className="dgi-hero-inner">
            <div className="dgi-badge">
              <div className="dgi-badge-dot" />
              <span>Live Market · Bengaluru, India</span>
            </div>
            <div className="dgi-logo">
              <span className="dgi-logo-dgi">Dgi</span>
              <span className="dgi-logo-g">Gold</span>
            </div>
            <p className="dgi-hero-sub">Precious Metals · Digital Platform · Est. 2023</p>
            <p className="dgi-hero-quote">
              "Bringing the timeless value of gold &amp; silver into the digital age — accessible, transparent, and secure for every Indian."
            </p>
            <div className="dgi-scroll-hint">
              <div className="dgi-scroll-line" />
              <span>Discover</span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="dgi-ticker">
          {stats.map((s, i) => (
            <div key={i} className="dgi-tick">
              <div className="dgi-tick-val">{s.val}</div>
              <div className="dgi-tick-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* VISUAL FEATURE CARDS */}
        <div className="dgi-vis-row">
          <div className="dgi-vis-card big">
            <div className="dgi-vc-icon"><i className="ti ti-trending-up" aria-hidden="true" /></div>
            <div className="dgi-vc-title">Real-time gold &amp; silver pricing</div>
            <div className="dgi-vc-text">Zero markup. What you see is exactly what you pay — live from global spot markets, every second of the day.</div>
            <div className="dgi-bar-vis">
              {bars.map((b, i) => (
                <div key={i} className="dgi-bar-row">
                  <div className="dgi-bar-label">{b.label}</div>
                  <div className="dgi-bar-track">
                    <div
                      className="dgi-bar-fill"
                      style={{ width: `${b.pct}%`, animationDelay: b.delay }}
                      ref={(el) => (barsRef.current[i] = el)}
                    />
                  </div>
                  <div className="dgi-bar-pct">{b.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="dgi-vis-card">
            <div className="dgi-vc-icon"><i className="ti ti-shield-check" aria-hidden="true" /></div>
            <div className="dgi-vc-title">Bank-grade security</div>
            <div className="dgi-vc-text">Military encryption. SEBI-compliant vaults. Fully insured. Quarterly audits published.</div>
          </div>
          <div className="dgi-vis-card" style={{ marginTop: '-84px' }}>
            <div className="dgi-vc-icon"><i className="ti ti-bolt" aria-hidden="true" /></div>
            <div className="dgi-vc-title">Instant settlement</div>
            <div className="dgi-vc-text">Purchase to vault in seconds. Sell any time — funds reach your bank within minutes.</div>
          </div>
          <div className="dgi-vis-card">
            <div className="dgi-vc-icon"><i className="ti ti-heart-handshake" aria-hidden="true" /></div>
            <div className="dgi-vc-title">Built on trust</div>
            <div className="dgi-vc-text">100% reserve-backed. Regulated. Accountable. Always.</div>
          </div>
        </div>

        {/* MISSION */}
        <div className="dgi-mission-wrap">
          <div className="dgi-mission-text">
            <div className="dgi-sec-eyebrow">Our Mission</div>
            <div className="dgi-sec-title" style={{ fontSize: '30px', marginBottom: 0 }}>
              Gold &amp; Silver<br /><em>for Every Indian</em>
            </div>
            <div className="dgi-mission-list">
              {commitments.map((c, i) => (
                <div key={i} className="dgi-m-item">
                  <div className="dgi-m-num">{c.num}</div>
                  <div>
                    <div className="dgi-m-title">{c.title}</div>
                    <div className="dgi-m-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dgi-mission-right">
            <div className="dgi-quote-card">
              <div className="dgi-quote-bg">"</div>
              <p className="dgi-quote-text">"Wealth-building shouldn't be a privilege. It should be a right — for every student, homemaker, and retiree in India."</p>
              <div className="dgi-quote-author">— DgiGold Founders</div>
            </div>
            <div className="dgi-metals-grid">
              <div className="dgi-metal-card">
                <div className="dgi-metal-symbol" style={{ color: '#EBB97D' }}>Au</div>
                <div className="dgi-metal-name">24K Gold · 99.9%</div>
                <div className="dgi-metal-price">₹7,240<span>/gm</span></div>
                <div className="dgi-metal-change">
                  <i className="ti ti-arrow-up" style={{ fontSize: 11 }} aria-hidden="true" /> +0.82% today
                </div>
              </div>
              <div className="dgi-metal-card">
                <div className="dgi-metal-symbol" style={{ color: '#B0B8C8' }}>Ag</div>
                <div className="dgi-metal-name">Fine Silver · .999</div>
                <div className="dgi-metal-price">₹89<span>/gm</span></div>
                <div className="dgi-metal-change">
                  <i className="ti ti-arrow-up" style={{ fontSize: 11 }} aria-hidden="true" /> +1.14% today
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="dgi-process-wrap">
          <div className="dgi-sec-eyebrow">How it works</div>
          <div className="dgi-sec-title">Invest in <em>4 simple steps</em></div>
          <div className="dgi-steps">
            {steps.map((s, i) => (
              <div key={i} className="dgi-step">
                <div className="dgi-step-circle">
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </div>
                <div className="dgi-step-title">{s.title}</div>
                <div className="dgi-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST */}
        <div className="dgi-trust-wrap">
          {trust.map((t, i) => (
            <div key={i} className="dgi-trust-card">
              <div className="dgi-trust-icon"><i className={`ti ${t.icon}`} aria-hidden="true" /></div>
              <div className="dgi-trust-val">{t.val}</div>
              <div className="dgi-trust-label">{t.label}</div>
            </div>
          ))}
        </div>

        {/* TIMELINE */}
        <div className="dgi-tl-wrap">
          <div className="dgi-sec-eyebrow">Our journey</div>
          <div className="dgi-sec-title">From idea to <em>India's trust</em></div>
          <div className="dgi-tl-grid">
            {timeline.map((t, i) => (
              <div key={i} className="dgi-tl-card">
                <div className="dgi-tl-year">{t.year}</div>
                <div className="dgi-tl-title">{t.title}</div>
                <div className="dgi-tl-event">{t.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="dgi-team-wrap">
          <div className="dgi-sec-eyebrow">The people</div>
          <div className="dgi-sec-title">Meet the <em>founders</em></div>
          <div className="dgi-team-grid">
            {team.map((m, i) => (
              <div key={i} className="dgi-team-card">
                <div className="dgi-avatar" style={{ animationDelay: m.delay }}>
                  <span>{m.initial}</span>
                </div>
                <div className="dgi-member-name">{m.name}</div>
                <div className="dgi-member-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="dgi-cta-outer">
          <div className="dgi-cta-wrap">
            <div className="dgi-cta-orb" />
            <div className="dgi-cta-inner">
              <div className="dgi-cta-label">Start today</div>
              <div className="dgi-divider" />
              <div className="dgi-cta-title">Your wealth,<br />in <em>pure gold</em></div>
              <p className="dgi-cta-sub">
                Join 2 lakh+ Indians growing their wealth through gold and silver — securely, transparently, and from just ₹1.
              </p>
              <div className="dgi-cta-btns">
                <button className="dgi-btn-primary" onClick={() => navigate('/gold')}>Buy Gold Now</button>
                <button className="dgi-btn-ghost" onClick={() => navigate('/metals')}>Explore Silver</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default About;