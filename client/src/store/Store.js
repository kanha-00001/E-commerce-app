import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice/index";
import shopProductSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
  },
});

export default store;
