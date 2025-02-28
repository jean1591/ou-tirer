import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerInfo, PurchasesPackage } from "react-native-purchases";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PurchasesStore {
  // State
  isInitialized: boolean;
  isLoading: boolean;
  packages: PurchasesPackage[];
  customerInfo: CustomerInfo | null;

  // Actions (only simple state updates)
  setIsInitialized: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setPackages: (packages: PurchasesPackage[]) => void;
  setCustomerInfo: (info: CustomerInfo | null) => void;
  reset: () => void;
}

const initialState = {
  isInitialized: false,
  isLoading: false,
  packages: [],
  customerInfo: null,
};

export const usePurchasesStore = create<PurchasesStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Simple state setters
      setIsInitialized: (isInitialized) => set({ isInitialized }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setPackages: (packages) => set({ packages }),
      setCustomerInfo: (customerInfo) => set({ customerInfo }),
      reset: () => set(initialState),
    }),
    {
      name: "purchases-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        packages: state.packages,
        customerInfo: state.customerInfo,
      }),
    }
  )
);
