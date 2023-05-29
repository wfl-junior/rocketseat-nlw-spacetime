import classNames from "classnames";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LogoHorizontal from "~/assets/logo-horizontal.svg";
import { ACCESS_TOKEN_STORE_NAME } from "~/constants";
import { api } from "~/lib/api";

const clientId = "e91bcadb597bb0eb208d";
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
};

interface RegisterResponse {
  accessToken: string;
}

function Home(): JSX.Element | null {
  const { push } = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [, response, signInWithGitHub] = useAuthRequest(
    {
      clientId,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({ scheme: "nlw-spacetime" }),
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type !== "success") return;
    const { code } = response.params;
    setIsSigningIn(true);

    api
      .post<RegisterResponse>("/auth/register", { code })
      .then(async ({ data }) => {
        await SecureStore.setItemAsync(
          ACCESS_TOKEN_STORE_NAME,
          data.accessToken,
        );

        push("/memories");
      })
      .catch(error => {
        console.error(error);
        setIsSigningIn(false);
      });
  }, [response, push]);

  return (
    <View className="flex-1 px-8 py-6">
      <View className="flex-1 items-center justify-center space-y-6">
        <LogoHorizontal />

        <View className="space-y-2">
          <Text className="font-title text-app-gray-50 text-center text-2xl leading-tight">
            Sua cápsula do tempo
          </Text>

          <Text className="font-body text-app-gray-100 text-center text-base leading-relaxed">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isSigningIn}
          onPress={() => signInWithGitHub()}
          className={classNames(
            "rounded-full px-5 py-2",
            isSigningIn ? "bg-app-gray-200" : "bg-app-green-500",
          )}
        >
          <Text className="font-alt text-sm uppercase leading-none text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="font-body text-app-gray-200 text-center text-sm leading-relaxed">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  );
}

export default Home;
