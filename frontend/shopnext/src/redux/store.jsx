import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
});

export default store;
