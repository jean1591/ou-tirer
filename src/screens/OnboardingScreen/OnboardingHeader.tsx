import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Pressable, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  FadeOutLeft,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface OnboardingHeaderProps {
  steps: number;
  currentStep: number;
  onBack?: () => void;
  showBackButton?: boolean;
  scrollY: SharedValue<number>;
  setHeaderHeight: (height: number) => void;
}

export function OnboardingHeader({
  steps,
  currentStep,
  onBack,
  showBackButton = true,
  scrollY,
  setHeaderHeight,
}: OnboardingHeaderProps) {
  const scale = useSharedValue(1);
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const blurAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 80 * 0.5, 80],
      [0, 0.5, 1],
      "clamp"
    );

    return {
      opacity,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View
      className="w-full flex-row items-center px-4 py-6"
      style={{
        paddingTop: insets.top + 24,
      }}
      onLayout={(event) => {
        setHeaderHeight(event.nativeEvent.layout.height);
      }}
    >
      <View className="flex-1 flex-row justify-between items-center">
        {showBackButton && currentStep > 0 && (
          <Animated.View
            entering={FadeInLeft}
            exiting={FadeOut}
            className="absolute left-4 z-10"
          >
            <Pressable
              onPress={onBack}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              className="p-2 -ml-2"
            >
              <Animated.View style={animatedStyle}>
                <Ionicons name="chevron-back" size={28} color="#0084ff" />
              </Animated.View>
            </Pressable>
          </Animated.View>
        )}

        <View className="flex-1 flex-row items-center justify-center gap-x-2">
          {Array.from({ length: steps }).map((_, index) => (
            <Animated.View
              key={`step-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className={cn(
                "h-2 rounded-full overflow-hidden bg-gray-300",
                index <= currentStep ? "w-8" : "w-6"
              )}
              layout={LinearTransition.springify()}
              entering={FadeInLeft.delay(index * 100)}
              exiting={FadeOutLeft.delay(index * 100)}
            >
              {index <= currentStep && (
                <Animated.View
                  className="flex-1 bg-blue-500"
                  entering={FadeIn}
                  exiting={FadeOut}
                />
              )}
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );
}
