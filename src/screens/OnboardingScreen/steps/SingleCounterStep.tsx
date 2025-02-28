import { Typography } from "@/components/Typography/Typography";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { FormattedMessage } from "react-intl";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function SingleCounterStep() {
  return (
    <Animated.View
      entering={FadeIn}
      className="flex-1 justify-center items-center p-6 gap-6"
    >
      <View className="p-6 rounded-full">
        <FontAwesome5 name="plus-circle" size={48} color="red" />
      </View>
      <Typography.H2 className="text-2xl font-bold text-center">
        <FormattedMessage
          id="onboarding.singleCounter.title"
          defaultMessage="Simple Counter"
        />
      </Typography.H2>
      <Typography.Text className="text-center text-lg">
        <FormattedMessage
          id="onboarding.singleCounter.description"
          defaultMessage="Keep track of anything with a simple tap. Perfect for counting repetitions, scores, or any other number you need to track."
        />
      </Typography.Text>
    </Animated.View>
  );
}
