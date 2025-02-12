import { render, screen, fireEvent } from "@testing-library/react-native";
import { WeatherDisplay } from "../WeatherDisplay";
import { WeatherResponse } from "@/types/weatherData";

jest.mock("@expo/vector-icons", () => ({
  AntDesign: () => "AntDesign Icon Mock",
}));

const mockUseFavourites = {
  isFavourite: jest.fn(),
  addToFavourites: jest.fn(),
  removeFromFavourites: jest.fn(),
};

jest.mock("@/hooks/useFavourites", () => ({
  useFavourites: () => mockUseFavourites,
}));

const mockWeather: WeatherResponse = {
  name: "Warsaw",
  main: {
    temp: 20.5,
    feels_like: 19.8,
    humidity: 65,
    pressure: 1013,
    temp_min: 19,
    temp_max: 22,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      icon: "01d",
      description: "clear sky",
    },
  ],
  wind: {
    speed: 5,
    deg: 180,
  },
  coord: {
    lat: 52.23,
    lon: 21.01,
  },
  base: "stations",
  visibility: 10000,
  clouds: {
    all: 0,
  },
  dt: 1619017200,
  sys: {
    type: 1,
    id: 1234,
    country: "PL",
    sunrise: 1618978800,
    sunset: 1619027400,
  },
  timezone: 7200,
  id: 756135,
  cod: 200,
};

describe("WeatherDisplay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFavourites.isFavourite.mockReturnValue(false);
  });

  it("renders weather data correctly", () => {
    render(<WeatherDisplay weather={mockWeather} />);

    // Check if city name is displayed
    expect(screen.getByText("Warsaw")).toBeTruthy();

    // Check if temperature is rounded and displayed
    expect(screen.getByText("21°C")).toBeTruthy();

    // Check if weather description is displayed
    expect(screen.getByText("clear sky")).toBeTruthy();

    // Check if additional weather details are displayed
    expect(screen.getByText("Feels Like: 20°C")).toBeTruthy();
    expect(screen.getByText("Humidity: 65%")).toBeTruthy();
    expect(screen.getByText("Wind: 18 km/h")).toBeTruthy();
  });

  it("handles favourite button press for adding to favourites", () => {
    mockUseFavourites.isFavourite.mockReturnValue(false);
    render(<WeatherDisplay weather={mockWeather} />);

    const favouriteButton = screen.getByTestId("favourite-button");
    fireEvent.press(favouriteButton);

    expect(mockUseFavourites.addToFavourites).toHaveBeenCalledWith(mockWeather);
  });

  it("calls onRemoveFromFavourites when removing from favourites", async () => {
    mockUseFavourites.isFavourite.mockReturnValue(true);
    const onRemoveFromFavourites = jest.fn();

    render(
      <WeatherDisplay
        weather={mockWeather}
        onRemoveFromFavourites={onRemoveFromFavourites}
      />
    );

    const favouriteButton = screen.getByTestId("favourite-button");
    fireEvent.press(favouriteButton);

    await mockUseFavourites.removeFromFavourites(mockWeather.name);

    expect(mockUseFavourites.removeFromFavourites).toHaveBeenCalledWith(
      mockWeather.name
    );
    expect(onRemoveFromFavourites).toHaveBeenCalled();
  });
});
