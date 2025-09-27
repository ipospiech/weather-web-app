import axios from 'axios';
import { useApiQuery } from './useApiQuery.js';
import type { CityCoordinates } from '../types/interfaces.js';

const fetchCities = async (query: string): Promise<CityCoordinates[]> => {
  if (!query) return [];

  const res = await axios.get(
    `/.netlify/functions/geo-proxy?q=${encodeURIComponent(query)}`
  );
  return res.data;
};

export const useCoordinates = (query: string) => {
  return useApiQuery<CityCoordinates[]>(
    ['cities', query],
    () => fetchCities(query),
    !!query
  );
};

export default useCoordinates;
