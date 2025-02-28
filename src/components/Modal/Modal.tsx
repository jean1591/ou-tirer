import { Text } from "@/components/ui/text";
import { useBackHandler } from "@react-native-community/hooks";
import { BlurView } from "expo-blur";
import type { PropsWithChildren } from "react";
import { Pressable, Modal as RNModal, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export function ModalTitle({ children }: PropsWithChildren) {
  return <Text className="text-xl font-bold mb-4">{children}</Text>;
}

export function ModalBody({ children }: PropsWithChildren) {
  return <View className="mb-4">{children}</View>;
}

export function ModalFooter({ children }: PropsWithChildren) {
  return <View className="flex-row justify-end gap-x-3">{children}</View>;
}

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  });

  if (!isOpen) return null;

  return (
    <RNModal
      animationType="none"
      transparent
      visible={isOpen}
      onRequestClose={onClose}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        className="flex-1 bg-black/50"
      >
        <Pressable onPress={onClose} className="flex-1">
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={30}
            tint="dark"
            className="flex-1 justify-center"
          >
            <Pressable>
              <View className="w-[90%] bg-background p-4 rounded-xl self-center">
                {children}
              </View>
            </Pressable>
          </BlurView>
        </Pressable>
      </Animated.View>
    </RNModal>
  );
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
