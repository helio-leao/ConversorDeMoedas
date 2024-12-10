import { useEffect, useState } from "react";
import { SafeAreaView, Text, StatusBar, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/constants/Colors";
import CurrencyInput from "@/components/CurrencyInput";
import Separator from "@/components/Separator";
import axios, { AxiosError } from "axios";
import ApiMoedaType from "@/types/ApiMoedaType";
import DadosConversao from "@/types/DadosConversao";
import { useFonts } from "expo-font";
import Dropdown from "@/components/Dropdown";

const VALOR_CONVERTIDO_INICIAL = "0.00";

export default function HomeScreen() {
  useFonts({
    "montserrat-medium": require("../assets/fonts/MONTSERRAT-MEDIUM.otf"),
    "montserrat-black": require("../assets/fonts/MONTSERRAT-BLACK.otf"),
    "montserrat-bold": require("../assets/fonts/MONTSERRAT-BOLD.otf"),
  });

  const [listaMoedas, setListaMoedas] = useState<ApiMoedaType>({});
  const [dadosConversao, setDadosConversao] = useState<DadosConversao | null>(
    null
  );

  const [valorOrigem, setValorOrigem] = useState("1");
  const [valorDestino, setValorDestino] = useState(VALOR_CONVERTIDO_INICIAL);

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
          console.log("Api Error Response:", error.response.data);
        } else {
          console.error("Erro inesperado:", error);
        }
      }
    }
    fetchListaMoedas();
  }, []);

  useEffect(() => {
    async function fetchDadosConversão() {
      try {
        const { data } = await axios(
          `https://economia.awesomeapi.com.br/last/${moedaDestino}-${moedaOrigem}`
        );
        setDadosConversao(data[`${moedaDestino}${moedaOrigem}`]);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log("Api Error Response:", error.response.data);
        } else {
          console.error("Erro inesperado:", error);
        }
        setDadosConversao(null);
      }
    }
    fetchDadosConversão();
  }, [moedaOrigem, moedaDestino]);

  // NOTE: calcula a conversão
  useEffect(() => {
    const valorOrigemNumerico = Number(valorOrigem);

    if (dadosConversao == null || Number.isNaN(valorOrigemNumerico)) {
      setValorDestino(VALOR_CONVERTIDO_INICIAL);
      return;
    }

    const cotacaoNumerica = Number(dadosConversao.high);
    const resultado = valorOrigemNumerico * cotacaoNumerica;

    setValorDestino(
      Number.isNaN(resultado) ? VALOR_CONVERTIDO_INICIAL : resultado.toFixed(2)
    );
  }, [valorOrigem, dadosConversao]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.secondary} barStyle={"dark-content"} />

      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <View style={styles.pickersContainer}>
        <Dropdown
          selectedValue={moedaOrigem}
          onChangeSelection={setMoedaOrigem}
          data={Object.entries(listaMoedas).map(([key, value]) => ({
            label: `${value} (${key})`,
            value: key,
          }))}
        />

        <Entypo name="arrow-bold-right" size={50} color={colors.secondary} />

        <Dropdown
          selectedValue={moedaDestino}
          onChangeSelection={setMoedaDestino}
          data={Object.entries(listaMoedas).map(([key, value]) => ({
            label: `${value} (${key})`,
            value: key,
          }))}
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

      <View>
        {dadosConversao ? (
          <>
            <Text style={styles.subtitulo}>{dadosConversao.name}</Text>
            <Text
              style={[
                styles.subtitulo,
                { color: colors.secondary, fontFamily: "montserrat-bold" },
              ]}
            >
              {dadosConversao.high}
            </Text>
          </>
        ) : (
          <Text
            style={[
              styles.subtitulo,
              { color: colors.secondary, fontFamily: "montserrat-bold" },
            ]}
          >
            Conversão Indisponível
          </Text>
        )}
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
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
    color: colors.secondary,
    fontFamily: "montserrat-bold",
  },
  subtitulo: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
    fontFamily: "montserrat-medium",
  },
  pickersContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputsContainer: {},
});
