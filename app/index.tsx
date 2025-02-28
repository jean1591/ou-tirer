import { FormattedMessage } from "react-intl";
import { Typography } from "@/components/Typography/Typography";
import { View } from "react-native";

export default function Index() {
  return (
    <View>
      <Typography.Text className="text-lg font-semibold text-white">
        <FormattedMessage
          id="settings.premium.title"
          defaultMessage="Upgrade to Premium"
        />
      </Typography.Text>
    </View>
  );
}
