import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";

function normalizeText(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type Item = {
  [key: string]: string;
};

type DropdownProps = {
  selectedValue: string;
  data: Item;
  onChangeSelection?: (value: string) => void;
};

export default function Dropdown({
  selectedValue = "",
  data = {},
  onChangeSelection,
}: DropdownProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<Item>({});

  // NOTE: roda quando as props são atualizadas
  useEffect(() => {
    console.log(selectedValue);
    setInputValue(selectedValue);
  }, [selectedValue]);

  // NOTE: filtra moedas pelo nome digitado
  useEffect(() => {
    if (!inputValue) setFilteredData(data);

    const regex = new RegExp(normalizeText(inputValue), "i");
    const filtered = Object.entries(data).filter(
      ([key, value]) =>
        normalizeText(key).match(regex) || normalizeText(value).match(regex)
    );
    setFilteredData(Object.fromEntries(filtered));
  }, [inputValue, data]);

  function handleToggleModal() {
    setInputValue("");
    setModalOpen((prev) => !prev);
  }

  function handleClearInput() {
    setInputValue("");
  }

  function handleItemSelect(key: string) {
    onChangeSelection?.(key);
    setInputValue(key);
    setModalOpen(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleToggleModal}
      >
        <Text style={styles.text}>{inputValue}</Text>
        <FontAwesome name="chevron-down" size={16} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalOpen && Object.keys(data).length > 0}
        animationType="slide"
        transparent
        onRequestClose={() => {}}
      >
        <View style={styles.modalContentContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Buscar pelo nome..."
            />
            <TouchableOpacity
              style={styles.inputClearButton}
              onPress={handleClearInput}
            >
              <FontAwesome name="close" size={16} color="black" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={Object.entries(filteredData)}
            contentContainerStyle={{ backgroundColor: "#fff" }}
            renderItem={({ item: [key, value] }) => (
              <TouchableOpacity
                style={styles.itemButtonContainer}
                onPress={() => handleItemSelect(key)}
              >
                <Text style={styles.text}>
                  {value} - {key}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  text: {
    fontFamily: "montserrat-medium",
  },
  modalContentContainer: {
    backgroundColor: "#00000080",
    width: "100%",
    height: "100%",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingLeft: 14,
    paddingRight: 40,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    fontFamily: "montserrat-medium",
  },
  inputClearButton: {
    position: "absolute",
    right: 0,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  itemButtonContainer: {
    paddingVertical: 18,
    padding: 14,
  },
});
