import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Meal, NavigationProps, TodayCaloriesProps } from "../../types/index";
import useFoodStorage from "../../hooks/useFoodStorage";
import { useCallback, useState } from "react";
import TodayCalories from "../../components/TodayCalories";

export default function Home() {
  const { onGetTodayFood } = useFoodStorage();
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
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

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      calculateTodayStatics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      console.error(error);
      setTodayFood([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood])
  );

  const { navigate } = useNavigation<NavigationProps>();
  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };

  return (
    <View style={styles.container}>
      <View style={styles.webContainer}>
        <Header />
        <View style={styles.caloriesContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Calorías</Text>
          <Button
            icon={<Icon name="add-circle-outline" color={"#fff"} />}
            radius={"md"}
            color={"#4ecb71"}
            onPress={handleAddCaloriesPress}
          />
        </View>
        <TodayCalories {...todayStatics} />
        <Text>{todayFood.length}</Text>
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
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 22,
    marginEnd: 16,
  },
});
