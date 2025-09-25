export default function ForecastCard({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-container" data-testid="forecast">
      {forecast.map((day, idx) => (
        <div key={idx} className="forecast-day" data-testid="forecast-day">
          <div className="forecast-date">
            <span className="forecast-weekday">{day.weekday}</span>
            <span className="forecast-day-month">, {day.dayMonth}</span>
          </div>
          <div className="forecast-icon-desc">
            <img
              src={day.icon}
              alt={day.description}
              className="forecast-icon"
            />
            <p className="forecast-desc">{day.description}</p>
          </div>
          <p className="forecast-temp">
            {day.temperatureDay !== null ? Math.round(day.temperatureDay) : "-"}
            ° /{" "}
            {day.temperatureNight !== null
              ? Math.round(day.temperatureNight)
              : "-"}
            °
          </p>
        </div>
      ))}
    </div>
  );
}
