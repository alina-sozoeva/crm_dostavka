import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["OrdersList", "GuidList"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ search, code_sp_courier, status }) => ({
        url: "/orders",
        method: "GET",
        params: { search, code_sp_courier, status },
      }),
      providesTags: ["OrdersList"],
    }),
    updateStatusCourier: builder.mutation({
      query: (courier) => ({
        url: "/orders/update-status",
        method: "POST",
        body: courier,
      }),
      invalidatesTags: ["OrdersList"],
    }),
    getGuid: builder.query({
      query: () => ({
        url: "/utils/generate-guid",
        method: "GET",
      }),
      providesTags: ["GuidList"],
    }),
    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders/add",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["OrdersList", "GuidList"],
    }),
    takeOrder: builder.mutation({
      query: (courier) => ({
        url: "/courier/take-order",
        method: "POST",
        body: courier,
      }),
      invalidatesTags: ["OrdersList"],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/orders/update-comment",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["OrdersList"],
    }),
    deleteOrder: builder.mutation({
      query: (guid) => ({
        url: "/orders/delete",
        method: "POST",
        body: guid,
      }),
      invalidatesTags: ["OrdersList"],
    }),
    getPDF: builder.query({
      query: ({ guid }) => ({
        url: `/orders/${guid}/invoice.html`,
        method: "GET",

        responseHandler: async (response) => {
          const blob = await response.blob();
          return blob;
        },
      }),
      providesTags: ["PDFList"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateStatusCourierMutation,
  useTakeOrderMutation,
  useAddOrderMutation,
  useAddCommentMutation,
  useDeleteOrderMutation,
  useGetPDFQuery,
} = ordersApi;
