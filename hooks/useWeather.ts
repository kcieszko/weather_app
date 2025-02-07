import { useQuery } from "@tanstack/react-query";

const API_KEY = "c930517040b8f3151e26a7ac9b58ea99";

const fetchWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pl`
  );
  if (!res.ok) {
    throw new Error("Error getting weather data");
  }
  return res.json();
};

export const useWeather = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      if (lat === undefined || lon === undefined) {
        throw new Error("No coordinates provided");
      }
      return fetchWeather(lat, lon);
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
