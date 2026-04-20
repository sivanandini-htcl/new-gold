// src/store/cartStore.js
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (item) => {
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, quantity: item.quantity || 1 }],
      };
    });
  },

  replaceCartItem: (newItem) => {
    set({ cartItems: [{ ...newItem, quantity: newItem.quantity || 1 }] });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, newQuantity) => {
    if (newQuantity < 1) {
      get().removeFromCart(id);
      return;
    }
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    }));
  },

  // Computed values
  get totalItems() {
    return get().cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  },

  get totalAmount() {
    return get().cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
  },
}));

export default useCartStore;