import { StyleSheet, Text, View } from "react-native";

export default function FavouritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favourites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
