import { create } from "zustand";
import { WeatherResponse } from "@/types/weatherData";

type WeatherState = {
  weather: WeatherResponse | null;
  isNight: boolean;
  setWeather: (weather: WeatherResponse | null) => void;
  setIsNight: (isNight: boolean) => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  isNight: false,
  setWeather: (weather) => set({ weather }),
  setIsNight: (isNight) => set({ isNight }),
}));

export const getBackgroundGradient = (
  condition?: string,
  isNight?: boolean
): [string, string] => {
  if (!condition) return ["#f7f7f7", "#e3e3e3"];

  switch (condition.toLowerCase()) {
    case "clear":
      return isNight ? ["#1a2a6c", "#003366"] : ["#2193b0", "#6dd5ed"];
    case "clouds":
      return isNight ? ["#2c3e50", "#3f4c6b"] : ["#bdc3c7", "#2c3e50"];
    case "rain":
    case "drizzle":
      return ["#373B44", "#4286f4"];
    case "thunderstorm":
      return ["#141E30", "#243B55"];
    case "snow":
      return ["#E6DADA", "#274046"];
    default:
      return isNight ? ["#2c3e50", "#3f4c6b"] : ["#f7f7f7", "#e3e3e3"];
  }
};
