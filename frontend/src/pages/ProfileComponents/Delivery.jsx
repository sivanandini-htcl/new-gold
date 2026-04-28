import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Edit3,
  Save,
  MapPin,
  Plus,
  X,
  Trash2,
  CheckCircle,
  Home,
  Briefcase,
  Star,
} from "lucide-react";

import useAddressStore from "../../store/addressStore";

const labelIcons = {
  home: <Home size={14} />,
  work: <Briefcase size={14} />,
  other: <MapPin size={14} />,
};

const emptyForm = {
  label: "",
  fullName: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

function AddressFormModal({ onClose, onSave, loading, initial = null }) {
  const [formData, setFormData] = useState(initial || emptyForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  const fields = [
    { name: "fullName", label: "Full Name", colSpan: 2 },
    { name: "phoneNumber", label: "Phone Number", colSpan: 1 },
    { name: "label", label: "Label (e.g. Home, Work)", colSpan: 1 },
    { name: "addressLine1", label: "Address Line 1", colSpan: 2 },
    { name: "addressLine2", label: "Address Line 2 (optional)", colSpan: 2 },
    { name: "city", label: "City", colSpan: 1 },
    { name: "state", label: "State", colSpan: 1 },
    { name: "pincode", label: "Pincode", colSpan: 1 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-amber-500" />
            <span className="font-semibold text-gray-800 text-sm">
              {initial ? "Edit Address" : "Add New Address"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {fields.map(({ name, label, colSpan }) => (
              <div
                key={name}
                className={colSpan === 2 ? "col-span-2" : "col-span-1"}
              >
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {label}
                </label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
                  placeholder={label}
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">
              Set as default address?
            </p>
            <div className="flex gap-5">
              {[
                { value: true, display: "Yes" },
                { value: false, display: "No" },
              ].map(({ value, display }) => (
                <label
                  key={display}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="isDefault"
                    checked={formData.isDefault === value}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, isDefault: value }))
                    }
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
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              <Save size={15} />
              {loading ? "Saving..." : "Save Address"}
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
}

function AddressCard({ address, onEdit, onDelete, onSetDefault, loading }) {
  const icon = labelIcons[address.label?.toLowerCase()] || (
    <MapPin size={14} />
  );

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all ${
        address.isDefault ? "border-amber-400" : "border-gray-100"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {address.isDefault && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-amber-500 text-xs font-semibold bg-amber-50 px-2 py-1 rounded-full">
          <Star size={11} fill="currentColor" />
          Default
        </div>
      )}

      <div className="p-5">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3 capitalize">
          {icon}
          {address.label || "Address"}
        </div>

        <p className="font-semibold text-gray-800 text-sm">{address.fullName}</p>
        <p className="text-xs text-gray-500 mt-0.5">{address.phoneNumber}</p>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {[
            address.addressLine1,
            address.addressLine2,
            address.city,
            address.state,
            address.pincode,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(address)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit3 size={13} />
            Edit
          </button>

          <button
            onClick={() => onDelete(address.id)} // ✅ FIXED: was address._id
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>

          {!address.isDefault && (
            <button
              onClick={() => onSetDefault(address.id)} // ✅ FIXED: was address._id
              disabled={loading}
              className="ml-auto flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-800 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <CheckCircle size={13} />
              Set Default
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Delivery() {
  const navigate = useNavigate();

  const {
    addAddress,
    fetchAddresses,
    updateAddress,
    setDefaultAddress,
    setDeleteAddress,
    addresses,
    loading,
  } = useAddressStore();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAdd = async (formData) => {
    const result = await addAddress(formData);
    if (result.success) {
      toast.success(result.message);
      setShowForm(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleEdit = async (formData) => {
    const result = await updateAddress(editingAddress.id, formData); // ✅ FIXED: was editingAddress._id
    if (result.success) {
      toast.success(result.message);
      setEditingAddress(null);
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await setDeleteAddress(id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleSetDefault = async (id) => {
    const result = await setDefaultAddress(id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-amber-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Delivery Addresses
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {addresses?.length || 0} saved address
              {addresses?.length !== 1 ? "es" : ""}
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            <Plus size={16} />
            Add Address
          </button>
        </div>

        {loading && addresses.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Loading addresses...
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-16">
            <MapPin size={36} className="mx-auto text-amber-300 mb-3" />
            <p className="text-gray-500 text-sm">No addresses saved yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-amber-600 text-sm font-medium hover:underline"
            >
              + Add your first address
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id} // ✅ FIXED: was address._id
                address={address}
                loading={loading}
                onEdit={(a) => setEditingAddress(a)}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <AddressFormModal
          onClose={() => setShowForm(false)}
          onSave={handleAdd}
          loading={loading}
        />
      )}

      {editingAddress && (
        <AddressFormModal
          initial={editingAddress}
          onClose={() => setEditingAddress(null)}
          onSave={handleEdit}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Delivery;