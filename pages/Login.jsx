import { Text, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Button } from "react-native-paper";

export function Login({ navigation }) {
  function registro() {
    navigation.replace("Registro");
  }
  return (
    <View style={styles.container}>
      <Button onPress={registro}>Registro</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
