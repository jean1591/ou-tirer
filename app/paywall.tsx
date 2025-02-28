import { useSettingsStore } from "@/store/settingsStore";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Redirect } from "expo-router";

/*
 * This is a workaround to avoid displaying the Paywall when using Expo Go.
 * Once you have built a development client, remove this condition.
 * We don't display the paywall because Expo Go doesn't support RevenueCat, which will trigger errors.
 */
export default function PaywallScreen() {
  const onboardingCompleted = useSettingsStore(
    (state) => state.onboardingCompleted
  );
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    onboardingCompleted();
    return <Redirect href="/(tabs)" />;
  }
  const Paywall = require("@/screens/Paywall/Paywall").Paywall;
  return <Paywall />;
}
