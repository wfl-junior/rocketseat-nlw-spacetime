import { styled } from "nativewind";
import { Fragment } from "react";
import { ImageBackground, StatusBar, Text } from "react-native";
import bgBlur from "~/assets/bg-blur.png";
import Stripes from "~/assets/stripes.svg";

const StyledStripes = styled(Stripes);

interface MemoriesProps {}

function Memories({}: MemoriesProps): JSX.Element | null {
  return (
    <Fragment>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <ImageBackground
        source={bgBlur}
        className="bg-app-gray-900 relative flex-1 items-center justify-center px-8 py-6"
        imageStyle={{
          position: "absolute",
          left: "-100%",
        }}
      >
        <StyledStripes className="absolute left-2" />
        <Text className="font-title text-app-gray-50 text-3xl">Memories</Text>
      </ImageBackground>
    </Fragment>
  );
}

export default Memories;
