import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigationContainerRef } from "expo-router";
import { useEffect } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
// Import your global CSS file
import "../global.css";

import { IntlProvider } from "@/providers/IntlProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import {
  AppState,
  AppStateStatus,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { IAPProvider } from "@/providers/IAPProvider";
import { useSettingsStore } from "@/store/settingsStore";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { defineMessages } from "react-intl";
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
/* 
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  enableNativeFramesTracking:
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient,
}); */

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
      <IAPProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <IntlProvider>
            <ToastProvider>
              <BottomSheetModalProvider>
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <RootLayoutNav />
                </ThemeProvider>
              </BottomSheetModalProvider>
            </ToastProvider>
          </IntlProvider>
        </GestureHandlerRootView>
      </IAPProvider>
    </AnalyticsProvider>
  );
}

const headerMessages = defineMessages({
  stats: {
    id: "header.stats",
    defaultMessage: "Stats",
  },
});

function RootLayoutNav() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="paywall"
        options={{
          presentation: isTablet ? "fullScreenModal" : "modal",
        }}
      />
    </Stack>
  );
}
