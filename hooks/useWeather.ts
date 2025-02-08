import { fetchWeather } from "@/services/weatherApi";
import { Coordinates } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

type UseWeatherOptions = Partial<Coordinates>;

export const useWeather = ({ lat, lon }: UseWeatherOptions) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      if (lat === undefined || lon === undefined) {
        throw new Error("No coordinates provided");
      }
      return fetchWeather({ lat, lon });
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
