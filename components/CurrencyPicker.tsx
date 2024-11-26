import { Picker } from "@react-native-picker/picker";
import { StyleProp, View, ViewStyle } from "react-native";

export const CurrencyPickerOptions = {
  REAL: { nome: "Real", sigla: "BRL" },
  DOLAR: { nome: "Dólar", sigla: "USD" },
};

export type MoedaPickerValue = {
  nome: string;
  sigla: string;
};

type CurrencyPickerProps = {
  style?: StyleProp<ViewStyle>;
  currency?: MoedaPickerValue;
  onValueChange?: (value: MoedaPickerValue) => void;
};

export default function CurrencyPicker({
  style,
  currency,
  onValueChange,
}: CurrencyPickerProps) {
  return (
    <View style={style}>
      <Picker
        selectedValue={currency}
        onValueChange={(itemValue, _itemIndex) => onValueChange?.(itemValue)}
      >
        <Picker.Item label="Real" value={CurrencyPickerOptions.REAL} />
        <Picker.Item label="Dólar" value={CurrencyPickerOptions.DOLAR} />
      </Picker>
    </View>
  );
}
