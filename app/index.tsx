import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stand, StandsResponse } from "typings/stands.type";

import { BottomSheet } from "@/components/BottomSheet/BottomSheet";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import standsMock from "../assets/mock/stands.mock.json";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useState } from "react";

const getSportIcon = (range: Stand) => {
  if (
    range.equip_aps_nom.some((sport) =>
      sport.toLowerCase().includes("carabine")
    )
  ) {
    return "🎯";
  } else if (
    range.equip_aps_nom.some((sport) => sport.toLowerCase().includes("arc"))
  ) {
    return "🏹";
  } else {
    return "🔫";
  }
};

export default function Index() {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const standsResponse = standsMock as unknown as StandsResponse;
  const { bottomSheetModalRef, showSheet } = useBottomSheet();

  const handleOnPress = (index: number) => {
    setSelectedIndex(index);
    showSheet();
  };

  return (
    <SafeAreaView className="p-8">
      <FlatList
        data={standsResponse.results}
        renderItem={({ item, index }) => (
          <StandListItem
            stand={item}
            handleOnPress={() => handleOnPress(index)}
          />
        )}
        keyExtractor={(item) => item.equip_numero}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex gap-4 mt-8"
        ListHeaderComponent={<Header />}
      />

      {selectedIndex && standsResponse.results[selectedIndex] && (
        <BottomSheet ref={bottomSheetModalRef} className="p-4">
          <StandDetails stand={standsResponse.results[selectedIndex]} />
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}

const Header = () => {
  return (
    <View className="mb-8">
      <View className="flex items-center flex-row justify-start gap-2">
        <FontAwesome name="bullseye" size={28} color="#1e293b" />
        <Text className="font-bold text-3xl text-slate-800">Stands de tir</Text>
      </View>

      <View className="mt-12 flex flex-row gap-2 justify-start items-center bg-slate-200 rounded-full py-2 pl-4">
        <MaterialCommunityIcons name="magnify" size={24} color="#64748b" />
        <TextInput
          className="text-sm"
          placeholder="Entrez un numéro de département"
        />
      </View>
    </View>
  );
};

const StandListItem = ({
  stand,
  handleOnPress,
}: {
  stand: Stand;
  handleOnPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      className="rounded-xl p-4 bg-slate-100 border border-slate-200"
    >
      <View className="flex items-center justify-between gap-4 flex-row">
        <View className="flex flex-row justify-start items-center gap-4">
          <View className="flex items-center justify-center bg-slate-200 w-12 h-12 rounded-full">
            <Text className="text-lg">{getSportIcon(stand)}</Text>
          </View>

          <View>
            <Text className="capitalize truncate text-lg font-semibold tracking-tight">
              {stand.equip_nom}
            </Text>

            <Text className="mt-1 capitalize truncate text-slate-500 text-base">
              {stand.inst_cp} {stand.inst_com_nom}
            </Text>
          </View>
        </View>

        <Text className="bg-green-200 font-medium text-green-700 px-4 rounded-full">
          {stand.equip_nature}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const StandDetails = ({ stand }: { stand: Stand }) => {
  const {} = stand;

  return <View className="px-4"></View>;
};
