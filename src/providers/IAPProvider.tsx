import { usePurchases } from "@/hooks/usePurchases";
import { PropsWithChildren } from "react";
import Purchases from "react-native-purchases";

export function IAPProvider({ children }: PropsWithChildren) {
  // Use the hook instead of the store
  usePurchases();

  // Set log level based on environment
  Purchases.setLogLevel(
    __DEV__ ? Purchases.LOG_LEVEL.DEBUG : Purchases.LOG_LEVEL.INFO
  );

  return children;
}
