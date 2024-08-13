import { Text, StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { TodayCaloriesProps } from "../../types";

export default function TodayCalories({
  total,
  consumed,
  remaining,
  percentage,
}: TodayCaloriesProps) {
  return (
    <View style={styles.container}>
      <CircularProgress value={percentage} valueSuffix="%" />
      <View style={styles.statistics}>
        <Text style={{ fontWeight: "bold", fontSize: 22, marginBottom: 10 }}>
          Hoy
        </Text>
        <View style={styles.rightItem}>
          <Text style={styles.title}>Total:</Text>
          <Text style={styles.text}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.title}>Consumidas:</Text>
          <Text style={styles.text}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.title}>Restantes:</Text>
          <Text style={styles.text}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statistics: {
    width: "50%",
  },
  rightItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
});
