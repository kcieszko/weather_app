import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Button,
  Platform,
  Linking,
} from "react-native";
import { useLocation } from "@/hooks/useLocation";
import { useWeather } from "@/hooks/useWeather";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { fetchCityCoordinates } from "@/services/weatherApi";

export default function TabOneScreen() {
  const [searchCoords, setSearchCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { locationPermissionError, location, refreshLocation } = useLocation();

  const {
    data: weatherData,
    isLoading,
    error,
    refetch,
  } = useWeather({
    lat: searchCoords?.lat ?? location?.coords.latitude,
    lon: searchCoords?.lon ?? location?.coords.longitude,
  });

  useEffect(() => {
    if (!locationPermissionError && location) {
      refetch();
    }
  }, [locationPermissionError, location, refetch]);

  const handleCitySearch = async (city: string) => {
    const coordinates = await fetchCityCoordinates(city);
    if (coordinates) {
      setSearchCoords(coordinates);
    }
  };

  if (locationPermissionError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{locationPermissionError}</Text>
        <Button title="Open Settings" onPress={() => Linking.openSettings()} />
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
    <View style={styles.container}>
      <SearchBar onSearch={handleCitySearch} />
      <WeatherDisplay weather={weatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
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
