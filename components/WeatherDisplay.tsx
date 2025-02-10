import { View, StyleSheet, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WeatherResponse } from "@/types/weatherData";

type Props = {
  weather: WeatherResponse;
};

const getGradientColors = (
  condition: string
): [string, string, ...string[]] => {
  switch (condition.toLowerCase()) {
    case "clear":
      return ["#4DA0B0", "#D39D38"];
    case "clouds":
      return ["#606c88", "#3f4c6b"];
    case "rain":
    case "drizzle":
      return ["#616161", "#9bc5c3"];
    case "thunderstorm":
      return ["#232526", "#414345"];
    case "snow":
      return ["#E6DADA", "#274046"];
    default:
      return ["#2193b0", "#6dd5ed"];
  }
};

export const WeatherDisplay = ({ weather }: Props) => {
  const gradientColors = getGradientColors(weather.weather[0].main);

  const windSpeedInKmh = Math.round(weather.wind.speed * 3.6);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  condition: {
    fontSize: 24,
    marginTop: 10,
    textTransform: "capitalize",
  },
  detailsContainer: {
    marginTop: 20,
    width: "100%",
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
  },
});
