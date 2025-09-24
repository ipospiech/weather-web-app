import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import useWeatherData from "../hooks/useWeatherData";
import { getWeatherIcon } from "../utils/weatherIcons";
import ForecastCard from "../components/ForecastCard";

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { data, forecastData, loading, error } = useWeatherData(
    selectedCity?.lat,
    selectedCity?.lon
  );

  const weather = {
    temperature: null,
    wind: null,
    pressure: null,
    uv: null,
    icon: null,
    description: null,
  };

  if (data) {
    const getValueWeather = (param) =>
      data.data.find((d) => d.parameter === param)?.coordinates?.[0]?.dates?.[0]
        ?.value;

    weather.temperature = getValueWeather("t_2m:C");
    weather.wind = getValueWeather("wind_speed_10m:kmh");
    weather.pressure = getValueWeather("msl_pressure:hPa");
    weather.uv = getValueWeather("uv:idx");

    const weatherSymbol = getValueWeather("weather_symbol_1h:idx");
    const { icon, description } = getWeatherIcon(weatherSymbol);
    weather.icon = icon;
    weather.description = description;
  }

  let forecast = [];

  if (forecastData) {
    const getValueForecast = (param) =>
      forecastData.data.find((d) => d.parameter === param);

    const temperatureDay = getValueForecast("t_max_2m_24h:C");
    const temperatureNight = getValueForecast("t_min_2m_24h:C");
    const weatherSymbol = getValueForecast("weather_symbol_24h:idx");
    const fiveDayDates = forecastData.data[0]?.coordinates?.[0]?.dates ?? [];

    forecast = fiveDayDates.slice(0, 5).map((day, idx) => {
      const isoDate = day.date;
      const dateObj = new Date(isoDate);

      const weekday = dateObj.toLocaleDateString(undefined, {
        weekday: "short",
      });
      const dayMonth = dateObj.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
      });

      const dayTemp =
        temperatureDay?.coordinates?.[0]?.dates?.[idx]?.value ?? null;
      const nightTemp =
        temperatureNight?.coordinates?.[0]?.dates?.[idx]?.value ?? null;
      const weatherSymb =
        weatherSymbol?.coordinates?.[0]?.dates?.[idx]?.value ?? null;

      const { icon, description } = getWeatherIcon(weatherSymb);

      return {
        weekday,
        dayMonth,
        temperatureDay: dayTemp,
        temperatureNight: nightTemp,
        icon,
        description,
      };
    });
  }

  return (
    <div className="app-container">
      <h1 className="app-title">🌐 JustWeather</h1>
      <SearchBar onSelectCity={setSelectedCity} />
      <WeatherCard
        city={selectedCity}
        weather={weather}
        loading={loading}
        error={error}
      />
      <ForecastCard forecast={forecast} />
    </div>
  );
}
