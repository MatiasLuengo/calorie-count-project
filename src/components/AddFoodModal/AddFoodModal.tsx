import { View, Modal, StyleSheet, Text } from "react-native";
import { AddFoodModalProps } from "../../types/index";
import { Button, Icon, Input } from "@rneui/themed";
export default function AddFoodModal({ onClose, visible }: AddFoodModalProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeButton}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={onClose}
              type="clear"
            />
          </View>
          <Text style={styles.title}>Agregar alimento</Text>
          <FormItem legend="Nombre" />
          <FormItem legend="Kcal" />
          <FormItem legend="Porción" />
          <Button title="Añadir" icon={<Icon name="add" color={"#fff"} />} />
        </View>
      </View>
    </Modal>
  );
}

export function FormItem({ legend }: { legend: string }) {
  return (
    <View style={styles.formItem}>
      <View style={styles.inputContainer}>
        <Input />
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
