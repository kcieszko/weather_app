import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";

type Props = {
  onSearch: (city: string) => void;
};

export const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const colorScheme = useColorScheme();

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? "light"].text }]}
        placeholder="Search city..."
        placeholderTextColor={Colors[colorScheme ?? "light"].icon}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Feather
          name="search"
          size={20}
          color={Colors[colorScheme ?? "light"].icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    padding: 5,
  },
});
