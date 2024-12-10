import { Text, StyleSheet, TextInput, View } from "react-native";

type CurrencyInputProps = {
  nomeMoeda?: string;
  siglaMoeda?: string;
  value?: string;
  editable?: boolean;
  onChangeText?: (value: string) => void;
};

export default function CurrencyInput({
  nomeMoeda,
  siglaMoeda,
  value,
  editable,
  onChangeText,
}: CurrencyInputProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 18 }]}>{nomeMoeda}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <Text style={[styles.text, { fontSize: 28 }]}>{siglaMoeda}</Text>
        <TextInput
          style={[styles.input, { flexGrow: 1 }]}
          value={value}
          placeholder="999.99"
          onChangeText={onChangeText}
          keyboardType="numeric"
          editable={editable}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    fontSize: 16,
    fontFamily: "montserrat-medium",
  },
  text: {
    color: "white",
    fontFamily: "montserrat-medium",
  },
});
