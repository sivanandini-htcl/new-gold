import { create } from 'zustand';
import api from '../api/axiosInstance';

const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,

  //  GET CART
  fetchCart: async () => {
    try {
      set({ loading: true });
      const res = await api.get('/cart');
      const cart = res.data?.data?.cart;
      // console.log("add to cart res",cart)
      const items = cart?.items || [];

     const normalized = items.map((item) => {
  // DIGITAL METAL
  if (item.type === 'METAL') {
    return {
      id: item.id,

      // IMPORTANT
      type: item.type,
      metalType: item.metalType,

      name: item.title,
      price: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice,

      weight: item.quantityInGrams,
      purity: '24K',
      image: '',

      isDigital: true,
      addedAt:
        item.addedAt ||
        new Date().toISOString(),
    };
  }

  // PHYSICAL PRODUCT
  return {
    id: item.id,

    // IMPORTANT
    type: item.type,

    name:
      item.name ||
      `Product #${item.productId}`,

    price: item.unitPrice,
    quantity: item.quantity,
    totalPrice: item.totalPrice,

    weight: item.weightInGrams || 0,
    purity: item.purity || '',
    image: item.image || '',

    isDigital: false,
    addedAt:
      item.addedAt ||
      new Date().toISOString(),
  };
});

      set({ cartItems: normalized });
    } catch (err) {
      console.error('Cart fetch error:', err.response?.data || err.message);
    } finally {
      set({ loading: false });
    }
  },

  removeFromCart: async (id) => {
    try {
      console.log('Removing item with id:', id); //  check what id is being sent
      await api.delete(`/cart/items/${id}`, {
        data: { reason: 'User removed from cart' },
      });
      await get().fetchCart();
    } catch (err) {
      console.error('Remove failed:', err.response?.status); // check status code
      console.error('Remove URL:', err.config?.url); // check exact URL called
      console.error('Remove failed:', err.response?.data);
      throw err;
    }
  },

  replaceCartItem: async (oldItemId, newItem) => {
    try {
      await api.delete(`/cart/items/${oldItemId}`, {
        data: { reason: 'User removed from cart' }, // ✅ same fix
      });
      await api.post('/cart/add', newItem);
      await get().fetchCart();
    } catch (err) {
      console.error('Replace failed:', err.response?.data || err.message);
      throw err;
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      await api.patch(`/cart/items/${id}`, { quantity });
      await get().fetchCart();
    } catch (err) {
      console.log(err);
    }
  },

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
