import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    // isInWishlist: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSucces: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    // toWishlist: (state, action) => {
    //   state.isInWishlist = action.payload; // Set isInWishlist based on the payload
    // },
    toWishlist: (state, action) => {
      const { item, isInWishlist } = action.payload;

      // Check if the item is already in the wishlist
      const itemIndex = state.currentUser.wishlist.indexOf(item);

      if (isInWishlist && itemIndex === -1) {
        // Add the item to the wishlist if it's not already there
        state.currentUser.wishlist.push(item);
      } else if (!isInWishlist && itemIndex !== -1) {
        // Remove the item from the wishlist if it's there and addToWishlist is false
        state.currentUser.wishlist.splice(itemIndex, 1);
      }
    },
  },
});

export const { loginStart, loginSucces, loginFailure, logout, toWishlist } =
  userSlice.actions;
export default userSlice.reducer;
