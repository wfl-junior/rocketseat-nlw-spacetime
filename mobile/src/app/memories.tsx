import { Text, View } from "react-native";

interface MemoriesProps {}

function Memories({}: MemoriesProps): JSX.Element | null {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-title text-app-gray-50 text-center text-3xl">
        Memories
      </Text>
    </View>
  );
}

export default Memories;
