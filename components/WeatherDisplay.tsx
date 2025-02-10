import { View, StyleSheet, Image, Text } from "react-native";
import { WeatherResponse } from "@/types/weatherData";

type Props = {
  weather: WeatherResponse;
};

export const WeatherDisplay = ({ weather }: Props) => {
  const windSpeedInKmh = Math.round(weather.wind.speed * 3.6);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
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
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  condition: {
    fontSize: 24,
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
});
