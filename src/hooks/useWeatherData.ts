import { useState, useEffect } from 'react';
import axios from 'axios';
import type { MeteomaticsResponse } from '../types/index.js';

/**
 * Custom hook to fetch current and forecast weather data for a given latitude and longitude.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {{
 *   data: object|null, // Current weather data response
 *   forecastData: object|null, // Forecast weather data response
 *   loadingCurrent: boolean, // Loading state for current weather
 *   loadingForecast: boolean, // Loading state for forecast weather
 *   errorCurrent: unknown, // Error state for current weather
 *   errorForecast: unknown, // Error state for forecast weather
 * }}
 */

interface UseWeatherDataResult {
  data: MeteomaticsResponse | null;
  forecastData: MeteomaticsResponse | null;
  loadingCurrent: boolean;
  loadingForecast: boolean;
  errorCurrent: unknown;
  errorForecast: unknown;
}

const useWeatherData = (lat?: number, lon?: number): UseWeatherDataResult => {
  const [data, setData] = useState<MeteomaticsResponse | null>(null);
  const [forecastData, setForecastData] = useState<MeteomaticsResponse | null>(
    null
  );
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [errorCurrent, setErrorCurrent] = useState<unknown>(null);
  const [errorForecast, setErrorForecast] = useState<unknown>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchData = async () => {
      setLoadingCurrent(true);
      setLoadingForecast(true);
      setErrorCurrent(null);
      setErrorForecast(null);

      try {
        const res = await axios.get(
          `/.netlify/functions/weather-proxy?lat=${lat}&lon=${lon}`
        );
        setData(res.data.data);
        setForecastData(res.data.forecastData);
      } catch (err: unknown) {
        setErrorCurrent(err);
        setErrorForecast(err);
      } finally {
        setLoadingCurrent(false);
        setLoadingForecast(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  return {
    data,
    forecastData,
    loadingCurrent,
    loadingForecast,
    errorCurrent,
    errorForecast
  };
};

export default useWeatherData;
