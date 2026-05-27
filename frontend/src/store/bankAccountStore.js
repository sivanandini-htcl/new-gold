import { create } from "zustand";
import api from "../api/axiosInstance";

const useBankAccountStore = create((set) => ({
  bankAccounts: [],
  loading: false,
  error: null,

  // ADD ACCOUNT
  addBankAccount: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const payload = {
        accountHolderName: data.accountHolderName,
        accountNumber: data.accountNumber,
        confirmAccountNumber:
        data.confirmAccountNumber,
        ifscCode: data.ifscCode,
        bankName: data.bankName,
        isDefault: data.isDefault,
      };

      console.log("ADD PAYLOAD:", payload);

      const res = await api.post( "/wallet/accounts/add",payload);

      console.log("ADD RESPONSE:", res);
      console.log("ADD RESPONSE DATA:", res.data);

      set((state) => ({
        bankAccounts: [
          ...state.bankAccounts,
          res.data.data,
        ],
        loading: false,
      }));

      return {
        success: true,
        data: res.data,
      };

    } catch (error) {

      console.log("ADD ERROR:", error);
      console.log("ADD ERROR RESPONSE:",error?.response);

      console.log(
        "ADD ERROR DATA:",
        error?.response?.data
      );

      set({ loading: false,
        error:
          error?.response?.data?.message ||
          "Failed to add bank account",
      });

      return {
        success: false,
      };
    }
  },

  // GET ACCOUNTS
  getBankAccounts: async () => {
    try {

      set({
        loading: true,
      });

      const res = await api.get(  "/wallet/accounts");

      console.log("GET RESPONSE:", res);
      console.log("GET RESPONSE DATA:",  res.data);
      console.log( "GET ACCOUNTS:", res.data?.data.accounts);

      set({ bankAccounts: Array.isArray(
          res.data?.data.accounts
        )
          ? res.data.data.accounts
          : [],
        loading: false,
      });

    } catch (error) {

      console.log("GET ERROR:", error);
      console.log("GET ERROR RESPONSE:",error?.response);
      console.log( "GET ERROR DATA:",error?.response?.data);
      set({  loading: false,});
    }
  },
  
  verifyBankAccount: async (accountId) => {

  try {

    const res = await api.post(
      `/wallet/accounts/${accountId}/verify`
    );

    console.log(  "VERIFY RESPONSE:",  res.data);
    return {
      success: true,
    };

  } catch (error) {
    console.log( "VERIFY ERROR:", error );
    return {
      success: false,
    };
  }
},

  // DELETE ACCOUNT
  deleteBankAccount: async (accountId) => {
    try {

      set({ loading: true,});
      console.log("DELETE ACCOUNT ID:", accountId);
      
      const res = await api.delete( `/wallet/accounts/${accountId}`);
      console.log( "DELETE RESPONSE:", res);
      console.log("DELETE RESPONSE DATA:", res.data);
      

      set((state) => ({ bankAccounts:state.bankAccounts.filter( (item) =>
              item.id !== accountId
          ),
        loading: false,
      }));

      return {
        success: true,
      };

    } catch (error) {

      console.log("DELETE ERROR:", error);
      console.log("DELETE ERROR RESPONSE:", error?.response  );
      console.log( "DELETE ERROR DATA:",error?.response?.data);

      set({ loading: false,error: error?.response?.data?.message ||"Failed to delete account",});

      return {
        success: false,
      };
    }
  },
}));

export default useBankAccountStore;