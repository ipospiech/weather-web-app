export interface City {
  name: string;
}

export interface Weather {
  temperature: number | null;
  wind: number | null;
  pressure: number | null;
  uv: number | null;
  icon: string;
  description: string;
}

export interface CityCoordinates {
  name: string;
  lat: number;
  lon: number;
}

export interface ForecastDay {
  weekday: string;
  dayMonth: string;
  temperatureDay: number | null;
  temperatureNight: number | null;
  icon: string;
  description: string;
}

export interface GeoApiCity {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

export interface MeteomaticsCoordinateDate {
  date: string;
  value: number;
}

export interface MeteomaticsCoordinate {
  lat: number;
  lon: number;
  dates: MeteomaticsCoordinateDate[];
}

export interface MeteomaticsDataItem {
  parameter: string;
  coordinates: MeteomaticsCoordinate[];
}

export interface MeteomaticsResponse {
  data: MeteomaticsDataItem[];
}
