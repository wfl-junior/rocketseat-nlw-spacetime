import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { SplashScreen, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { styled } from "nativewind";
import { Fragment, useEffect, useState } from "react";
import { ImageBackground, StatusBar } from "react-native";
import bgBlur from "~/assets/bg-blur.png";
import Stripes from "~/assets/stripes.svg";
import { ACCESS_TOKEN_STORE_NAME } from "~/constants";
import { AuthContextProvider } from "~/contexts/AuthContext";
import "~/lib/dayjs";

const StyledStripes = styled(Stripes);

interface LayoutProps {}

function Layout({}: LayoutProps): JSX.Element | null {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_STORE_NAME).then(accessToken => {
      setIsAuthenticated(Boolean(accessToken));
    });
  }, []);

  if (!hasLoadedFonts || isAuthenticated === null) {
    return <SplashScreen />;
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
        className="bg-app-gray-900 relative flex-1"
        imageStyle={{
          position: "absolute",
          left: "-100%",
        }}
      >
        <StyledStripes className="absolute left-2" />

        <AuthContextProvider setIsAuthenticated={setIsAuthenticated}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="index" redirect={isAuthenticated} />
            <Stack.Screen name="memories" />
            <Stack.Screen name="new-memory" />
          </Stack>
        </AuthContextProvider>
      </ImageBackground>
    </Fragment>
  );
}

export default Layout;
