import { StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWeatherStore, getBackgroundGradient } from "@/store/weatherStore";
import { useEffect, useRef } from "react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const BackgroundGradient = ({ children }: Props) => {
  const { weather, isNight } = useWeatherStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const prevGradientRef = useRef<[string, string]>(["#f7f7f7", "#e3e3e3"]);

  const currentGradient = getBackgroundGradient(
    weather?.weather[0]?.main,
    isNight
  );

  useEffect(() => {
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      prevGradientRef.current = currentGradient;
    });
  }, [currentGradient[0], currentGradient[1]]);

  return (
    <>
      <LinearGradient
        colors={prevGradientRef.current}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <LinearGradient
          colors={currentGradient}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
