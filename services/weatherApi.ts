import { Coordinates } from "@/types/common";
import { WeatherResponse } from "@/types/weatherData";
import { Alert } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

export const fetchWeather = async ({
  lat,
  lon,
}: Coordinates): Promise<WeatherResponse> => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );
    if (!res.ok) {
      throw new Error("Error getting weather data");
    }
    return await res.json();
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    Alert.alert(
      "Error",
      "Failed to fetch weather data. Please try again later."
    );
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchCityCoordinates = async (
  city: string
): Promise<Coordinates | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data[0]) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      Alert.alert("Error", "City not found. Please enter a valid city name.");
      return null;
    }
  } catch (error: any) {
    console.error("Error searching city:", error);
    Alert.alert("Error", "Failed to search city. Please try again later.");
    return null;
  }
};
