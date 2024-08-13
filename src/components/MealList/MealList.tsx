import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";
import CardMeal from "../CardMeal";

export default function MealList({ mealItems }: { mealItems: Meal[] }) {
  const { onSaveTodayFood } = useFoodStorage();
  const handleAddItemPress = async ({ item }: { item: Meal }) => {
    try {
      await onSaveTodayFood(item);
      alert("El alimento se agregó al día");
    } catch (error) {
      alert("El alimento no se pudo agregar al día");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {(mealItems.length > 0 &&
        mealItems
          .reverse()
          .map((item, index) => (
            <CardMeal
              key={index}
              item={item}
              iconName="add-circle-outline"
              onPress={() => handleAddItemPress({ item })}
            />
          ))) || (
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 50 }}>
          No se encontraron resultados
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mealCard: {
    backgroundColor: "#4ecb71",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  separateContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 18,
    marginBottom: 6,
  },
  portion: {
    color: "#000",
    fontSize: 16,
  },
  calorie: {
    color: "#000",
    fontSize: 16,
  },
});
