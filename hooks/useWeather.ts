import { fetchWeather } from "@/services/weatherApi";
import { Coordinates } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

type UseWeatherOptions = Partial<Coordinates> & {
  cityName?: string;
};

export const useWeather = ({ lat, lon, cityName }: UseWeatherOptions) => {
  return useQuery({
    queryKey: ["weather", lat, lon, cityName],
    queryFn: () => {
      if (!lat || !lon) {
        throw new Error("No coordinates provided");
      }
      return fetchWeather({ lat, lon, cityName });
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
