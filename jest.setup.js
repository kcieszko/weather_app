jest.mock("@expo/vector-icons", () => ({
  AntDesign: function (props) {
    return {
      name: props.name,
      size: props.size,
      color: props.color,
    };
  },
}));

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(),
}));
