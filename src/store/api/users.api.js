import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToken, setUserId } from "../slices";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["UsersList"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["UsersList"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToken(data?.data?.hash));
          dispatch(setUserId(data?.data?.codeid));
        } catch (err) {
          console.error("Login failed", err);
        }
      },
      invalidatesTags: ["UsersList"],
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users/add",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["UsersList"],
    }),
  }),
});

export const { useGetUsersQuery, useLoginUserMutation, useAddUserMutation } =
  usersApi;
