import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function MultipleCountersStep() {
  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 justify-center items-center p-6 gap-6"
    >
      <View className={`p-6 rounded-full`}>
        <FontAwesome5 name="layer-group" size={48} color="#fff" />
      </View>
      <Text className={`text-2xl font-bold text-center`}>
        <FormattedMessage
          id="onboarding.multipleCounters.title"
          defaultMessage="Multiple Counters"
        />
      </Text>
      <Text className={`text-center text-lg`}>
        <FormattedMessage
          id="onboarding.multipleCounters.description"
          defaultMessage="Create and manage multiple counters at once. Give them different colors and names to stay organized."
        />
      </Text>
    </Animated.View>
  );
}
