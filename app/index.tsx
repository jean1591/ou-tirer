import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stand, StandsResponse } from "typings/stands.type";

import { BottomSheet } from "@/components/BottomSheet/BottomSheet";
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

      {selectedIndex && standsResponse.results[selectedIndex] && (
        <BottomSheet ref={bottomSheetModalRef} className="p-4">
          <StandDetails stand={standsResponse.results[selectedIndex]} />
        </BottomSheet>
      )}
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
          {stand.inst_nom}
        </Text>

        <Text className="mt-1 capitalize text-base text-slate-300">
          {stand.equip_nom}
        </Text>

        <Text className="mt-1 capitalize text-base text-slate-300">
          {stand.inst_com_nom}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const StandDetails = ({ stand }: { stand: Stand }) => {
  const {
    inst_nom,
    equip_nom,
    inst_com_nom,
    inst_adresse,
    inst_cp,
    equip_douche,
    equip_sanit,
    equip_surf,
    equip_piste_nb,
    equip_pasdetir,
    equip_utilisateur,
  } = stand;

  console.log(JSON.stringify(stand, null, 2));

  return (
    <View className="px-4">
      <Text className="text-slate-100 font-bold text-2xl">{inst_nom}</Text>
      <Text className="mt-2 text-slate-100 text-lg">{equip_nom}</Text>

      {/* ADDRESS */}
      <Text className="mt-4 text-slate-300 text-lg capitalize">
        📍 {inst_adresse}, {inst_com_nom} {inst_cp}
      </Text>

      {/* SURFACE & ALLEYS */}
      <View className="mt-8 flex justify-between items-center flex-row">
        <View className="flex flex-row gap-1 justify-center items-center">
          <Text className="text-slate-300 text-lg font-bold">
            📏 {equip_surf}
          </Text>
          <Text className="text-slate-400 text-lg">m2</Text>
        </View>

        {equip_piste_nb > 0 && (
          <View className="flex flex-row gap-1 justify-center items-center">
            <Text className="text-slate-300 text-lg font-bold">
              🔫 {equip_piste_nb}
            </Text>
            <Text className="text-slate-400 text-lg">pistes</Text>
          </View>
        )}
      </View>

      {/* SHOWERS & TOILETS */}
      <View className="mt-4 flex justify-between items-center flex-row">
        <View className="flex items-center justify-center flex-row gap-2">
          <Text className="text-slate-400 text-lg">🛁 Douches:</Text>
          <Text className="text-slate-300 text-lg font-bold">
            {equip_douche ? "Oui" : "Non"}
          </Text>
        </View>
        <View className="flex items-center justify-center flex-row gap-2">
          <Text className="text-slate-400 text-lg">🚽 Sanitaires:</Text>
          <Text className="text-slate-300 text-lg font-bold">
            {equip_sanit ? "Oui" : "Non"}
          </Text>
        </View>
      </View>

      {/* RANGE */}
      {equip_pasdetir && (
        <View className="mt-8">
          <Text className="text-slate-100 text-xl font-bold mb-2">
            Equipements
          </Text>
          {equip_pasdetir &&
            JSON.parse(equip_pasdetir).map((distance: string) => (
              <View key={distance}>
                <Text className="text-slate-100 text-lg">{distance}</Text>
              </View>
            ))}
        </View>
      )}

      {/* USERS */}
      <View className="mt-8">
        <Text className="text-slate-100 text-xl font-bold mb-2">
          Utilisateurs
        </Text>
        {equip_utilisateur &&
          JSON.parse(equip_utilisateur).map((user: string) => (
            <View key={user}>
              <Text className="text-slate-100 text-lg">{user}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};
