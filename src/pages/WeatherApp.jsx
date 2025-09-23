import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import useWeatherData from "../hooks/useWeatherData";
import { getWeatherIcon } from "../utils/weatherIcons";
import ForecastCard from "../components/ForecastCard";

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { data, loading, error } = useWeatherData(
    selectedCity?.lat,
    selectedCity?.lon
  );

  let weather = {
    temperature: null,
    wind: null,
    pressure: null,
    uv: null,
    icon: null,
    description: null,
  };

  if (data) {
    const getValue = (param) =>
      data.data.find((d) => d.parameter === param)?.coordinates?.[0]?.dates?.[0]
        ?.value;

    weather.temperature = getValue("t_2m:C");
    weather.wind = getValue("wind_speed_10m:kmh");
    weather.pressure = getValue("msl_pressure:hPa");
    weather.uv = getValue("uv:idx");

    const weatherSymbol = getValue("weather_symbol_1h:idx");
    const { icon, description } = getWeatherIcon(weatherSymbol);
    weather.icon = icon;
    weather.description = description;
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
      <ForecastCard />
    </div>
  );
}
