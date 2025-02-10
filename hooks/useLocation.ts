import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import { AppState } from "react-native";

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationPermissionError, setLocationPermissionError] = useState<
    string | null
  >(null);

  const checkPermissionsAndGetLocation = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationPermissionError("Permission to access location was denied");
        return null;
      }

      setLocationPermissionError(null);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      return location;
    } catch (error) {
      setLocationPermissionError("Error accessing location");
      return null;
    }
  }, []);

  useEffect(() => {
    checkPermissionsAndGetLocation();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkPermissionsAndGetLocation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [checkPermissionsAndGetLocation]);

  return {
    locationPermissionError,
    location,
    refreshLocation: checkPermissionsAndGetLocation,
  };
};
