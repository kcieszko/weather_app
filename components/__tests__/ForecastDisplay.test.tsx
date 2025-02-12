import { render, screen } from "@testing-library/react-native";
import { ForecastDisplay } from "../ForecastDisplay";

// Mock data
const mockForecast = [
  {
    dt: 1648339200, // Sunday
    temp: {
      min: 15,
      max: 25,
    },
    weather: [
      {
        icon: "01d",
        description: "clear sky",
      },
    ],
  },
  {
    dt: 1648425600, // Monday
    temp: {
      min: 14,
      max: 24,
    },
    weather: [
      {
        icon: "02d",
        description: "few clouds",
      },
    ],
  },
];

describe("ForecastDisplay", () => {
  it("renders forecast data correctly", () => {
    render(<ForecastDisplay forecast={mockForecast} />);

    // Check if title is rendered
    expect(screen.getByText("5-Day Forecast")).toBeTruthy();

    // Check if days are rendered
    expect(screen.getByText("Sun")).toBeTruthy();
    expect(screen.getByText("Mon")).toBeTruthy();

    // Check if temperatures are rendered
    expect(screen.getByText("Min: 15°")).toBeTruthy();
    expect(screen.getByText("Max: 25°")).toBeTruthy();
    expect(screen.getByText("Min: 14°")).toBeTruthy();
    expect(screen.getByText("Max: 24°")).toBeTruthy();
  });

  it("renders correct number of forecast items", () => {
    render(<ForecastDisplay forecast={mockForecast} />);
    const dayContainers = screen.getAllByTestId("day-container");
    expect(dayContainers.length).toBe(2);
  });
});
