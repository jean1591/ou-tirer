import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useSettingsStore } from "@/store/settingsStore";
import { useBackHandler } from "@react-native-community/hooks";
import { Stack, useRouter } from "expo-router";
import { requestReview } from "expo-store-review";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OnboardingHeader } from "./OnboardingHeader";
import { MultipleCountersStep } from "./steps/MultipleCountersStep";
import { SingleCounterStep } from "./steps/SingleCounterStep";
import { StatsStep } from "./steps/StatsStep";

export function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const onboardingCompleted = useSettingsStore(
    (state) => state.onboardingCompleted
  );
  const isPremium = useSettingsStore((state) => state.isPremium);
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const [isPaywallShown, setIsPaywallShown] = useState(false);

  const analytics = useAnalytics();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleComplete = async () => {
    analytics.track("onboarding_completed");
    if (isPaywallShown) {
      onboardingCompleted();
      if (isPremium) {
        requestReview();
      }
      router.replace("/(tabs)");
    } else {
      router.push("/paywall");
      setIsPaywallShown(true);
    }
  };

  const onboardingSteps = [
    {
      component: <SingleCounterStep />,
      buttonText: (
        <FormattedMessage id="onboarding.next" defaultMessage="Next" />
      ),
      canGoNext: true,
    },
    {
      component: <MultipleCountersStep />,
      buttonText: (
        <FormattedMessage id="onboarding.next" defaultMessage="Next" />
      ),
      canGoNext: true,
    },
    {
      component: <StatsStep />,
      buttonText: (
        <FormattedMessage
          id="onboarding.getStarted"
          defaultMessage="Get Started"
        />
      ),
      canGoNext: true,
    },
  ];

  const handlePrevious = () => {
    if (step > 0) {
      setTimeout(() => {
        setStep(step - 1);
      }, 10);
    } else {
      router.back();
    }
  };

  useBackHandler(() => {
    if (step > 0) {
      handlePrevious();
      return true;
    }
    return false;
  });

  useEffect(() => {
    analytics.track("onboarding_started");
  }, []);

  return (
    <View className={`flex-1 bg-background`}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <OnboardingHeader
              currentStep={step}
              steps={onboardingSteps.length}
              onBack={handlePrevious}
              scrollY={scrollY}
              setHeaderHeight={setHeaderHeight}
            />
          ),
        }}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerClassName="min-h-full"
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        {onboardingSteps[step].component}
      </Animated.ScrollView>
      {onboardingSteps[step].canGoNext && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          className="p-6"
          style={{ paddingBottom: insets.bottom + 24 }}
        >
          <Pressable
            onPress={() => {
              if (step === onboardingSteps.length - 1) {
                handleComplete();
              } else {
                setStep(step + 1);
              }
            }}
            className={`bg-primary p-4 rounded-xl active:opacity-80`}
          >
            <Text
              className={`text-primary-foreground text-center font-semibold text-lg`}
            >
              {onboardingSteps[step].buttonText}
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}
