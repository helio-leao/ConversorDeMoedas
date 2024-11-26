import { useEffect, useState } from "react";
import { SafeAreaView, Text, StatusBar, StyleSheet, View } from "react-native";
import CurrencyPicker from "@/components/CurrencyPicker";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/Colors";
import CurrencyInput from "@/components/CurrencyInput";
import Separator from "@/components/Separator";
import axios, { AxiosError } from "axios";
import ApiMoedaType from "@/types/ApiMoedaType";
import DadosConversao from "@/types/DadosConversao";

const DEFAULT_VALOR_CONVERTIDO = "0.00";

export default function HomeScreen() {
  const [listaMoedas, setListaMoedas] = useState<ApiMoedaType>({});
  const [dadosConversao, setDadosConversao] = useState<DadosConversao | null>(
    null
  );

  const [valorOrigem, setValorOrigem] = useState("1");
  const [valorDestino, setValorDestino] = useState(DEFAULT_VALOR_CONVERTIDO);

  const [moedaOrigem, setMoedaOrigem] = useState("BRL");
  const [moedaDestino, setMoedaDestino] = useState("USD");

  useEffect(() => {
    async function fetchListaMoedas() {
      try {
        const { data } = await axios(
          "https://economia.awesomeapi.com.br/json/available/uniq"
        );
        setListaMoedas(data);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log("Error:", error.response.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
    fetchListaMoedas();
  }, []);

  useEffect(() => {
    async function fetchListaMoedas() {
      try {
        const { data } = await axios(
          `https://economia.awesomeapi.com.br/last/${moedaDestino}-${moedaOrigem}`
        );
        setDadosConversao(data[`${moedaDestino}${moedaOrigem}`]);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log("Error:", error.response.data);
        } else {
          console.error("Unexpected error:", error);
        }
        setDadosConversao(null);
      }
    }
    fetchListaMoedas();
  }, [moedaOrigem, moedaDestino]);

  useEffect(() => {
    const valorOrigemNumerico = Number(valorOrigem);

    if (dadosConversao == null || Number.isNaN(valorOrigemNumerico)) {
      setValorDestino(DEFAULT_VALOR_CONVERTIDO);
      return;
    }

    const cotacaoNumerica = Number(dadosConversao.high);
    const resultado = valorOrigemNumerico * cotacaoNumerica;

    setValorDestino(
      Number.isNaN(resultado) ? DEFAULT_VALOR_CONVERTIDO : resultado.toFixed(2)
    );
  }, [valorOrigem, dadosConversao]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />

      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <View style={styles.pickersContainer}>
        <CurrencyPicker
          style={styles.picker}
          currencyList={listaMoedas}
          currency={moedaOrigem}
          onValueChange={setMoedaOrigem}
        />

        <Entypo name="arrow-bold-right" size={50} color={colors.secondary} />

        <CurrencyPicker
          style={styles.picker}
          currencyList={listaMoedas}
          currency={moedaDestino}
          onValueChange={setMoedaDestino}
        />
      </View>

      <Separator />

      <View style={styles.inputsContainer}>
        <CurrencyInput
          siglaMoeda={moedaOrigem}
          nomeMoeda={listaMoedas[moedaOrigem]}
          value={valorOrigem}
          onChangeText={setValorOrigem}
        />

        <Separator />

        <CurrencyInput
          siglaMoeda={moedaDestino}
          nomeMoeda={listaMoedas[moedaDestino]}
          value={valorDestino}
          onChangeText={setValorDestino}
          editable={false}
        />
      </View>

      <Separator />

      {dadosConversao && (
        <View>
          <Text style={styles.subtitulo}>{dadosConversao.name}</Text>
          <Text style={[styles.subtitulo, { color: colors.secondary }]}>
            {dadosConversao.high}
          </Text>
        </View>
      )}
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
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: colors.secondary,
  },
  subtitulo: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
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
