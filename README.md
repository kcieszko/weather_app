# Weather App

This is a weather application built with Expo.

## Getting Started

Follow these instructions to run the application:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Create a `.env` file:**

    In the root directory, create a `.env` file and add your OpenWeatherMap API key:

    ```
    EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY=YOUR_API_KEY
    ```

    Replace `YOUR_API_KEY` with your actual API key from [OpenWeatherMap](https://openweathermap.org/).

3.  **Install dependencies:**

    In the root directory, run:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4.  **Start the application:**

    Run:

    ```bash
    npx expo start
    ```

    This will open the Expo development environment in your browser, where you can choose to run the app on an Android emulator, iOS simulator, or a physical device using the Expo Go app.

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

or

```bash
yarn test
```

This will execute the test suite and display the results.
