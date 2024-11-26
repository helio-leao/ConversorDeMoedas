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
      <View style={{ width: "20%" }}>
        <Text style={[styles.text, { fontSize: 30 }]}>{siglaMoeda}</Text>
        <Text style={styles.text}>{nomeMoeda}</Text>
      </View>
      <TextInput
        style={[styles.input, { flexGrow: 1 }]}
        value={value}
        placeholder="999.99"
        onChangeText={onChangeText}
        keyboardType="numeric"
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
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
