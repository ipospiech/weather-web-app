import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherCard = ({ city, temperature, weatherSymbol, loading, error }) => {
  if (loading) return <p> Loading weather...</p>;
  if (error) return <p>{error.message}</p>;
  if (!city || temperature == null || weatherSymbol == null) return null;

  return (
    <div>
      <img src={getWeatherIcon(weatherSymbol)} alt="weather icon" />
      <div>
        <h2>{city.name}</h2>
        <p>🌡 Temperature: {temperature}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
