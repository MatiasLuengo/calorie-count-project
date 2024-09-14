import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Meal, NavigationProps, TodayCaloriesProps } from "../../types/index";
import { useEffect, useState } from "react";
import TodayCalories from "../../components/TodayCalories";
import CardMeal from "../../components/CardMeal";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { deleteTodayMeal } from "../../todayMeals/slice/slice";
import Toast from "react-native-toast-message";

export default function Home() {
  let todayFood = useAppSelector((state) => state.todayMeals);
  console.log("Today: ", todayFood);
  const dispatch = useAppDispatch();
  const [todayStatics, setTodayStatics] = useState<TodayCaloriesProps>({
    total: 2000,
    consumed: 0,
    remaining: 0,
    percentage: 0,
  });

  const calculateTodayStatics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (accum, curr) => accum + Number(curr.calories),
        0
      );
      const remainingCalories = 2000 - caloriesConsumed;
      const percentage = (caloriesConsumed / 2000) * 100;
      setTodayStatics({
        total: 2000,
        consumed: caloriesConsumed,
        remaining: remainingCalories,
        percentage: percentage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    calculateTodayStatics(todayFood);
  }, [todayFood]);

  const { navigate } = useNavigation<NavigationProps>();
  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };

  const handleEliminateItemPress = (itemIndex: number) => {
    try {
      dispatch(deleteTodayMeal(itemIndex));
      Toast.show({
        type: "success",
        text1: "El alimento se eliminó del día",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "El alimento no se pudo eliminar",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        <Header />
        <View style={styles.caloriesContainer}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Calorías</Text>
          <Button
            icon={<Icon name="add-circle-outline" color={"#fff"} />}
            radius={"md"}
            color={"#4ecb71"}
            onPress={handleAddCaloriesPress}
          />
        </View>
        <TodayCalories {...todayStatics} />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 22 }}>
          Comidas
        </Text>
        <ScrollView>
          {(todayFood.length > 0 &&
            todayFood.map((item: Meal, index: number) => (
              <CardMeal
                key={index}
                item={item}
                iconName="close"
                onPress={() => handleEliminateItemPress(index)}
              />
            ))) || (
            <Text style={{ textAlign: "center", fontSize: 20, marginTop: 50 }}>
              No hay comidas cargadas el día de hoy
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  webContainer: {
    width: "100%",
    maxWidth: 800,
    marginHorizontal: "auto",
    flex: 1,
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 26,
    marginEnd: 16,
  },
});
