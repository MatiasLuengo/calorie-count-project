import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../types/index";

export default function Home() {
  const { navigate } = useNavigation<NavigationProps>();
  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Calories</Text>
        <Button
          icon={<Icon name="add-circle-outline" color={"#fff"} />}
          radius={"md"}
          color={"#4ecb71"}
          onPress={handleAddCaloriesPress}
        />
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
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 22,
    marginEnd: 16,
  },
});
