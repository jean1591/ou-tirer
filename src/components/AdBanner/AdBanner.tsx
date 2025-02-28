import { useRef } from "react";
import { Platform, useWindowDimensions } from "react-native";
import {
  BannerAd,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

const adMobID = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios"
  ? process.env.EXPO_PUBLIC_IOS_AD_BANNER_ID
  : process.env.EXPO_PUBLIC_ANDROID_AD_BANNER_ID;

export function AdBanner() {
  const { width } = useWindowDimensions();
  const bannerSize = `${Math.floor(width)}x60`;
  const bannerRef = useRef<BannerAd>(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  return <BannerAd ref={bannerRef} size={bannerSize} unitId={adMobID} />;
}
