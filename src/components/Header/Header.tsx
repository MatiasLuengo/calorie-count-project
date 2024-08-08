import { View, Text, StyleSheet, Image } from "react-native";
const img = require("../../../assets/perfil.jpg");

const staticInfo = {
  name: "Matías Luengo",
  uri: img,
};
export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>Hello {staticInfo.name}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal</Text>
      </View>
      <Image source={staticInfo.uri} style={styles.profileImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#808080",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
