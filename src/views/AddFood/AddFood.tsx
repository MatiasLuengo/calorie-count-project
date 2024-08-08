import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";

export default function AddFood() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>AddFood</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
