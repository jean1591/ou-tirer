import { BottomSheet } from "@/components/BottomSheet/BottomSheet";
import { LanguageSelector } from "@/components/LanguagePicker/LanguagePicker";
import { Modal } from "@/components/Modal/Modal";
import { Typography } from "@/components/Typography/Typography";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { MoonStar } from "@/lib/icons/MoonStars";
import { useColorScheme } from "@/lib/useColorScheme";
import { useSettingsStore } from "@/store/settingsStore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Pressable, ScrollView, View } from "react-native";

export function SettingsScreen() {
  const { toggleColorScheme } = useColorScheme();
  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
  const { bottomSheetModalRef, showSheet, hideSheet } = useBottomSheet();
  const { theme, reset } = useSettingsStore();
  const version = Constants.expoConfig?.version ?? "1.0.0";

  const handleResetData = () => {
    reset();
    setIsResetModalOpen(false);
  };

  const handleLanguagePress = () => {
    showSheet();
  };

  const handleLanguageClose = () => {
    hideSheet();
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="gap-y-8">
        {/* Premium Section */}
        <Link href="/paywall" asChild>
          <Pressable className="rounded-xl shadow-lg overflow-hidden">
            <LinearGradient
              colors={["#8B5CF6", "#D946EF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-x-4 px-5 py-4">
                <View className="rounded-full bg-white/20 p-2">
                  <FontAwesome5 name="crown" size={24} color="gold" />
                </View>
                <View>
                  <Typography.Text className="text-lg font-semibold text-white">
                    <FormattedMessage
                      id="settings.premium.title"
                      defaultMessage="Upgrade to Premium"
                    />
                  </Typography.Text>
                  <Typography.Text className="text-sm text-white/90">
                    <FormattedMessage
                      id="settings.premium.description"
                      defaultMessage="Unlock all features"
                    />
                  </Typography.Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        </Link>

        {/* Language Section */}
        <View>
          <Typography.Text className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <FormattedMessage
              id="settings.language.title"
              defaultMessage="Language"
            />
          </Typography.Text>
          <Pressable
            onPress={handleLanguagePress}
            className="flex-row items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-900"
          >
            <View className="flex-row items-center gap-x-3">
              <FontAwesome5 name="language" size={20} color="#6B7280" />
              <Typography.Text>
                <FormattedMessage
                  id="settings.language.current"
                  defaultMessage="Select your language"
                />
              </Typography.Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#6B7280" />
          </Pressable>
        </View>

        {/* Theme Section */}
        <View>
          <Typography.Text className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <FormattedMessage
              id="settings.theme.title"
              defaultMessage="Appearance"
            />
          </Typography.Text>
          <Pressable onPress={toggleColorScheme}>
            <View className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-x-3">
                  <MoonStar size={24} color="#6B7280" />
                  <Typography.Text>
                    <FormattedMessage
                      id="settings.theme.darkMode"
                      defaultMessage="Dark Mode"
                    />
                  </Typography.Text>
                </View>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleColorScheme}
                />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Reset Data Section */}
        <View>
          <Typography.Text className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <FormattedMessage id="settings.data.title" defaultMessage="Data" />
          </Typography.Text>
          <Button
            onPress={() => setIsResetModalOpen(true)}
            variant="destructive"
            className="flex-row items-center justify-start gap-x-3"
          >
            <FontAwesome5 name="trash-alt" size={20} color="white" />
            <Typography.Text>
              <FormattedMessage
                id="settings.data.reset"
                defaultMessage="Reset All Data"
              />
            </Typography.Text>
          </Button>
        </View>

        {/* Version Info */}
        <View className="mt-auto">
          <Typography.Text className="text-center text-sm text-gray-500 dark:text-gray-400">
            <FormattedMessage
              id="settings.version"
              defaultMessage="Version {version}"
              values={{ version }}
            />
          </Typography.Text>
        </View>
      </View>
      {/* Language Bottom Sheet */}
      <BottomSheet ref={bottomSheetModalRef} className="p-4">
        <Typography.H2 className="mb-4 text-gray-900 dark:text-gray-100">
          <FormattedMessage
            id="settings.language.select"
            defaultMessage="Select Language"
          />
        </Typography.H2>
        <LanguageSelector onClose={handleLanguageClose} />
      </BottomSheet>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      >
        <Modal.Title>
          <FormattedMessage
            id="settings.data.reset.title"
            defaultMessage="Reset All Data"
          />
        </Modal.Title>
        <Modal.Body>
          <Typography.Text className="mb-4">
            <FormattedMessage
              id="settings.data.reset.description"
              defaultMessage="Are you sure you want to reset all data? This action cannot be undone."
            />
          </Typography.Text>
          <View className="flex-row justify-end gap-x-3">
            <Button
              variant="secondary"
              onPress={() => setIsResetModalOpen(false)}
            >
              <Typography.Text>
                <FormattedMessage
                  id="settings.data.reset.cancel"
                  defaultMessage="Cancel"
                />
              </Typography.Text>
            </Button>
            <Button variant="destructive" onPress={handleResetData}>
              <Typography.Text>
                <FormattedMessage
                  id="settings.data.reset.confirm"
                  defaultMessage="Reset"
                />
              </Typography.Text>
            </Button>
          </View>
        </Modal.Body>
      </Modal>
    </ScrollView>
  );
}
