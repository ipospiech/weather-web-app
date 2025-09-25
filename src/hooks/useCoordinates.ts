import { useState, useEffect } from "react";
import axios from "axios";
import { GEO_API_URL, geoApiOptions } from "../utils/api.js";
import type { CityCoordinates, GeoApiCity } from "../types/interfaces.js";

/**
 * Custom hook to fetch city coordinates based on a search query.
 * @param {string} query - The city name prefix to search for.
 * @returns {{ cities: Array<{ lat: number, lon: number, name: string }>, loading: boolean, error: any }}
 */

interface UseCoordinatesResult {
  cities: CityCoordinates[];
  loading: boolean;
  error: unknown;
}

const useCoordinates = (query: string): UseCoordinatesResult => {
  const [cities, setCities] = useState<CityCoordinates[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!query) {
      setCities([]);
      return;
    }

    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${encodeURIComponent(
            query.trim()
          )}`,
          geoApiOptions
        );

        if (response.data?.data?.length > 0) {
          const matches: CityCoordinates[] = response.data.data.map(
            (city: GeoApiCity) => ({
              lat: city.latitude,
              lon: city.longitude,
              name: `${city.name}, ${city.countryCode}`,
            })
          );
          setCities(matches);
        } else {
          setCities([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [query]);

  return { cities, loading, error };
};

export default useCoordinates;
