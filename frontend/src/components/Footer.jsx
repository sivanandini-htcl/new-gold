import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import dgiLogo from "../assets/logo_2.svg";

function Footer() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Buy Gold", path: "/gold" },
    { label: "Buy Silver", path: "/silver" },
    { label: "About Us", path: "/about" },
  ];

  const accountLinks = [
    { label: "My Profile", path: "/profile" },
    { label: "KYC ", path: "/kycpage" },
    { label: "Transaction ", path: "/" },
    { label: "Address", path: "/delivery" },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Youtube, label: "YouTube" },
  ];

  return (
  <footer className="bg-[#111117] p-4  md:px-7 md:py-7">
    <div className=" max-w-7xl">
<div className="block md:hidden">
<div>
        {/* main */}
          <img
                      className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 2xl:h-40 2xl:w-40 object-contain"
                      src={dgiLogo}
                      alt="logo"
                    />
                     <p className="text-xs font-serif whitespace-nowrap md:text-sm uppercase tracking-[0.2em] text-amber-200/80 mb-2">
            Gold & Silver · Investment 
          </p>
          <p className="text-xs 2xl:text-2xl leading-relaxed font-serif text-yellow-100/80 mb-4">
            India's most trusted digital gold & silver platform. Invest from ₹1 with bank-grade security, live market rates, and insured vaults.
          </p>
            <div className="flex justify-center item-center gap-3 text-yellow-100/80 mt-auto">
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
      
      <div className="grid grid-cols-2 items-center justify-center font-serif mt-3">       
      <div className="flex flex-col justify-center items-center">
          <p className="text-xs mt-2 uppercase tracking-widest font-serif 2xl:text-2xl text-yellow-100/80 mb-2">
            My Account
          </p>
            <ul className="space-y-3 text-yellow-100/80 text-xs 2xl:text-2xl md:text-sm font-serif">
            {accountLinks.map((link, i) => (
              <li key={i}>
                <span
                  className="cursor-pointer hover:text-yellow-300 transition-colors font-serif"
                  onClick={() => navigate(link.path)}
                >
                  <span className="mr-1 font-serif">◈</span>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
      </div>
       <div className="flex flex-col justify-center items-center font-serif ">
          <p className="text-xs mt-2 uppercase tracking-widest 2xl:text-3xl font-serif text-yellow-100/80 mb-2">
            Quick Links
          </p>
          <ul className="space-y-3 text-yellow-100/80 text-xs 2xl:text-2xl   md:text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <span
                  className="cursor-pointer hover:text-yellow-300 mb-4 transition-colors font-serif"
                  onClick={() => navigate(link.path)}
                >
                  <span className="mr-1">◈</span>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>  
      </div>
      <div className="mt-5 mb-3 flex flex-col items-center justify-center">
          {/* <p className="text-xs uppercase tracking-widest 2xl:text-2xl font-serif text-yellow-100/80 mb-4 2xl:mt-0">
            Contact Us
          </p> */}
          <div className="grid grid-cols-2 gap-3 text-yellow-100/80">
            <div className=" flex gap-1 2xl:mb-5 text-xs">
              <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 2xl:w-12 2xl:h-12" />
              <span className="font-serif">support@dgigold.in</span>
            </div>
              <div className="flex gap-1 2xl:mb-5 text-xs">
              <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 2xl:w-12 2xl:h-12" />
              <span className="">1800-XXX-XXXX</span>
            </div>
          </div>
          
            <div className=" flex text-xs  gap-3 mt-3 text-yellow-100/80">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 2xl:w-12 2xl:h-12  " />         
            <span className="font-serif ">
                DgiGold
              </span>                         
              </div>
               <span className="font-serif text-xs mt-1 text-yellow-100/80">
             Bengaluru, Karnataka, India
              </span>
        </div>
</div>
      
<div className="hidden md:block max-w-7xl 2xl:max-w-full mx-auto ml-4 p-0 gap-2  rounded-lg">

<div className="grid grid-cols-2  gap-2 p-3">
        {/* Column 1 — Brand */}
        <div className="flex flex-col  p-3 rounded-lg">
          <div className="flex items-center gap-0 2xl:gap-1 mb-2">
            <img
              className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 2xl:h-40 2xl:w-40 object-contain"
              src={dgiLogo}
              alt="logo"
            />
           
          </div>

          <p className="text-xs font-serif md:text-sm uppercase tracking-[0.2em] text-amber-200/80 mb-2">
            Gold & Silver · Investment Platform
          </p>
          <p className=" flex flex-col text-xs 2xl:text-2xl leading-relaxed font-serif text-yellow-100/80 mb-4">
            India's most trusted digital gold & silver platform. 
            <span>Invest from ₹1 with bank-grade security, live market rates, and insured vaults.</span>
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
        

<div className="grid grid-cols-1 sm:grid-cols-3 p-3  ">
        {/* Column 2 — My Account */}
        <div className="mt-7">
          <p className="text-xs uppercase tracking-widest font-serif 2xl:text-2xl text-yellow-100/80 mb-4">
            My Account
          </p>
          <ul className="space-y-3 text-yellow-100/80 text-xs 2xl:text-2xl md:text-sm font-serif">
            {accountLinks.map((link, i) => (
              <li key={i}>
                <span
                  className="cursor-pointer hover:text-yellow-300 transition-colors font-serif"
                  onClick={() => navigate(link.path)}
                >
                  <span className="mr-1 font-serif">◈</span>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Quick Links */}
        <div className="mt-7">
          <p className="text-xs uppercase tracking-widest 2xl:text-3xl font-serif text-yellow-100/80 mb-4">
            Quick Links
          </p>
          <ul className="space-y-3 text-yellow-100/80 text-xs 2xl:text-2xl   md:text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <span
                  className="cursor-pointer hover:text-yellow-300 mb-4 transition-colors font-serif"
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
        <div className="mt-7">
          <p className="text-xs uppercase tracking-widest 2xl:text-2xl font-serif text-yellow-100/80 mb-4 2xl:mt-0">
            Contact Us
          </p>
          <div className="flex flex-col gap-4 text-yellow-100/80 2xl:text-2xl text-xs md:text-sm">
            <div className="flex items-start gap-3 2xl:mb-5">
              <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 2xl:w-12 2xl:h-12" />
              <span className="font-serif">support@dgigold.in</span>
            </div>
            <div className="flex items-start gap-3 2xl:mb-5">
              <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 2xl:w-12 2xl:h-12" />
              <span className="">1800-XXX-XXXX</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 2xl:w-12 2xl:h-12" />
              <span className="font-serif">
                DgiGold<br />
                Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
        </div>

      </div>
      </div>

    </div>  

    </div>  
    </footer>
  );
}

export default Footer;