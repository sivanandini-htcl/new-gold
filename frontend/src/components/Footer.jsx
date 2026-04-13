import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import dgiLogo from "../assets/logo_2.svg";

function Footer() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Buy Gold", path: "/gold" },
    { label: "Buy Silver", path: "/silver" },
    { label: "Redeem Jewellery", path: "/redeem" },
    { label: "About Us", path: "/about" },
  ];

  const accountLinks = [
    { label: "My Profile", path: "/profile" },
    { label: "KYC Verification", path: "/kycpage" },
    { label: "Nominee Details", path: "/nominee" },
    { label: "Transaction History", path: "/" },
    { label: "Delivery Address", path: "/delivery" },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#1a1508] via-[#3f2e10] to-[#141414]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8">

        {/* Column 1 — Brand */}
        <div className="flex flex-col">
          <div className="flex items-center gap-0 mb-2">
            <img
              className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 object-contain"
              src={dgiLogo}
              alt="logo"
            />
            <h1 className="text-xl md:text-xl lg:text-2xl xl:text-4xl font-bold leading-none">
              <span className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 bg-clip-text text-transparent font-['Fraunces']">DGI</span>
              <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent font-['Fraunces']">GOLD</span>
            </h1>
          </div>

          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-amber-200/80 mb-2">
            Gold & Silver · Investment Platform
          </p>
          <p className="text-xs 2xl:text-sm leading-relaxed text-yellow-100/80 mb-4">
            India's most trusted digital gold & silver platform. Invest from ₹1 with bank-grade security, live market rates, and insured vaults.
          </p>

          <div className="flex gap-3 text-yellow-100/80 mt-auto">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <button key={i} title={s.label} className="hover:text-yellow-300 transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2 — My Account */}
        <div>
          <p className="text-xs uppercase tracking-widest font-medium text-yellow-100/80 mb-4">
            My Account
          </p>
          <ul className="space-y-3 text-yellow-100/80 text-xs md:text-sm">
            {accountLinks.map((link, i) => (
              <li key={i}>
                <span
                  className="cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() => navigate(link.path)}
                >
                  <span className="mr-1">◈</span>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Quick Links */}
        <div>
          <p className="text-xs uppercase tracking-widest font-medium text-yellow-100/80 mb-4">
            Quick Links
          </p>
          <ul className="space-y-3 text-yellow-100/80 text-xs md:text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <span
                  className="cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() => navigate(link.path)}
                >
                  <span className="mr-1">◈</span>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <p className="text-xs uppercase tracking-widest font-medium text-yellow-100/80 mb-4">
            Contact Us
          </p>
          <div className="flex flex-col gap-4 text-yellow-100/80 text-xs md:text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>support@dgigold.in</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>1800-XXX-XXXX</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>
                DgiGold<br />
                Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;