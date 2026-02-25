import { useContext } from "react";
import { PriceContext } from "../components/PriceProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Profile() {

  const { goldPrice, goldPercentage ,silverPrice,silverPercentage} = useContext(PriceContext);

  const user = {
    name: "Siva",
    phone: "9876543210",
    email: "siva@gmail.com",
    image: "#",
    gold:12,
    silver:14
  };

  const isProfit = Number(goldPercentage) > 0;
  const navigate=useNavigate();
  const silverisProfit = Number(silverPercentage) > 0;

  return (
    <div className="m-3 min-h-screen min-w-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100">
      
      <div className="w-full rounded-xl justify-center p-4 shadow-md bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100">
        
        <div className="flex w-full">
          <div className="items-center justify-center">
            <img
              src={user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-yellow-700"
            />

            <p className="mt-3 text-yellow-900 font-semibold">Name : {user.name}</p>
            <p className="text-yellow-900">Phone : {user.phone}</p>
            <p className="text-yellow-900">Email : {user.email}</p>
          </div>
        </div>

        <div className="flex gap-1 justify-center flex-wrap mt-4">
          <button className="bg-amber-700 hover:opacity-90 rounded-xl p-2 text-white"
            onClick={()=>navigate("/edit")}>View and Update Profile</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/nominee")}>Nominee Details</button>      

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/kycpage")}>KYC</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/delivery")}>Delivery Address</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/account")}>Account Details</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/billing")}>Billing Information</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/")}>History</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/")}>Transaction</button>

          <button className="bg-amber-700 rounded-xl p-2 text-white"
            onClick={()=>navigate("/redeem")}>Redeem</button>
        </div>

      </div>
       
      <div className="flex justify-center flex-wrap">

        {/* GOLD CARD */}
        <div className="w-100 m-4 rounded-xl justify-center p-4 shadow-xl text-yellow-900 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200">
          
          <h1 className="font-bold text-center text-xl">Gold</h1>

          <div className="flex flex-col items-start mt-3">
            
            <div className="flex font-bold gap-6 items-start">
              <p>Your Gold : {user.gold+"/g"} </p>    
              <p>Value Today: {(user.gold * goldPrice).toFixed(2)}</p>
            </div>
        
            <div className="flex gap-3 font-bold mt-2">
              Gold Today:

              {goldPercentage && (
                <p
                  className={`text-sm font-semibold ${
                    isProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(goldPrice)}
                </p>
              )}

              {goldPercentage && (
                <p
                  className={`text-sm font-semibold ${
                    isProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isProfit ? "▲" : "▼"} {Math.abs(goldPercentage)}%
                </p>
              )}
            </div>   
          </div>

          <div className="flex justify-center items-center gap-2 m-2">
            <button className="bg-amber-700 rounded-xl p-2 text-white">
              Sell
            </button>

            <button 
              onClick={()=>navigate("/gold")} 
              className="bg-amber-700 rounded-xl p-2 text-white">
              Buy
            </button>
          </div>
        </div>

        {/* SILVER CARD */}
        <div className="w-100 m-4 rounded-xl justify-start items-baseline p-4 shadow-xl text-gray-800 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
          
          <h1 className="font-bold text-center text-xl">Silver</h1>

          <div className="flex flex-col items-start mt-3">

            <div className="flex gap-8 font-bold items-start">
              <p>Your silver : {user.silver+"/g"} </p>    
              <p>Value Today: {(user.silver * silverPrice).toFixed(2)}</p>
            </div>
        
            <div className="flex gap-3 font-bold mt-2">
              Silver Today:

              {silverPercentage && (
                <p
                  className={`text-sm font-semibold ${
                    silverisProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(silverPrice)}
                </p>
              )}

              {silverPercentage && (
                <p
                  className={`text-sm font-semibold ${
                    silverisProfit? "text-green-600" : "text-red-600"
                  }`}
                >
                  {silverisProfit ? "▲" : "▼"} {Math.abs(silverPercentage)}%
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-2 m-2">
            <button className="bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 hover:opacity-90 rounded-xl p-2 text-white">
              Sell
            </button>

            <button 
              onClick={()=>navigate("/silver")} 
              className="bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 hover:opacity-90 rounded-xl p-2 text-white">
              Buy
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Profile;
