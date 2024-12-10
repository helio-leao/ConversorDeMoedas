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
  label: string;
  value: string;
};

type DropdownProps = {
  selectedValue: string;
  data: Item[];
  onChangeSelection?: (value: string) => void;
};

export default function Dropdown({
  selectedValue,
  data,
  onChangeSelection,
}: DropdownProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);

  useEffect(() => {
    if (!selectedValue) setInputValue("");

    const selectedValueLabel = data.find(
      (item) => item.value === selectedValue
    );
    setInputValue(selectedValueLabel?.label || "");
  }, [selectedValue, data]);

  useEffect(() => {
    if (!inputValue) setFilteredData(data);

    const regex = new RegExp(normalizeText(inputValue), "i");
    const filtered = data.filter((item) =>
      normalizeText(item.label).match(regex)
    );
    setFilteredData(filtered);
  }, [inputValue]);

  function handleToggleModal() {
    setInputValue("");
    setModalOpen((prev) => !prev);
  }

  function handleClearInput() {
    setInputValue("");
  }

  function handleItemSelect(item: Item) {
    onChangeSelection?.(item.value);
    setInputValue(item.label);
    setModalOpen(false);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleToggleModal}
      >
        {/* <Text>{inputValue}</Text> */}
        <Text>{selectedValue}</Text>
        <FontAwesome name="chevron-down" size={16} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalOpen && data.length > 0}
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
            data={filteredData}
            contentContainerStyle={{ backgroundColor: "#fff" }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemButtonContainer}
                onPress={() => handleItemSelect(item)}
              >
                <Text>{item.label}</Text>
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
    gap: 10,
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
    backgroundColor: "#fff",
    borderBottomWidth: 1,
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
