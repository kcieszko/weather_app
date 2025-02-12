import { fetchWeather, fetchForecast } from "@/services/weatherApi";
import { Coordinates } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { WeatherResponse, ForecastResponse } from "@/types/weatherData";

type UseWeatherOptions = Partial<Coordinates> & {
  cityName?: string;
};

type UseQueryResult<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: any;
  refetch: () => void;
};

export const useWeather = ({
  lat,
  lon,
  cityName,
}: UseWeatherOptions): UseQueryResult<WeatherResponse> => {
  return useQuery({
    queryKey: ["weather", lat, lon, cityName],
    queryFn: () => {
      if (!lat || !lon) {
        return undefined;
      }
      return fetchWeather({ lat, lon, cityName });
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

type UseForecastOptions = Partial<Coordinates>;

export const useForecast = ({
  lat,
  lon,
}: UseForecastOptions): UseQueryResult<ForecastResponse> => {
  return useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: () => {
      if (!lat || !lon) {
        return undefined;
      }
      return fetchForecast({ lat, lon });
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
