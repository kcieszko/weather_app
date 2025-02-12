import { Coordinates } from "./common";

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust?: number;
};

export type Precipitation = {
  "1h"?: number;
  "3h"?: number;
};

export type Clouds = {
  all: number;
};

export type SystemData = {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type WeatherResponse = {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  rain?: Precipitation;
  snow?: Precipitation;
  clouds: Clouds;
  dt: number;
  sys: SystemData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type DailyForecast = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
};

export type ForecastResponse = {
  daily: DailyForecast[];
};
