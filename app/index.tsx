import { useState } from "react";
import { SafeAreaView, Text, StatusBar, StyleSheet, View } from "react-native";
import CurrencyPicker, {
  CurrencyPickerOptions,
  MoedaPickerValue,
} from "@/components/CurrencyPicker";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/Colors";
import CurrencyInput from "@/components/CurrencyInput";
import Separator from "@/components/Separator";

export default function HomeScreen() {
  const [deValor, setDeValor] = useState("1");
  const [paraValor, setParaValor] = useState("");

  const [deMoeda, setDeMoeda] = useState<MoedaPickerValue>(
    CurrencyPickerOptions.REAL
  );
  const [paraMoeda, setParaMoeda] = useState<MoedaPickerValue>(
    CurrencyPickerOptions.DOLAR
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />

      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <View style={styles.pickersContainer}>
        <CurrencyPicker
          style={styles.picker}
          currency={deMoeda}
          onValueChange={setDeMoeda}
        />

        <Entypo name="arrow-bold-right" size={50} color={colors.secondary} />

        <CurrencyPicker
          style={styles.picker}
          currency={paraMoeda}
          onValueChange={setParaMoeda}
        />
      </View>

      <Separator />

      <View style={styles.inputsContainer}>
        <CurrencyInput
          currencyData={deMoeda}
          value={deValor}
          onChangeText={setDeValor}
        />

        <Separator />

        <CurrencyInput
          currencyData={paraMoeda}
          value={paraValor}
          onChangeText={setParaValor}
        />
      </View>

      <Separator />

      <View>
        <Text style={styles.subtitulo}>{`Cotação-${paraMoeda.nome}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  titulo: {
    fontSize: 44,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: colors.secondary,
  },
  subtitulo: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  pickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picker: {
    backgroundColor: "white",
    width: "40%",
    borderRadius: 8,
  },
  inputsContainer: {},
});
