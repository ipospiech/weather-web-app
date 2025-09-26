import React from 'react';
import {
  render,
  screen,
  waitFor,
  within,
  fireEvent
} from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import nock from 'nock';
import WeatherApp from './WeatherApp.js';
import { GEO_API_URL, METEOMATICS_URL } from '../utils/api.js';
import {
  CURRENT_WEATHER_LONDON,
  FORECAST_WEATHER_LONDON,
  GEO_MOCK_LONDON
} from '../mocks/weatherMocks.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('WeatherApp', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('renders weather for London with current and forecast data', async () => {
    nock(GEO_API_URL)
      .get(/cities/)
      .reply(200, GEO_MOCK_LONDON);
    nock(METEOMATICS_URL).get(/now/).reply(200, CURRENT_WEATHER_LONDON);
    nock(METEOMATICS_URL).get(/today/).reply(200, FORECAST_WEATHER_LONDON);

    renderWithClient(<WeatherApp />);

    const input = screen.getByPlaceholderText('Enter city');
    fireEvent.change(input, { target: { value: 'London' } });

    const option = await screen.findByText(
      'London, GB',
      {},
      { timeout: 10000 }
    );
    fireEvent.click(option);

    await waitFor(() =>
      expect(screen.getByText('London, GB')).toBeInTheDocument()
    );

    // Current weather
    await waitFor(() => expect(screen.getByText('Today')).toBeInTheDocument());
    const weatherCard = screen.getByTestId('current-weather');
    const currentWeather = within(weatherCard);

    const expectedCurrentValues = [
      '13°C',
      '💨 Wind: 11.5 km/h',
      '🔽 Pressure: 1026 hPa',
      '☀️ UV Index: 1',
      'Clear sky'
    ];

    expectedCurrentValues.forEach((text) => {
      expect(currentWeather.getByText(text)).toBeInTheDocument();
    });

    // Forecast
    const forecastContainer = screen.getByTestId('forecast');
    const forecastDays =
      within(forecastContainer).getAllByTestId('forecast-day');

    const forecastData = [
      { temp: '18° / 10°', desc: 'Clear sky' },
      { temp: '17° / 9°', desc: 'Partly cloudy' },
      { temp: '17° / 12°', desc: 'Rain shower' },
      { temp: '18° / 8°', desc: 'Light clouds' },
      { temp: '18° / 9°', desc: 'Cloudy' }
    ];

    forecastDays.forEach((day, index) => {
      const { temp, desc } = forecastData[index]!;
      expect(day).toHaveTextContent(temp);
      expect(day).toHaveTextContent(desc);
    });
  });
});
