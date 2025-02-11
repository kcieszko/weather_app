import { useFavourites } from "@/hooks/useFavourites";
import { fetchWeatherForFavourites } from "@/services/weatherApi";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FavouriteWeatherCard } from "./FavouriteWeatherCard";
import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "@/types/weatherData";
import { useCallback, useEffect } from "react";

export const FavouritesList = () => {
  const { favourites, loadFavourites } = useFavourites();

  const { data: favouriteWeathers, isLoading } = useQuery<
    WeatherResponse[],
    Error
  >({
    queryKey: ["favouriteWeathers", favourites],
    queryFn: () => fetchWeatherForFavourites(favourites),
    enabled: favourites.length > 0,
  });

  useEffect(() => {
    loadFavourites();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: WeatherResponse }) => (
      <FavouriteWeatherCard weather={item} />
    ),
    []
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!favouriteWeathers || favouriteWeathers.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noFavouritesText}>No favourite cities yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favouriteWeathers}
      keyExtractor={(item, index) => `${item.name}${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavouritesText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
