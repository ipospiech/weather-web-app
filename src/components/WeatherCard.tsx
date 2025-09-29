import React from 'react';
import type { City, Weather } from '../types/index.js';

interface WeatherCardProps {
  city: City | null;
  weather: Weather;
  loading: boolean;
  error: Error | null;
}

export default function WeatherCard({
  city,
  weather,
  loading,
  error
}: WeatherCardProps) {
  if (loading)
    return (
      <p className="weather-status" role="status" aria-live="polite">
        {' '}
        Loading weather ...{' '}
      </p>
    );

  if (error) {
    console.error(error);
    return (
      <p className="weather-status" role="alert">
        <span aria-hidden="true">🚧</span> Something went wrong, please try
        later
      </p>
    );
  }
  if (!city) return null;

  return (
    <div className="weather-card" data-testid="current-weather">
      <h2 className="city-name">{city.name}</h2>
      <p className="today-label">Today</p>

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
            <p className="detail">
              {' '}
              <span aria-hidden="true">💨</span> Wind: {weather.wind} km/h
            </p>
          )}
          {weather.pressure != null && (
            <p className="detail">
              {' '}
              <span aria-hidden="true">🔽</span> Pressure: {weather.pressure}{' '}
              hPa
            </p>
          )}
          {weather.uv != null && (
            <p className="detail">
              <span aria-hidden="true">☀️</span> UV Index: {weather.uv}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
