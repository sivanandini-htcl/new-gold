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
  { icon: ArrowRightLeft, label: "Transfers",  route: null },
 
  { icon: Settings,       label: "Settings",   route: null },
];

export default function Profile() {
  const navigate = useNavigate();

  const username  = useAuthStore((s) => s.user?.name) ;
  const userEmail = useAuthStore((s) => s.user?.email);
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
  const goldPnL = goldValue   - goldInvested;

  
return(<div className="bg-gradient-to-br from-amber-50 via-amber-100 to-amber-100 pl-2 pr-2  lg:pl-5 lg:pr-5 pt-3 pb-10 md:pl-5 md:pr-5">
<div></div>
   <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">

        <section className="bg-white rounded-xl p-4 w-full md:col-span-2">
          <div className="">
             <div className="flex p-2 gap-2" >
                  <div className="border border-black rounded-4xl p-3 " >
                    <User className=" "size={30} />
                  </div> 
                  <h2 className="text-3xl font-bold font-serif">{username}</h2>
                  <span className="border border-amber-600 bg-yellow-600/70 text-xs pl-1 pr-2 h-fit rounded-lg">Premium</span>     
        </div>
        <div>
              <div className=" gap-2 md:flex md:ml-10 md:gap-5"> 
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
                  <div className="gap-3 grid grid-cols-2 md:grid md:grid-cols-4 mt-3 ">
                {MENU_ITEMS.map(({ icon: Icon, label, route }) => (
                  <button key={label} className=" bg-[#eeddd185] rounded-xl p-3 grid grid-cols-1 items-center justify-center "  onClick={() => route && navigate(route)}>
                    <div className="bg-yellow-300/40 w-10 h-10 flex text-center justify-center items-center  rounded-xl  hover:bg-amber-800 ">
                      <Icon className=" flex justify-center items-center" size={15}/>
                      </div>
                    <span className="gap-3 flex text-center text-xs justify-center items-center" >{label}</span>
                  </button>
                ))}        
               </div>
      </section>

    <section className="bg-yellow-700/10 rounded-2xl p-3 md:col-span-1">
                  <div className="gap-2 flex mb-2">
                  <Wallet className="text-yellow-500"/>
                  <p className="font-serif text-yellow-700/70">Total Portifolio</p>
                  </div>
                  <div className="text-xl font-bold ml-5 text-yellow-900 mb-2">
                    <p>₹ 123456</p>
                  </div>
                  <div className="bg-red-300   ml-4 w-fit h-4 pl-1 pr-2 rounded-xl flex gap-1 mb-10 md:mb-40">
                    <TrendingDown className="p-0"size={14}/>
                    <p className="text-xs">88%  7689043</p>
                  </div>   
                  <div className="h-2 w-full bg-yellow-800 rounded"/>             
                  <div className="flex gap-4 justify-between">
                  <div className="flex  items-center gap-2">
                    <div className="w-2 h-2 pb-0 bg-yellow-600 rounded-2xl "/>
                    <p className="text-xs ">Gold</p>
                    <p className="text-xs">170000</p> 
                  </div>
                  <div className="flex  items-center gap-2">
                    <div className="w-2 h-2 pb-0 bg-gray-600 rounded-2xl"/>
                    <p className="text-xs">Silver</p>
                    <p className="text-xs">30000</p> 
                  </div>
                  </div> 
      </section>
    </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-2xl mb-3 bg-white p-3 ">
              <div className="flex justify-between pb-1">
                <div className="flex gap-1 font-serif">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent ">Gold</h3>
                      <span className="border border-gray-400 rounded-xl w-fit h-4 pl-2 pr-2 text-xs">24K</span>
                    </div>
                  <div>
                    <p className="text-xs font-serif uppercase text-yellow-900">Holdings</p>
                    <p className="font-heading font-bold pl-3">{user.gold}g</p>
                  </div>
              </div>
                    

                <div className=" grid grid-cols-2 gap-3 text-xs p-1 mb-2 ">
                  <div className="border border-gray-300 p-2 rounded-2xl gap-4">
                  <p className="text-xs font-serif">CURRENT VALUE</p>
                  <p className="text-sm font-bold ">₹ 2123000</p>
                  </div>
                  <div className="border border-gray-300 p-2 rounded-2xl gap-4">
                  <p className="text-xs font-serif">P&L</p>
                  <p className="text-sm font-bold ">₹ 10000</p></div>
                  <div className="border border-gray-300 p-2 rounded-2xl ">
                    <p className="text-xs font-serif">INVESTED</p>
                  <p className="text-sm font-bold ">₹ 123000</p></div>
                  <div className="border border-gray-300 p-2 rounded-2xl">
                  <p className="text-xs font-serif">Live</p>
                  <p className="text-sm font-bold "> ₹{gram24kGold ? Math.round(gram24kGold).toLocaleString("en-IN") : "—"}/g</p></div>               
                </div>
                  <div className="h-2 mb-3  w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 rounded-xl"/>             

              <div className="flex gap-2">
                  <button className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950 text-black shadow-lg hover:scale-[1.02] w-full flex p-2 rounded-xl text-center justify-center gap-2" onClick={() => navigate("/gold")}>
                    <Zap size={14}/>
                    Buy
                    </button>
                  <button className="border border-gray-300 w-full flex p-2  rounded-xl text-center justify-center gap-2"><ArrowUpRight size={14} />Sell</button>
                </div>
            </div>

            {/* silver */}
            <div className="border border-gray-200 rounded-2xl  bg-white p-3 ">
              <div className="flex justify-between pb-1">
                <div className="flex gap-1 font-serif">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 via-gray-400 to-gray-900 font-serif bg-clip-text text-transparent  ">Silver</h3>
                      <span className="border border-gray-400 rounded-xl w-fit h-4 pl-2 pr-2 text-xs">999</span>
                    </div>
                  <div>
                    <p className="text-xs font-serif uppercase text-yellow-900">Holdings</p>
                    <p className="font-heading font-bold pl-3">{user.silver}g</p>
                  </div>
              </div>
                       
                <div className=" grid grid-cols-2 gap-3 text-xs p-1 mb-2 ">
                  <div className="border border-gray-300 p-2 rounded-2xl gap-4">
                  <p className="text-xs font-serif">CURRENT VALUE</p>
                  <p className="text-sm font-bold ">₹ 123000</p>
                  </div>
                  <div className="border border-gray-300 p-2 rounded-2xl gap-4">
                  <p className="text-xs font-serif">P&L</p>
                  <p className="text-sm font-bold ">₹ 123000</p></div>
                  <div className="border border-gray-300 p-2 rounded-2xl ">
                    <p className="text-xs font-serif">INVESTED</p>
                  <p className="text-sm font-bold">₹ 123000</p></div>
                  <div className="border border-gray-300 p-2 rounded-2xl">
                  <p className="text-xs GON font-serif">Live</p>
                  <p className="text-sm font-bold ">₹{gram24kSilver ? Math.floor(gram24kSilver) : "—"}/g</p></div>               
                </div>
                  <div className="h-2 mb-3  w-full bg-gradient-to-r from-gray-700 via-gray-400 to-gray-900 font-serif  rounded-xl"/>             

              <div className="flex gap-2">
                  <button className="bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 shadow-lg hover:scale-[1.02] w-full flex p-2 rounded-xl text-center justify-center gap-2" onClick={() => navigate("/gold")}>
                    <Zap size={14}/>
                    Buy
                    </button>
                  <button className="border border-gray-300 w-full flex p-2  rounded-xl text-center justify-center gap-2"><ArrowUpRight size={14} />Sell</button>
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

          <div className="w-full bg-white p-4 rounded-2xl" onClick={()=>navigate("/redeem")}>
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


            
            


















</div>);}