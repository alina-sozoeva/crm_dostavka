import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["ApplicationsList"],
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: ({ search }) => ({
        url: "/applications",
        method: "GET",
        params: { search },
      }),
      providesTags: ["ApplicationsList"],
    }),
    addApplication: builder.mutation({
      query: (newApplication) => ({
        url: "/applications/add",
        method: "POST",
        body: newApplication,
      }),
      invalidatesTags: ["ApplicationsList"],
    }),
    updateApplication: builder.mutation({
      query: (application) => ({
        url: "/applications/add",
        method: "POST",
        body: application,
      }),
      invalidatesTags: ["ApplicationsList"],
    }),
    deleteApplications: builder.mutation({
      query: (guid) => ({
        url: "/delete/application",
        method: "POST",
        body: guid,
      }),
      invalidatesTags: ["ApplicationsList"],
    }),
    updateStatusApplications: builder.mutation({
      query: (courier) => ({
        url: "/application/update-status",
        method: "POST",
        body: courier,
      }),
      invalidatesTags: ["ApplicationsList"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useAddApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationsMutation,
  useUpdateStatusApplicationsMutation,
} = applicationsApi;
