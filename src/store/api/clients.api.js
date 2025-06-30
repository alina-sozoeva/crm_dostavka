import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["ClientsList"],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: "/clients",
        method: "GET",
      }),
      providesTags: ["ClientsList"],
    }),
  }),
});

export const { useGetClientsQuery } = clientsApi;
