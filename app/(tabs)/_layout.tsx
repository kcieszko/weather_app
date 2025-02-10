import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
            },
            android: {
              elevation: 0,
              height: 60,
              paddingBottom: 8,
            },
          }),
          backgroundColor: "rgba(255,255,255,0.1)",
          borderTopColor: "transparent",
        },
        sceneStyle: { backgroundColor: "transparent" },
        tabBarLabelStyle: {
          ...Platform.select({
            android: {
              marginBottom: 4,
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Weather",
          tabBarIcon: ({ color, size }) => (
            <Feather name="sun" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
