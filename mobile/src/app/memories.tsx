import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Link, useFocusEffect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoHorizontal from "~/assets/logo-horizontal.svg";
import { ACCESS_TOKEN_STORE_NAME, BACKEND_URL } from "~/constants";
import { useAuthContext } from "~/contexts/AuthContext";
import { api } from "~/lib/api";

interface MemoryPreview {
  id: string;
  excerpt: string;
  coverUrl: string;
  createdAt: string;
}

interface MemoriesProps {}

function Memories({}: MemoriesProps): JSX.Element | null {
  const { push } = useRouter();
  const { signOut } = useAuthContext();
  const { top, bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [memories, setMemories] = useState<MemoryPreview[]>([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      SecureStore.getItemAsync(ACCESS_TOKEN_STORE_NAME)
        .then(async accessToken => {
          const response = await api.get<{ memories: MemoryPreview[] }>(
            "/memories",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          setMemories(response.data.memories);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }, []),
  );

  async function handleSignOut() {
    await signOut();
    push("/");
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="flex-row items-center justify-between px-8">
        <LogoHorizontal />

        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSignOut}
            className="aspect-square h-10 items-center justify-center rounded-full bg-red-500"
          >
            <Feather name="log-out" size={16} color="black" />
          </TouchableOpacity>

          <Link asChild href="/new-memory">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-app-green-500 aspect-square h-10 items-center justify-center rounded-full"
            >
              <Feather name="plus" size={16} color="black" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {isLoading ? (
        <View className="mt-6 items-center">
          <ActivityIndicator size={40} color="#8257e5" />
        </View>
      ) : (
        <View className="mt-6 space-y-10">
          {memories.length === 0 ? (
            <Text className="text-app-gray-100 text-center text-sm leading-relaxed">
              Você ainda não registrou nenhuma lembrança
            </Text>
          ) : (
            memories.map(memory => (
              <View key={memory.id} className="space-y-4">
                <View className="flex-row items-center gap-2">
                  <View className="bg-app-gray-50 h-px w-5" />

                  <Text className="font-body text-app-gray-100 text-xs">
                    {dayjs(memory.createdAt).format("DD[ de ]MMMM[, ]YYYY")}
                  </Text>
                </View>

                <View className="space-y-4 px-8">
                  <Image
                    alt=""
                    className="aspect-video w-full rounded-lg"
                    source={{ uri: BACKEND_URL.concat(memory.coverUrl) }}
                  />

                  <Text className="font-body text-app-gray-100 text-base leading-relaxed">
                    {memory.excerpt}
                  </Text>

                  <Link href={`/memories/${memory.id}`} asChild>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className="flex-row items-center gap-2"
                    >
                      <Text className="font-body text-app-gray-200 text-sm">
                        Ler mais
                      </Text>

                      <Feather name="arrow-right" size={16} color="#9e9ea0" />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default Memories;
