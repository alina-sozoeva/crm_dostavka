import {
  useGetCountriesQuery,
  useGetRegionQuery,
  useGetCityQuery,
} from "../store";

export const useLocationsData = () => {
  const { data: countries, isLoading: isCountriesLoading } =
    useGetCountriesQuery();
  const { data: regions, isLoading: isRegionsLoading } = useGetRegionQuery();
  const { data: cities, isLoading: isCitiesLoading } = useGetCityQuery();

  const isLoading = isCountriesLoading || isRegionsLoading || isCitiesLoading;

  return {
    countries,
    regions,
    cities,
    isLoading,
  };
};
