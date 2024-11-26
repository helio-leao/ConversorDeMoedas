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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ width: "20%" }}>
        <Text style={styles.text}>{siglaMoeda}</Text>
        <Text style={styles.text}>{nomeMoeda}</Text>
      </View>
      <TextInput
        style={[styles.input, { flexGrow: 1 }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        editable={editable}
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
