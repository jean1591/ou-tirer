import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function StatsStep() {
  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 justify-center items-center p-6 gap-6"
    >
      <View className={`p-6 rounded-full`}>
        <FontAwesome5 name="file-export" size={48} color="#fff" />
      </View>
      <Text className={`text-2xl font-bold text-center`}>
        <FormattedMessage
          id="onboarding.stats.title"
          defaultMessage="Export Your Data"
        />
      </Text>
      <Text className={`text-center text-lg`}>
        <FormattedMessage
          id="onboarding.stats.description"
          defaultMessage="Export your counting history to CSV or Excel format for detailed analysis and backup."
        />
      </Text>
    </Animated.View>
  );
}
