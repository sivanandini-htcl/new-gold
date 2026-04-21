import React, { useState } from "react";
import { ChevronRight, Clock, BookOpen, TrendingUp, Shield, Coins, ArrowRight, X } from "lucide-react";

const blogs = [
  {
    id: 1,
    tag: "Beginner's Guide",
    tagColor: "#b45309",
    tagBg: "#fef3c7",
    icon: Coins,
    title: "How to Use Digital Gold: Your Complete Step-by-Step Guide",
    excerpt: "Digital gold lets you buy, store, and sell 24K gold online without physically holding it. Here's everything you need to know to get started — from your first ₹1 investment to advanced strategies.",
    readTime: "5 min read",
    date: "Apr 18, 2026",
    featured: true,
    content: [
      {
        heading: "What is Digital Gold?",
        body: "Digital gold is a modern investment instrument that allows you to purchase 24K, 99.9% pure gold online in small quantities — starting from as little as ₹1. Each unit of digital gold you buy is backed by an equivalent amount of physical gold stored in secure, insured vaults on your behalf.",
      },
      {
        heading: "Step 1 — Create Your Account",
        body: "Sign up on DgiGold with your email and complete KYC verification (PAN + Aadhaar). This takes under 5 minutes and is a one-time process required for regulatory compliance.",
      },
      {
        heading: "Step 2 — Choose Your Investment",
        body: "You can buy gold by amount (₹500 worth) or by weight (0.1 gram). Live prices update every second so you always get the market rate. No hidden charges, no commissions — what you see is what you pay.",
      },
      {
        heading: "Step 3 — Track Your Holdings",
        body: "Your dashboard shows your total gold holding in grams, current market value, and profit/loss. You can set up SIPs (Systematic Investment Plans) to auto-buy gold daily, weekly, or monthly.",
      },
      {
        heading: "Step 4 — Sell or Redeem Anytime",
        body: "Sell digital gold at live prices and receive money in your bank account within 1–2 business days. Alternatively, redeem your accumulated gold as physical jewellery, coins, or bars delivered to your doorstep.",
      },
    ],
  },
  {
    id: 2,
    tag: "Future Planning",
    tagColor: "#065f46",
    tagBg: "#d1fae5",
    icon: TrendingUp,
    title: "How Digital Gold Secures Your Financial Future",
    excerpt: "From building an emergency fund to funding your child's education or retirement — digital gold is one of the most flexible and reliable wealth-building tools available to Indian investors today.",
    readTime: "7 min read",
    date: "Apr 14, 2026",
    featured: true,
    content: [
      {
        heading: "Gold as a Long-Term Wealth Builder",
        body: "Gold has delivered an average annual return of ~10–12% in India over the past 20 years. Unlike FDs or savings accounts that offer 6–7%, gold has consistently beaten inflation and provided real purchasing power growth.",
      },
      {
        heading: "The Power of Gold SIP",
        body: "Investing ₹1,000/month in digital gold via SIP over 10 years — assuming a conservative 9% annual return — can grow to approximately ₹1.9 lakhs. The key is consistency. Small amounts compounded over time create significant wealth.",
      },
      {
        heading: "Emergency Fund Alternative",
        body: "Unlike FDs that lock your money, digital gold is fully liquid. You can sell at any time and receive money within hours. This makes it an excellent 'golden emergency fund' that also appreciates in value.",
      },
      {
        heading: "Gifting & Inheritance",
        body: "Digital gold can be gifted to family members digitally — perfect for birthdays, weddings, and festivals. It can also be transferred or inherited easily, unlike physical gold which requires melting, assaying, and redistribution.",
      },
      {
        heading: "Portfolio Diversification Rule",
        body: "Financial advisors typically recommend 5–15% allocation in gold. When equity markets fall, gold tends to rise — providing a natural hedge. Digital gold makes this diversification accessible to everyone, not just the wealthy.",
      },
      {
        heading: "Tax Efficiency",
        body: "Digital gold held for more than 3 years qualifies for Long Term Capital Gains (LTCG) with indexation benefits at 20%, making it far more tax-efficient than short-term gains from equity trading.",
      },
    ],
  },
  {
    id: 3,
    tag: "Safety & Trust",
    tagColor: "#1e40af",
    tagBg: "#dbeafe",
    icon: Shield,
    title: "Is Digital Gold Safe? Everything You Must Know",
    excerpt: "Security, regulation, and transparency — understand how your digital gold investments are protected by law, insured vaults, and independent auditors.",
    readTime: "4 min read",
    date: "Apr 10, 2026",
    featured: false,
    content: [
      {
        heading: "Regulatory Framework",
        body: "Digital gold in India is regulated by the Bureau of Indian Standards (BIS) for purity and the Warehouse Development and Regulatory Authority (WDRA) for storage. Platforms must maintain full physical backing for all digital units sold.",
      },
      {
        heading: "Vault Security",
        body: "Your gold is stored in Brinks or Sequel Logistics vaults — the same companies used by major banks and financial institutions. Vaults are equipped with 24/7 surveillance, biometric access, and are insured against theft, fire, and natural disasters.",
      },
      {
        heading: "Independent Audits",
        body: "Third-party auditors verify that the physical gold in vaults matches the total digital units outstanding — typically quarterly. Audit reports are published publicly for full transparency.",
      },
      {
        heading: "Your Gold, Not Ours",
        body: "The gold you purchase is legally yours. DgiGold acts only as a custodian. In the unlikely event of platform closure, your physical gold is ring-fenced from company assets and can be claimed by you directly.",
      },
    ],
  },
  {
    id: 4,
    tag: "Smart Investing",
    tagColor: "#7c3aed",
    tagBg: "#ede9fe",
    icon: BookOpen,
    title: "Gold SIP vs Lump Sum: Which Strategy Wins?",
    excerpt: "Should you invest a fixed amount monthly in gold, or make a one-time big purchase? We compare both strategies across 5, 10, and 20-year horizons with real data.",
    readTime: "6 min read",
    date: "Apr 5, 2026",
    featured: false,
    content: [
      {
        heading: "The SIP Advantage: Rupee Cost Averaging",
        body: "When you invest ₹1,000 every month, you buy more gold when prices are low and less when prices are high. This automatic averaging reduces the impact of market volatility and removes the pressure of timing the market.",
      },
      {
        heading: "Lump Sum: When Timing is Everything",
        body: "A lump-sum investment outperforms SIP when made during a market dip. If you have a large amount idle in a savings account earning 3%, moving it to gold during a correction can significantly boost returns.",
      },
      {
        heading: "The Hybrid Approach (Best of Both)",
        body: "Invest 60% as a lump sum when gold corrects more than 5%, and maintain a monthly SIP for the remaining amount. This strategy has historically outperformed pure SIP by 1.5–2% annually over 10-year periods.",
      },
      {
        heading: "Our Recommendation",
        body: "For salaried investors: start a monthly SIP of 10% of your savings into digital gold — automatically. For those with a lump sum (bonus, inheritance, etc.): split into 3 tranches invested over 3 months to average entry price.",
      },
    ],
  },
];

/* ── Blog Modal ── */
function BlogModal({ blog, onClose }) {
  const Icon = blog.icon;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 680,
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: "28px 32px 24px",
          borderBottom: "1px solid #fde68a",
          position: "sticky", top: 0, background: "#fff", zIndex: 10,
          borderRadius: "24px 24px 0 0",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <span style={{
                background: blog.tagBg, color: blog.tagColor,
                fontSize: 10, fontWeight: 700, padding: "3px 10px",
                borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                {blog.tag}
              </span>
              <h2 style={{
                fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700,
                color: "#1c1917", margin: "12px 0 8px", lineHeight: 1.3,
              }}>
                {blog.title}
              </h2>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#a1a1aa" }}>{blog.date}</span>
                <span style={{ fontSize: 11, color: "#a1a1aa" }}>·</span>
                <span style={{ fontSize: 12, color: blog.tagColor, fontWeight: 600 }}>
                  <Clock size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                  {blog.readTime}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid #e5e7eb", background: "#f9fafb",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}
            >
              <X size={16} color="#6b7280" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div style={{ padding: "28px 32px 36px" }}>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: 15,
            color: "#78350f", lineHeight: 1.8, marginBottom: 28,
            fontStyle: "italic", borderLeft: "3px solid #fcd34d",
            paddingLeft: 16,
          }}>
            {blog.excerpt}
          </p>

          {blog.content.map((section, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <h3 style={{
                fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700,
                color: "#92400e", margin: "0 0 8px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, #d97706, #b45309)",
                  color: "#fff", fontSize: 10, fontWeight: 800,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{i + 1}</span>
                {section.heading}
              </h3>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, margin: 0, paddingLeft: 30 }}>
                {section.body}
              </p>
              {i < blog.content.length - 1 && (
                <div style={{ height: 1, background: "#f5f5f4", margin: "20px 0 0" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Blog Card ── */
function BlogCard({ blog, onRead, featured }) {
  const Icon = blog.icon;
  if (featured) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1.5px solid #fde68a",
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 12px 36px rgba(202,138,4,0.14)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={() => onRead(blog)}
      >
        {/* Card visual header */}
        <div style={{
          height: 120,
          background: "linear-gradient(135deg, #fef9c3 0%, #fde68a 50%, #fef3c7 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative rings */}
          <div style={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%",
            border: "1px solid rgba(180,83,9,0.1)", top: -60, right: -60,
          }} />
          <div style={{
            position: "absolute", width: 140, height: 140, borderRadius: "50%",
            border: "1px solid rgba(180,83,9,0.08)", top: -30, right: -30,
          }} />
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(135deg, #b45309, #d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 20px rgba(180,83,9,0.3)",
          }}>
            <Icon size={26} color="#fff" />
          </div>
          {/* Featured badge */}
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: "rgba(180,83,9,0.85)", color: "#fff",
            fontSize: 9, fontWeight: 800, padding: "3px 8px",
            borderRadius: 20, letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            Featured
          </span>
        </div>

        <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{
            display: "inline-block",
            background: blog.tagBg, color: blog.tagColor,
            fontSize: 9, fontWeight: 800, padding: "3px 9px",
            borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: 10,
          }}>
            {blog.tag}
          </span>
          <h3 style={{
            fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700,
            color: "#1c1917", lineHeight: 1.4, margin: "0 0 10px",
          }}>
            {blog.title}
          </h3>
          <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7, margin: "0 0 16px", flex: 1 }}>
            {blog.excerpt.slice(0, 100)}...
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#a1a1aa" }}>
              <Clock size={10} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
              {blog.readTime}
            </span>
            <button style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "none", border: "none",
              color: "#b45309", fontSize: 12, fontWeight: 700,
              fontFamily: "Georgia, serif", cursor: "pointer",
            }}>
              Read <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Compact card
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #f3f4f6",
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex", gap: 16, alignItems: "flex-start",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(202,138,4,0.1)";
        e.currentTarget.style.borderColor = "#fde68a";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#f3f4f6";
      }}
      onClick={() => onRead(blog)}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: blog.tagBg, display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={20} color={blog.tagColor} />
      </div>
      <div style={{ flex: 1 }}>
        <span style={{
          background: blog.tagBg, color: blog.tagColor,
          fontSize: 9, fontWeight: 800, padding: "2px 7px",
          borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.1em",
        }}>
          {blog.tag}
        </span>
        <h4 style={{
          fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700,
          color: "#1c1917", lineHeight: 1.4, margin: "6px 0 4px",
        }}>
          {blog.title}
        </h4>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#a1a1aa" }}>
            <Clock size={10} style={{ display: "inline", marginRight: 3, verticalAlign: "middle" }} />
            {blog.readTime}
          </span>
          <ChevronRight size={14} color="#b45309" />
        </div>
      </div>
    </div>
  );
}

/* ── Main BlogSection ── */
export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null);
  const featured = blogs.filter(b => b.featured);
  const compact = blogs.filter(b => !b.featured);

  return (
    <>
      <div style={{ margin: "48px 0" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: 12, marginBottom: 28,
        }}>
          <div>
            <p style={{
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "#b45309", fontFamily: "Georgia, serif", margin: "0 0 6px",
            }}>
              Learn · Grow · Invest
            </p>
            <h2 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 28, fontWeight: 700, color: "#1c1917", margin: 0,
            }}>
              Gold Investment Insights
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <BookOpen size={14} color="#b45309" />
            <span style={{ fontSize: 12, color: "#b45309", fontWeight: 600, fontFamily: "Georgia, serif" }}>
              {blogs.length} Articles
            </span>
          </div>
        </div>

        {/* Decorative divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #fde68a, transparent)" }} />
          <svg width="12" height="12" viewBox="0 0 12 12">
            <polygon points="6,0 7.5,4.5 12,4.5 8.5,7.5 9.5,12 6,9 2.5,12 3.5,7.5 0,4.5 4.5,4.5" fill="#d97706" />
          </svg>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #fde68a)" }} />
        </div>

        {/* Layout: 2 featured + 2 compact */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Left: 2 featured cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {featured.map(b => (
              <BlogCard key={b.id} blog={b} onRead={setActiveBlog} featured />
            ))}
          </div>

          {/* Right: compact cards stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              background: "linear-gradient(135deg, #fef9c3, #fef3c7)",
              borderRadius: 16, padding: "16px 20px", marginBottom: 4,
              border: "1px solid #fde68a",
            }}>
              <p style={{
                fontFamily: "Georgia, serif", fontSize: 13, color: "#92400e",
                fontStyle: "italic", margin: 0, lineHeight: 1.6,
              }}>
                "Gold is a way of going long on fear, and it has been a very good way of going long on fear from time to time."
              </p>
              <p style={{ fontSize: 11, color: "#b45309", margin: "8px 0 0", fontWeight: 700 }}>
                — Warren Buffett
              </p>
            </div>
            {compact.map(b => (
              <BlogCard key={b.id} blog={b} onRead={setActiveBlog} featured={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeBlog && (
        <BlogModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </>
  );
}