import { useState } from "react";
import { MapPin } from "lucide-react";
const emptyForm = {
  label: '',
  fullName: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  isDefault: false,
};
function AddressFormModal({ onClose, onSave, loading }) {
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', colSpan: 2 },
    { name: 'phoneNumber', label: 'Phone Number', colSpan: 1 },
    { name: 'label', label: 'Label (e.g. Home, Work)', colSpan: 1 },
    { name: 'addressLine1', label: 'Address Line 1', colSpan: 2 },
    { name: 'addressLine2', label: 'Address Line 2 (optional)', colSpan: 2 },
    { name: 'city', label: 'City', colSpan: 1 },
    { name: 'state', label: 'State', colSpan: 1 },
    { name: 'pincode', label: 'Pincode', colSpan: 1 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-[#111112] border border-white/20  w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-primary/40 text-primary/50">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span className="font-semibold text-primary/70 text-sm 2xl:text-2xl">Add New Address</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {fields.map(({ name, label, colSpan }) => (
              <div key={name} className={colSpan === 2 ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-white/70 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
                  placeholder={label}
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Set as default address?</p>
            <div className="flex gap-5">
              {[{ value: true, display: 'Yes' }, { value: false, display: 'No' }].map(({ value, display }) => (
                <label key={display} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isDefault"
                    checked={formData.isDefault === value}
                    onChange={() => setFormData((prev) => ({ ...prev, isDefault: value }))}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{display}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-background font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save Address'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

} export default AddressFormModal;