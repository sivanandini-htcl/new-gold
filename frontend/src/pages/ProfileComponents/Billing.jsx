import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Optionally import user from context/auth if you have real user data

function Billing() {
  const navigate = useNavigate();

  // Sample initial state – in real app, load from user profile / backend
  const [billingInfo, setBillingInfo] = useState({
    fullName: "Siva",
    phone: "9876543210",
    email: "siva@gmail.com",
    addressLine1: "",
    addressLine2: "",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "",
    gstin: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: save to backend, context, localStorage, or auth provider
    console.log("Billing info saved:", billingInfo);
    toast.success("Billing information updated successfully!");
    navigate("/profile"); 
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-8 text-white">
      <div className="max-w-3xl mx-auto bg-yellow-900/20 border
       border-yellow-500/30 rounded-2xl shadow-xl p-6 md:p-8">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-secondary">Billing Information</h1>
          <button
            onClick={() => navigate("/profile")}
            className="text-slate-300 hover:text-accent flex items-center gap-2">
            ← Back to Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
               Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={billingInfo.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
                text-white focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={billingInfo.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
                 text-white focus:outline-none focus:border-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={billingInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
               text-white focus:outline-none focus:border-accent"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Billing Address
            </label>
            <input
              type="text"
              name="addressLine1"
              placeholder="Flat / House No., Building, Street"
              value={billingInfo.addressLine1}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
               text-white focus:outline-none focus:border-accent"
              required
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Landmark / Area (optional)"
              value={billingInfo.addressLine2}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
               text-white focus:outline-none focus:border-accent"
            />
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={billingInfo.city}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
                 text-white focus:outline-none focus:border-accent"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={billingInfo.state}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
                 text-white focus:outline-none focus:border-accent"
                required />

              <input
                type="text"
                name="pinCode"
                placeholder="PIN Code"
                value={billingInfo.pinCode}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg
                 text-white focus:outline-none focus:border-accent"
                required />

            </div>
          </div>

          {/* Optional GSTIN */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              GSTIN (optional – for business purchases)
            </label>
            <input
              type="text"
              name="gstin"
              placeholder="15-digit GSTIN"
              value={billingInfo.gstin}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border
            border-slate-600 rounded-lg text-white focus:outline-none focus:border-accent"/>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition">
              Cancel
            </button>


            <button
              type="submit"
              className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition">
              Save Billing Information
            </button>
          </div>
        
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">
          This information will be used for invoicing, delivery (if physical redemption), and tax compliance.
        </p>
      </div>
    </div>
  );
}  

export default Billing;