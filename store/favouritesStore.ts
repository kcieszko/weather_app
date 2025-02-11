import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherResponse } from "@/types/weatherData";

const FAVOURITES_KEY = "@weather_app_favourites";

export type FavouriteCity = {
  name: string;
  lat: number;
  lon: number;
};

type FavouritesStore = {
  favourites: FavouriteCity[];
  setFavourites: (favourites: FavouriteCity[]) => void;
  loadFavourites: () => Promise<void>;
  addToFavourites: (weather: WeatherResponse) => Promise<void>;
  removeFromFavourites: (cityName: string) => Promise<void>;
  isFavourite: (cityName: string) => boolean;
};

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
  favourites: [],
  setFavourites: (favourites) => set({ favourites }),

  loadFavourites: async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVOURITES_KEY);
      const parsedFavourites = stored ? JSON.parse(stored) : [];
      set({ favourites: parsedFavourites });
    } catch (error) {
      console.error("Error loading favourites:", error);
    }
  },

  addToFavourites: async (weather) => {
    try {
      const { favourites } = get();

      if (favourites.some((city) => city.name === weather.name)) {
        return;
      }

      const newFavourite: FavouriteCity = {
        name: weather.name,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      };

      favourites.push(newFavourite);
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
      set({ favourites });
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  },

  removeFromFavourites: async (cityName) => {
    try {
      const { favourites } = get();
      const newFavourites = favourites.filter((city) => city.name !== cityName);
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(newFavourites));
      set({ favourites: newFavourites });
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  },

  isFavourite: (cityName) => {
    const { favourites } = get();
    return favourites.some((city) => city.name === cityName);
  },
}));
