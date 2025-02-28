import {
  ENTITLEMENT_ID,
  PRODUCT_IDS,
  REVENUECAT_API_KEY,
} from "@/config/revenuecat";
import { usePurchasesStore } from "@/store/purchasesStore";
import { useSettingsStore } from "@/store/settingsStore";
import * as Sentry from "@sentry/react-native";
import { useCallback, useEffect } from "react";
import Purchases, { PurchasesPackage } from "react-native-purchases";

export function usePurchases() {
  const {
    isInitialized,
    isLoading,
    packages,
    customerInfo,
    setIsInitialized,
    setIsLoading,
    setPackages,
    setCustomerInfo,
  } = usePurchasesStore();

  const setPremium = useSettingsStore((state) => state.setPremium);

  // Initialize RevenueCat
  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);

      // Configure RevenueCat
      Purchases.configure({ apiKey: REVENUECAT_API_KEY as string });

      try {
        // Try to get initial customer info
        const customerInfo = await Purchases.getCustomerInfo();
        const isPremium =
          customerInfo.entitlements.active[ENTITLEMENT_ID]?.isActive ?? false;
        setPremium(isPremium);
        setCustomerInfo(customerInfo);
      } catch (error) {
        Sentry.captureException(error, {
          level: "warning",
          tags: {
            action: "get_customer_info",
          },
        });
      }

      setIsInitialized(true);
      setIsLoading(false);

      // Setup subscriber for customer info updates
      Purchases.addCustomerInfoUpdateListener((info) => {
        const isPremium =
          info.entitlements.active[ENTITLEMENT_ID]?.isActive ?? false;
        setPremium(isPremium);
        setCustomerInfo(info);
      });
    } catch (error) {
      console.error("Failed to initialize purchases:", error);
      setIsLoading(false);
      throw error;
    }
  }, [setIsInitialized, setIsLoading, setCustomerInfo, setPremium]);

  // Fetch available packages
  const fetchPackages = useCallback(async () => {
    try {
      setIsLoading(true);
      const offerings = await Purchases.getOfferings();
      const availablePackages = offerings.current?.availablePackages ?? [];
      setPackages(availablePackages);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      setIsLoading(false);
      throw error;
    }
  }, [setIsLoading, setPackages]);

  // Purchase a package
  const purchasePackage = useCallback(
    async (packageToPurchase: PurchasesPackage) => {
      try {
        setIsLoading(true);
        const { customerInfo } = await Purchases.purchasePackage(
          packageToPurchase
        );
        const isPremium =
          customerInfo.entitlements.active[ENTITLEMENT_ID]?.isActive ?? false;
        setPremium(isPremium);
        setCustomerInfo(customerInfo);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    },
    [setIsLoading, setCustomerInfo, setPremium]
  );

  // Restore purchases
  const restorePurchases = useCallback(async () => {
    try {
      setIsLoading(true);
      const customerInfo = await Purchases.restorePurchases();
      const isPremium =
        customerInfo.entitlements.active[ENTITLEMENT_ID]?.isActive ?? false;
      setPremium(isPremium);
      setCustomerInfo(customerInfo);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, [setIsLoading, setCustomerInfo, setPremium]);

  // Initialize RevenueCat on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Fetch packages on mount if not already loaded
  useEffect(() => {
    if (isInitialized && packages.length === 0) {
      fetchPackages();
    }
  }, [isInitialized, packages.length, fetchPackages]);

  const availablePackages = {
    monthly: packages.find((pkg) => pkg.identifier === PRODUCT_IDS.monthly),
    yearly: packages.find((pkg) => pkg.identifier === PRODUCT_IDS.yearly),
    lifetime: packages.find((pkg) => pkg.identifier === PRODUCT_IDS.lifetime),
  };

  const purchase = useCallback(
    async (type: keyof typeof PRODUCT_IDS) => {
      const packageToPurchase = availablePackages[type];
      if (!packageToPurchase) {
        throw new Error(`Package ${type} not found`);
      }
      await purchasePackage(packageToPurchase);
    },
    [availablePackages, purchasePackage]
  );

  return {
    isInitialized,
    isLoading,
    packages: availablePackages,
    customerInfo,
    purchase,
    restorePurchases,
  };
}
