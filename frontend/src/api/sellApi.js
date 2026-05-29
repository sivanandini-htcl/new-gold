import api from './axiosInstance';


export const createSellOrder = async (payload) => {
  try {
    const response = await api.post('/orders/sell', payload);
    console.log('Sell order response:', response.data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: error.message || 'Failed to process sell order',
      }
    );
  }
};



export const getSellOrderHistory = async () => {
  try {
    const response = await api.get('/orders/sell/history');
    return response.data?.data || [];
  } catch (error) {
    console.error('Failed to fetch sell order history:', error);
    return [];
  }
};


export const getSellOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/sell/${orderId}`);
    return response.data?.data || null;
  } catch (error) {
    console.error('Failed to fetch sell order details:', error);
    return null;
  }
};
