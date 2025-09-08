import { configureStore } from "@reduxjs/toolkit";
import {
  applicationsApi,
  clientsApi,
  locationsApi,
  ordersApi,
  usersApi,
} from "./api";
import { userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ordersApi.middleware,
      usersApi.middleware,
      locationsApi.middleware,
      clientsApi.middleware,
      applicationsApi.middleware,
    ]),
});
