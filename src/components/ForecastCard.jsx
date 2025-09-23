import { getWeatherIcon } from "../utils/weatherIcons";
import dayjs from "dayjs";

/**
 * ForecastCard groups 3-hourly forecast into 5 days
 */
const ForecastCard = ({ forecastData }) => {
  if (!forecastData) return null;

  const tempParam = forecastData.data.find((d) => d.parameter === "t_2m:C");
  const symbolParam = forecastData.data.find(
    (d) => d.parameter === "weather_symbol_1h:idx"
  );

  if (!tempParam || !symbolParam) return null;

  // Combine temperature + symbol entries by index
  const entries = tempParam.coordinates[0].dates.map((tEntry, idx) => {
    const time = dayjs(tEntry.date);
    const temp = tEntry.value;
    const symbolValue = symbolParam.coordinates[0].dates[idx]?.value;
    const weatherSymbol = Array.isArray(symbolValue)
      ? symbolValue[0]
      : symbolValue;

    return { time, temp, weatherSymbol };
  });

  // Group by day
  const groupedByDay = entries.reduce((acc, entry) => {
    const day = entry.time.format("YYYY-MM-DD");
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});

  // Transform into daily summary
  const dailyForecast = Object.entries(groupedByDay)
    .slice(0, 5) // limit to 5 days
    .map(([day, items]) => {
      const temps = items.map((i) => i.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);

      // pick midday (12:00) icon if available, otherwise fallback to first
      const midday = items.find((i) => i.time.hour() === 12) || items[0];
      const symbol = midday.weatherSymbol;

      return {
        day: dayjs(day).format("ddd"), // Mon, Tue
        min,
        max,
        symbol,
      };
    });

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
      {dailyForecast.map((day, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-blue-50 p-4 rounded shadow"
        >
          <p className="font-bold">{day.day}</p>
          <img
            src={getWeatherIcon(day.symbol)}
            alt="icon"
            className="w-12 h-12"
          />
          <p className="text-sm">Min: {day.min}°C</p>
          <p className="text-sm">Max: {day.max}°C</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
