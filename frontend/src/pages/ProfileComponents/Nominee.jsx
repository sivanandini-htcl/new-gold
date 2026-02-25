import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Nominee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineePhone: "",
    address: "",
    relation: "",
    DOB: "",
    panNumber: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nomineeId, setNomineeId] = useState(null); 


  // useEffect(() => {
  //   const fetchNominee = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/nominee");

  //       if (res.data) {
  //         setFormData(res.data);
  //         setNomineeId(res.data._id); 
  //       }
  //     } catch (error) {

 
  //     if (error.response?.status === 404) {
  //       // First time user (no nominee found)
  //       console.log("No nominee found. First time user.");
  //     } else {
  //       // Other server errors
  //       toast.error("Something went wrong while fetching nominee");
  //       console.error(error);
  //     }
  //   }
  // };

  //   fetchNominee();
  // }, []);

  
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
    <div className="min-h-screen bg-gray-100 text-black w-full">
      <h1 className="text-center text-accent font-bold text-2xl m-4">
        Nominee Details
      </h1>

      <div className="grid grid-cols-3 w-full gap-4 p-4">

        {/* Name */}
        <div>
          <label>Name:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full"
              type="text"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
            />
          ) : (
            <p className="border p-2">{formData.nomineeName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label>Phone:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full"
              type="number"
              name="nomineePhone"
              value={formData.nomineePhone}
              onChange={handleChange}
            />
          ) : (
            <p className="border p-2">{formData.nomineePhone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label>Address:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          ) : (
            <p className="border p-2">{formData.address}</p>
          )}
        </div>

        {/* Relation */}
        <div>
          <label>Relation:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full"
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
            />
          ) : (
            <p className="border p-2">{formData.relation}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label>DOB:</label>
          {isEditing ? (
            <input
              className="border border-black p-2 w-full"
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
            />
          ) : (
            <p className="border p-2">{formData.DOB}</p>
          )}
        </div>

        {/* PAN */}
        <div>
          <label>PAN Number:</label>
          {isEditing ? (
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              className="border border-black p-2 w-full uppercase"
              maxLength={10}
            />
          ) : (
            <p className="border p-2 uppercase">{formData.panNumber}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Edit
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="border px-4 py-2 rounded-xl" >
              Back
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="border px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Nominee;
