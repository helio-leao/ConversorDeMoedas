import { useEffect, useState } from "react";
import { SafeAreaView, Text, StatusBar, StyleSheet, View } from "react-native";
import CurrencyPicker from "@/components/CurrencyPicker";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/Colors";
import CurrencyInput from "@/components/CurrencyInput";
import Separator from "@/components/Separator";
import axios from "axios";
import ApiMoedaType from "@/types/ApiMoedaType";

export default function HomeScreen() {
  const [listaMoedas, setListaMoedas] = useState<ApiMoedaType>({});

  const [deValor, setDeValor] = useState("1");
  const [paraValor, setParaValor] = useState("1");

  const [deMoeda, setDeMoeda] = useState("BRL");
  const [paraMoeda, setParaMoeda] = useState("USD");

  useEffect(() => {
    async function fetchListaMoedas() {
      const { data: moedas } = await axios(
        "https://economia.awesomeapi.com.br/json/available/uniq"
      );
      setListaMoedas(moedas);
    }
    fetchListaMoedas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />

      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <View style={styles.pickersContainer}>
        <CurrencyPicker
          style={styles.picker}
          currencyList={listaMoedas}
          currency={deMoeda}
          onValueChange={setDeMoeda}
        />

        <Entypo name="arrow-bold-right" size={50} color={colors.secondary} />

        <CurrencyPicker
          style={styles.picker}
          currencyList={listaMoedas}
          currency={paraMoeda}
          onValueChange={setParaMoeda}
        />
      </View>

      <Separator />

      <View style={styles.inputsContainer}>
        <CurrencyInput
          siglaMoeda={deMoeda}
          nomeMoeda={listaMoedas[deMoeda]}
          value={deValor}
          onChangeText={setDeValor}
        />

        <Separator />

        <CurrencyInput
          siglaMoeda={paraMoeda}
          nomeMoeda={listaMoedas[paraMoeda]}
          value={paraValor}
          onChangeText={setParaValor}
          editable={false}
        />
      </View>

      <Separator />

      <View>
        <Text
          style={styles.subtitulo}
        >{`Cotação-${listaMoedas[paraMoeda]}`}</Text>
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
