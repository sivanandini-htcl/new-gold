import { useNavigate } from "react-router-dom";
import {
  User, Phone, Mail, Edit, FileText, ShieldCheck, MapPin, CreditCard,
  Receipt, Clock, ArrowRightLeft, Gift, ShieldUser, Settings,
  TrendingUp, TrendingDown, Zap, BarChart2, ArrowUpRight,
  Wallet, Package, ChevronRight, Sparkles
} from "lucide-react";
import usePriceStore from "../store/priceStore";
import useAuthStore from "../store/authStore";

const MENU_ITEMS = [
  { icon: Edit,           label: "Profile",    route: "/edit" },
  { icon: FileText,       label: "Nominee",    route: "/nominee" },
  { icon: ShieldCheck,    label: "KYC",        route: "/kycpage" },
  { icon: MapPin,         label: "Address",    route: "/delivery" },
  { icon: CreditCard,     label: "Account",    route: "/account" },
  { icon: Receipt,        label: "Billing",    route: "/billing" },
  { icon: Clock,          label: "History",    route: null },
  { icon: ArrowRightLeft, label: "Transfers",  route: null },
  { icon: Gift,           label: "Redeem",     route: "/redeem" },
  { icon: Settings,       label: "Settings",   route: null },
];

export default function Profile() {
  const navigate = useNavigate();

  const username  = useAuthStore((s) => s.user?.name)  || "Arjun Sharma";
  const userEmail = useAuthStore((s) => s.user?.email) || "arjun@example.com";
  const prices    = usePriceStore((s) => s.prices) || [];
  const { goldPercentage, silverPercentage } = usePriceStore();

  const goldPriceData   = prices.find((i) => i.metal === "GOLD");
  const silverPriceData = prices.find((i) => i.metal === "SILVER");
  const gram24kGold     = goldPriceData?.caratPrices?.gram24k   || 0;
  const gram24kSilver   = silverPriceData?.caratPrices?.gram24k || 0;

  const user = { phone: "9876543210", userId: "QWF12345678XXXX", gold: 12, silver: 14 };

  const goldValue      = user.gold   * gram24kGold;
  const silverValue    = user.silver * gram24kSilver;
  const totalValue     = goldValue + silverValue;
  const totalInvested  = 940000;
  const goldInvested   = 920000;
  const silverInvested = 20000;
  const totalPnL       = totalValue - totalInvested;
  const totalPnLPct    = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : "0.00";
  const isProfit       = totalPnL >= 0;
  const goldPnL        = goldValue   - goldInvested;
  const silverPnL      = silverValue - silverInvested;
  const goldPct        = goldInvested   > 0 ? ((goldPnL   / goldInvested)   * 100).toFixed(2) : "0.00";
  const silverPct      = silverInvested > 0 ? ((silverPnL / silverInvested) * 100).toFixed(2) : "0.00";
  const goldAlloc      = totalValue > 0 ? ((goldValue   / totalValue) * 100).toFixed(1) : "50";
  const silverAlloc    = totalValue > 0 ? ((silverValue / totalValue) * 100).toFixed(1) : "50";
  const fmt = (n) => n > 0 ? `₹${Math.round(n).toLocaleString("en-IN")}` : "—";

  return (
    <>
    <div className="bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 p-20 pt-10 pb-10 ">
      <div className="flex gap-3">

  <div className="flex gap-6 bg-white mb-4 rounded-xl border border-gray-400 p-4" >
                <div className="flex p-2" >
                  <div className="border border-black rounded-4xl p-2 pb-0" >
                    <User className="pb-0 mt-1"size={38} />
                  </div> 
                </div>
                <div className="">
                  <div className="flex gap-3">
                    <h2 className="text-3xl font-bold font-serif">{username}</h2>
                    
                  <span className="border border-amber-600 bg-yellow-600/70 text-sm pl-1 pr-2 h-fit rounded-lg">Premium</span>
                  </div>
                  <div className="flex gap-7 mt-2"> 
                      <span  className="text-sm flex gap-2 text-yellow-900">
                        <Phone className="text-xs" size={14} />
                        <p>{user.phone}</p>
                        </span>
                          <span  className="text-sm flex gap-2 text-yellow-900">
                           <Mail className="text-xs" size={14} /><p>{userEmail}</p>
                          </span>
                          <span  className="text-sm flex gap-2 text-yellow-900">
                       
                        <ShieldUser className="text-xs" size={14} /><p>{user.userId}</p>
                      </span>         
                  </div>
                  </div>                   
                  </div>

                  <div className="bg-yellow-700/10 w-full rounded-xl h-fit p-2 ">

                  <div className="gap-2 flex ">
                  <Wallet className="text-yellow-500"/>
                  <p className="font-serif text-yellow-700/70">Total Portifolio</p>
                  </div>
                    <div className="text-4xl font-bold ml-5 text-yellow-900">123456</div>

                  </div>
                  
</div>


        <div className="grid grid-cols-2 gap-10  ">   
            {/* ══ TILE 3: Gold card (6 col) ══ */}
            <div className="border border-gray-300 rounded-2xl  bg-white">
              <div className="w-full bg-amber-500/30 h-1.5 rounded-3xl mt-0" />
              <div className="p-4">
                {/* Header */}
                <div >
                  <div>
                    <div className="flex gap-1 font-serif">
                      <h3 className="md:text-4xl font-bold text-yellow-800">Gold</h3>
                      <span className="border border-gray-400 rounded-xl w-fit h-fit pl-2 pr-2">24K</span>
                    </div>
                    <div className="">
                      <span  />
                      <span >Live · ₹{gram24kGold ? Math.round(gram24kGold).toLocaleString("en-IN") : "—"}/g</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-xs font-medium uppercase text-yellow-900">Holdings</div>
                    <div className="font-heading font-bold">{user.gold}g</div>
                  </div>
                </div>

                {/* 2×2 stats */}
                <div className=" grid grid-cols-2 gap-3 text-xs p-1 mb-2 ">
                  <div className="border p-3 rounded-2xl gap-4">
                  <p>CURRENT VALUE</p>
                  <p className="text-sm font-bold">₹ 123000</p>
                  </div>

                  <div className="border p-3 rounded-2xl gap-4">
                  <p>P&L</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                  <div className="border p-4 rounded-2xl"><p>INVESTED</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                  <div className="border p-4 rounded-2xl"><p>RETURN</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                 
                </div>

                {/* Progress */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.58rem", color: "var(--brown-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Return</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: Number(goldPct) >= 0 ? "var(--profit)" : "var(--loss)" }}>{Number(goldPct) >= 0 ? "+" : ""}{goldPct}%</span>
                  </div>
                  <div className="pbar">
                    <div className="pbar-fill" style={{ width: `${Math.min(100, Math.abs(Number(goldPct)))}%`, background: Number(goldPct) >= 0 ? "linear-gradient(90deg,#c8a84b,#f5d06e)" : "linear-gradient(90deg,#c05a5a,#e08080)" }} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-yellow-500 w-full flex p-2 rounded-xl text-center justify-center gap-2" onClick={() => navigate("/gold")}>
                    <Zap size={14}/>
                    Buy
                    </button>
                  <button className="border border-gray-300 w-full flex p-2  rounded-xl text-center justify-center gap-2"><ArrowUpRight size={14} />Sell</button>
                </div>
              </div>
            </div>

            {/* ══ TILE 4: Silver card (6 col) ══ */}
            <div className="border rounded-2xl p-3 bg-white">
              <div className="w-full bg-gray-500 h-1.5" />
              <div className="p-4">
                <div >
                  <div>
                    <div className="flex gap-1 font-serif">
                      <h3 className="md:text-4xl font-bold text-yellow-800">Silver</h3>
                      <span className="border border-gray-400 rounded-xl w-fit h-fit pl-2 pr-2">.999</span>
                    </div>
                    <div >
                      <span  />
                      <span >Live · ₹{gram24kSilver ? Math.round(gram24kSilver).toLocaleString("en-IN") : "—"}/g</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div  className="text-xs font-medium uppercase text-yellow-900">Holdings</div>
                    <div className="font-heading font-bold">{user.silver}g</div>
                  </div>
                </div>

              <div className=" grid grid-cols-2 gap-3 text-xs p-1 mb-2 ">
                  <div className="border p-3 rounded-2xl gap-4">
                  <p>CURRENT VALUE</p>
                  <p className="text-sm font-bold">₹ 123000</p>
                  </div>

                  <div className="border p-3 rounded-2xl gap-4">
                  <p>P&L</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                  <div className="border p-4 rounded-2xl"><p>INVESTED</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                  <div className="border p-4 rounded-2xl"><p>RETURN</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                 
                </div>
                {/* progressbar */}

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.58rem", color: "var(--brown-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Return</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: Number(silverPct) >= 0 ? "var(--profit)" : "var(--loss)" }}>{Number(silverPct) >= 0 ? "+" : ""}{silverPct}%</span>
                  </div>
                  <div className="pbar">
                    <div className="pbar-fill" style={{ width: `${Math.min(100, Math.abs(Number(silverPct)))}%`, background: Number(silverPct) >= 0 ? "linear-gradient(90deg,#888,#d0d0d0)" : "linear-gradient(90deg,#c05a5a,#e08080)" }} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-gray-400 w-full flex p-2 rounded-xl text-center justify-center gap-2" onClick={() => navigate("/gold")}>
                    <Zap size={14}/>
                    Buy
                    </button>
                  <button className="border border-gray-300 w-full flex p-2  rounded-xl text-center justify-center gap-2"><ArrowUpRight size={14} />Sell</button>
                </div>
              </div>
            </div>    
           </div>
         <div className="w-full  gap-2 p-3 rounded-2xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
         <div className="w-full bg-white p-4 rounded-2xl">
           <div className="flex justify-between">
            <div className="bg-yellow-200 p-1 border border-yellow-800 rounded-xl">
            <BarChart2 />
            </div>
            <ChevronRight size={15}/>
           </div>          
           <p className=" font-bold mt-4">Reports</p>
         <p className="text-sm text-yellow-900">Analytics & insights</p>
         </div>

      
          <div className="w-full bg-white p-4 rounded-2xl gap-8">
            <div className="flex justify-between">
              <div className="bg-green-600/20 p-1 text-green-800 rounded-xl border border-green-800/40"><Package /></div>
            
            <ChevronRight size={15}/>
            </div>          
            <p className=" font-bold mt-4">My Orders</p>
         <p className="text-sm text-yellow-900">Track deliveries</p>
         </div>

          <div className="w-full bg-white p-4 rounded-2xl " onClick={()=>navigate("/redeem")}>
            <div className="flex justify-between">
              <div className="bg-yellow-200 p-1 rounded-xl border border-yellow-800">
               <Gift />
              </div>         
              <ChevronRight size={15}/>
            </div> 
             <p className=" font-bold mt-4">Redeem</p>
            <p className="text-sm text-yellow-900">Browse jewellery</p>
            </div>

          <div className="w-full bg-white p-4 rounded-2xl"> 
            <div className="flex justify-between">
              <div className="bg-yellow-700/20 p-1 rounded-xl border border-yellow-800/50">
              <Clock />
              </div>       
              <ChevronRight size={15}/>
            </div>
            <p className=" font-bold mt-4">History</p>
         <p className="text-sm text-yellow-900">All transactions</p>
         </div>
           </div>

           </div>
    </>
  );
}