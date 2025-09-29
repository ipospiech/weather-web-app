import React from 'react';
import type { ForecastDay } from '../types/index.js';

interface ForecastCardProps {
  forecast: ForecastDay[];
  loading?: boolean;
  error?: Error | null;
}

export default function ForecastCard({
  forecast,
  loading,
  error
}: ForecastCardProps) {
  if (loading)
    return (
      <p className="weather-status" role="status" aria-live="polite">
        Loading forecast ...
      </p>
    );
  if (error)
    return (
      <p className="weather-status" role="alert">
        <span aria-hidden="true">🚧</span> Failed to load forecast
      </p>
    );
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
            {day.temperatureDay !== null ? Math.round(day.temperatureDay) : '-'}
            ° /{' '}
            {day.temperatureNight !== null
              ? Math.round(day.temperatureNight)
              : '-'}
            °
          </p>
        </div>
      ))}
    </div>
  );
}
