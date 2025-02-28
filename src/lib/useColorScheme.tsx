import { useSettingsStore } from "@/store/settingsStore";

export function useColorScheme() {
  const colorScheme = useSettingsStore((state) => state.theme);
  const setColorScheme = useSettingsStore((state) => state.setTheme);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return {
    colorScheme,
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
