import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { WeatherResponse } from "@/types/weatherData";
import { useRouter } from "expo-router";

type Props = {
  weather: WeatherResponse;
};

export const FavouriteWeatherCard = ({ weather }: Props) => {
  const router = useRouter();
  const handlePress = () => {
    router.navigate({
      pathname: "/weather-details",
      params: {
        lat: weather.coord.lat,
        lon: weather.coord.lon,
        name: weather.name,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={[styles.internalContainer]}>
        <Text style={styles.city}>{weather.name}</Text>
        <View style={styles.row}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
          <Text style={styles.temperature}>
            {Math.round(weather.main.temp)}°C
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  internalContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 24,
    color: "#fff",
    marginLeft: 10,
  },
});
