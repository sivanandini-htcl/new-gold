// src/store/usePortfolioStore.js

import { create } from "zustand";
import api from "../api/axiosInstance";

const usePortfolioStore = create((set) => ({
  holdings: null,
  loading: false,
 error: null,

  fetchHoldings: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      console.log("FETCH HOLDINGS START");

      const res = await api.get("/holdings");

      console.log("FULL API RESPONSE:", res);
      console.log("RESPONSE DATA:", res.data);
      console.log("DATA:", res.data?.data);
      console.log("HOLDINGS:", res.data?.data?.holdings);

      // IMPORTANT
      // Change this according to backend response

      set({
        holdings:
          res.data?.data?.holdings ||
          res.data?.holdings ||
          res.data?.data ||
          null,

        loading: false,
      });

      console.log("STORE UPDATED");
    } catch (err) {
      console.log("PORTFOLIO ERROR:", err);
      console.log("ERROR RESPONSE:", err.response);
      console.log("ERROR DATA:", err.response?.data);

      set({
        error:
          err.response?.data?.message ||
          "Failed to fetch holdings",

        loading: false,
      });
    }
  },
}));

export default usePortfolioStore;