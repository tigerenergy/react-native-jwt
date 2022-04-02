import { Text, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Button } from "react-native-paper";

export function Perfil() {
  const { setAuth } = useContext(AuthContext);
  function cerrarSession() {
    setAuth({ isAuth: false });
  }
  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
      <Button onPress={cerrarSession}>Cerrar Session</Button>
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
