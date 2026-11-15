import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = JSON.parse(
  localStorage.getItem("wishlist")
) || [];

const wishlistSlice = createSlice({

  name: "wishlist",

  initialState: savedWishlist,

  reducers: {

    addToWishlist: (state, action) => {

      const alreadyExists = state.find(
        (product) => product._id === action.payload._id
      );

      if (!alreadyExists) {
        state.push(action.payload);

        localStorage.setItem(
          "wishlist",
          JSON.stringify(state)
        );
      }
    },

    removeFromWishlist: (state, action) => {

      const updatedWishlist = state.filter(
        (product) => product._id !== action.payload
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    },

    clearWishlist: () => {

      localStorage.removeItem("wishlist");

      return [];
    },

  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;