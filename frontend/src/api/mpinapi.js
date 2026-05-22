import api from './axiosInstance';
/**
 * CHECK MPIN STATUS
 * GET /security/mpin/status
 */
export const checkMPINStatus = async () => {
  try {
    const response = await api.get('/security/mpin/status');
    console.log("mpin status",response)
    return response.data;
    
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * SETUP MPIN
 * POST /security/mpin/setup
 */
export const setupMPIN = async (mpin, confirmMpin) => {
  try {
    const idempotencyKey = generateIdempotencyKey();

    const payload = {
      mpin,
      confirmMpin,
      idempotencyKey,
      entityType: 'CUSTOMER', // Add entity type as per backend schema
    };

    console.log('MPIN Setup Payload:', payload);
    console.log('Sending to endpoint: /security/mpin/setup');

    const response = await api.post('/security/mpin/setup', payload);

    console.log('MPIN Setup Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('MPIN Setup Full Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        headers: error.config?.headers,
      },
    });
    throw error.response?.data || error;
  }
};

/**

 * GENERATE IDEMPOTENCY KEY
 */
function generateIdempotencyKey() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * VALIDATE MPIN
 */
export const validateMPIN = (mpin) => {
  // Check length
  if ( mpin.length !== 6) {
    return { valid: false, error: 'MPIN must be 6 digits' };
  }

  // Check only digits
  if (!/^\d{6}$/.test(mpin)) {
    return { valid: false, error: 'MPIN must contain only digits (0-9)' };
  }

  // Check weak patterns
  const weakPatterns = [
    /^(\d)\1{3,}$/, // 1111, 2222
    /^(0123|1234|2345|3456|4567|5678|6789)/, // Sequential
    /^(9876|8765|7654|6543|5432|4321|3210)/, // Reverse sequential
  ];

  for (const pattern of weakPatterns) {
    if (pattern.test(mpin)) {
      return {
        valid: false,
        error: 'MPIN is weak. Avoid: 1234, 1111, sequential patterns',
      };
    }
  }

  return { valid: true };
};
