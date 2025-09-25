import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import WeatherApp from "./WeatherApp";
import { GEO_API_URL, METEOMATICS_URL } from "../utils/api";
import {
  CURRENT_WEATHER_LONDON,
  FORECAST_WEATHER_LONDON,
  GEO_MOCK_LONDON,
} from "../mocks/weatherMocks";

describe("WeatherApp", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("renders weather for London with current and forecast data", async () => {
    nock(GEO_API_URL)
      .get(/cities/)
      .reply(200, GEO_MOCK_LONDON);
    nock(METEOMATICS_URL).get(/now/).reply(200, CURRENT_WEATHER_LONDON);
    nock(METEOMATICS_URL).get(/today/).reply(200, FORECAST_WEATHER_LONDON);

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText("Enter city");
    await userEvent.type(input, "London");

    const option = await screen.findByText(
      "London, GB",
      {},
      { timeout: 10000 }
    );
    await userEvent.click(option);

    await waitFor(() =>
      expect(screen.getByText("London, GB")).toBeInTheDocument()
    );

    // Current weather
    const weatherCard = screen.getByTestId("current-weather");
    const currentWeather = within(weatherCard);

    const expectedCurrentValues = [
      "13°C",
      "💨 Wind: 11.5 km/h",
      "🔽 Pressure: 1026 hPa",
      "☀️ UV Index: 1",
      "Clear sky",
    ];

    expectedCurrentValues.forEach((text) => {
      expect(currentWeather.getByText(text)).toBeInTheDocument();
    });

    // Forecast
    const forecastContainer = screen.getByTestId("forecast");
    const forecastDays =
      within(forecastContainer).getAllByTestId("forecast-day");

    const forecastData = [
      { temp: "18° / 10°", desc: "Clear sky" },
      { temp: "17° / 9°", desc: "Partly cloudy" },
      { temp: "17° / 12°", desc: "Rain shower" },
      { temp: "18° / 8°", desc: "Light clouds" },
      { temp: "18° / 9°", desc: "Cloudy" },
    ];

    forecastDays.forEach((day, index) => {
      const { temp, desc } = forecastData[index];
      expect(day).toHaveTextContent(temp);
      expect(day).toHaveTextContent(desc);
    });
  });
});
