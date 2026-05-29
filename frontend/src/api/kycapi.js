import api from './axiosInstance';

/**
 * =========================
 * CHECK KYC STATUS
 * GET /kyc/status
 * =========================
 */
export const checkKYCStatus = async (entityType = 'CUSTOMER') => {
  try {
    const response = await api.get('/kyc/status', { 
      params: { entityType },
    });
console.log("kyc status",response.data)
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/* GET /kyc/details*/
export const getKYCDetails = async (entityType = 'CUSTOMER') => {
  try {
    const response = await api.get('/kyc/details', {
      params: { entityType },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/* POST /:kycId/verify/pan/otp/send */
export const sendPanOtp = async (panNumber) => {
  console.log('panNumber', panNumber);
  try {
    const response = await api.post('/kyc/verify/pan/otp/send', {
      panNumber: panNumber?.toUpperCase(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);
    console.log('MESSAGE:', error.response?.data?.message);
    throw error.response?.data || error;
  }
};

/* POST /:kycId/verify/pan/otp/verify*/
export const verifyPanOtp = async (sessionId, otp) => {
  try {
    console.log('kycapi page', otp);
    const response = await api.post('kyc/verify/pan/otp/verify', {
      sessionId,
      otp,
    });

    return response.data;
  } catch (error) {
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);
    console.log('MESSAGE:', error.response?.data?.message);
    throw error.response?.data || error;
  }
};

/**
 * =========================
 * SEND AADHAAR OTP
 * POST /kyc/verify/aadhaar/send-otp
 * =========================
 */
export const sendAadhaarOtp = async (aadhaarNumber) => {
  try {
    const response = await api.post('/kyc/verify/aadhaar/init', {
      aadhaar: aadhaarNumber,
    });

    return response.data;
  } catch (error) {
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);
    console.log('MESSAGE:', error.response?.data?.message);
    throw error.response?.data || error;
  }
};

/**
 * =========================
 * VERIFY AADHAAR OTP
 * POST /kyc/verify/aadhaar/verify-otp
 * =========================
 */
export const verifyAadhaarOtp = async (sessionId, otp) => {
  try {
    const response = await api.post('/kyc/verify/aadhaar/otp', {
      sessionId,
      otp,
    });

    return response.data;
  } catch (error) {
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);
    console.log('MESSAGE:', error.response?.data?.message);
    throw error.response?.data || error;
  }
};

/**
 * =========================
 * SUBMIT NEW KYC
 * POST /kyc/submit
 * =========================
 */
export const submitKYC = async (payload) => {
  try {
    const documents = Array.isArray(payload?.documents) ? payload.documents : [];
    const hasFiles = documents.some((file) => file instanceof File);

    if (hasFiles) {
      const fd = new FormData();

      fd.append('entityType', payload?.entityType || 'CUSTOMER');

      if (payload?.panVerificationSessionId) {
        fd.append('panVerificationSessionId', payload.panVerificationSessionId);
      }

      if (payload?.aadhaarVerificationSessionId) {
        fd.append('aadhaarVerificationSessionId', payload.aadhaarVerificationSessionId);
      }

      if (payload?.pan) {
        fd.append('pan', payload.pan.toUpperCase());
      }

      if (payload?.documentCategory) {
        fd.append('documentCategory', payload.documentCategory);
      }

      // Append each file as binary with filename
      documents.forEach((file) => {
        if (file instanceof File) {
          fd.append('documents', file, file.name);
        }
      });

      const response = await api.post('kyc/submit', fd);

      return response.data;
    }

    const response = await api.post('kyc/submit', payload);

    return response.data;
  } catch (error) {
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);
    console.log('MESSAGE:', error.response?.data?.message);
    throw error.response?.data || error;
  }
};

// resume api
/**
 * =========================
 * RESUME KYC
 * GET /kyc/resume
 * =========================
 */

export const resumeKYC = async () => {
  try {
    const response = await api.get('kyc/session/resume');

    return response.data.data;
  } catch (error) {
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);

    throw error.response?.data || error;
  }
};

/**
 * =========================
 * UPDATE KYC
 * PUT /kyc/update
 * =========================
 */
export const updateKYC = async (formData) => {
  try {
    const fd = new FormData();

    fd.append('entityType', 'CUSTOMER');

    if (formData.panNumber) {
      fd.append('pan', formData.panNumber.toUpperCase());
    }

    if (formData.aadhaarNumber) {
      fd.append('aadhaar', formData.aadhaarNumber);
    }

    fd.append('documentCategory', 'identity');

    // PAN FRONT
    if (formData.panFile) {
      fd.append('documents', formData.panFile);
    }

    // AADHAAR FRONT
    if (formData.aadhaarFileFront) {
      fd.append('documents', formData.aadhaarFileFront);
    }

    // AADHAAR BACK
    if (formData.aadhaarFileBack) {
      fd.append('documents', formData.aadhaarFileBack);
    }

    // SELFIE

    const response = await api.put('kyc/update', fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * =========================
 * DELETE KYC
 * DELETE /kyc
 * =========================
 */
export const deleteKYC = async () => {
  try {
    const response = await api.delete('/kyc', {
      params: {
        entityType: 'CUSTOMER',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * =========================
 * VALIDATORS
 * =========================
 */
export const validators = {
  validatePAN: (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    return panRegex.test(pan.toUpperCase());
  },

  validateAadhaar: (aadhaar) => {
    const aadhaarRegex = /^[0-9]{12}$/;

    return aadhaarRegex.test(aadhaar);
  },

  validateFile: (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    const maxSize = 5 * 1024 * 1024;

    return validTypes.includes(file.type) && file.size <= maxSize;
  },

  validateFiles: (files) => {
    if (files.length === 0) {
      return {
        valid: false,
        error: 'At least 1 file required',
      };
    }

    if (files.length > 10) {
      return {
        valid: false,
        error: 'Maximum 10 files allowed',
      };
    }

    for (let file of files) {
      if (!validators.validateFile(file)) {
        return {
          valid: false,
          error: `${file.name}: Invalid type or size (max 5MB)`,
        };
      }
    }

    return { valid: true };
  },
};

/**
 * =========================
 * FEATURE ACCESS
 * =========================
 */
export const featureAccess = {
  NOT_SUBMITTED: {
    dashboard: false,
    wallet: false,
    metals: false,
    orders: false,
    profile: true,
    kyc: true,
  },

  PENDING: {
    dashboard: true,
    wallet: true,
    metals: false,
    orders: false,
    profile: true,
    kyc: true,
  },

  UNDER_REVIEW: {
    dashboard: true,
    wallet: true,
    metals: false,
    orders: false,
    profile: true,
    kyc: true,
  },

  REJECTED: {
    dashboard: false,
    wallet: false,
    metals: false,
    orders: false,
    profile: true,
    kyc: true,
  },

  VERIFIED: {
    dashboard: true,
    wallet: true,
    metals: true,
    orders: true,
    profile: true,
    kyc: true,
  },
};

/**
 * =========================
 * CHECK FEATURE ACCESS
 * =========================
 */
export const canAccessFeature = (featureName, kycStatus) => {
  return featureAccess[kycStatus]?.[featureName] ?? false;
};
