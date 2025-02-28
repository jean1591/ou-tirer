import type { ExpoConfig } from "@expo/config";
import dotenv from "dotenv";
import path from "node:path";
import packageJson from "./package.json";

const env = process.env.NODE_ENV;

const environmentVariables = dotenv.config({
  path: path.resolve(`.env.${env}`),
}).parsed as NodeJS.ProcessEnv;

const projectId = environmentVariables.EAS_PROJECT_ID;

const config: ExpoConfig = {
  name: environmentVariables.APP_NAME,
  slug: "release-fast",
  version: packageJson.version,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  newArchEnabled: true,
  scheme: environmentVariables.PACKAGE_NAME,
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1b2f45",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: environmentVariables.PACKAGE_NAME,
    googleServicesFile: "./GoogleService-Info.plist",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  locales: {
    en: "./assets/translations/ios/en.json",
    fr: "./assets/translations/ios/fr.json",
    de: "./assets/translations/ios/de.json",
    es: "./assets/translations/ios/es.json",
    it: "./assets/translations/ios/it.json",
    pt: "./assets/translations/ios/pt.json",
  },
  android: {
    package: environmentVariables.PACKAGE_NAME,
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon.png",
      backgroundColor: "#1b2f45",
    },
  },
  plugins: [
    [
      "@sentry/react-native/expo",
      {
        organization: environmentVariables.SENTRY_ORG,
        project: environmentVariables.SENTRY_PROJECT,
      },
    ],
    "expo-router",
    "expo-font",
    "expo-localization",
    [
      "expo-notifications",
      {
        icon: "./assets/images/icon.png",
        color: "#ffffff",
        defaultChannel: "default",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
