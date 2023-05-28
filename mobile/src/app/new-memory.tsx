import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoHorizontal from "~/assets/logo-horizontal.svg";

interface NewMemoryProps {}

function NewMemory({}: NewMemoryProps): JSX.Element | null {
  const { top, bottom } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);

  function handleTogglePublic() {
    setIsPublic(is => !is);
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="flex-row items-center justify-between">
        <LogoHorizontal />

        <Link asChild href="/memories">
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-app-purple-500 aspect-square h-10 items-center justify-center rounded-full"
          >
            <Feather name="arrow-left" size={16} color="white" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="flex-1 gap-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
            trackColor={{
              false: "#767577",
              true: "#372560",
            }}
          />

          <TouchableOpacity activeOpacity={0.7} onPress={handleTogglePublic}>
            <Text className="font-body text-app-gray-200 text-base">
              Tornar memória pública
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="border-app-gray-500 h-32 items-center justify-center rounded-lg border border-dashed bg-black/20"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="image" color="white" />

            <Text className="font-body text-app-gray-200 text-sm">
              Adicionar foto ou vídeo de capa
            </Text>
          </View>
        </TouchableOpacity>

        <View className="flex-1">
          <TextInput
            multiline
            textAlignVertical="top"
            placeholderTextColor="#56565a"
            className="font-body text-app-gray-50 p-0 text-lg"
            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-app-green-500 mb-4 items-center self-end justify-self-end rounded-full px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase leading-none text-black">
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default NewMemory;
