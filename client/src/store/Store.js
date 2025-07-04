import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice/index";
import shopProductSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice/index";
import shopOrderSlice from "./shop/order-slice";
import adminOrderReducer from "./admin/order-slice";
import shopSearchSlice from "./shop/search-slice/index";
import shopReviewSlice from "./shop/review-slice/index";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    adminOrder: adminOrderReducer,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
