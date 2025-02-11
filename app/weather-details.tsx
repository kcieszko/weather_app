import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { useWeather } from "@/hooks/useWeather";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeatherDetailsScreen() {
  const { lat, lon, name } = useLocalSearchParams<{
    lat: string;
    lon: string;
    name: string;
  }>();
  const router = useRouter();

  const { data: weatherData, isLoading } = useWeather({
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    cityName: name,
  });

  const handleRemoveFromFavourites = () => {
    router.back();
  };

  if (!weatherData || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <WeatherDisplay
          weather={weatherData}
          onRemoveFromFavourites={handleRemoveFromFavourites}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
});
