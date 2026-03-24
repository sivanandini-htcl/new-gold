import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import dgiLogo from "../assets/logo_2.svg"

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

  const legalLinks = [
    { label: "Privacy Policy", path: "/" },
    { label: "Terms & Conditions", path: "/" },
    { label: "Refund Policy", path: "/" },
    { label: "Grievance Redressal", path: "/" },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Youtube, label: "YouTube" },
  ];

  return (
    <>
     

      <footer
        className="footer-root w-full bg-gradient-to-br from-[#1a1508] via-[#3f2e10] to-[#141414]">

      
        <div className=" h-px w-full" />

       
        <div className="max-w-7xl h-auto mx-auto px-4 sm:px-6 lg:px-10 py-12 ">
          <div className="grid grid-cols sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-10">

            
            <div className="lg:col-span-1 col-span-2 md:col-span-3">
              {/* Logo */}

               <div className="mb-4 flex gap-2 justify-center items-center">
               <img className="w-13 object-contain  ml-4 md:ml-0" src={dgiLogo} alt="logo "  />    
               <h2 className="heading-font text-4xl font-bold tracking-wide leading-none mb-1">               
               <span className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent font-['Fraunces']">Dgi</span>
                  <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent font-['Fraunces']">Gold</span>
                </h2>
                </div>
                 <div className="mb-4 flex justify-center items-center">
                <p className=" text-xs sm:text-xs md:text-sm font-sans uppercase tracking-[0.2em]  text-amber-200/80 mt-2 " >
                 Gold & Silver · Investment Platform
                </p>
              </div>

              <div className=" h-px w-12 rounded-full mb-4 flex justify-center items-center" />

              <p className="text-xs leading-relaxed mb-6 text-yellow-100 opacity-80" >
                India's most trusted dgital gold & silver platform. Invest from ₹1 with bank-grade security, live market rates, and insured vaults.
              </p>

              {/* Socials */}
              <div className="flex gap-2 text-yellow-100 opacity-80  justify-center items-center">
                {socials.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <button key={i} title={s.label}>
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links  */}
            <div className="hidden md:block ">
              <p className=" md:text-xs md:uppercase md:tracking-widest md:mb-4 md:font-medium text-yellow-100 opacity-80" >
                Quick Links
              </p>
              <div className="h-px w-8 rounded-full mb-5 " />
              <ul className="space-y-3 ">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <span
                      className="text-yellow-100 opacity-80 "
                      onClick={() =>navigate(link.path)} >
                      <span >◈ {link.label}</span> 
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Account ── */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium text-yellow-100 opacity-80 flex justify-center items-center md:mr-29 lg:mr-24 xl:mr-39">
                My Account
              </p>
              <div className=" h-px w-8 rounded-full mb-5 flex justify-center items-center " />
              <ul className="space-y-3 text-yellow-100 opacity-80  text-xs md:text-sm p-2">
                {accountLinks.map((link, i) => (
                  <li key={i}>
                    <span
                      onClick={() => navigate(link.path)}
                    >
                      <span >◈</span>
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            

            {/* ── Contact ── */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium  text-yellow-100 opacity-80" >
                Contact Us
              </p>
              <div className=" h-px w-8 rounded-full mb-5 " />

              <div className="space-y-4 mb-6  text-yellow-100 opacity-80">
                <div className="flex items-start gap-3">
                  <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0"  />
                  <span className="text-xs leading-relaxed" >
                    support@dgigold.in
                  </span>
                </div>
                <div className="flex items-start gap-3 ">
                  <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 "  />
                  <span className="text-xs leading-relaxed " >
                    1800-XXX-XXXX<br />
                    {/* <span >Mon–Sat, 9am–6pm</span> */}
                  </span>
                </div>
                <div className="flex items-start gap-3 ">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 "  />
                  <span className="text-xs leading-relaxed " >
                    DgiGold<br />
                    Bengaluru, Karnataka, India
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              {/* <div className="space-y-2">
                {["SEBI Registered", "ISO 27001 Certified", "BIS Hallmarked Gold"].map((badge, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mr-1 mb-1  text-yellow-100 opacity-80"
                    
                  >
                    <span >◈</span>
                    <span className="text-xs">{badge}</span>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        
        <div className=" h-px w-full opacity-40 " />
<div className="h-0.5  w-full mt-5 bg-gradient-to-r from-transparent via-yellow-700 to-gray-400 to-transparent"/>

        {/* ── Bottom Bar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5  text-yellow-100 opacity-80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-xs" >
              ©{new Date().getFullYear()} DgiGold Pvt. Ltd. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap gap-4 justify-center">
              {legalLinks.map((link, i) => (
                <span
                  key={i}
                  className="text-xs"
                  onClick={() => navigate(link.path)}
                  
                >
                  {link.label}
                </span>
              ))}
            </div>

            {/* Made with */}
            <p className="text-xs" >
              {/* Crafted with in India */}
            </p>
          </div>
        </div>

      </footer>
    </>
  );
}

export default Footer;

