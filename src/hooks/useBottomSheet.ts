import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useBackHandler } from "@react-native-community/hooks";
import { useRef, useState } from "react";
import { Keyboard, type TextInput } from "react-native";

export const useBottomSheet = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const showSheet = () => {
    setIsDisplayed(true);
    bottomSheetModalRef.current?.present();
  };

  const hideSheet = () => {
    setIsDisplayed(false);
    Keyboard.dismiss();
    bottomSheetModalRef.current?.dismiss();
  };

  useBackHandler(() => {
    if (isDisplayed) {
      hideSheet();
      return true;
    }
    return false;
  });

  return { bottomSheetModalRef, showSheet, hideSheet, isDisplayed };
};

export const useBottomSheetWithAutoFocus = () => {
  const { bottomSheetModalRef, showSheet, hideSheet, isDisplayed } =
    useBottomSheet();
  const inputRef = useRef<TextInput>(null);

  const showSheetWithAutofocus = () => {
    showSheet();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  };

  return {
    bottomSheetModalRef,
    inputRef,
    showSheet: showSheetWithAutofocus,
    hideSheet,
    isDisplayed,
  };
};
