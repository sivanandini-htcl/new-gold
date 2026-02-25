import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Delivery(){
    const[isEditing,setIsEditing]=useState(false)
    const[formData,setFormData]=useState({
        address:"",
        address1:"",
        address2:"",
        type:"",
        pincode:"",
        area:"",
        landmark:"",
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
   <div className="min-h-screen bg-gray-100 text-black w-full">
      <h1 className="text-center text-accent font-bold text-2xl m-4">
     Delivery Address
      </h1>

      <div className="grid grid-cols-3 w-full gap-4 p-4">

        {/* Name */}
        <div>
          <label>Address:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent focus:border-indigo-500 ">{formData.address}</p>
          )}
        </div>
        <div>
          <label>Address Line 1:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent focus:border-indigo-500 ">{formData.address1}</p>
          )}
        </div>
        <div>
          <label>Address Line 2:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent focus:border-indigo-500 ">{formData.address2}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label>Pincode:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full " type="number" name="pincode"
              value={formData.pincode} onChange={handleChange} maxLength={7} />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-accent">{formData.pincode}</p>
          )}
        </div>

        {/* city */}
        <div>
          <label>City:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="text"  name="city"
               value={formData.city} onChange={handleChange}/>
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent ">{formData.city}</p>
          )}
        </div>

        {/* district */}
        <div>
          <label>District:</label>
          {isEditing ? (
            <input className="border border-black p-2 w-full" type="text" name="district"
             value={formData.district} onChange={handleChange}
            />
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent ">{formData.district}</p>
          )}
        </div>
        <div>
          <label>State:</label>
          {isEditing ? (
            <select className="border border-black p-2 w-full" name="state" id="">State
            <option value="">Select State</option></select>
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent ">{formData.state}</p>
          )}
        </div>
           <div>
          <label>Contact:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full" type="number"  name="contact"
               value={formData.contact} onChange={handleChange}/>
          ) : (
            <p  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
             focus:ring-accent ">{"+91-"+formData.contact}</p>
          )}
        </div>
         



      </div>

      <div className="flex justify-center gap-4 mt-6">

        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl">
              Edit
            </button>

            <button
              onClick={() => navigate("/profile")} className="border px-4 py-2 rounded-xl">
              Back
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-xl">
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)} className="border px-4 py-2 rounded-xl">
              Cancel
            </button>
          </>
        )}

      </div>
    </div>

     
    </>);

}export default Delivery;