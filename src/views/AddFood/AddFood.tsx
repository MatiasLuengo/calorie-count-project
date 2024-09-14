import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "../../components/AddFoodModal";
import { useEffect, useState } from "react";
import { Meal } from "../../types";
import MealList from "../../components/MealList";
import { useAppSelector } from "../../hooks/store";

export default function AddFood() {
  let food = useAppSelector((state) => state.meals);
  console.log(food);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [foodSearched, setFoodSearched] = useState<Meal[]>(food);

  const handleSearchPress = async () => {
    try {
      const result = food;
      setFoodSearched(
        result.filter((food: Meal) =>
          food.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
      setFoodSearched([]);
    }
  };

  useEffect(() => {
    setFoodSearched(food);
  }, [food]);

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
            <Input
              placeholder="manzana, carne, gaseosa..."
              value={search}
              onChangeText={(text: string) => setSearch(text)}
            />
          </View>
          <Button
            icon={<Icon name="search" color={"#fff"} />}
            radius={"md"}
            onPress={handleSearchPress}
          />
        </View>
        <MealList mealItems={foodSearched} />
      </View>
      <AddFoodModal visible={modalOpen} onClose={() => setModalOpen(false)} />
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
    flex: 1,
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
    marginBottom: 10,
    marginEnd: 16,
  },
  inputContainer: {
    flex: 1,
  },
});
