// store/addressStore.js

import { create } from "zustand";
import api from "../api/axiosInstance";

const useAddressStore = create((set) => ({
  addresses: [],
  loading: false,
  error: null,


fetchAddresses: async () => {
  try {
    set({ loading: true });

    const res = await api.get("/delivery/addresses");

    console.log("FETCH SUCCESS:", res.data);

    set({
      addresses: res.data?.data?.addresses || [], //  FIX HERE
      loading: false,
    });
  } catch (error) {
    set({ loading: false });
    console.error(error);
  }
},



  addAddress: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/delivery/addresses", payload);

      console.log("POST SUCCESS:", res.data);
console.log("calling get");
      // Refresh address list after save
      await useAddressStore.getState().fetchAddresses();
console.log("called get");


      return {
        success: true,
        message:
          res.data?.message || "Address added successfully",
      };
    } catch (err) {
      console.error("ADD ADDRESS ERROR:", err);
      console.log("ERROR RESPONSE:", err.response);
      console.log("ERROR DATA:", err.response?.data);

      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to add address",
      };
    } finally {
      set({ loading: false });
    }
  },

  // ========================
 
  updateAddress: async (addressId, payload) => {
    try {
      set({ loading: true, error: null });

      const res = await api.patch(
        `/delivery/addresses/${addressId}`,
        payload
      );

      await useAddressStore.getState().fetchAddresses();

      return {
        success: true,
        message:
          res.data?.message || "Address updated successfully",
      };
    } catch (err) {
      console.error("Update Address Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to update address",
      };
    } finally {
      set({ loading: false });
    }
  },

  setDefaultAddress: async (addressId) => {
    try {
      set({ loading: true, error: null });

      const res = await api.patch(
        `/delivery/addresses/${addressId}/default`
      );

      await useAddressStore.getState().fetchAddresses();

      return {
        success: true,
        message:
          res.data?.message || "Default address updated",
      };
    } catch (err) {
      console.error("Default Address Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to set default address",
      };
    } finally {
      set({ loading: false });
    }
  },

  setDeleteAddress: async (addressId) => {
  try {
    set({ loading: true, error: null });

    const res = await api.delete(`/delivery/addresses/${addressId}`);

    await useAddressStore.getState().fetchAddresses();

    return {
      success: true,
      message: "Address deleted successfully",
    };
  } catch (err) {
    console.log("Delete Address Error:", err);
    console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);
  console.log("MESSAGE:", err.response?.data?.message);

    return {
      success: false,
      message:
        err.response?.data?.message || "Failed to delete address",
    };
  } finally {
    set({ loading: false });
  }
},

}));

export default useAddressStore;
