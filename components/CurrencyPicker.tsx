import ApiMoedaType from "@/types/ApiMoedaType";
import { Picker } from "@react-native-picker/picker";
import { StyleProp, View, ViewStyle } from "react-native";

type CurrencyPickerProps = {
  currencyList: ApiMoedaType;
  style?: StyleProp<ViewStyle>;
  currency?: string;
  onValueChange?: (value: string) => void;
};

export default function CurrencyPicker({
  style,
  currencyList,
  currency,
  onValueChange,
}: CurrencyPickerProps) {
  return (
    <View style={style}>
      <Picker
        selectedValue={currency}
        onValueChange={(itemValue, _itemIndex) => onValueChange?.(itemValue)}
      >
        {Object.entries(currencyList).map(([key, value]) => (
          <Picker.Item key={key} label={key} value={key} />
        ))}
      </Picker>
    </View>
  );
}
