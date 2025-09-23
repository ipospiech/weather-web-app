export default function WeatherCard({ city, weather, loading, error }) {
  if (loading) return <p className="weather-status">🌤 Loading weather...</p>;
  if (error)
    return <p className="weather-status text-error">{error.message}</p>;
  if (!city) return null;

  return (
    <div className="weather-card">
      <h2 className="city-name">{city.name}</h2>
      <div className="weather-main">
        {/* Left: weather icon */}
        <div className="weather-icon-container">
          {weather.icon && (
            <img
              src={weather.icon}
              alt={weather.description}
              className="weather-icon"
            />
          )}
        </div>

        {/* Center: temperature */}
        <div className="weather-temp">
          {weather.temperature != null && (
            <p className="temperature">{weather.temperature}°C</p>
          )}
        </div>

        {/* Right: details */}
        <div className="weather-details">
          {weather.wind != null && <p>💨 {weather.wind} km/h</p>}
          {weather.pressure != null && <p>🔽 {weather.pressure} hPa</p>}
          {weather.uv != null && <p>☀️ UV: {weather.uv}</p>}
        </div>
      </div>

      {/* Below icon, description */}
      {weather.description && (
        <p className="weather-description">{weather.description}</p>
      )}
    </div>
  );
}
