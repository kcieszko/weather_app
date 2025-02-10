import { Coordinates } from "@/types/common";
import { WeatherResponse } from "@/types/weatherData";

const API_KEY = "c930517040b8f3151e26a7ac9b58ea99";

export const fetchWeather = async ({
  lat,
  lon,
}: Coordinates): Promise<WeatherResponse> => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pl`
    );
    if (!res.ok) {
      throw new Error("Error getting weather data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};
