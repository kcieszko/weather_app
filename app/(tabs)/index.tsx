import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Button,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useLocation } from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { fetchCityCoordinates } from "@/services/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { useFavourites } from "@/hooks/useFavourites";

export default function TabOneScreen() {
  const [searchCoords, setSearchCoords] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  const { locationPermissionError, location } = useLocation();
  const { setWeather, setIsNight } = useWeatherStore();
  const { loadFavourites } = useFavourites();

  const {
    data: weatherData,
    isLoading,
    error,
    refetch,
  } = useWeather({
    lat: searchCoords?.lat ?? location?.coords.latitude,
    lon: searchCoords?.lon ?? location?.coords.longitude,
    cityName: searchCoords?.name,
  });

  useEffect(() => {
    if (!locationPermissionError && location) {
      refetch();
    }
  }, [locationPermissionError, location, refetch]);

  useEffect(() => {
    if (weatherData) {
      setWeather(weatherData);
      setIsNight(weatherData.weather[0].icon.endsWith("n"));
    }
  }, [weatherData]);

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);

  const handleCitySearch = async (city: string) => {
    const cityData = await fetchCityCoordinates(city);
    if (cityData) {
      setSearchCoords(cityData);
    }
  };

  if (locationPermissionError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{locationPermissionError}</Text>
        <Button title="Open Settings" onPress={Linking.openSettings} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  if (error || !weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Failed to fetch weather data</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.wrapper, Platform.OS === "ios" && styles.iosWrapper]}
      >
        <View style={styles.container}>
          <SearchBar onSearch={handleCitySearch} />
          <WeatherDisplay weather={weatherData} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  iosWrapper: {
    position: "relative",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});
