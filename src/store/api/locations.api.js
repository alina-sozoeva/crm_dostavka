import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["CountriesList", "RegionList", "CityList"],
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/locations/countries",
        method: "GET",
      }),
      providesTags: ["CountriesList"],
    }),
    getRegion: builder.query({
      query: ({ code_sp_country }) => ({
        url: "/locations/region",
        method: "GET",
        params: { code_sp_country },
      }),
      providesTags: ["RegionList"],
    }),
    getCity: builder.query({
      query: ({ code_sp_country, code_sp_region }) => ({
        url: "/locations/city",
        method: "GET",
        params: { code_sp_country, code_sp_region },
      }),
      providesTags: ["CityList"],
    }),
  }),
});

export const { useGetCountriesQuery, useGetRegionQuery, useGetCityQuery } =
  locationsApi;
