import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Meal, NavigationProps } from "../../types/index";
import useFoodStorage from "../../hooks/useFoodStorage";
import { useCallback, useState } from "react";

export default function Home() {
  const { onGetTodayFood } = useFoodStorage();
  const [todayFood, setTodayFood] = useState<Meal[]>([]);

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
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
