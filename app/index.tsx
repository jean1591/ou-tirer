import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Stand, StandsResponse } from "typings/stands.type";

import { BottomSheet } from "@/components/BottomSheet/BottomSheet";
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
          <View className="flex items-center justify-center bg-green-500/10 w-12 h-12 rounded-full">
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

        <Text className="bg-green-500/10 font-medium text-green-700 px-4 rounded-full">
          {stand.equip_nature}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const StandDetails = ({ stand }: { stand: Stand }) => {
  const {
    dep_nom,
    equip_nature,
    equip_nom,
    equip_type_name,
    inst_adresse,
    inst_com_nom,
    inst_cp,
    inst_nom,
    reg_nom,
    equip_sol,
    equip_piste_nb,
    equip_surf,
    equip_aps_nom,
    equip_long,
    equip_larg,
    equip_haut,
    inst_acc_handi_bool,
    equip_ouv_public_bool,
    equip_sanit,
    equip_douche,
    equip_eclair,
  } = stand;

  const isHandicapAccessible = inst_acc_handi_bool === "true";
  const isPublicAccess = equip_ouv_public_bool === "true";
  const hasSanitaryFacilities = equip_sanit === "true";
  const hasShowers = equip_douche === "true";
  const hasLighting = equip_eclair === "true";

  return (
    <View className="px-4">
      <View className="flex flex-row gap-2 justify-start items-center">
        <Text className="bg-green-500/10 font-medium text-green-700 px-4 rounded-full">
          {equip_type_name}
        </Text>
        <Text className="bg-gray-400/10 font-medium text-gray-700 px-4 rounded-full">
          {equip_nature}
        </Text>
      </View>

      <Text className="mt-4 font-bold text-3xl">{equip_nom}</Text>
      <Text className="capitalize mt-1 text-slate-500 text-lg">{inst_nom}</Text>

      {/* ADDRESS */}
      <View className="mt-8 rounded-xl bg-gray-400/10 w-full flex-row gap-4 flex justify-start items-start p-4">
        <View className="flex items-center justify-center h-12 w-12 bg-green-500/10 rounded-full">
          <Ionicons name="location-outline" size={24} color="#15803d" />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold">Adresse</Text>
          <Text className="capitalize text-slate-500 text-lg">
            {inst_adresse}, {inst_cp} {inst_com_nom}
          </Text>
          <Text className="capitalize text-slate-500">
            {dep_nom}, {reg_nom}
          </Text>
        </View>
      </View>

      {/* SPECS */}
      <View className="mt-8">
        <Text className="text-lg font-bold">Caractéristiques</Text>
        <View className="mt-4 flex items-center justify-between gap-2 flex-row">
          <View className="flex-1 rounded-xl bg-gray-400/10 py-2 px-4">
            <Text className="text-slate-500">Type de sol</Text>
            <Text className="font-bold text-lg">{equip_sol}</Text>
          </View>
          <View className="flex-1 rounded-xl bg-gray-400/10 py-2 px-4">
            <Text className="text-slate-500">Pistes</Text>
            <Text className="font-bold text-lg">{equip_piste_nb}</Text>
          </View>
        </View>
        <View className="mt-2 flex items-center justify-between gap-2 flex-row">
          <View className="flex-1 h-full rounded-xl bg-gray-400/10 py-2 px-4">
            <Text className="text-slate-500">Surface</Text>
            <Text className="font-bold text-lg">{equip_surf} m²</Text>
          </View>
          <View className="flex-1 h-full rounded-xl bg-gray-400/10 py-2 px-4">
            <Text className="text-slate-500">Sport</Text>
            <Text className="font-bold text-lg">
              {equip_aps_nom.join(", ")}
            </Text>
          </View>
        </View>
      </View>

      {/* DIMENSIONS */}
      {(equip_long || equip_larg || equip_haut) && (
        <View className="mt-8">
          <Text className="text-lg font-bold">Dimensions</Text>
          <View className="mt-4 rounded-xl bg-gray-400/10 py-2 px-4 flex justify-between items-center flex-row">
            {equip_long && (
              <View className="flex-1">
                <Text className="text-slate-500">Longueur</Text>
                <Text className="font-bold text-lg">{equip_long} m</Text>
              </View>
            )}
            {equip_larg && (
              <View className="flex-1">
                <Text className="text-slate-500">Largeur</Text>
                <Text className="font-bold text-lg">{equip_larg} m</Text>
              </View>
            )}
            {equip_haut && (
              <View className="flex-1">
                <Text className="text-slate-500">Hauteur</Text>
                <Text className="font-bold text-lg">{equip_haut} m</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* ACCESS */}
      <View className="mt-8">
        <Text className="text-lg font-bold">Accès et équipements</Text>

        <View className="mt-4 flex flex-row items-center justify-between">
          <View className="flex items-center justify-start gap-4 flex-1 flex-row">
            <View className="flex items-center justify-center h-12 w-12 bg-green-500/10 rounded-full">
              <FontAwesome name="wheelchair" size={24} color="#15803d" />
            </View>
            <Text className="font-bold text-lg">Accès handicapé</Text>
          </View>

          {isHandicapAccessible ? (
            <Text className="bg-green-500/10 font-medium text-green-700 px-4 rounded-full">
              Oui
            </Text>
          ) : (
            <Text className="bg-amber-500/10 font-medium text-amber-700 px-4 rounded-full">
              Non
            </Text>
          )}
        </View>

        <View className="mt-4 flex flex-row items-center justify-between">
          <View className="flex items-center justify-start gap-4 flex-1 flex-row">
            <View className="flex items-center justify-center h-12 w-12 bg-green-500/10 rounded-full">
              <FontAwesome name="user-o" size={24} color="#15803d" />
            </View>

            <Text className="font-bold text-lg">Ouvert au public</Text>
          </View>

          {isPublicAccess ? (
            <Text className="bg-green-500/10 font-medium text-green-700 px-4 rounded-full">
              Oui
            </Text>
          ) : (
            <Text className="bg-amber-500/10 font-medium text-amber-700 px-4 rounded-full">
              Privé
            </Text>
          )}
        </View>

        <View className="mt-8 flex items-center justify-center gap-2 flex-row">
          <View className="p-2 flex-1 bg-gray-400/10 rounded-xl flex flex-col justify-center items-center gap-2">
            <View
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                hasSanitaryFacilities ? "bg-green-500/10" : "bg-gray-400/10"
              }`}
            >
              <Ionicons
                name={hasSanitaryFacilities ? "checkmark" : "ban"}
                size={16}
                color={hasSanitaryFacilities ? "#15803d" : "#374151"}
              />
            </View>
            <Text className="text-slate-500">Sanitaires</Text>
          </View>

          <View className="p-2 flex-1 bg-gray-400/10 rounded-xl flex flex-col justify-center items-center gap-2">
            <View
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                hasShowers ? "bg-green-500/10" : "bg-gray-400/10"
              }`}
            >
              <Ionicons
                name={hasShowers ? "checkmark" : "ban"}
                size={16}
                color={hasShowers ? "#15803d" : "#374151"}
              />
            </View>
            <Text className="text-slate-500">Douches</Text>
          </View>

          <View className="p-2 flex-1 bg-gray-400/10 rounded-xl flex flex-col justify-center items-center gap-2">
            <View
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                hasLighting ? "bg-green-500/10" : "bg-gray-400/10"
              }`}
            >
              <Ionicons
                name={hasLighting ? "checkmark" : "ban"}
                size={16}
                color={hasLighting ? "#15803d" : "#374151"}
              />
            </View>
            <Text className="text-slate-500">Éclairage</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
