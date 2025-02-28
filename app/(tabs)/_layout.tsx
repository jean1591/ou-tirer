import { useSettingsStore } from "@/store/settingsStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { defineMessages, useIntl } from "react-intl";

const tabTitles = defineMessages({
  home: {
    id: "tab.home",
    defaultMessage: "Home",
  },
  settings: {
    id: "tab.settings",
    defaultMessage: "Settings",
  },
});

export default function TabsLayout() {
  const { formatMessage } = useIntl();
  const isOnboarded = useSettingsStore((state) => state.isOnboarded);

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: formatMessage(tabTitles.home),
          tabBarIcon: ({ color }) => <FontAwesome5 icon="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: formatMessage(tabTitles.settings),
          tabBarIcon: ({ color }) => <FontAwesome5 icon="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
