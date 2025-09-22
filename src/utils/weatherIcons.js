export const symbolMap = {
  0: "/icons/wsymbol_0999_unknown.png",
  1: "/icons/wsymbol_0001_sunny.png", // Clear sky (day)
  101: "/icons/wsymbol_0008_clear_sky_night.png", // Clear sky (night)
  2: "/icons/wsymbol_0002_sunny_intervals.png", // Light clouds (day)
  102: "/icons/wsymbol_0041_partly_cloudy_night.png", // Light clouds (night)
  3: "/icons/wsymbol_0043_mostly_cloudy.png", // Partly cloudy (day)
  103: "/icons/wsymbol_0041_partly_cloudy_night.png", // Partly cloudy (night)
  4: "/icons/wsymbol_0003_white_cloud.png", // Cloudy (day)
  104: "/icons/wsymbol_0042_cloudy_night.png", // Cloudy (night)
  5: "/icons/wsymbol_0018_cloudy_with_heavy_rain.png", // Rain (day)
  105: "/icons/wsymbol_0034_cloudy_with_heavy_rain_night.png", // Rain (night)
  6: "/icons/wsymbol_0013_sleet_showers.png", // Rain and snow / sleet (day)
  106: "/icons/wsymbol_0029_sleet_showers_night.png", // Rain and snow / sleet (night)
  7: "/icons/wsymbol_0020_cloudy_with_heavy_snow.png", // Snow (day)
  107: "/icons/wsymbol_0036_cloudy_with_heavy_snow_night.png", // Snow (night)
  8: "/icons/wsymbol_0009_light_rain_showers.png", // Rain shower (day)
  108: "/icons/wsymbol_0025_light_rain_showers_night.png", // Rain shower (night)
  9: "/icons/wsymbol_0011_light_snow_showers.png", // Snow shower (day)
  109: "/icons/wsymbol_0027_light_snow_showers_night.png", // Snow shower (night)
  10: "/icons/wsymbol_0013_sleet_showers.png", // Sleet shower (day)
  110: "/icons/wsymbol_0029_sleet_showers_night.png", // Sleet shower (night)
  11: "/icons/wsymbol_0006_mist.png", // Light fog (day)
  111: "/icons/wsymbol_0063_mist_night.png", // Light fog (night)
  12: "/icons/wsymbol_0007_fog.png", // Dense fog (day)
  112: "/icons/wsymbol_0064_fog_night.png", // Dense fog (night)
  13: "/icons/wsymbol_0050_freezing_rain.png", // Freezing rain (day)
  113: "/icons/wsymbol_0068_freezing_rain_night.png", // Freezing rain (night)
  14: "/icons/wsymbol_0024_thunderstorms.png", // Thunderstorms (day)
  114: "/icons/wsymbol_0040_thunderstorms_night.png", // Thunderstorms (night)
  15: "/icons/wsymbol_0048_drizzle.png", // Drizzle (day)
  115: "/icons/wsymbol_0066_drizzle_night.png", // Drizzle (night)
  16: "/icons/wsymbol_0056_dust_sand.png", // Sandstorm (day)
  116: "/icons/wsymbol_0074_dust_sand_night.png", // Sandstorm (night)
};

export function getWeatherIcon(symbol) {
  return symbolMap[symbol] || "/icons/wsymbol_0999_unknown.png";
}
