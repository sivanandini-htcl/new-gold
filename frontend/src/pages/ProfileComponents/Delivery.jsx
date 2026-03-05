import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Edit3, Save, X,MapPin } from "lucide-react";
function Delivery(){
    const[isEditing,setIsEditing]=useState(false)
    const[formData,setFormData]=useState({
        address:"",
        address1:"",
        address2:"",
        landmark:"",
        type:"",
        pincode:"",
        city:"",
        district:"",
        state:"",
        contact:""

    })
      const [loading, setLoading] = useState(false);
      const navigate=useNavigate();
    
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({
            ...prev,[name]:value,
        }));
    };


    // const handleSave=async ()=>{ backend logic}

    // }
    
    const handleSave=()=>{
        console.log("saved data",formData);
        toast.success("address saved successfully");
        setIsEditing(false);
    }
    
    return(<>
   <div className="min-h-screen text-accent bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 flex justify-center mt-4">
    <div className="w-full h-full mt-6"> 
       
      <div className=" flex flex-col ">
 <div className="flex  justify-start ml-4  mb-1 gap-1 md:ml-60  ">
  <h2 className="text-2xl font-bold font-serif text-black">
          Delivery
        </h2>
        <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
        Details
        </h2> 
    </div>
    <div className=" flex justify-start">
<p className=" text-xs uppercase tracking-widest text-center ml-4 md:ml-60" style={{ color: "#a09070" }}>
              {isEditing ? "Editing Mode · Update your delivery details" : "Your saved delivery information"}
            </p>
    </div>
    
 <div className="bg-yellow-700 h-px md:w-210 ml-4 opacity-40 mb-6 flex  md:ml-60 " />
     
   </div>
  
 

<div className="rounded-3xl m-10 p-6 sm:p-8 shadow-md  bg-white md:m-60 md:mt-5 mb-0 md:mb-4  ">
            {/* Section: Personal Info */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 rounded-full bg-amber-800 flex" />
              <MapPin/>
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>  
                Address Details
              </p>
            </div>
<div className="mb-8 bg-white ">
              {/* Name */}
<div className="w-full ">
  <div>
            <label className="text-sm font-semibold text-amber-800">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.address||"Not provided"}</p>
            )}
            
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">

  <div>
            <label className="text-sm font-semibold text-amber-800">Address Line 1</label>
            {isEditing ? (
              <input 
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                className="border border-amber-500/30  p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30   rounded-md px-3 py-2 text-amber-800 text-xs">{formData.address1||"Not provided "}</p>
            )}
</div>
 <div>
            <label className="text-sm font-semibold text-amber-800">Address Line 2</label>
            {isEditing ? (
              <input 
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="border border-amber-500/30  p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30   rounded-md px-3 py-2 text-amber-800 text-xs">{formData.address2||"Not provided "}</p>
            )}
</div>

<div>
            <label className="text-sm font-semibold text-amber-800">Landmark</label>
            {isEditing ? (
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.landmark||"Not provided"}</p>
            )}
</div>

          {/* Phone */}
<div>
            <label className="text-sm font-semibold text-amber-800">Pincode</label>
            {isEditing ? (
              <input
                type="tel"  name="pincode"  value={formData.pincode}  onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1" />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.pincode||"Not provided"}</p>
            )}
</div>

          {/* Email */}
<div>
            <label className="text-sm font-semibold text-amber-800">City</label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.city||"Not provided"}</p>
            )}
</div>

 <div>
            <label className="text-sm font-semibold text-amber-800">District</label>
            {isEditing ? (
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.address||"Not provided"}</p>
            )}
</div>
 <div>
            <label className="text-sm font-semibold text-amber-800">State</label>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.state||"Not provided"}</p>
            )}
</div>
 <div>
            <label className="text-sm font-semibold text-amber-800">Contact number</label>
            {isEditing ? (
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.contact||"Not provided"}</p>
            )}
</div>
</div>



</div>


<div >
  
</div>

</div>
<div className="flex justify-center gap-4 mt-2 mb-20  text-center">

          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className=" w-25 md:w-35 font-light  text-xs md:tracking-widest 
              bg-gradient-to-r from-yellow-800 via-yellow-300 to-yellow-700
             text-black rounded-xl  gap-1  flex p-2 md:font-semibold md:text-sm">
              <Edit3 className="text-black" size={14} md:size={15}/>
              Edit Profile
              </button>

              <button onClick={() => navigate("/profile")}
                className="  text-xs rounded-xl  p-2 gap-1 flex  md:text-center md:justify-center w-25 text-center  md:w-35 bg-white text-black md:text-sm md:font-semibold ">
                  <ArrowLeft className="text-black text-center" size={14} md:size={15}/>
                Back
              </button>
            </>
          ) : (
            <>
            <button onClick={handleSave} className="w-25 md:w-35 font-light  text-xs md:tracking-widest 
              bg-gradient-to-r from-yellow-800 via-yellow-300 to-yellow-700
             text-black rounded-xl  gap-1  flex p-2 md:font-light md:text-sm">
              <Save className="text-black md:font-mono"/>
              Save</button>
            <button onClick={() => setIsEditing(false)} className="border px-4 py-2 rounded-xl">Cancel</button>
            </>
          )}

</div>

 </div>
       


      </div>

     
    </>);

}export default Delivery;