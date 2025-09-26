import React, { useState } from "react";
import SearchBar from "../components/SearchBar.js";
import WeatherCard from "../components/WeatherCard.js";
import useWeatherData from "../hooks/useWeatherData.js";
import { getWeatherIcon } from "../utils/weatherIcons.js";
import ForecastCard from "../components/ForecastCard.js";
import type {
  CityCoordinates,
  ForecastDay,
  MeteomaticsCoordinateDate,
  MeteomaticsDataItem,
  Weather,
} from "../types/index.js";

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<CityCoordinates | null>(
    null,
  );

  const { data, forecastData, loading, error } = useWeatherData(
    selectedCity?.lat,
    selectedCity?.lon,
  );

  const weather: Weather = {
    temperature: null,
    wind: null,
    pressure: null,
    uv: null,
    icon: "",
    description: "",
  };

  if (data) {
    const getValueWeather = (param: string) =>
      data.data.find((d: MeteomaticsDataItem) => d.parameter === param)
        ?.coordinates?.[0]?.dates?.[0]?.value;

    weather.temperature = getValueWeather("t_2m:C") ?? null;
    weather.wind = getValueWeather("wind_speed_10m:kmh") ?? null;
    weather.pressure = getValueWeather("msl_pressure:hPa") ?? null;
    weather.uv = getValueWeather("uv:idx") ?? null;

    const weatherSymbol = getValueWeather("weather_symbol_1h:idx");
    const { icon, description } = getWeatherIcon(weatherSymbol);
    weather.icon = icon;
    weather.description = description;
  }

  let forecast: ForecastDay[] = [];

  if (forecastData) {
    const getValueForecast = (param: string) =>
      forecastData.data.find((d: MeteomaticsDataItem) => d.parameter === param);

    const temperatureDay = getValueForecast("t_max_2m_24h:C");
    const temperatureNight = getValueForecast("t_min_2m_24h:C");
    const weatherSymbol = getValueForecast("weather_symbol_24h:idx");
    const fiveDayDates = forecastData.data[0]?.coordinates?.[0]?.dates ?? [];

    forecast = fiveDayDates
      .slice(0, 5)
      .map((day: MeteomaticsCoordinateDate, idx: number) => {
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
        error={error as Error | null}
      />
      <ForecastCard forecast={forecast} />
    </div>
  );
}
