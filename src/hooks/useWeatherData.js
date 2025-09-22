import { METEOMATICS_URL, meteomaticsAuth } from "../utils/api";
import { useState, useEffect } from "react";
import axios from "axios";

const useWeatherData = (lat, lon) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const now = new Date().toISOString();
        const url = `${METEOMATICS_URL}/${now}/t_2m:C,weather_symbol_1h:idx/${lat},${lon}/json`;

        const response = await axios.get(url, {
          auth: meteomaticsAuth,
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { data, loading, error };
};

export default useWeatherData;
