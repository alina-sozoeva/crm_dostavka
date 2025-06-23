import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["OrdersList"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["OrdersList"],
    }),
    updateStatusCourier: builder.mutation({
      query: (courier) => ({
        url: "/orders/update-status",
        method: "POST",
        body: courier,
      }),
      invalidatesTags: ["OrderList"],
    }),
  }),
});

export const { useGetOrdersQuery, useUpdateStatusCourierMutation } = ordersApi;
