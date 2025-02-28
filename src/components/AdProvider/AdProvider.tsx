import { useSettingsStore } from "@/store/settingsStore";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { useEffect, type PropsWithChildren } from "react";
import mobileAds, { AdsConsent } from "react-native-google-mobile-ads";

export function AdProvider({ children }: PropsWithChildren) {
  const isPremium = useSettingsStore((state) => state.isPremium);
  if (isPremium) return children;

  let isMobileAdsStartCalled = false;

  const requestAds = async () => {
    // Request an update for the consent information.
    AdsConsent.requestInfoUpdate().then(() => {
      AdsConsent.loadAndShowConsentFormIfRequired().then((adsConsentInfo) => {
        // Consent has been gathered.
        if (adsConsentInfo.canRequestAds) {
          startGoogleMobileAdsSDK();
        }
      });
    });

    // Check if you can initialize the Google Mobile Ads SDK in parallel
    // while checking for new consent information. Consent obtained in
    // the previous session can be used to request ads.
    // So you can start loading ads as soon as possible after your app launches.
    const { canRequestAds } = await AdsConsent.getConsentInfo();
    if (canRequestAds) {
      startGoogleMobileAdsSDK();
    }
  };

  const requestTrackingPermissions = async () => {
    await requestTrackingPermissionsAsync();
  };

  async function startGoogleMobileAdsSDK() {
    if (isMobileAdsStartCalled) return;

    isMobileAdsStartCalled = true;
    await mobileAds().initialize();
  }

  useEffect(() => {
    requestTrackingPermissions();
    requestAds();
  }, []);

  return children;
}
