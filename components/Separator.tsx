import { colors } from "@/constants/Colors";
import { View } from "react-native";

export default function Separator() {
  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        height: 1,
        marginVertical: 26,
      }}
    />
  );
}
