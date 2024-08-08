import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/themed";

export default function AddFood() {
  const handleAddCaloriesPress = () => {};
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginStart: 10 }}>
          Add Food
        </Text>
        <Button
          icon={<Icon name="add-circle-outline" color={"#fff"} />}
          radius={"md"}
          color={"#4ecb71"}
          onPress={handleAddCaloriesPress}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="apple, meat, soda..." />
        </View>
        <Button icon={<Icon name="search" color={"#fff"} />} radius={"md"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
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
    marginBottom: 22,
    marginEnd: 16,
  },
  inputContainer: {
    flex: 1,
  },
});
