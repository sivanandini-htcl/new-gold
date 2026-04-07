import { create } from "zustand";

const usePriceStore = create((set) => ({
  prices: [],
  status: "Connecting...",

  setPrices: (data) => set({ prices: data }),
  setStatus: (status) => set({ status })
}));

export default usePriceStore;
