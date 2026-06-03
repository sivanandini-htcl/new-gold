// stores/useMpinStore.js

import { create } from 'zustand';
import { setupMPIN, validateMPIN,checkMPINStatus } from '../api/mpinapi';

const useMpinStore = create((set, get) => ({
 
  // STATE
  loading: false,
  mpinCreated: false,
  mpinStatusLoading: false,
  error: '',
  success: '',
  mpinValidation: null,
  mpinData: {
    mpin: '',
    confirmMpin: '',
  },

  // HELPERS
  clearMessages: () =>
    set({
      error: '',
      success: '',
    }),

  setError: (message) =>
    set({
      error: message,
      success: '',
    }),

  setSuccess: (message) =>
    set({
      success: message,
      error: '',
    }),

  // INPUT CHANGE
  handleMPINInputChange: (e) => {
    const { name, value } = e.target;

    // Only digits
    const digitsOnly = value.replace(/[^0-9]/g, '');

    // Max 6 digits
    const limitedValue = digitsOnly.slice(0, 6);

    set((state) => ({
      mpinData: {
        ...state.mpinData,
        [name]: limitedValue,
      },
    }));

    // Validate MPIN
    if (name === 'mpin' && limitedValue.length > 0) {
      const validation = validateMPIN(limitedValue);

      set({
        mpinValidation: validation,
      });
    } else {
      set({
        mpinValidation: null,
      });
    }
  },

  // SINGLE BOX MPIN INPUT

  handleDigitChange: (type, index, value, nextSibling) => {
    const cleanValue = value.replace(/[^0-9]/g, '');

    if (!cleanValue) return;

    const currentValue = get().mpinData[type];

    const updatedValue =
      currentValue.substring(0, index) +
      cleanValue +
      currentValue.substring(index + 1);

    set((state) => ({
      mpinData: {
        ...state.mpinData,
        [type]: updatedValue.slice(0, 6),
      },
    }));

    // Validate main MPIN
    if (type === 'mpin') {
      const validation = validateMPIN(updatedValue);

      set({
        mpinValidation: validation,
      });
    }

    // Move focus
    if (nextSibling) {
      nextSibling.focus();
    }
  },

  handleBackspace: (e, type, index, previousSibling) => {
    if (e.key !== 'Backspace') return;

    const currentValue = get().mpinData[type];

    const updatedValue =
      currentValue.substring(0, index) +
      '' +
      currentValue.substring(index + 1);

    set((state) => ({
      mpinData: {
        ...state.mpinData,
        [type]: updatedValue,
      },
    }));

    // Move previous
    if (!currentValue[index] && previousSibling) {
      previousSibling.focus();
    }
  },

  // SETUP MPIN

  handleSetupMPIN: async (navigate) => {
    const { mpinData } = get();

    set({
      error: '',
      success: '',
    });

    // Empty checks

    if (!mpinData.mpin) {
      set({
        error: 'Please enter MPIN',
      });

      return;
    }

    if (!mpinData.confirmMpin) {
      set({
        error: 'Please confirm MPIN',
      });

      return;
    }

    // Match check

    if (mpinData.mpin !== mpinData.confirmMpin) {
      set({
        error: 'MPIN confirmation does not match',
      });

      return;
    }

    // Validation

    const validation = validateMPIN(mpinData.mpin);

    if (!validation.valid) {
      set({
        error: validation.error,
      });

      return;
    }

    try {
      set({
        loading: true,
      });

      const response = await setupMPIN(
        mpinData.mpin,
        mpinData.confirmMpin
      );
      console.log('MPIN API RESPONSE:', response);
      console.log('MPIN CREATED SUCCESSFULLY');

      if (response.success || response.statusCode === 200) {
        set({
          success: 'MPIN set successfully!',
          mpinCreated:true,
          mpinData: {
            mpin: '',
            confirmMpin: '',
          },
        });

        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to set MPIN';

      set({
        error: errorMessage,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
  
fetchMPINStatus: async () => {
  try {

    set({
      mpinStatusLoading: true,
    });

    const response = await checkMPINStatus();

    console.log("MPIN STATUS RESPONSE:", response);

    set({
      mpinCreated:
        response?.data?.isSetup ||
        response?.data?.created ||
        response?.data?.hasMPIN ||
        response?.success ||
        false,
    });

  } catch (err) {

    console.log("MPIN STATUS ERROR:", err);

    set({
      mpinCreated: false,
    });

  } finally {

    set({
      mpinStatusLoading: false,
    });
  }
},

  // RESET STORE
  resetMpinStore: () =>
  set({
    loading: false,
    mpinCreated: false,
    mpinStatusLoading: false,

    error: '',
    success: '',

    mpinValidation: null,

    mpinData: {
      mpin: '',
      confirmMpin: '',
    },
  }),
}));

export default useMpinStore;