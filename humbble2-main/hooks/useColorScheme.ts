// export { useColorScheme } from 'react-native';
import { useTheme } from "../context/ThemeContext";

export function useColorScheme() {
  const { theme } = useTheme();
  return theme;
}
