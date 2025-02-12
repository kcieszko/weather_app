import { DailyForecast } from "@/types/weatherData";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Image } from "react-native";

type Props = {
  forecast: DailyForecast[];
};

export const ForecastDisplay = ({ forecast }: Props) => {
  const getDayName = (dt: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(dt * 1000).getDay()];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {forecast.map((day) => (
          <View key={day.dt} style={styles.dayContainer} testID="day-container">
            <Text style={styles.dayName}>{getDayName(day.dt)}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
              }}
              style={styles.icon}
            />
            <View style={styles.tempContainer}>
              <Text style={styles.tempMin}>
                Min: {Math.round(day.temp.min)}°
              </Text>
              <Text style={styles.tempMax}>
                Max: {Math.round(day.temp.max)}°
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  dayContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    minWidth: 60,
  },
  dayName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
  },
  tempContainer: {
    gap: 8,
  },
  tempMax: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tempMin: {
    color: "#rgba(255,255,255,0.7)",
    fontSize: 16,
  },
});
