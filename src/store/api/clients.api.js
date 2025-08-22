import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["ClientsList"],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: ({ search }) => ({
        url: "/clients",
        method: "GET",
        params: { search },
      }),
      providesTags: ["ClientsList"],
    }),
    addClient: builder.mutation({
      query: (newClient) => ({
        url: "/clients/add",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["ClientsList"],
    }),
    updateClient: builder.mutation({
      query: (client) => ({
        url: "/clients/add",
        method: "POST",
        body: client,
      }),
      invalidatesTags: ["ClientsList"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
} = clientsApi;
