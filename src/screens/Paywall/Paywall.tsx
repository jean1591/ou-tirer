import { useSettingsStore } from "@/store/settingsStore";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Pressable, Text, View, useColorScheme } from "react-native";
import Purchases, { type PurchasesPackage } from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const features = [
  {
    icon: "chart-bar",
    color: "bg-blue-500",
    messageId: "paywall.feature.stats",
    titleId: "paywall.feature.stats.title",
    defaultTitle: "Advanced Statistics",
    defaultMessage:
      "Access detailed statistics and track your progress over time.",
  },
  {
    icon: "file-export",
    color: "bg-green-500",
    messageId: "paywall.feature.export",
    titleId: "paywall.feature.export.title",
    defaultTitle: "Export Data",
    defaultMessage:
      "Export your counting history to Excel for deeper analysis.",
  },
  {
    icon: "ad",
    color: "bg-orange-500",
    messageId: "paywall.feature.noads",
    titleId: "paywall.feature.noads.title",
    defaultTitle: "Remove Ads",
    defaultMessage: "Enjoy an ad-free experience, forever.",
  },
] as const;

export function Paywall() {
  const insets = useSafeAreaInsets();
  const setPremium = useSettingsStore((state) => state.setPremium);
  const [purchasePackage, setPackages] = useState<PurchasesPackage>();

  const handlePurchase = async () => {
    if (!purchasePackage) return;
    const { customerInfo } = await Purchases.purchasePackage(purchasePackage);

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setPremium(true);
      router.back();
    }
  };

  const handleRestore = async () => {
    const customerInfo = await Purchases.restorePurchases();

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setPremium(true);
      router.back();
    }
  };

  const getPackages = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        setPackages(offerings.current.availablePackages[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  const colorScheme = useColorScheme();

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
      className={`flex-1 bg-background`}
    >
      <View className="flex-1 p-4 gap-y-4">
        {/* Header */}
        <View className="items-center gap-y-2 px-8">
          <Text className={`text-4xl font-bold text-center`}>
            <FormattedMessage
              id="paywall.title"
              defaultMessage="Get the Pro version"
            />
          </Text>
          <Text className={`text-lg text-center`}>
            <FormattedMessage
              id="paywall.subtitle"
              defaultMessage="Unlock all features and remove ads"
            />
          </Text>
          <View className="absolute top-1 right-0">
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="close"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Pressable>
          </View>
        </View>

        {/* Features */}
        <View className="gap-y-2">
          {features.map((feature) => (
            <View key={feature.messageId} className="p-4 justify-center">
              <View className="flex-row justify-center gap-x-4">
                <View
                  className={`${feature.color} w-12 h-12 rounded-full items-center justify-center`}
                >
                  <FontAwesome5 name={feature.icon} size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className={`font-bold text-lg`}>
                    <FormattedMessage
                      id={feature.titleId}
                      defaultMessage={feature.defaultTitle}
                    />
                  </Text>
                  <Text>
                    <FormattedMessage
                      id={feature.messageId}
                      defaultMessage={feature.defaultMessage}
                    />
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View className="flex-1 justify-end gap-y-4 pb-4">
          <View className="items-center">
            <Text className={`text-lg opacity-60`}>
              <FormattedMessage
                id="paywall.lifetime"
                defaultMessage="Lifetime access for just {price}"
                values={{
                  price: purchasePackage?.product.priceString,
                }}
              />
            </Text>
          </View>
          <Pressable
            onPress={handlePurchase}
            className={`p-4 rounded-xl active:opacity-80`}
          >
            <Text className="text-white font-bold text-center text-lg">
              <FormattedMessage
                id="paywall.continue"
                defaultMessage="Continue"
              />
            </Text>
          </Pressable>

          <Pressable onPress={handleRestore} className="p-4 active:opacity-80">
            <Text className={`text-center text-blue-500`}>
              <FormattedMessage
                id="paywall.restore"
                defaultMessage="Restore Purchase"
              />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
