import { METEOMATICS_URL, meteomaticsAuth } from "../utils/api";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch current and forecast weather data for a given latitude and longitude.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {{
 *   data: object|null, // Current weather data response
 *   forecastData: object|null, // Forecast weather data response
 *   loading: boolean, // Loading state
 *   error: any // Error object if request fails
 * }}
 */

const useWeatherData = (lat, lon) => {
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const currentUrl = `${METEOMATICS_URL}/now/t_2m:C,wind_speed_10m:kmh,msl_pressure:hPa,uv:idx,weather_symbol_1h:idx/${lat},${lon}/json`;
        const currentResponse = await axios.get(currentUrl, {
          auth: meteomaticsAuth,
        });
        setData(currentResponse.data);

        const forecastUrl = `${METEOMATICS_URL}/today+1DT12:00:00Z--today+5DT12:00:00Z:P1D/t_max_2m_24h:C,t_min_2m_24h:C,weather_symbol_24h:idx/${lat},${lon}/json`;
        const forecastResponse = await axios.get(forecastUrl, {
          auth: meteomaticsAuth,
        });
        setForecastData(forecastResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { data, forecastData, loading, error };
};

export default useWeatherData;
