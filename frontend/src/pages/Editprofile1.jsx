// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { ArrowLeft, Edit3, Save, X } from "lucide-react";

// function EditProfile() {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     address: "",
//     gender: "",
//     nationality: "",
//     maritalStatus: "",
//     profession: "",
//     dob: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("Saved Data:", formData);
//     toast.success("Profile Updated Successfully!");
//     setIsEditing(false);
//   };

//   // Shared styles
//   const inputStyle = {
//     background: "#fafaf8",
//     border: "1.5px solid #e8d5a3",
//     color: "#1a1000",
//     fontFamily: "Jost, sans-serif",
//     fontSize: "0.8rem",
//     borderRadius: "0.75rem",
//     padding: "0.625rem 0.875rem",
//     width: "100%",
//     outline: "none",
//     transition: "border-color 0.2s",
//   };

//   const viewStyle = {
//     background: "#fafaf8",
//     border: "1.5px solid #f0e8d0",
//     color: "#534328",
//     fontFamily: "Jost, sans-serif",
//     fontSize: "0.8rem",
//     borderRadius: "0.75rem",
//     padding: "0.625rem 0.875rem",
//     width: "100%",
//     minHeight: "38px",
//   };

//   const fields = [
//     { label: "First Name", name: "firstName", type: "text", placeholder: "First name" },
//     { label: "Middle Name", name: "middleName", type: "text", placeholder: "Middle name" },
//     { label: "Last Name", name: "lastName", type: "text", placeholder: "Last name" },
//     { label: "Phone", name: "phone", type: "tel", placeholder: "10-digit number" },
//     { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
//     { label: "Address", name: "address", type: "text", placeholder: "Full address" },
//     { label: "Date of Birth", name: "dob", type: "date", placeholder: "" },
//   ];

//   const selects = [
//     {
//       label: "Gender",
//       name: "gender",
//       options: ["Select Gender", "Male", "Female", "Other"],
//     },
//     {
//       label: "Nationality",
//       name: "nationality",
//       options: ["Select Nationality", "Resident Indian", "Non Resident Indian"],
//     },
//     {
//       label: "Marital Status",
//       name: "maritalStatus",
//       options: ["Select Status", "Single", "Married"],
//     },
//     {
//       label: "Profession",
//       name: "profession",
//       options: ["Select Profession", "Self Employed", "Home Maker", "Govt/PSU Employee", "Student", "Salaried"],
//     },
//   ];

//   const displayValue = (val, fallback = "Not provided") =>
//     val ? val : fallback;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');
//         .edit-root { font-family: 'Jost', sans-serif; }
//         .heading-font { font-family: 'Cormorant Garamond', serif; }
//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }
//         .gold-shimmer-text {
//           background: linear-gradient(90deg, #b8860b 0%, #d4a017 20%, #f5d06e 40%, #e8c547 50%, #f5d06e 60%, #d4a017 80%, #b8860b 100%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmer 4s linear infinite;
//         }
//         .field-focus:focus {
//           border-color: #c8a84b !important;
//           box-shadow: 0 0 0 3px rgba(200,168,75,0.12);
//         }
//         .divider-gold {
//           background: linear-gradient(90deg, transparent, #c8a84b, #b0b0b0, #c8a84b, transparent);
//         }
//         select option { background: #fff; color: #1a1000; }
//       `}</style>

//       <div
//         className="edit-root min-h-screen py-8 px-4 sm:px-6 lg:px-10"
//         style={{ background: "linear-gradient(135deg, #f7f3eb 0%, #f0ece0 50%, #ede8da 100%)" }}
//       >
//         <div className="max-w-4xl mx-auto">

//           {/* ── Back Button ── */}
//           <button
//             onClick={() => navigate("/profile")}
//             className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest transition"
//             style={{ color: "#7a6a50", fontFamily: "Jost, sans-serif", background: "none", border: "none", cursor: "pointer" }}
//             onMouseEnter={e => e.currentTarget.style.color = "#c8a84b"}
//             onMouseLeave={e => e.currentTarget.style.color = "#7a6a50"}
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Profile
//           </button>

//           {/* ── Page Title ── */}
//           <div className="mb-8" style={{ borderBottom: "1px solid rgba(200,168,75,0.25)", paddingBottom: "1.25rem" }}>
//             <div className="divider-gold h-0.5 w-12 rounded-full mb-3" />
//             <h1 className="heading-font text-5xl font-bold" style={{ color: "#2a1f0e" }}>
//               Profile <span className="gold-shimmer-text">Details</span>
//             </h1>
//             <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: "#a09070" }}>
//               {isEditing ? "Editing Mode · Update your information" : "View & Manage your account details"}
//             </p>
//           </div>

//           {/* ── Form Card ── */}
//           <div
//             className="rounded-3xl p-6 sm:p-8 shadow-md mb-6"
//             style={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(200,168,75,0.25)" }}
//           >
//             {/* Section: Personal Info */}
//             <div className="flex items-center gap-2 mb-5">
//               <div className="w-1 h-5 rounded-full" style={{ backgroundColor: "#c8a84b" }} />
//               <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>
//                 Personal Information
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
//               {fields.map((field) => (
//                 <div key={field.name}>
//                   <label
//                     className="block text-xs uppercase tracking-widest mb-1.5 font-medium"
//                     style={{ color: "#7a6a50", fontFamily: "Jost, sans-serif" }}
//                   >
//                     {field.label}
//                   </label>
//                   {isEditing ? (
//                     <input
//                       type={field.type}
//                       name={field.name}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       placeholder={field.placeholder}
//                       className="field-focus"
//                       style={inputStyle}
//                     />
//                   ) : (
//                     <div style={viewStyle}>
//                       {field.name === "dob" && formData.dob
//                         ? new Date(formData.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
//                         : displayValue(formData[field.name])}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Divider */}
//             <div className="divider-gold h-px w-full opacity-40 mb-6" />

//             {/* Section: Additional Info */}
//             <div className="flex items-center gap-2 mb-5">
//               <div className="w-1 h-5 rounded-full" style={{ backgroundColor: "#a0a0a0" }} />
//               <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>
//                 Additional Information
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//               {selects.map((sel) => (
//                 <div key={sel.name}>
//                   <label
//                     className="block text-xs uppercase tracking-widest mb-1.5 font-medium"
//                     style={{ color: "#7a6a50", fontFamily: "Jost, sans-serif" }}
//                   >
//                     {sel.label}
//                   </label>
//                   {isEditing ? (
//                     <select
//                       name={sel.name}
//                       value={formData[sel.name]}
//                       onChange={handleChange}
//                       className="field-focus"
//                       style={inputStyle}
//                     >
//                       {sel.options.map((opt, i) => (
//                         <option key={i} value={i === 0 ? "" : opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <div style={viewStyle}>
//                       {displayValue(formData[sel.name])}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── Action Buttons ── */}
//           <div className="flex flex-wrap justify-center gap-3">
//             {!isEditing ? (
//               <>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90"
//                   style={{
//                     background: "linear-gradient(135deg, #c8a84b 0%, #e8c86a 40%, #d4a932 70%, #b8860b 100%)",
//                     color: "#1a1000",
//                     boxShadow: "0 4px 20px rgba(200,168,75,0.35)",
//                   }}
//                 >
//                   <Edit3 className="w-4 h-4" />
//                   Edit Profile
//                 </button>

//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-80 bg-white"
//                   style={{ border: "1.5px solid #e8d5a3", color: "#7a6a50" }}
//                 >
//                   <ArrowLeft className="w-4 h-4" />
//                   Back
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90"
//                   style={{
//                     background: "linear-gradient(135deg, #5a8a5a, #7ab07a)",
//                     color: "#fff",
//                     boxShadow: "0 4px 16px rgba(90,138,90,0.3)",
//                   }}
//                 >
//                   <Save className="w-4 h-4" />
//                   Save Changes
//                 </button>

//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-80 bg-white"
//                   style={{ border: "1.5px solid #e8d5a3", color: "#7a6a50" }}
//                 >
//                   <X className="w-4 h-4" />
//                   Cancel
//                 </button>
//               </>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default EditProfile;