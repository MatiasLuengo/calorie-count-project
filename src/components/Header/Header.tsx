import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Icon } from "@rneui/themed";
const img = require("../../../assets/perfil.jpg");

const staticInfo = {
  name: "Matías Luengo",
  uri: img,
};
export default function Header() {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() && (
        <Button
          icon={<Icon name="arrow-back" size={24} />}
          type="clear"
          onPress={() => goBack()}
        ></Button>
      )}
      <View>
        <Text style={styles.name}>Hola {staticInfo.name}</Text>
        <Text style={styles.subtitle}>De regreso a tu objetivo</Text>
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
  arrow: {},
});
