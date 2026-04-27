// src/store/useOrderStore.js

import { create } from "zustand";
import api from "../api/axiosInstance";

const useOrderStore = create((set) => ({
  orders: [],
  singleOrder: null,
  orderStatus: null,
  loading: false,
  error: null,

  // =========================
  // GET /orders
  // =========================
  fetchOrders: async () => {
    try {
      set({ loading: true, error: null });

      const res = await api.get("/orders");

      console.log("Orders List:", res.data);

      set({
        orders: res.data?.data?.orders || res.data?.data || [],
        loading: false,
      });
    } catch (err) {
      console.error("Fetch Orders Error:", err);

      set({
        error: "Failed to fetch orders",
        loading: false,
      });
    }
  },

  // =========================
  // GET /orders/:orderId
  // =========================
  fetchOrderById: async (orderId) => {
    try {
      set({ loading: true, error: null });

      const res = await api.get(`/orders/${orderId}`);

      console.log("Single Order:", res.data);

      set({
        singleOrder: res.data?.data || null,
        loading: false,
      });
    } catch (err) {
      console.error("Fetch Single Order Error:", err);

      set({
        error: "Failed to fetch order details",
        loading: false,
      });
    }
  },

  // =========================
  // GET /orders/:orderId/status
  // =========================
  fetchOrderStatus: async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}/status`);

      console.log("Order Status:", res.data);

      set({
        orderStatus: res.data?.data || null,
      });
    } catch (err) {
      console.error("Fetch Order Status Error:", err);
    }
  },

  clearSingleOrder: () =>
    set({
      singleOrder: null,
      orderStatus: null,
    }),
}));

export default useOrderStore;
