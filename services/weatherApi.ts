import { Coordinates } from "@/types/common";

const API_KEY = "c930517040b8f3151e26a7ac9b58ea99";

export const fetchWeather = async ({ lat, lon }: Coordinates) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pl`
  );
  if (!res.ok) {
    throw new Error("Error getting weather data");
  }
  return res.json();
};
