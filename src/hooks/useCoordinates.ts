import axios from "axios";
import { useApiQuery } from "./useApiQuery.js";
import { GEO_API_URL, geoApiOptions } from "../utils/api.js";
import type { CityCoordinates, GeoApiCity } from "../types/interfaces.js";

const fetchCities = async (query: string): Promise<CityCoordinates[]> => {
  if (!query) return [];

  const { data } = await axios.get(
    `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${encodeURIComponent(
      query.trim(),
    )}`,
    geoApiOptions,
  );

  return (
    data.data?.map((city: GeoApiCity) => ({
      lat: city.latitude,
      lon: city.longitude,
      name: `${city.name}, ${city.countryCode}`,
    })) || []
  );
};

export const useCoordinates = (query: string) => {
  return useApiQuery<CityCoordinates[]>(
    ["cities", query],
    () => fetchCities(query),
    !!query,
  );
};

export default useCoordinates;
