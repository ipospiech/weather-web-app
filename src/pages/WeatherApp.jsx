import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import useWeatherData from "../hooks/useWeatherData";

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { data, loading, error } = useWeatherData(
    selectedCity?.lat,
    selectedCity?.lon
  );

  let temperature = null;
  let weatherSymbol = null;

  if (data) {
    const tempParam = data.data.find((d) => d.parameter === "t_2m:C");
    temperature = tempParam?.coordinates?.[0]?.dates?.[0]?.value;

    const symbolParam = data.data.find(
      (d) => d.parameter === "weather_symbol_1h:idx"
    );
    const symbolValue = symbolParam?.coordinates?.[0]?.dates?.[0]?.value;
    weatherSymbol = Array.isArray(symbolValue) ? symbolValue[0] : symbolValue;
  }

  return (
    <div>
      <SearchBar onSelectCity={setSelectedCity} />
      <WeatherCard
        city={selectedCity}
        temperature={temperature}
        weatherSymbol={weatherSymbol}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default WeatherApp;
