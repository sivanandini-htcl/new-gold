import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";

function Nominee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineePhone: "",
    address: "",
    relation: "",
    DOB: "",
    panNumber: "",
    gender:""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nomineeId, setNomineeId] = useState(null); 


  

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSave = async () => {
    try {
      setLoading(true);

      if (!nomineeId) {
      
        const res = await axios.post( "http://localhost:5000/api/nominee",formData);

        setNomineeId(res.data._id);
        toast.success("Nominee Added Successfully!");
      } else {
        
        await axios.put(
          `http://localhost:5000/api/nominee/${nomineeId}`, formData
        );

        toast.success("Nominee Updated Successfully!");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving nominee:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-accent bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 flex justify-center mt-0">
    <div className="w-full h-full mt-2">  
      
      <div className=" flex flex-col ">
          <div className=" ml-3 md:ml-10 mt-8 mb-1">
<button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest transition">
            <ArrowLeft className="w-4 h-4"/>
            Back to Profile
          </button>
          </div>
 <div className="flex justify-start ml-4 mt-2  md:mt-2 mb-1 gap-1 md:ml-10 ">
  
  <h2 className="text-2xl font-bold font-serif text-black">
          Nominee
        </h2>
        <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
        Details
        </h2> 
  </div>


    <div className=" flex  justify-start">
<p className=" text-xs uppercase tracking-widest text-center ml-4 md:ml-10" style={{ color: "#a09070" }}>
              {isEditing ? "Editing Mode · Please Fill Nominee Details" : "View & Manage Nominee details"}
            </p>
    </div>
    
    
 <div className="bg-yellow-700 h-px md:w-175 ml-4 opacity-40 mb-6 flex  md:ml-10 " />
</div>
  

<div className="rounded-3xl m-10 p-6 sm:p-8 shadow-md md:max-w-screen max-w-auto box-border  bg-white md:m-6 md:p-8 md:mb-4  lg:m-40 lg:mt-5 mb-0  ">
            {/* Section: Personal Info */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 rounded-full bg-amber-800" />
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>
                Nominee Information
              </p>
            </div>


<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5 mb-8 bg-white ">
              {/* Name */}
<div>
            <label className="text-sm font-semibold text-amber-800">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
                
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.nomineeName||"Not provided"}</p>
            )}
            
</div>

{/* <div>
            <label className="text-sm font-semibold text-amber-800">Middle Name</label>
            {isEditing ? (
              <input 
                type="text"
                name="name"
                onChange={handleChange}
                className="border border-amber-500/30  p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30   rounded-md px-3 py-2 text-amber-800 text-xs">{formData.nomineeName||"Not provided "}</p>
            )}
</div>

<div>
            <label className="text-sm font-semibold text-amber-800">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.lastName||"Not provided"}</p>
            )}
</div> */}

          {/* Phone */}
<div>
            <label className="text-sm font-semibold text-amber-800">Phone</label>
            {isEditing ? (
              <input
                type="tel"  name="nomineePhone"  value={formData.nomineePhone}  onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1" />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.nomineePhone||"Not provided"}</p>
            )}
</div>

          {/* Email */}
{/* <div>
            <label className="text-sm font-semibold text-amber-800">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.nom}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.email||"Not provided"}</p>
            )}
</div> */}

 <div>
            <label className="text-sm font-semibold text-amber-800">Nominee Address</label>
            {isEditing ? (
              <input
                type=""
                name=""
                value={formData.address}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.address||"Not provided"}</p>
            )}
</div>
 <div>
            <label className="text-sm font-semibold text-amber-800">Nominee Relation</label>
            {isEditing ? (
              <input
                type=""
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.relation||"Not provided"}</p>
            )}
</div>
 <div>
            <label className="text-sm font-semibold text-amber-800">Nominee Pan</label>
            {isEditing ? (
              <input
                type=""
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.panNumber||"Not provided"}</p>
            )}
</div>


<div>
      <label className="text-sm font-semibold text-amber-800">Nominee Gender</label>
            {isEditing ? (
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="border border-amber-500/30 p-2 rounded-lg w-full mt-1 text-amber-800 ">

      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  ) : (
    <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.gender || "Not Provided"}</p>
  )}

</div>
</div>

 <div className="bg-yellow-700 h-px w-full opacity-40 mb-6" />
<div >
  <div className="flex gap-2"> 
<div className="w-1 h-5 rounded-full bg-amber-800 mb-2" />
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>
                Additinal Information
              </p>
  </div>
 

<div className="sm:grid sm:grid-cols-1 mb-1 md:grid md:grid-cols-4  gap-2">
{/* Date of Birth */}
<div>
  <label className="text-sm font-semibold text-amber-800 flex">Date of Birth</label>

  {isEditing ? (
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="border border-amber-500/30 text-amber-800 p-2 rounded-lg w-full mt-1"
    />
  ) : (
    <p className="mt-1 border border-amber-500/30  rounded-lg p-2 w-full bg-gray-50 text-amber-800 text-xs">
      {formData.dob
        ? new Date(formData.dob).toLocaleDateString()
        : "Not Provided"}
    </p>
  )}
</div>



<div>
      <label className="text-sm font-semibold text-amber-800">Marital Status</label>
            {isEditing ? (
    <select
     
      onChange={handleChange}
      className="border border-amber-500/30 text-amber-800 p-2 rounded-lg w-full mt-1">

      <option value="">Select </option>
      <option value="Male">Single</option>
      <option value="Female">Married</option>
     
    </select>
  ) : (
    <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.ma || "Not Provided"}</p>
  )}

</div>


<div>
      <label className="text-sm font-semibold text-amber-800">Profession</label>
            {isEditing ? (
    <select
      name="profession}"
      value={formData.profession}
      onChange={handleChange}
      className="border border-amber-500/30 text-amber-800 text-sm p-2 rounded-lg w-full mt-1">

      <option value="">Self Employed</option>
      <option value="Male">Home Maker</option>
      <option value="Female">Govt/PSU Employee</option>
      <option value="Other">Student</option>
      <option value="Other">Salaried</option>
      
    </select>
  ) : (
    <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.profession || "Not Provided"}</p>
  )}

</div>
<div>
      <label className="text-sm font-semibold  text-amber-800 ">Nationality</label>
        {isEditing ? (
    <select
      name=""
      value={formData.nationality}
      onChange={handleChange}
      className="border border-amber-500/30 p-2  text-amber-800 rounded-lg w-full mt-1 ">

      <option value=""> Select Nationality </option>
      <option value="">Resident Indian</option>
      <option value="">Non Resident Indian</option>
     
    </select>
  ) : (
    <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.nationality||"Not Provided"}</p>
  )}

</div>
</div>
</div>

</div>
<div className="flex justify-center gap-4 mt-2 mb-20  text-center">

          {!isEditing ? (
            <div className=" flex  gap-2 mt-4"> 

            
              <button onClick={() => setIsEditing(true)} className=" w-25 md:w-35 font-light  text-xs md:tracking-widest 
              bg-gradient-to-r from-yellow-800 via-yellow-300 to-yellow-700
             text-black rounded-xl flex  gap-1  text-center items-center p-2 md:font-semibold md:text-sm">
              <Edit3 className="text-black" size={14} md:size={15}/>
              Edit Profile
              </button>

           
              <button onClick={() => navigate("/profile")}
                className="  text-xs rounded-xl  p-2 gap-1 flex md:text-center md:justify-center w-25 text-center  md:w-35 bg-white text-black md:text-sm md:font-semibold ">
                  <ArrowLeft className="text-black text-center" size={14} md:size={15}/>
                Back
              </button>
             
            </div>
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
   
  );
}

export default Nominee;
