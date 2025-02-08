import { Text, View, StyleSheet } from "react-native";

import { useWeather } from "@/hooks/useWeather";
import { useLocation } from "@/hooks/useLocation";

export default function App() {
  const { locationPermissionError, location } = useLocation();
  const { data } = useWeather({
    lat: location?.coords.latitude,
    lon: location?.coords.longitude,
  });

  let text = "Waiting...";
  if (locationPermissionError) {
    text = locationPermissionError;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>{JSON.stringify(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
