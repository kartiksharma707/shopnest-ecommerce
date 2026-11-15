import { createSlice } from "@reduxjs/toolkit";

// Current logged-in user ki ID nikalna
const getUserId = () => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  const user = JSON.parse(savedUser);

  return user._id || user.id;
};

// User ke cart ki key
const getCartKey = () => {
  const userId = getUserId();

  if (!userId) {
    return null;
  }

  return `cart_${userId}`;
};

// Cart ko localStorage me save karna
const saveCart = (cart) => {
  const cartKey = getCartKey();

  if (cartKey) {
    localStorage.setItem(
      cartKey,
      JSON.stringify(cart)
    );
  }
};

const cartSlice = createSlice({
  name: "cart",

  initialState: [],

  reducers: {

    // Login ke time saved cart Redux me load hoga
    setCart: (state, action) => {
      return action.payload;
    },

    // Product add
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (product) =>
          product._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCart(state);
    },

    // Quantity +
    increaseQuantity: (state, action) => {
      const product = state.find(
        (product) =>
          product._id === action.payload
      );

      if (product) {
        product.quantity += 1;
      }

      saveCart(state);
    },

    // Quantity -
    decreaseQuantity: (state, action) => {
      const product = state.find(
        (product) =>
          product._id === action.payload
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }

      saveCart(state);
    },

    // Product remove
    removeFromCart: (state, action) => {
      const newCart = state.filter(
        (product) =>
          product._id !== action.payload
      );

      saveCart(newCart);

      return newCart;
    },

    // User manually "Clear Cart" kare
    clearCart: () => {
      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.setItem(
          cartKey,
          JSON.stringify([])
        );
      }

      return [];
    },

    // Logout ke time sirf Redux empty karna
    // Saved cart DELETE nahi karna
    clearCurrentCart: () => {
      return [];
    },
  },
});

export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  clearCurrentCart,
} = cartSlice.actions;

export default cartSlice.reducer;