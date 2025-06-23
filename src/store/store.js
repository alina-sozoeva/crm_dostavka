import { configureStore } from "@reduxjs/toolkit";
import { ordersApi, usersApi } from "./api";
import { userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ordersApi.middleware, usersApi.middleware]),
});
