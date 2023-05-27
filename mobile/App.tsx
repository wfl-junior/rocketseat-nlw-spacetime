import { Fragment } from "react";
import { StatusBar, Text, View } from "react-native";

export default function App() {
  return (
    <Fragment>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <View className="flex-1 items-center justify-center bg-zinc-900">
        <Text className="text-center text-4xl font-bold text-zinc-100">
          Sua cápsula do tempo
        </Text>
      </View>
    </Fragment>
  );
}
