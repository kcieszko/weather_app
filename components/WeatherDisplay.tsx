import { View, StyleSheet, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WeatherResponse } from "@/types/weatherData";

type Props = {
  weather: WeatherResponse;
};

const getGradientColors = (
  condition: string,
  icon: string
): [string, string, ...string[]] => {
  const isNight = icon.endsWith("n");

  switch (condition.toLowerCase()) {
    case "clear":
      return isNight ? ["#1c1c1c", "#2c3e50"] : ["#4DA0B0", "#D39D38"];
    case "clouds":
      return isNight ? ["#2c3e50", "#3f4c6b"] : ["#606c88", "#3f4c6b"];
    case "rain":
    case "drizzle":
      return isNight ? ["#1F1C2C", "#4c6b8f"] : ["#616161", "#9bc5c3"];
    case "thunderstorm":
      return ["#232526", "#414345"];
    case "snow":
      return isNight ? ["#243949", "#517fa4"] : ["#E6DADA", "#274046"];
    default:
      return isNight ? ["#1c1c1c", "#2c3e50"] : ["#2193b0", "#6dd5ed"];
  }
};

const getIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
};

export const WeatherDisplay = ({ weather }: Props) => {
  const gradientColors = getGradientColors(
    weather.weather[0].main,
    weather.weather[0].icon
  );

  const windSpeedInKmh = Math.round(weather.wind.speed * 3.6);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
      <Image
        source={{
          uri: getIconUrl(weather.weather[0].icon),
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
