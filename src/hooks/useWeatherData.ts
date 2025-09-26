import { METEOMATICS_URL, meteomaticsAuth } from '../utils/api.js';
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

    const fetchCurrentWeather = async () => {
      setLoadingCurrent(true);
      setErrorCurrent(null);

      try {
        const currentUrl = `${METEOMATICS_URL}/now/t_2m:C,wind_speed_10m:kmh,msl_pressure:hPa,uv:idx,weather_symbol_1h:idx/${lat},${lon}/json`;
        const currentResponse = await axios.get<MeteomaticsResponse>(
          currentUrl,
          {
            auth: meteomaticsAuth
          }
        );
        setData(currentResponse.data);
      } catch (err) {
        setErrorCurrent(err);
      } finally {
        setLoadingCurrent(false);
      }
    };

    const fetchForecast = async () => {
      setLoadingForecast(true);
      setErrorForecast(null);
      try {
        const forecastUrl = `${METEOMATICS_URL}/today+1DT12:00:00Z--today+5DT12:00:00Z:P1D/t_max_2m_24h:C,t_min_2m_24h:C,weather_symbol_24h:idx/${lat},${lon}/json`;
        const forecastResponse = await axios.get<MeteomaticsResponse>(
          forecastUrl,
          {
            auth: meteomaticsAuth
          }
        );
        setForecastData(forecastResponse.data);
      } catch (err) {
        setErrorForecast(err);
      } finally {
        setLoadingForecast(false);
      }
    };

    fetchCurrentWeather();
    fetchForecast();
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
