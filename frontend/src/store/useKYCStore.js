// stores/useKycStore.js

import { create } from 'zustand';

import {
  submitKYC,
  verifyPanOtp,
  sendPanOtp,
  sendAadhaarOtp,
  verifyAadhaarOtp,
  resumeKYC,
  checkKYCStatus,
} from '../api/kycapi';

const useKycStore = create((set, get) => ({
 
  // STATE
  currentStep: 1,
  kycStatus: null,
  statusReason:null,
  loading: false,
  click:false,
  initialLoading: true,
  error: '',
  success: '',
  sessionId: '',
  aadhaarSession: '',
  docSessionId: '',

  verified: {
    pan: false,
    aadhaar: false,
  },

  formData: {
    panNumber: '',
    panOtp: '',
    aadhaarNumber: '',
    aadhaarOtp: '',
    panFile: null,
    aadhaarFileFront: null,
    aadhaarFileBack: null,
    selfieFile: null,
  },

  // COMMON HELPERS
  setCurrentStep: (step) => set({ currentStep: step }),

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

  // INPUT HANDLERS

  handleInputChange: (e) => {
    const { name, value } = e.target;

    set((state) => ({
      formData: {
        ...state.formData,
        [name]: value,
      },
      error: '',
      success: '',
    }));
  },

  handleFileChange: (e, field) => {
    const file = e.target.files[0];

    if (!file) return;

    set((state) => ({
      formData: {
        ...state.formData,
        [field]: file,
      },
    }));
  },

 
  // LOAD KYC PROGRESS

  loadKycProgress: async () => {
    try {
      set({ initialLoading: true });

      const data = await resumeKYC();
      const statusResponse = await checkKYCStatus();
      const status = statusResponse?.data?.status;
      const reason=statusResponse?.data?.reason;

      set({
        kycStatus: status,
        statusReason:reason,

        verified: {
          pan: Boolean(data.pan?.verified),
          aadhaar: Boolean(data.aadhaar?.verified),
        },

        formData: {
          ...get().formData,
          panNumber: data.pan?.identifier || '',
          aadhaarNumber: data.aadhaar?.identifier || '',
        },
      });

      // STEP HANDLING

      if (data.currentPhase === 'pan') {
        set({ currentStep: 1 });
      } else if (data.currentPhase === 'aadhaar') {
        set({ currentStep: 2 });
      } else if (data.currentPhase === 'submit') {
        set({ currentStep: 3 });
      }

      // STATUS OVERRIDE

      if (status === 'pending') {
        set({ currentStep: 4 });
      } else if (status === 'rejected') {
        set({ currentStep: 3 });
      } else if (status === 'approved') {
        set({ currentStep: 5 });
      }
    } catch (err) {
      console.log(err);

      set({
        error: err.message || 'Failed to load KYC',
      });
    } finally {
      set({ initialLoading: false });
    }
  },


  // PAN OTP

  handleSendPanOtp: async () => {
    const { formData } = get();

    if (!formData.panNumber) {
      set({ error: 'Enter PAN number' });
      return;
    }

    try {
      set({
        loading: true,
        click:true,
        error: '',
      });

      const response = await sendPanOtp(formData.panNumber);

      if (response.success) {
        set({
          success: 'PAN OTP sent successfully',
          sessionId: response.data?.sessionId,
        });
      }
    } catch (err) {
      set({
        error: err.message || 'Failed to send PAN OTP',
      });
    } finally {
      set({ loading: false });
    }
  },

  handleVerifyPanOtp: async () => {
    const { formData, sessionId } = get();

    if (!formData.panOtp) {
      set({ error: 'Enter PAN OTP' });
      return;
    }

    try {
      set({
        loading: true,
        error: '',
      });

      const response = await verifyPanOtp(
        sessionId,
        formData.panOtp
      );

      if (response.success) {
        set({
          success: 'PAN verified successfully',

          verified: {
            ...get().verified,
            pan: true,
          },

          currentStep: 2,
        });
      }
    } catch (err) {
      set({
        error: err.message || 'PAN verification failed',
      });
    } finally {
      set({ loading: false });
    }
  },


  // AADHAAR OTP

  handleSendAadhaarOtp: async () => {
    const { formData } = get();

    if (!formData.aadhaarNumber) {
      set({ error: 'Enter Aadhaar number' });
      return;
    }

    try {
      set({
        loading: true,
        error: '',
      });

      const response = await sendAadhaarOtp(
        formData.aadhaarNumber
      );

      if (response.success) {
        set({
          success: 'Aadhaar OTP sent successfully',
          aadhaarSession: response.data?.sessionId,
        });
      }
    } catch (err) {
      set({
        error: err.message || 'Failed to send Aadhaar OTP',
      });
    } finally {
      set({ loading: false });
    }
  },

  handleVerifyAadhaarOtp: async () => {
    const { formData, aadhaarSession } = get();

    if (!formData.aadhaarOtp) {
      set({ error: 'Enter Aadhaar OTP' });
      return;
    }

    try {
      set({
        loading: true,
        error: '',
      });

      const response = await verifyAadhaarOtp(
        aadhaarSession,
        formData.aadhaarOtp
      );

      if (response.success) {
        set({
          success: 'Aadhaar verified successfully',
          docSessionId: response.data?.sessionId,

          verified: {
            ...get().verified,
            aadhaar: true,
          },

          currentStep: 3,
        });
      }
    } catch (err) {
      set({
        error: err.message || 'Aadhaar verification failed',
      });
    } finally {
      set({ loading: false });
    }
  },

  // =========================
  // FINAL SUBMIT
  // =========================

  handleFinalSubmit: async () => {
    const {
      formData,
      sessionId,
      aadhaarSession,
      loadKycProgress,
    } = get();

    if (!formData.panFile) {
      set({ error: 'Upload PAN front image' });
      return;
    }

    if (!formData.aadhaarFileFront) {
      set({ error: 'Upload Aadhaar front image' });
      return;
    }

    if (!formData.aadhaarFileBack) {
      set({ error: 'Upload Aadhaar back image' });
      return;
    }

    try {
      set({
        loading: true,
        error: '',
      });

      const documents = [
        formData.panFile,
        formData.aadhaarFileFront,
        formData.aadhaarFileBack,
      ].filter(Boolean);

      const payload = {
        entityType: 'CUSTOMER',
        panVerificationSessionId: sessionId,
        aadhaarVerificationSessionId: aadhaarSession,
        documentCategory: 'identity',
        documents,
      };

      const response = await submitKYC(payload);

      if (response.success) {
        set({
          currentStep: 4,
          success: 'KYC submitted successfully',
        });

        await loadKycProgress();
      }
    } catch (err) {
      console.log(err);

      set({
        error: err.message || 'KYC submission failed',
      });
    } finally {
      set({ loading: false });
    }
  },

  // RESET STORE

  resetKycStore: () =>
    set({
      currentStep: 1,
      kycStatus: null,

      loading: false,
      initialLoading: false,

      error: '',
      success: '',

      sessionId: '',
      aadhaarSession: '',
      docSessionId: '',

      verified: {
        pan: false,
        aadhaar: false,
      },

      formData: {
        panNumber: '',
        panOtp: '',

        aadhaarNumber: '',
        aadhaarOtp: '',

        panFile: null,
        aadhaarFileFront: null,
        aadhaarFileBack: null,
        selfieFile: null,
      },
    }),
}));

export default useKycStore;