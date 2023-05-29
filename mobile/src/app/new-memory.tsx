import { Feather } from "@expo/vector-icons";
import classNames from "classnames";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoHorizontal from "~/assets/logo-horizontal.svg";
import { ACCESS_TOKEN_STORE_NAME } from "~/constants";
import { api } from "~/lib/api";

interface NewMemoryProps {}

function NewMemory({}: NewMemoryProps): JSX.Element | null {
  const { push } = useRouter();
  const [content, setContent] = useState("");
  const { top, bottom } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function handleTogglePublic() {
    setIsPublic(is => !is);
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (result.canceled) return;

      const file = result.assets.at(0);
      if (!file) return;

      setPreview(file.uri);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateMemory() {
    setIsSubmitting(true);

    try {
      let coverUrl = "";
      const accessToken = await SecureStore.getItemAsync(
        ACCESS_TOKEN_STORE_NAME,
      );

      if (preview) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", {
          name: `image.${preview.split(".").pop()}`,
          type: "image/jpeg",
          uri: preview,
        } as any);

        const { data } = await api.post<{ fileUrl: string }>(
          "/upload",
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        coverUrl = data.fileUrl;
      }

      await api.post(
        "/memories",
        {
          coverUrl,
          content,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      push("/memories");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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

      <View className="flex-1 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            disabled={isSubmitting}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
            trackColor={{
              false: "#767577",
              true: "#372560",
            }}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isSubmitting}
            onPress={handleTogglePublic}
          >
            <Text className="font-body text-app-gray-200 text-base">
              Tornar memória pública
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isSubmitting}
          onPress={handleSelectImage}
          className="border-app-gray-500 h-32 items-center justify-center rounded-lg border border-dashed bg-black/20"
        >
          {preview ? (
            <Image
              alt=""
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Feather name="image" color="white" />

              <Text className="font-body text-app-gray-200 text-sm">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <TextInput
            multiline
            value={content}
            textAlignVertical="top"
            onChangeText={setContent}
            aria-disabled={isSubmitting}
            placeholderTextColor="#56565a"
            className="font-body text-app-gray-50 p-0 text-lg"
            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isSubmitting}
          onPress={handleCreateMemory}
          className={classNames(
            "mb-4 items-center self-end justify-self-end rounded-full px-5 py-2",
            isSubmitting ? "bg-app-gray-200" : "bg-app-green-500",
          )}
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
