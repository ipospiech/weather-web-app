export default function WeatherCard({ city, weather, loading, error }) {
  if (loading) return <p className="weather-status">🌤 Loading weather...</p>;
  if (error) {
    console.error(error);
    return (
      <p className="weather-status">
        🚧 Something went wrong, please try later
      </p>
    );
  }
  if (!city) return null;

  return (
    <div className="weather-card">
      <h2 className="city-name">{city.name}</h2>

      <div className="weather-main">
        <div className="weather-left">
          {weather.icon && (
            <img
              src={weather.icon}
              alt={weather.description}
              className="weather-icon"
            />
          )}
          {weather.description && (
            <p className="weather-desc">{weather.description}</p>
          )}
        </div>

        <div className="weather-center">
          {weather.temperature != null ? (
            <p className="temperature">{Math.round(weather.temperature)}°C</p>
          ) : (
            <p className="temperature">—</p>
          )}
        </div>

        <div className="weather-right">
          {weather.wind != null && (
            <p className="detail">💨 Wind: {weather.wind} km/h</p>
          )}
          {weather.pressure != null && (
            <p className="detail">🔽 Pressure: {weather.pressure} hPa</p>
          )}
          {weather.uv != null && (
            <p className="detail">☀️ UV Index: {weather.uv}</p>
          )}
        </div>
      </div>
    </div>
  );
}
