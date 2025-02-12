import { ForecastDisplay } from "@/components/ForecastDisplay";
import { SearchBar } from "@/components/SearchBar";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useFavourites } from "@/hooks/useFavourites";
import { useLocation } from "@/hooks/useLocation";
import { useWeather, useForecast } from "@/hooks/useWeather";
import { fetchCityCoordinates } from "@/services/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    isLoading: isWeatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeather({
    lat: searchCoords?.lat ?? location?.coords.latitude,
    lon: searchCoords?.lon ?? location?.coords.longitude,
    cityName: searchCoords?.name,
  });

  const {
    data: forecastData,
    isLoading: isForecastLoading,
    error: forecastError,
  } = useForecast({
    lat: searchCoords?.lat ?? location?.coords.latitude,
    lon: searchCoords?.lon ?? location?.coords.longitude,
  });

  useEffect(() => {
    if (!locationPermissionError && location) {
      refetchWeather();
    }
  }, [locationPermissionError, location, refetchWeather]);

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

  if (isWeatherLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  if (weatherError || !weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Failed to fetch weather data</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.wrapper, Platform.OS === "ios" && styles.iosWrapper]}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar onSearch={handleCitySearch} />
        {weatherData && <WeatherDisplay weather={weatherData} />}
        {forecastData?.daily && !isForecastLoading && (
          <ForecastDisplay forecast={forecastData.daily.slice(1)} />
        )}
      </ScrollView>
    </SafeAreaView>
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
    width: "100%",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});
