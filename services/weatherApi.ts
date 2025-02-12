import { Coordinates } from "@/types/common";
import {
  DailyForecast,
  ForecastResponse,
  WeatherResponse,
} from "@/types/weatherData";
import { Alert } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

type CityData = {
  lat: number;
  lon: number;
  name: string;
};

export const fetchCityCoordinates = async (
  city: string
): Promise<CityData | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data[0]) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
      };
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

export const fetchWeather = async ({
  lat,
  lon,
  cityName,
}: Coordinates & { cityName?: string }): Promise<WeatherResponse> => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );
    if (!res.ok) {
      throw new Error("Error getting weather data");
    }
    const data = await res.json();
    if (cityName) {
      data.name = cityName;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    Alert.alert(
      "Error",
      "Failed to fetch weather data. Please try again later."
    );
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchWeatherForFavourites = async (
  cities: { lat: number; lon: number; name: string }[]
): Promise<WeatherResponse[]> => {
  try {
    const weatherPromises = cities.map((city) =>
      fetchWeather({
        lat: city.lat,
        lon: city.lon,
        cityName: city.name,
      })
    );

    return await Promise.all(weatherPromises);
  } catch (error: any) {
    console.error("Error fetching weather for favourites:", error);
    Alert.alert(
      "Error",
      "Failed to fetch weather data for favourites. Please try again later."
    );
    return [];
  }
};

export const fetchForecast = async ({
  lat,
  lon,
}: Coordinates): Promise<ForecastResponse> => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );
    if (!res.ok) {
      throw new Error("Error getting forecast data");
    }
    const data = await res.json();

    const dailyData: DailyForecast[] = data.list
      .reduce((acc: DailyForecast[], item: any) => {
        const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);

        if (
          !acc.find(
            (day: DailyForecast) =>
              new Date(day.dt * 1000).setHours(0, 0, 0, 0) === date
          )
        ) {
          acc.push({
            dt: item.dt,
            temp: {
              min: item.main.temp_min,
              max: item.main.temp_max,
            },
            weather: [
              {
                icon: item.weather[0].icon,
                description: item.weather[0].description,
              },
            ],
          });
        }
        return acc;
      }, [])
      .slice(0, 6);

    return {
      daily: dailyData,
    };
  } catch (error: any) {
    console.error("Error fetching forecast data:", error);
    Alert.alert(
      "Error",
      "Failed to fetch forecast data. Please try again later."
    );
    throw new Error("Failed to fetch forecast data");
  }
};
