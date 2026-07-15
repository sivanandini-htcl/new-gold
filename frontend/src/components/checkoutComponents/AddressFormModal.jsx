import { useState } from "react";
import { MapPin } from "lucide-react";
import {useForm} from "react-hook-form"


function AddressFormModal({ onClose, onSave, loading }) {
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
  
 const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm({
  defaultValues: emptyForm,
});

 
const fields = [
  {
    name: "fullName",
    label: "Full Name",
    colSpan: 2,
    rules: {
      required: "Full Name is required",
    },
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    colSpan: 1,
    rules: {
      required: "Phone is required",
      pattern: {
        value: /^[6-9]\d{9}$/,
        message: "Enter a valid phone number",
      },
    },
  },
  {
    name: "label",
    label: "Label",
    colSpan: 1,
    rules: {
      required: "Label is required",
    },
  },
  {
    name: "addressLine1",
    label: "Address Line 1",
    colSpan: 2,
    rules: {
      required: "Address Line 1 is required",
    },
  },
  {
    name: "addressLine2",
    label: "Address Line 2",
    colSpan: 2,
    rules: {},
  },
  {
    name: "city",
    label: "City",
    colSpan: 1,
    rules: {
      required: "City is required",
    },
  },
  {
    name: "state",
    label: "State",
    colSpan: 1,
    rules: {
      required: "State is required",
    },
  },
  {
    name: "pincode",
    label: "Pincode",
    colSpan: 1,
    rules: {
      required: "Pincode is required",
      pattern: {
        value: /^[1-9][0-9]{5}$/,
        message: "Enter a valid pincode",
      },
    },
  },
];
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log
  //   await onSave(formData);
  // };

 const onSubmit = async (data) => {
  data.isDefault = data.isDefault === "true";
  console.log(data);
  await onSave(data);
};


  return (
    <div className="fixed inset-0 z-50  flex  justify-center items-center  bg-black/90  pb-9">
      <div className="bg-[#111112] m-2 border  border-white/20  w-full h-fit max-w-2xl rounded-2xl  ">
      <div className="flex items-center justify-between px-6 py-3 border-b border-primary/40 text-primary/50">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span className="font-semibold text-primary/70 text-sm 2xl:text-2xl">Add New Address</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            ✕
          </button>
        </div>
        
<form onSubmit={handleSubmit(onSubmit)} className="p-2 rounded-2xl ">
  <div className="grid grid-cols-2 gap-3">
           {fields.map(({ name, label, colSpan, rules }) => (
  <div
    key={name}
    className={colSpan === 2 ? "col-span-2" : "col-span-1"}
  >
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>

    <input
      placeholder={label}
      {...register(name, rules)}
      className="w-full border border-white/20 rounded-lg px-3 py-1 text-sm  focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition1"
    />

    {errors[name] && (
      <p className="text-red-600/80 text-xs h-2 pt-1 pb-1 xl:pt-2 xl:pb-2 ">
        {errors[name].message}
      </p>
    )}

  </div>
))}
             <div>
  <p className="text-xs font-medium text-gray-500 mb-2">
    Set as default address?
  </p>

  <div className="flex gap-5 mt-3">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="true"
        {...register("isDefault")}
        className="accent-amber-500"
      />
      Yes
    </label>

    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="false"
        {...register("isDefault")}
        className="accent-amber-500"
      />
      No
    </label>
  </div>
</div>
          
          </div>
<div className="flex gap-3 pt-3  md:pt-3 lg:pt-4 xl:pt-10">
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