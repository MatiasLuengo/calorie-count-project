import { Text, StyleSheet, ScrollView } from "react-native";
import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import CardMeal from "../CardMeal";
import { useAppDispatch } from "../../hooks/store";
import { addNewTodayMeal } from "../../todayMeals/slice/slice";
import { deleteMeal } from "../../calories/slice/slice";
import Toast from "react-native-toast-message";

export default function MealList({ mealItems }: { mealItems: Meal[] }) {
  const dispatch = useAppDispatch();

  const handleAddItemPress = ({ item }: { item: Meal }) => {
    try {
      dispatch(addNewTodayMeal({ ...item, date: new Date().toISOString() }));
      Toast.show({
        type: "success",
        text1: "El alimento se agregó al día",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "El alimento no se pudo agregar al día",
      });
    }
  };

  const handleDeleteItemPress = (itemIndex: number) => {
    try {
      console.log("Item index: ", itemIndex);
      dispatch(deleteMeal(itemIndex));
      Toast.show({
        type: "success",
        text1: "Alimento eliminado",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "El alimento no se pudo eliminar",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {(mealItems.length > 0 &&
        mealItems.map((item, index) => (
          <CardMeal
            key={index}
            item={item}
            iconName="add-circle-outline"
            onPress={() => handleAddItemPress({ item })}
            iconDeletename="close"
            onPressDelete={() => handleDeleteItemPress(index)}
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
