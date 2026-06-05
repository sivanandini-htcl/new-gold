import React, { useState } from "react";
import { ChevronRight, Clock, BookOpen, TrendingUp, Shield, Coins, ArrowRight, X } from "lucide-react";

const blogs = [
  {
    id: 1,
    tag: "Beginner's Guide",
    icon: Coins,
    title: "How to Use Digital Gold: Your Complete Step-by-Step Guide",
    excerpt:
      "Digital gold lets you buy, store, and sell 24K gold online without physically holding it. Here's everything you need to know to get started — from your first ₹1 investment to advanced strategies.",
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
    icon: TrendingUp,
    title: "How Digital Gold Secures Your Financial Future",
    excerpt:
      "From building an emergency fund to funding your child's education or retirement — digital gold is one of the most flexible and reliable wealth-building tools available to Indian investors today.",
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
    icon: Shield,
    title: "Is Digital Gold Safe? Everything You Must Know",
    excerpt:
      "Security, regulation, and transparency — understand how your digital gold investments are protected by law, insured vaults, and independent auditors.",
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
    icon: BookOpen,
    title: "Gold SIP vs Lump Sum: Which Strategy Wins?",
    excerpt:
      "Should you invest a fixed amount monthly in gold, or make a one-time big purchase? We compare both strategies across 5, 10, and 20-year horizons with real data.",
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

const colors = {
  brown: "#3c2415",
  brownMid: "#6b3f22",
  brownLight: "#c4a882",
  cream: "#ddd9ce",
  creamDark: "#c8c3b5",
  creamDarker: "#b5b0a3",
  brownFaint: "rgba(60,36,21,0.06)",
  brownFaint2: "rgba(60,36,21,0.12)",
};

/* ── Blog Modal ── */
function BlogModal({ blog, onClose }) {
  const Icon = blog.icon;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-background/20 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111117] rounded-[22px] w-full max-w-[660px] max-h-[90vh] overflow-y-auto shadow-[0_28px_80px_rgba(28,16,8,0.35)] relative"
      >
        {/* Header */}
        <div className="p-[26px_28px_22px] bg-[#111117] border-b border-creamDark sticky top-0 bg-cream z-10 rounded-t-[22px]">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <span className=" text-white/70 inline-block bg-brownFaint2 text-brownMid text-[9px] font-extrabold px-3 py-[3px] rounded-full uppercase tracking-widest mb-2">
                {blog.tag}
              </span>

              <h2 className="font-serif text-white/70 text-[clamp(17px,3vw,22px)] font-bold text-brown mb-1 leading-snug">
                {blog.title}
              </h2>

              <div className="flex gap-3 text-[11px] text-creamDarker items-center">
                <span>{blog.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={10} /> {blog.readTime}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-[34px] h-[34px] rounded-full border border-creamDark bg-background flex items-center justify-center"
            >
              <X size={15} className="text-brownMid" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-[26px_28px_34px]">
          <p className="font-serif text-[14px] text-white/70 text-brownMid leading-[1.8] mb-6 italic border-l-[3px] border-white/20 pl-4">
            {blog.excerpt}
          </p>

          {blog.content.map((section, i) => (
            <div key={i} className="mb-5">
              <h3 className="font-serif text-[15px] text-white/70 font-bold text-brown flex items-center gap-2 mb-2">
                <span className="w-[22px] h-[22px]  text-white/70 rounded-full bg-brown text-cream text-[10px] font-extrabold flex items-center justify-center">
                  {i + 1}
                </span>
                {section.heading}
              </h3>

              <p className="text-[13px] text-white/70 leading-[1.8] pl-8">
                {section.body}
              </p>

              {i < blog.content.length - 1 && (
                <div className="h-[1px] text-white/70 mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function FeaturedCard({ blog, onRead }) {
  const Icon = blog.icon;

  return (
    <div
      onClick={() => onRead(blog)}
      className="bg- border border-white/20 hover:border-brownLight rounded-[18px] overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_36px_rgba(60,36,21,0.12)]"
    >
      {/* Header */}
      <div className="h-[110px] bg-gradient-to-br from-gray/70 to-gray-200 flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-[200px] h-[200px] rounded-full border-white/20 -top-[70px] -right-[70px]" />
        <div className="absolute w-[130px] h-[130px] rounded-full border border-white/20 -top-[30px] -right-[30px]" />

        <div className="w-[52px] h-[52px] rounded-[14px] bg-brown flex items-center justify-center shadow-[0_8px_20px_rgba(60,36,21,0.3)] z-10">
          <Icon size={24} className="text-cream" />
        </div>

        <span className="absolute top-2 left-2 bg-[rgba(60,36,21,0.82)] text-cream text-[8px] font-extrabold px-2 py-[3px] rounded-full uppercase tracking-widest">
          Featured
        </span>
      </div>

      <div className="p-[18px] flex flex-col flex-1">
        <span className="bg-brownFaint2 text-primary/50 text-[8px] font-extrabold px-2 py-[3px] rounded-full uppercase tracking-widest mb-2 inline-block">
          {blog.tag}
        </span>

        <h3 className="font-serif text-[14px] font-bold text-primary leading-snug mb-2">
          {blog.title}
        </h3>

        <p className="text-[11px] text-white/70 leading-[1.7] mb-4 flex-1">
          {blog.excerpt.slice(0, 95)}…
        </p>

        <div className="flex justify-between items-center">
          <span className="text-[10px] text-primary/70 flex items-center gap-1">
            <Clock size={10} /> {blog.readTime}
          </span>

          <button className="flex items-center gap-1 text-primary/60 text-[11px] font-bold underline underline-offset-2 font-serif">
            Read <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}


function CompactCard({ blog, onRead }) {
  const Icon = blog.icon;

  return (
    <div
      onClick={() => onRead(blog)}
      className="bg-background border border-white/20 hover:border-brownLight rounded-[14px] p-[16px_18px] flex gap-3 items-start cursor-pointer transition-all duration-200 hover:translate-x-1 hover:shadow-[0_4px_20px_rgba(60,36,21,0.09)]"
    >
      <div className="w-[42px] h-[42px] rounded-[12px]  bg-brownFaint2 flex items-center justify-center">
        <Icon size={20} className="text-primary/70" />
      </div>

      <div className="flex-1">
        <span className="bg-brownFaint2 text-primary/70 text-[8px] font-extrabold px-2 py-[2px] rounded-full uppercase tracking-widest">
          {blog.tag}
        </span>

        <h4 className="font-serif text-[12px] font-bold text-brown mt-1 mb-1 leading-snug text-primary">
          {blog.title}
        </h4>

        <div className="flex justify-between items-center">
          <span className="text-[10px] text-white/70 flex items-center gap-1">
            <Clock size={10} /> {blog.readTime}
          </span>
          <ChevronRight size={14} className="text-brownMid" />
        </div>
      </div>
    </div>
  );
}
export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState(null);

  const featured = blogs.filter((b) => b.featured);
  const compact = blogs.filter((b) => !b.featured);

  return (
    <>
      <div className="mt-12  px-7">
        {/* Header */}
        <div className="flex justify-between items-end flex-wrap gap-3 mb-5">
          <div>
            <p className="text-[10px] lg:text-xs uppercase tracking-[0.22em] text-primary/50 font-serif mb-1">
              Learn · Grow · Invest
            </p>

            <h2 className="font-serif text-xl lg:text-4xl md:text-lg text-primary">
              Gold Investment Insights
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <BookOpen size={14} className="text-brownMid" />
            <span className="text-[12px] text-brownMid font-semibold font-serif">
              {blogs.length} Articles
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-7">
          <div className="flex-1 h-[1px] bg-brownLight opacity-50" />
          <div className="w-2 h-2 bg-brownMid rotate-45" />
          <div className="flex-1 h-[1px] bg-brownLight opacity-50" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((b) => (
              <FeaturedCard key={b.id} blog={b} onRead={setActiveBlog} />
            ))}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4">
            
            {/* Quote */}
            <div className="bg-brown rounded-[14px] p-[18px_20px] border border-white/20">
              <p className="font-serif text-[13px] text-primary/60 italic leading-[1.65]">
                "Gold is a way of going long on fear, and it has been a very good way of going long on fear from time to time."
              </p>
              <p className="text-[12px] text-white/70 mt-2 font-normal">
                — Warren Buffett
              </p>
            </div>

            {/* Compact */}
            {compact.map((b) => (
              <CompactCard key={b.id} blog={b} onRead={setActiveBlog} />
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