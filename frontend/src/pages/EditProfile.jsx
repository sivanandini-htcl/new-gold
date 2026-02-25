import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

        <h2 className="text-xl font-bold mb-4 text-center">
          Profile Details
        </h2>

<div className="grid grid-cols-3 w-full h-full gap-2 p-3 text-sm font-bold">
              {/* Name */}
<div>
            <label className="text-sm font-semibold">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.name}</p>
            )}
            
</div>

<div>
            <label className="text-sm font-semibold">Middle Name</label>
            {isEditing ? (
              <input 
                type="text"
                name="name"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.middleName||" "}</p>
            )}
</div>

<div>
            <label className="text-sm font-semibold">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.lastName}</p>
            )}
</div>

          {/* Phone */}
<div>
            <label className="text-sm font-semibold">Phone</label>
            {isEditing ? (
              <input
                type="tel"  name="phone"  value={formData.phone}  onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1" />
            ) : (
              <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.phone}</p>
            )}
</div>

          {/* Email */}
<div>
            <label className="text-sm font-semibold">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.email}</p>
            )}
</div>

 <div>
            <label className="text-sm font-semibold">Address</label>
            {isEditing ? (
              <input
                type=""
                name=""
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            ) : (
              <p className="mt-1 border border-gray-300 rounded-md px-3 py-2"></p>
            )}
</div>


<div>
      <label className="text-sm font-semibold">Gender</label>
            {isEditing ? (
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="border p-2 rounded-lg w-full mt-1">

      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  ) : (
    <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.gender || "Not Provided"}</p>
  )}

</div>


<div>
      <label className="text-sm font-semibold">Nationality</label>
        {isEditing ? (
    <select
      name=""
      value={formData.gender}
      onChange={handleChange}
      className="border p-2 rounded-lg w-full mt-1">

      <option value=""> Select Nationality </option>
      <option value="">Resident Indian</option>
      <option value="">Non Resident Indian</option>
     
    </select>
  ) : (
    <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{"Not Provided"}</p>
  )}

</div>

<div>
      <label className="text-sm font-semibold">Marital Status</label>
            {isEditing ? (
    <select
     
      onChange={handleChange}
      className="border p-2 rounded-lg w-full mt-1">

      <option value="">Select </option>
      <option value="Male">Single</option>
      <option value="Female">Married</option>
     
    </select>
  ) : (
    <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.gender || "Not Provided"}</p>
  )}

</div>


<div>
      <label className="text-sm font-semibold">Profession</label>
            {isEditing ? (
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      className="border p-2 rounded-lg w-full mt-1">

      <option value="">Self Employed</option>
      <option value="Male">Home Maker</option>
      <option value="Female">Govt/PSU Employee</option>
      <option value="Other">Student</option>
      <option value="Other">Salaried</option>
      
    </select>
  ) : (
    <p className="mt-1 border border-gray-300 rounded-md px-3 py-2">{formData.gender || "Not Provided"}</p>
  )}

</div>


{/* Date of Birth */}
<div>
  <label className="text-sm font-semibold">Date of Birth</label>

  {isEditing ? (
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="border p-2 rounded-lg w-full mt-1"
    />
  ) : (
    <p className="mt-1 border border-gray-300 rounded-lg p-2 w-full bg-gray-50">
      {formData.dob
        ? new Date(formData.dob).toLocaleDateString()
        : "Not Provided"}
    </p>
  )}
</div>
 </div>
        {/* Buttons */}
<div className="flex justify-center gap-4 mt-6">

          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-accent text-white px-4 py-2 rounded-xl">
                Edit
              </button>

              <button onClick={() => navigate("/profile")}
                className="border px-4 py-2 rounded-xl">
                Back
              </button>
            </>
          ) : (
            <>
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-xl">Save</button>
            <button onClick={() => setIsEditing(false)} className="border px-4 py-2 rounded-xl">Cancel</button>
            </>
          )}

</div>

      </div>
    </div>
  );
}

export default EditProfile;
