export const symbolMap = {
  0: { icon: "/icons/wsymbol_0999_unknown.png", description: "Unknown" },
  1: { icon: "/icons/wsymbol_0001_sunny.png", description: "Clear sky" },
  101: {
    icon: "/icons/wsymbol_0008_clear_sky_night.png",
    description: "Clear sky",
  },
  2: {
    icon: "/icons/wsymbol_0002_sunny_intervals.png",
    description: "Light clouds",
  },
  102: {
    icon: "/icons/wsymbol_0041_partly_cloudy_night.png",
    description: "Light clouds",
  },
  3: {
    icon: "/icons/wsymbol_0043_mostly_cloudy.png",
    description: "Partly cloudy",
  },
  103: {
    icon: "/icons/wsymbol_0041_partly_cloudy_night.png",
    description: "Partly cloudy",
  },
  4: { icon: "/icons/wsymbol_0003_white_cloud.png", description: "Cloudy" },
  104: { icon: "/icons/wsymbol_0042_cloudy_night.png", description: "Cloudy" },
  5: {
    icon: "/icons/wsymbol_0018_cloudy_with_heavy_rain.png",
    description: "Rain",
  },
  105: {
    icon: "/icons/wsymbol_0034_cloudy_with_heavy_rain_night.png",
    description: "Rain",
  },
  6: {
    icon: "/icons/wsymbol_0013_sleet_showers.png",
    description: "Rain and snow / sleet",
  },
  106: {
    icon: "/icons/wsymbol_0029_sleet_showers_night.png",
    description: "Rain and snow / sleet",
  },
  7: {
    icon: "/icons/wsymbol_0020_cloudy_with_heavy_snow.png",
    description: "Snow",
  },
  107: {
    icon: "/icons/wsymbol_0036_cloudy_with_heavy_snow_night.png",
    description: "Snow",
  },
  8: {
    icon: "/icons/wsymbol_0009_light_rain_showers.png",
    description: "Rain shower",
  },
  108: {
    icon: "/icons/wsymbol_0025_light_rain_showers_night.png",
    description: "Rain shower",
  },
  9: {
    icon: "/icons/wsymbol_0011_light_snow_showers.png",
    description: "Snow shower",
  },
  109: {
    icon: "/icons/wsymbol_0027_light_snow_showers_night.png",
    description: "Snow shower",
  },
  10: {
    icon: "/icons/wsymbol_0013_sleet_showers.png",
    description: "Sleet shower",
  },
  110: {
    icon: "/icons/wsymbol_0029_sleet_showers_night.png",
    description: "Sleet shower",
  },
  11: { icon: "/icons/wsymbol_0006_mist.png", description: "Light fog" },
  111: { icon: "/icons/wsymbol_0063_mist_night.png", description: "Light fog" },
  12: { icon: "/icons/wsymbol_0007_fog.png", description: "Dense fog" },
  112: { icon: "/icons/wsymbol_0064_fog_night.png", description: "Dense fog" },
  13: {
    icon: "/icons/wsymbol_0050_freezing_rain.png",
    description: "Freezing rain",
  },
  113: {
    icon: "/icons/wsymbol_0068_freezing_rain_night.png",
    description: "Freezing rain",
  },
  14: {
    icon: "/icons/wsymbol_0024_thunderstorms.png",
    description: "Thunderstorms",
  },
  114: {
    icon: "/icons/wsymbol_0040_thunderstorms_night.png",
    description: "Thunderstorms",
  },
  15: { icon: "/icons/wsymbol_0048_drizzle.png", description: "Drizzle" },
  115: {
    icon: "/icons/wsymbol_0066_drizzle_night.png",
    description: "Drizzle",
  },
  16: { icon: "/icons/wsymbol_0056_dust_sand.png", description: "Sandstorm" },
  116: {
    icon: "/icons/wsymbol_0074_dust_sand_night.png",
    description: "Sandstorm",
  },
};

/**
 * Returns icon and text for a given weather symbol.
 * @param {number} weatherSymbol
 * @returns {{icon: string, description: string}}
 */
export function getWeatherIcon(weatherSymbol) {
  return (
    symbolMap[weatherSymbol] || {
      icon: "/icons/wsymbol_0999_unknown.png",
      description: "",
    }
  );
}
