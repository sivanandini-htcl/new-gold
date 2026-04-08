import { useContext } from "react";
// import { PriceContext } from "../components/PriceProvider";
import { useNavigate } from "react-router-dom";
import {
  User, Phone,Mail,Edit,FileText, ShieldCheck,MapPin,CreditCard,Receipt,Clock,ArrowRightLeft,Gift,ShieldUser,Settings,
  icons
} from "lucide-react";
import usePriceStore from "../store/priceStore";
import useAuthStore from "../store/authStore";
function Profile() {
 
  const{ goldPercentage,silverPercentage } = usePriceStore();
const username = useAuthStore((state) => state.user?.name);
const userEmail = useAuthStore((state) => state.user?.email);
const prices = usePriceStore((state) => state.prices) || [];

const goldPrice = prices.find((item) => item.metal === "GOLD");
const silverPrice = prices.find((item) => item.metal === "SILVER");

const GOLD_PRICE_PER_GRAM = Number(goldPrice?.price ?? 0);
const SILVER_PRICE_PER_GRAM = Number(silverPrice?.price ?? 0);

const components=[{
  icons:Edit,
  title:'Update Profile'
},
{
  icons:FileText,
  title:'Nominee Details'
},{
  icons:ShieldCheck,
  title:'KYC'
}]


  const navigate = useNavigate();

  const user = {
    phone: "9876543210",
    userId:"QWF12345678XXXX",
    gold: 12,
    silver: 14,
  };

  const isGoldProfit = Number(goldPercentage) > 0;
  const isSilverProfit = Number(silverPercentage) > 0;

  return (

    <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 py-10 px-4 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Page Title */}
        <div className="border-b border-amber-200 pb-6">
          <h1 className=" text-3xl md:text-5xl font-['Fraunces'] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className=" mt-2 text-xs uppercase tracking-widest text-yellow-800/70 font-['Fraunces']">
            Account · Portfolio · Settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-100">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">

            
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-300 flex items-center justify-center border-2 border-amber-300">
              <User className="w-8 h-8 text-amber-700"/>
            </div>

            <div className="flex w-full">
            
            <div className="border border-amber-300 w-full p-2 rounded-2xl" >
              <h2 className="text-xl text-center md:text-2xl md:text-left text-amber-950 mt-2 font-['Fraunces']">
                {username}
              </h2>

              <div className="flex items-center gap-2 text-sm text-amber-700 m-2">
                <Phone size={16} />
                {user.phone}
              </div>

              <div className="flex items-center gap-2 text-sm text-amber-700 m-2">
                <Mail size={16} />
                {userEmail}
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-700 m-2">
                <ShieldUser size={16} />
                {user.userId}
                </div>
         
            </div>
          </div>
          </div>

    
  <div className="w-full max-w-5xl mx-auto p-4 font-['Fraunces'] m-1 ">
  <div className="grid grid-cols-2  text-xs sm:grid-cols-2 md:text-sm lg:grid-cols-5 gap-4 m-1"> 
<div className=" rounded-xl border border-amber-300 flex">    
<button 
  className="transition duration-300 
             rounded-xl p-3 text-black w-full 
             flex flex-col items-center justify-center gap-2"
  onClick={() => navigate("/edit")}>
  <Edit  className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30}/>
  <span>Update Profile</span>
</button>
</div>

<div className=" rounded-xl border border-amber-300 flex">
      <button 
      className="transition duration-300 rounded-xl  text-black w-full flex flex-col items-center justify-center"
      onClick={() => navigate("/nominee")}
    >
      <FileText className=" text-amber-900 bg-amber-200 rounded-lg p-1" size={30}/>
      Nominee Details
    </button>
</div>

<div className=" rounded-xl border border-amber-300 flex">
    <button 
      className=" flex flex-col items-center justify-center transition duration-300 rounded-xl p-3 text-black w-full"
      onClick={() => navigate("/kycpage")}
    >
      <ShieldCheck  className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      KYC
    </button>

</div>







<div className=" rounded-xl border border-amber-300  flex">
 <button 
      className=" flex flex-col items-center justify-center  transition duration-300 rounded-xl p-3 text-black w-full"
      onClick={() => navigate("/delivery")}
    >
        <MapPin className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      Delivery Address
    
    </button>
</div>
   
<div className=" rounded-xl border border-amber-300  flex">
    <button 
      className=" flex flex-col items-center justify-center  transition duration-300 rounded-xl p-3 text-black w-full"
      onClick={() => navigate("/account")}>
      <CreditCard className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      Account Details
    </button>
</div>

<div className=" rounded-xl border border-amber-300  flex">
    <button 
      className=" flex flex-col  items-center justify-center transition duration-300 rounded-xl p-3 text-black w-full"
      onClick={() => navigate("/billing")}>
      <Receipt className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30}/>
      Billing Information
    </button>
    </div>

<div className=" rounded-xl border border-amber-300  flex">
<button 
      className="flex flex-col  items-center justify-center transition duration-300 rounded-xl p-3 text-black w-full"
     
    >
      <Clock className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      History
    </button>
</div>
    
<div className="rounded-xl border border-amber-300  flex">
<button 
      className=" flex flex-col items-center justify-center transition duration-300 rounded-xl p-3 text-black w-full"
      >
      <ArrowRightLeft className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      Transaction
    </button>
</div >
    
<div className="rounded-xl border border-amber-300  flex">
    <button 
      className=" flex flex-col items-center justify-center transition duration-300 rounded-xl p-3 text-black w-full"
      onClick={() => navigate("/redeem")} >
        <Gift className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      Redeem
    </button>
</div>

<div className="rounded-xl border border-amber-300  flex">
    <button 
      className=" flex flex-col items-center justify-center transition duration-300 rounded-xl p-3 text-black w-full"
       >
        <Settings className="text-amber-900 bg-amber-200 rounded-lg p-1" size={30} />
      Settings
    </button>
</div>
  </div>
</div>
</div>


        {/* Portfolio Section */}
        <div>
          <p className=" mt-2 text-xs uppercase tracking-widest text-yellow-800/70 font-['Fraunces']">
            Portfolio
          </p>
          <h2 className="text-3xl  text-amber-950  font-['Fraunces'] mt-1 mb-6">
            Your Holdings
          </h2>
          <div className="bg-white p-5 mb-5 rounded-3xl shadow-md border border-yellow-300 "> 
             <h2 className="text-xl  text-yellow-800/70 uppercase font-['Fraunces'] mt-1 mb-6">
            Portfolio
          </h2>
            <p className="font-serif text-md text-yellow-900">Total Current value</p>
            <span className="font-semibold text-lg mb-6 text-gray-900">₹ 5247770.2</span>
            <p className="font-serif text-md text-yellow-900">Total Invested</p>
            <span className="font-semibold text-lg mb-6 text-gray-900">₹ 940000 </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 ">

            {/* Gold Card */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-yellow-300 ">
              <div className="flex justify-between">
        <h3 className=" text-2xl font-['Fraunces'] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                Gold 
              </h3>
              <p className="text-xl text-yellow-900">  ₹{GOLD_PRICE_PER_GRAM}/g</p>
              </div>
             

              <div className="space-y-4 mt-6">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Your Holdings</span>
                  <span className="font-semibold">{user.gold} g</span>
                </div>
<div className="flex justify-between text-sm">
                  <span className="text-gray-500">Invested in Gold</span>
                  <span className="font-semibold"> 920000 g</span>
                </div>
             

                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500"> Your Current value </span>
                  <div className="flex items-center gap-2">
                     ₹ {user.gold*GOLD_PRICE_PER_GRAM}
                    
                    {/* {goldPercentage && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          isGoldProfit
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {isGoldProfit ? "▲" : "▼"} {goldPercentage}%
                      </span>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => navigate("/gold")}
                  className="flex-1 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950 text-black py-3 rounded-xl font-['Fraunces']  hover:opacity-90 transition"
                >
                  Buy
                </button>
                <button className="flex-1 border border-yellow-400 text-yellow-700 py-3 rounded-xl font-['Fraunces']  hover:bg-yellow-50 transition">
                  Sell
                </button>
              </div>
            </div>

            {/* Silver Card */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-300">
              <div className="flex justify-between">
         <h3 className="text-2xl  font-['Fraunces']  bg-gradient-to-r from-gray-700 via-gray-200 to-gray-900  bg-clip-text text-transparent">
                Silver
              </h3>
              <p className="text-xl text-gray-700">
                ₹{SILVER_PRICE_PER_GRAM}/g
              </p>
              </div>
              
              

              <div className="space-y-4 mt-6">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Your Holdings</span>
                  <span className="font-semibold">{user.silver} g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Invested in Silver</span>
                  <span className="font-semibold"> 20000 g</span>
                </div>


                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500">Today's Rate</span>
                  <div className="flex items-center gap-2">
                    
                     ₹{(user.silver * SILVER_PRICE_PER_GRAM)}

                    {/* {silverPercentage && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          isSilverProfit
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {isSilverProfit ? "▲" : "▼"} {silverPercentage}%
                      </span>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => navigate("/silver")}
                  className="flex-1 bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 py-3 rounded-xl font-['Fraunces']  hover:opacity-90 transition"
                >
                  Buy
                </button>
                <button className="flex-1 border border-gray-400 text-gray-600 py-3 rounded-xl font-['Fraunces']  hover:bg-gray-50 transition">
                  Sell
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
      
  );
}

export default Profile;
