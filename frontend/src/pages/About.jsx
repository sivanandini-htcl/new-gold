import { useNavigate } from "react-router-dom";
import { Shield, TrendingUp, Zap, Award, Users, Globe, Lock, HeartHandshake } from "lucide-react";
import Time from "../assets/time";
// import Invest from "../assets/invest.png";




function About() {
  const navigate = useNavigate();

  const stats = [
    { value: "2L+", label: "Trusted Investors",gradient: "from-yellow-500 to-yellow-600"},
    { value: "₹500Cr+", label: "Gold & Silver Managed" },
    { value: "99.9%", label: "Purity Guaranteed" },
    { value: "24/7", label: "Live Market Access" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Bank-grade Security",
      description: "Your investments are protected with military-grade encryption and stored in fully insured, SEBI-compliant vaults across India.",
      gold: true,
     
    },
    {
      icon: TrendingUp,
      title: "Live Market Rates",
      description: "Buy and sell at real-time market prices with zero markup. What you see is what you pay — always transparent, always fair.",
      gold: false,
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "From purchase to vault in seconds. Sell anytime and get funds credited directly to your bank account within minutes.",
      gold: true,
    },
    {
      icon: HeartHandshake,
      title: "Built on Trust",
      description: "Regulated, audited, and accountable. We publish quarterly vault audits and maintain 100% reserve backing at all times.",
      gold: false,
    },
  ];

  const team = [
    { name: " ", role: "CEO & Co-Founder", initial: "A" },
    { name: " ", role: " Co-Founder", initial: "B" },
    { name: "", role: "Head of Operations", initial: "C" },
    { name: "", role: "Head of Compliance", initial: "D" },
  ];

  // const milestones = [
  //   { year: "2020", event: "DgiGold founded in Bengaluru with a vision to democratize precious metal investing." },
  //   { year: "2021", event: "Launched gold investment platform. Crossed ₹10 Cr in assets under management within 6 months." },
  //   { year: "2022", event: "Added Silver investment. Reached 50,000 active users and expanded vault capacity." },
  //   { year: "2023", event: "Introduced jewellery redemption, gifting features, and live price alerts." },
  //   { year: "2024", event: "Surpassed 2 lakh investors. Crossed ₹500 Cr in managed precious metals." },
  // ];

  return (
    <>
      
      <div className=" min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
        <section className="relative overflow-hidden py-2 px-4 sm:px-6 lg:px-10">
          {/* decorative bg circles */}
          {/* <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
          /> */}

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="h-0.5 w-16 rounded-full mx-auto mb-6"/>

            <h1 className=" text-6xl sm:text-7xl md:text-8xl font-['Fraunces'] tracking-wide leading-none mb-4">
              <span className=" bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent font-['Fraunces']">Dgi</span>
              <span className="font-['Fraunces'] bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 bg-clip-text text-transparent">Gold</span>
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] mb-8 text-yellow-800/50" >
             Gold & Silver · Investment Platform
            </p>

            <p
              className="font-['Fraunces'] italic text-yellow-950  text-sm md:text-3xl lg:text-3xl sm:text-xl  leading-relaxed mb-10 max-w-2xl mx-auto" >
              "Bringing the timeless value of precious metals into the digital age — accessible, transparent, and secure for every Indian."
            </p>
            <div className="divider-gold h-0.5 w-12 rounded-full mx-auto" />
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-10 mb-16">
          <div
            className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-8 shadow-xl"  >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x text-yellow-950 bg-amber-100 shadow-lg w-full rounded-lg p-2" >
              {stats.map((stat, i) => (
                <div key={i} className="text-center  px-4">
                  <p
                    className="text-lg sm:text-2xl md:text-xl font-serif mb-1 text-yellow-700"
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-xl italic font-serif font-light -tracking-normal gap-2" >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

  
        <section className="px-4 sm:px-6 lg:px-10 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              {/* Text */}
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" >Our Mission</p>
                <h2 className=" text-2xl md:text-4xl sm:text-5xl font-serif mb-1 text-yellow-950" >
                  Gold & Silver for Everyone
                </h2>
                <div className="h-0.5 w-12 rounded-full mb-5 " />
             
                  

                <div className="p-5 m-4 rounded-2xl ml-1 bg-amber-100 shadow w-full h-full" >
<p className="text-xs md:text-sm leading-relaxed mb-4 font-serif text-yellow-800/90" >
                  For generations, gold and silver have been India's most trusted stores of value. But physical precious metals come with friction — storage risks, high entry costs, and illiquidity.
                </p>
                <p className="text-xs md:text-sm leading-relaxed mb-4 font-serif text-yellow-800/90" >
                  DgiGold was built to remove every barrier. We let anyone — a student, a homemaker, a retiree — invest in 24K gold and .999 fine silver from just ₹1, at live market prices, with the same security as a bank vault.
                </p>
                <p className=" text-xs md:text-sm leading-relaxed font-serif text-yellow-800/90">
                  Because wealth-building shouldn't be a privilege. It should be a right.
                </p>
                </div>

                </div>
          
              {/* Visual Card */}
           
     <div
  className=" h-full w-full rounded-3xl p-10 shadow-md 
  bg-no-repeat bg-cover bg-center
  text-white font-serif flex flex-col justify-start items-start
 bg-[url('assets/time.png')] "
>
  <div className=" space-y-4  md:space-y-4 w-full max-w-xs  ">
    {[
      {icon: "◈", text: "24K 99.9% Pure Gold", sub: "Hallmarked & certified" },
      {icon: "◈", text: ".999 Fine Silver", sub: "Live market rates always" },
      {icon: "◈", text: "Start from ₹1", sub: "No minimum investment" },
       {icon: "◈", text: "Start from ₹1", sub: "No minimum investment" }, 
      
    ].map((item, i) => (
      <div key={i} className="flex flex-col ">
        {/* <p className="text-xm font-serif">{item.icon}</p> */}

        <p className="text-xm font-serif">{item.text}</p>
        <p className="text-xs opacity-80">{item.sub}</p>
      </div>
    ))}
  </div>
</div>      
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-10 mb-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest mb-2 text-center bg" >Why DgiGold</p>
            <h2 className=" text-3xl heading-font  sm:text-5xl font-serif mb-2 text-center text-yellow-950" >
              Our Commitments
            </h2>
            <div className="divider-gold h-0.5 w-12 rounded-full mx-auto mb-10" />

            <div className="grid sm:grid-cols-2 gap-5 ">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div
                    key={i}
                    className="card-hover rounded-3xl p-6 shadow-md flex gap-4 bg-yellow-100  text-yellow-900">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-amber-200"
                  
                    >
                      <Icon className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif mb-1 text-yellow-900" >
                        {val.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-yellow-800/90" >
                        {val.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

       
        <section className="px-4 sm:px-6 lg:px-10 mb-16">
          <div className="max-w-3xl mx-auto">
            {/* <p className="text-xs uppercase tracking-widest mb-2 text-center" >Our Story</p>
            <h2 className="heading-font text-4xl sm:text-5xl font-serif mb-2 text-center text-yellow-950" >
              The Journey
            </h2> */}
            <div className="divider-gold h-0.5 w-12 rounded-full mx-auto mb-10" />

            <div className="relative pl-8">
              {/* vertical line */}
              <div
                className="absolute left-3 top-2 bottom-2 w-0.5 rounded-full timeline-line"
              />

              <div className="space-y-8">
                {/* {milestones.map((m, i) => ( */}
                  {/* <div key={i} className="relative flex gap-5 items-start bg-white"> */}
                    {/* dot */}
                    {/* <div
                      className="absolute -left-5 w-4 h-4 rounded-full border-2 shrink-0 mt-1"
                     
                    /> */}
                    {/* <div
                      className="rounded-2xl p-4 shadow-sm flex-1 card-hover"
                      
                    > */}
                      {/* <span
                        className="text-xs uppercase tracking-widest font-serif"
                       
                      > */}
                        {/* {m.year} */}
                      {/* </span> */}
                      {/* <p className="text-sm leading-relaxed mt-1" > */}
                        {/* {m.event} */}
                      {/* </p> */}
                    {/* </div> */}
                  {/* </div> */}
                {/* ))} */}
              </div>
            </div>
          </div>
          
        </section>

   
        <section className="px-4 sm:px-6 lg:px-10 mb-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest mb-2 text-center" >The People</p>
            <h2 className="heading-font text-4xl sm:text-5xl font-serif mb-2 text-center text-yellow-950" >
              Meet the Team
            </h2>
            <div className=" h-0.5 w-12 rounded-full mx-auto mb-10" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="card-hover rounded-3xl p-6 shadow-md text-center bg-white"           
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"         
                  >
                    <span
                      className="heading-font text-2xl font-bold"       
                    >
                      {member.initial}
                    </span>
                  </div>
                  <h3 className="heading-font text-lg font-serif mb-0.5" >
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest" >
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section className="px-4 p-20 md:p-20 sm:px-6 lg:px-10 pb-16 bg-gradient-to-br from-[#1a1508]
       via-[#5a4017] to-[#141414]">
          <div className="max-w-3xl mx-auto bg-amber-100 rounded-2xl">
            <div
              className="rounded-3xl p-3 shadow-lg text-center">
              <div className="divider-gold h-0.5 w-12 rounded-full mx-auto mb-6" />

              <h2 className="text-xl md:text-4xl sm:text-5xl font-serif mb-3 text-yellow-950">
                Ready to Start Investing?
              </h2>
              
              <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" >
                Join over 2 lakh Indians who trust DgiGold to grow and protect their wealth through gold and silver.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/gold")}
                  className="transition hover:opacity-90
                  py-3 px-4 rounded-xl text-sm  tracking-widest font-serif bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
                  shadow-lg shadow-amber-600/30 mb-5"                 
                >
                  Buy Gold
                </button>
                <button
                  onClick={() => navigate("/silver")}
                  className="transition hover:opacity-90
                   py-3 px-4 rounded-xl text-sm  tracking-widest font-serif
              bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900
              shadow-lg shadow-amber-600/30
              mb-5"
                  
                >
                  Buy Silver
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="transition hover:opacity-90
                   py-3 px-4 rounded-xl text-sm  tracking-widest font-serif
              bg-white
              shadow-lg shadow-amber-600/30
              mb-5 ">
                  Dashboard
                </button>
              </div>
            

              <div className="divider-gold h-0.5 w-8 rounded-full mx-auto mt-8" />
                 {/* <img src={Invest} alt="" className="w-full"/> */}
             
            </div>
            
          </div>
          
        </section>

      </div>
    </>
  );
}

export default About;