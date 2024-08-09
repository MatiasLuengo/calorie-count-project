import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "../../components/AddFoodModal";
import { useEffect, useState } from "react";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealList from "../../components/MealList";

export default function AddFood() {
  const [modalOpen, setModalOpen] = useState(false);
  const [food, setFood] = useState<Meal[]>([]);
  const { onGetFood } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodResponse = await onGetFood();
      setFood(foodResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = async (shouldRefresh?: boolean) => {
    if (shouldRefresh) {
      alert("El alimento se agrego correctamente");
      loadFoods();
    }
    setModalOpen(false);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        <Header />
        <View style={styles.addFoodContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginStart: 10 }}>
            Agregar alimento
          </Text>
          <Button
            icon={<Icon name="add-circle-outline" color={"#fff"} />}
            radius={"md"}
            color={"#4ecb71"}
            onPress={() => setModalOpen(true)}
          />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Input placeholder="manzana, carne, gaseosa..." />
          </View>
          <Button icon={<Icon name="search" color={"#fff"} />} radius={"md"} />
        </View>
      </View>
      <AddFoodModal visible={modalOpen} onClose={handleModalClose} />
      <MealList mealItems={food} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  webContainer: {
    width: "100%",
    maxWidth: 800,
    marginHorizontal: "auto",
  },
  addFoodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 22,
    marginEnd: 16,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    marginEnd: 16,
  },
  inputContainer: {
    flex: 1,
  },
});
