import { Text, StyleSheet, TextInput, View } from "react-native";
import { MoedaPickerValue } from "./CurrencyPicker";

type CurrencyInputProps = {
  currencyData?: MoedaPickerValue;
  value?: string;
  onChangeText?: (value: string) => void;
};

export default function CurrencyInput({
  currencyData,
  value,
  onChangeText,
}: CurrencyInputProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ width: "20%" }}>
        <Text style={styles.text}>{currencyData?.sigla}</Text>
        <Text style={styles.text}>{currencyData?.nome}</Text>
      </View>
      <TextInput
        style={[styles.input, { flexGrow: 1 }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    paddingHorizontal: 16,
    backgroundColor: "white",
    fontSize: 16,
  },
  text: {
    color: "white",
  },
});
