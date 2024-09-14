import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";
import { View, Text, StyleSheet } from "react-native";
export default function CardMeal({
  item,
  onPress,
  iconName,
  iconDeletename,
  onPressDelete,
}: {
  item: Meal;
  onPress: () => void;
  iconName: string;
  iconDeletename?: string;
  onPressDelete?: () => void;
}) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.separateContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.portion}>{item.portion}</Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Button
            icon={<Icon name={iconName} color={"#000"} />}
            type="clear"
            onPress={onPress}
          />
          {iconDeletename && (
            <Button
              icon={<Icon name={iconDeletename} color={"#000"} />}
              type="clear"
              onPress={onPressDelete}
            />
          )}
        </View>
        <Text style={styles.calorie}>{item.calories} cal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
