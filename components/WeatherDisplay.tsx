import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { WeatherResponse } from "@/types/weatherData";
import { useFavourites } from "@/hooks/useFavourites";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useMemo } from "react";

type Props = {
  weather: WeatherResponse;
  onRemoveFromFavourites?: () => void;
};

export const WeatherDisplay = ({ weather, onRemoveFromFavourites }: Props) => {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();
  const windSpeedInKmh = Math.round(weather.wind.speed * 3.6);
  const isFav = isFavourite(weather.name);

  const toggleFavourite = useCallback(async () => {
    if (isFav) {
      await removeFromFavourites(weather.name);
      onRemoveFromFavourites?.();
    } else {
      await addToFavourites(weather);
    }
  }, [
    isFav,
    weather,
    addToFavourites,
    removeFromFavourites,
    onRemoveFromFavourites,
  ]);

  const heartIcon = useMemo(() => {
    return (
      <AntDesign name={isFav ? "heart" : "hearto"} size={24} color="#fff" />
    );
  }, [isFav]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.city}>{weather.name}</Text>
        <TouchableOpacity
          onPress={toggleFavourite}
          style={styles.favouriteButton}
          testID="favourite-button"
        >
          {heartIcon}
        </TouchableOpacity>
      </View>
      <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
        }}
        style={styles.weatherIcon}
      />
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          Feels Like: {Math.round(weather.main.feels_like)}°C
        </Text>
        <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
        <Text style={styles.details}>Wind: {windSpeedInKmh} km/h</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  temperature: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  condition: {
    fontSize: 20,
    marginTop: 10,
    textTransform: "capitalize",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  detailsContainer: {
    marginTop: 20,
    width: "100%",
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  favouriteButton: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
});
