import { View, Modal, StyleSheet, Text } from "react-native";
import { AddFoodModalProps } from "../../types/index";
import { Button, Icon, Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import useFoodStorage from "../../hooks/useFoodStorage";
export default function AddFoodModal({ onClose, visible }: AddFoodModalProps) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [portion, setPortion] = useState("");
  const { onSaveFood } = useFoodStorage();

  useEffect(() => {
    setName("");
    setCalories("");
    setPortion("");
  }, [visible]);

  const handleSubmit = async () => {
    try {
      await onSaveFood({ name, calories, portion });
      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      animationType="fade"
      transparent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeButton}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>
          <Text style={styles.title}>Agregar alimento</Text>
          <FormItem legend="Nombre" inputValue={name} setInput={setName} />
          <FormItem legend="Cal" inputValue={calories} setInput={setCalories} />
          <FormItem
            legend="Porción"
            inputValue={portion}
            setInput={setPortion}
          />
          <Button
            title="Añadir"
            icon={<Icon name="add" color={"#fff"} />}
            disabled={
              name.trim() === "" ||
              calories.trim() === "" ||
              portion.trim() === ""
            }
            onPress={handleSubmit}
          />
        </View>
      </View>
    </Modal>
  );
}

export function FormItem({
  legend,
  inputValue,
  setInput,
}: {
  legend: string;
  inputValue?: string;
  setInput: any;
}) {
  return (
    <View style={styles.formItem}>
      <View style={styles.inputContainer}>
        <Input
          value={inputValue}
          onChangeText={(text: string) => setInput(text)}
        />
      </View>
      <Text style={styles.legend}>{legend}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  formItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flex: 3,
  },
  legend: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
});
