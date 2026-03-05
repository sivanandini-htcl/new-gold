import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";

function EditProfile() {
  const navigate = useNavigate();


  const [isEditing,setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  profession: "",
  dob: "",
});

// const handleSave = async () => {
//   try {
//     await axios.put("/api/profile", formData);
//     alert("Profile Updated Successfully!");
//     setIsEditing(false);
//   } catch (error) {
//     console.error(error);
//   }
// };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {

    // backend updation
    console.log("Saved Data:", formData);
    toast.success("Profile Updated Successfully!");
    setIsEditing(false);

  };

  return (
    <div className="min-h-screen text-accent bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 flex justify-center mt-4">
    <div className="w-full h-full mt-6"> 
       
      <div className=" flex flex-col ">
 <div className="flex  justify-start ml-4  mb-1 gap-1 md:ml-60  ">
  <h2 className="text-2xl font-bold font-serif text-black">
          Profile
        </h2>
        <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
        Details
        </h2> 
    </div>
    <div className=" flex  justify-start">
<p className=" text-xs uppercase tracking-widest text-center ml-4 md:ml-60" style={{ color: "#a09070" }}>
              {isEditing ? "Editing Mode · Update your information" : "View & Manage your account details"}
            </p>
    </div>
    
 <div className="bg-yellow-700 h-px md:w-210 ml-4 opacity-40 mb-6 flex  md:ml-60 " />
     
   </div>
  
 

<div className="rounded-3xl m-10 p-6 sm:p-8 shadow-md  bg-white md:m-60 md:mt-5 mb-0 md:mb-4  ">
            {/* Section: Personal Info */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 rounded-full bg-amber-800" />
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>
                Personal Information
              </p>
            </div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 bg-white ">
              {/* Name */}
<div>
            <label className="text-sm font-semibold text-amber-800">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.name||"Not provided"}</p>
            )}
            
</div>

<div>
            <label className="text-sm font-semibold text-amber-800">Middle Name</label>
            {isEditing ? (
              <input 
                type="text"
                name="name"
                onChange={handleChange}
                className="border border-amber-500/30  p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30   rounded-md px-3 py-2 text-amber-800 text-xs">{formData.middleName||"Not provided "}</p>
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
</div>

          {/* Phone */}
<div>
            <label className="text-sm font-semibold text-amber-800">Phone</label>
            {isEditing ? (
              <input
                type="tel"  name="phone"  value={formData.phone}  onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1" />
            ) : (
              <p className="mt-1 border border-amber-500/30 rounded-md px-3 py-2 text-amber-800 text-xs">{formData.phone||"Not provided"}</p>
            )}
</div>

          {/* Email */}
<div>
            <label className="text-sm font-semibold text-amber-800">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.email||"Not provided"}</p>
            )}
</div>

 <div>
            <label className="text-sm font-semibold text-amber-800">Address</label>
            {isEditing ? (
              <input
                type=""
                name=""
                onChange={handleChange}
                className="border border-amber-500/30 p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-amber-500/30  rounded-md px-3 py-2 text-amber-800 text-xs">{formData.address||"Not provided"}</p>
            )}
</div>


<div>
      <label className="text-sm font-semibold text-amber-800">Gender</label>
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
 

<div className="mb-1 md:grid grid-cols-4 gap-2">
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

      <option value="">Select Nationality </option>
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
        {/* Buttons */}


      </div>

  );
}

export default EditProfile;
