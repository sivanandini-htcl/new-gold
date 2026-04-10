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
  <div className="w-full  mx-auto  p-3 
  text-accent bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50  justify-center ">
 
 <div className=" flex gap-0.5 text-xs ">
    <ArrowLeft size={16}/>
    Back to profile
 </div>

 <div className=" flex gap-1 mt-2">
    <h2 className="font-bold font-serif text-black ">
        Profile
    </h2>
    <h2 className="font-bold font-serif bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
        Details
    </h2>    
 </div>

 <div className=" flex  ">
<p className="text-xs  uppercase tracking-widest  text-[#7a6a50]" >
              {isEditing ? "Editing Mode · Update your information" : "View & Manage your account details"}
</p>
</div>

 <div className="bg-yellow-700 h-px opacity-40 flex  " />   

<div className="rounded-3xl text-sm shadow-md bg-white mt-5   ">

    <div className=" p-3 flex gap-1 justify-start items-center">
    <div className="w-1 h-5 rounded-full bg-amber-800" />
    <p className="tracking-widest font-medium text-[#7a6a50]  text-xs ">PERSONAL INFORMATION</p>
    </div>
{/* for input feild */}
    <div className="p-3 ">
        <div className="md:grid grid-cols-4 gap-3">
      <div className="grid grid-row-2">
            <label className=" font-medium text-amber-800">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
                className="p-1 border border-amber-500/30 rounded-md  text-amber-800  "
              />
            ) : (
              <p className=" p-1 border border-amber-500/30 rounded-md  text-amber-800 ">{formData.name||"Not provided"}</p>
            )}           
        </div>

        <div className="grid grid-row-2">
            <label className=" font-medium text-amber-800">Middle Name</label>
            {isEditing ? (
              <input 
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="p-1 border border-amber-500/30 rounded-md  text-amber-800 "
              />
            ) : (
              <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">{formData.middleName||"Not provided "}</p>
            )}
       </div>

        <div className="grid grid-row-2">
            <label className="font-medium text-amber-800">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-1 border border-amber-500/30 rounded-md  text-amber-800 "
              />
            ) : (
              <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">{formData.lastName||"Not provided"}</p>
            )}
        </div>
        
        <div className="grid grid-row-2">
            <label className="font-medium text-amber-800">Phone</label>
            {isEditing ? (
              <input
                type="tel"  name="phone"  value={formData.phone}  onChange={handleChange}
                className="p-1 border border-amber-500/30 rounded-md  text-amber-800" />
            ) : (
              <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">{formData.phone||"Not provided"}</p>
            )}
       </div>

       <div className="grid grid-row-2">
            <label className="font-medium text-amber-800">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-1 border border-amber-500/30 rounded-md  text-amber-800"
              />
            ) : (
              <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">{formData.email||"Not provided"}</p>
            )}
        </div>

        <div className="grid grid-row-2">
            <label className="font-medium text-amber-800">Address</label>
            {isEditing ? (
              <input
                type=""
                name=""
                onChange={handleChange}
                className="p-1 border border-amber-500/30 rounded-md  text-amber-800"
              />
            ) : (
              <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">{formData.address||"Not provided"}</p>
            )}
        </div>

        <div className="grid grid-row-2">
            
      <label className="font-medium text-amber-800">Gender</label>
            {isEditing ? (
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="p-1 border border-amber-500/30 rounded-md  text-amber-800">

      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  ) : (
    <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">{formData.gender || "Not Provided"}</p>
  )}

</div>
        </div>
        {/* first input */}

  
 <div className="bg-yellow-700 h-px w-full opacity-40  mt-3 mb-3" />

 <div className=" flex gap-1 justify-start items-center mb-5">
    <div className="w-1 h-5 rounded-full bg-amber-800" />
    <p className="tracking-widest font-medium text-[#7a6a50]  text-xs ">ADDITIONAL INFORMATION</p>
</div>

<div className=" md:grid grid-cols-4 gap-3 mt-2">
<div className="grid grid-row-2">
  <label className="font-medium text-amber-800">Date of Birth</label>
  {isEditing ? (
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="p-1 border border-amber-500/30 rounded-md text-center  text-amber-800"
    />
  ) : (
    <p className="p-1 border border-amber-500/30 rounded-md  text-amber-800">
      {formData.dob
        ? new Date(formData.dob).toLocaleDateString()
        : "Not Provided"}
    </p>
  )}
</div>

<div className="grid grid-row-2 mt-2">
      <label className="font-medium text-amber-800 ">Marital Status</label>
            {isEditing ? (
    <select
     
      onChange={handleChange}
      className="border border-amber-500/30 rounded-md p-1">

      <option value="">Select </option>
      <option value="Male">Single</option>
      <option value="Female">Married</option>
     
    </select>
  ) : (
    <p className="p-2 border border-amber-500/30 rounded-md  text-amber-800">{formData.ma || "Not Provided"}</p>
  )}
</div>

<div className="grid grid-row-2 mt-2">
      <label className="font-medium text-amber-800">Profession</label>
            {isEditing ? (
    <select
      name="profession"
      value={formData.profession}
      onChange={handleChange}
      className="border border-amber-500/30 rounded-md p-1">

      <option value="">Self Employed</option>
      <option value="Male">Home Maker</option>
      <option value="Female">Govt/PSU Employee</option>
      <option value="Other">Student</option>
      <option value="Other">Salaried</option>  
    </select>
  ) : (
    <p className="p-2 border border-amber-500/30 rounded-md  text-amber-800">{formData.profession || "Not Provided"}</p>
  )}
</div>

<div className="grid grid-row-2 mt-2">
      <label className="font-medium text-amber-800 ">Nationality</label>
        {isEditing ? (
    <select
      name=""
      value={formData.nationality}
      onChange={handleChange}
      className="border border-amber-500/30 rounded-md p-1">

      <option value="">Select Nationality </option>
      <option value="">Resident Indian</option>
      <option value="">Non Resident Indian</option>
     
    </select>
  ) : (
    <p className="p-2 border border-amber-500/30 rounded-md  text-amber-800">{formData.nationality||"Not Provided"}</p>
  )}
</div>
</div>

{/* input div */}
    </div>
    
    
    
{/* form div */}
</div>
<div className="flex justify-center gap-4 mt-4 mb-5  text-center">

          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className=" w-25 md:w-35 font-light lg:w-30 lg:h-10  text-xs md:tracking-widest 
              bg-gradient-to-r from-yellow-800 via-yellow-300 to-yellow-700
             text-black rounded-xl gap-0.5  flex  justify-center items-center p-1 md:font-semibold md:text-sm lg:text-sm">
              <Edit3 className="text-black text-lg"  size={14} md:size={15} lg:size={30}/>
              Edit Profile
              </button>

              <button onClick={() => navigate("/profile")}
                className=" w-25 md:w-35 font-light lg:w-30 lg:h-10 md:font-semibold md:text-sm lg:text-sm flex justify-center items-center rounded-lg  text-xs md:tracking-widest border border-black text-center  bg-white text-black   ">
                  <ArrowLeft className="text-black text-center" size={14} md:size={15}/>
                Back
              </button>
            </>
          ) : (
            <>
            <button onClick={handleSave} className=" w-25 md:w-35 font-light lg:w-30 lg:h-10  text-xs md:tracking-widest 
              bg-gradient-to-r from-yellow-800 via-yellow-300 to-yellow-700
             text-black rounded-xl gap-0.5  flex  justify-center items-center p-1 md:font-semibold md:text-sm lg:text-sm">
              <Save className="text-black md:font-mono"/>
              Save</button>
            <button onClick={() => setIsEditing(false)} className=" w-25 md:w-35 font-light lg:w-30 lg:h-10 md:font-semibold md:text-sm lg:text-sm flex justify-center items-center rounded-lg  text-xs md:tracking-widest border border-black text-center  bg-white text-black  ">Cancel</button>
            </>
          )}

</div>

{/* main close */}
  </div>
    
  )}


export default EditProfile;
