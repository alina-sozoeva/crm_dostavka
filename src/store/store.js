import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./api";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ordersApi.middleware]),
});
