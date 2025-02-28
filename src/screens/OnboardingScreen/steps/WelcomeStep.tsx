import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [];

export function WelcomeStep() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(offset / slideSize);
    setCurrentSlide(slideIndex);
  };

  return (
    <View className="flex-1 mb-20">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={{ width }}
            className="items-center justify-center px-6"
          >
            <Text className="text-2xl mb-4 text-center">{slide.title}</Text>
            <Text className="text-center">{slide.description}</Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-center gap-x-2 pb-10">
        {slides.map((slide) => (
          <View
            key={slide.id}
            className={`h-2 w-2 rounded-full ${
              currentSlide === slide.id ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
