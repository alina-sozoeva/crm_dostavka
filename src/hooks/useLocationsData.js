import {
  useGetCountriesQuery,
  useGetRegionQuery,
  useGetCityQuery,
} from "../store";

export const useLocationsData = (countryId, regionId) => {
  const { data: countries, isLoading: isCountriesLoading } =
    useGetCountriesQuery();
  const { data: regions, isLoading: isRegionsLoading } = useGetRegionQuery(
    countryId ? { code_sp_country: countryId } : {}
  );
  const { data: cities, isLoading: isCitiesLoading } = useGetCityQuery({
    ...(countryId && { code_sp_country: countryId }),
    ...(regionId && { code_sp_region: regionId }),
  });

  const isLoading = isCountriesLoading || isRegionsLoading || isCitiesLoading;

  return {
    countries,
    regions,
    cities,
    isLoading,
  };
};
