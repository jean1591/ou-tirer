import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

import * as Sentry from "@sentry/react-native";

import { AppState, AppStateStatus, useColorScheme } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";

import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IntlProvider } from "@/providers/IntlProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { useSettingsStore } from "@/store/settingsStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay:
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient, // Only in native builds, not in Expo Go.
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const ref = useNavigationContainerRef();
  const incrementAppOpeningCount = useSettingsStore(
    (state) => state.incrementAppOpeningCount
  );
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    incrementAppOpeningCount();
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        incrementAppOpeningCount();
      }
    };

    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!loaded) {
    return null;
  }

  return (
    <AnalyticsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <IntlProvider>
          <ToastProvider>
            <BottomSheetModalProvider>
              <ThemeProvider value={DefaultTheme}>
                <RootLayoutNav />
              </ThemeProvider>
            </BottomSheetModalProvider>
          </ToastProvider>
        </IntlProvider>
      </GestureHandlerRootView>
    </AnalyticsProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
