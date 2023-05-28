import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as ExpoSecureStore from "expo-secure-store";
import { styled } from "nativewind";
import { Fragment, useEffect } from "react";
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import bgBlur from "~/assets/bg-blur.png";
import LogoHorizontal from "~/assets/logo-horizontal.svg";
import Stripes from "~/assets/stripes.svg";
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

const StyledStripes = styled(Stripes);

function Home(): JSX.Element | null {
  const { push } = useRouter();
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

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

    api
      .post<RegisterResponse>("/auth/register", { code })
      .then(async ({ data }) => {
        await ExpoSecureStore.setItemAsync("accessToken", data.accessToken);
        push("/memories");
      })
      .catch(console.error);
  }, [response, push]);

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <Fragment>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <ImageBackground
        source={bgBlur}
        className="bg-app-gray-900 relative flex-1 items-center px-8 py-6"
        imageStyle={{
          position: "absolute",
          left: "-100%",
        }}
      >
        <StyledStripes className="absolute left-2" />

        <View className="flex-1 items-center justify-center gap-6">
          <LogoHorizontal />

          <View className="gap-2">
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
            onPress={() => signInWithGitHub()}
            className="bg-app-green-500 rounded-full px-5 py-2"
          >
            <Text className="font-alt text-sm uppercase leading-none text-black">
              Cadastrar Lembrança
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="font-body text-app-gray-200 text-center text-sm leading-relaxed">
          Feito com 💜 no NLW da Rocketseat
        </Text>
      </ImageBackground>
    </Fragment>
  );
}

export default Home;
