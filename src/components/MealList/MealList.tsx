import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";

export default function MealList({ mealItems }: { mealItems: Meal[] }) {
  return (
    <ScrollView style={styles.container}>
      {mealItems
        ?.reverse()
        .map((item, index) => <MealItem key={index} item={item} />) || (
        <Text>No se encontraron resultados</Text>
      )}
    </ScrollView>
  );
}

export function MealItem({ item }: { item: Meal }) {
  const { onSaveTodayFood } = useFoodStorage();
  const handleAddItemPress = async () => {
    try {
      await onSaveTodayFood(item);
      alert("El alimento se agregó al día");
    } catch (error) {
      alert("El alimento no se pudo agregar al día");
    }
  };

  return (
    <View style={styles.mealCard}>
      <View style={styles.separateContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.portion}>{item.portion}</Text>
      </View>
      <View>
        <Button
          icon={<Icon name="add-circle-outline" color={"#000"} />}
          type="clear"
          onPress={handleAddItemPress}
        />
        <Text style={styles.calorie}>{item.calories} cal</Text>
      </View>
    </View>
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
