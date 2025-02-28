import type { Locale } from "@/providers/IntlProvider";
import { useSettingsStore } from "@/store/settingsStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Text } from "../ui/text";

interface LanguageOption {
  name: string;
  isoCode: string;
  value: Locale;
}

export const availableLanguages: Record<Locale, LanguageOption> = {
  en: { name: "English", isoCode: "gb", value: "en" },
  fr: { name: "Français", isoCode: "fr", value: "fr" },
  de: { name: "Deutsch", isoCode: "de", value: "de" },
  es: { name: "Español", isoCode: "es", value: "es" },
  it: { name: "Italiano", isoCode: "it", value: "it" },
  pt: { name: "Português", isoCode: "pt", value: "pt" },
};

interface LanguageSelectorProps {
  onClose: () => void;
}

export function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const locale = useSettingsStore((state) => state.locale);
  const setLocale = useSettingsStore((state) => state.setLocale);

  return (
    <View>
      {Object.values(availableLanguages).map((item) => (
        <Pressable
          key={item.value}
          onPress={() => {
            setLocale(item.value);
            onClose();
          }}
        >
          <View className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center gap-4">
              <CountryFlag isoCode={item.isoCode} size={24} />
              <Text className={locale === item.value ? "font-bold" : ""}>
                {item.name}
              </Text>
            </View>
            {locale === item.value && (
              <FontAwesome5 name="check" size={20} color="#00ff00" />
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
}
