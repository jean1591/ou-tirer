import { useSettingsStore } from "@/store/settingsStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { isOnboarded } = useSettingsStore();

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
