import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stand, StandsResponse } from "typings/stands.type";

import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import standsMock from "../assets/mock/stands.mock.json";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useState } from "react";

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
      <View className="flex items-center flex-row justify-start gap-8">
        <Text className="font-bold text-xl text-slate-300">Stands de tir</Text>
      </View>

      <View className="mt-8">
        <Text className="text-slate-400">Rechercher un stand</Text>
        <TextInput className="text-sm bg-slate-700 rounded-xl mt-4" />
      </View>

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
      />
    </SafeAreaView>
  );
}

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
      className="rounded-3xl overflow-hidden"
    >
      <LinearGradient
        colors={["#1e293b", "#374151", "#0f172a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl py-4 px-8"
      >
        <Text className="capitalize text-slate-100 text-lg font-semibold tracking-tight">
          {stand.equip_nom}
        </Text>

        <Text className="mt-1 capitalize text-base text-slate-300">
          {stand.inst_com_nom}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
