import { useFavouritesStore } from "@/store/favouritesStore";

export const useFavourites = () => {
  const {
    favourites,
    loadFavourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  } = useFavouritesStore();

  return {
    favourites,
    loadFavourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  };
};

export type { FavouriteCity } from "@/store/favouritesStore";
