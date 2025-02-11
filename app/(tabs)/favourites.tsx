import { StyleSheet } from "react-native";
import { FavouritesList } from "@/components/FavouritesList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavouritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FavouritesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
