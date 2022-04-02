import { Text, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState, useReducer, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context";

export function Registro({ navigation }) {
  const { setAuth } = useContext(AuthContext);
  const [paswdVisible, setPaswdVisible] = useState(false);
  /**
   * @typedef {{name:string,email:string,password:string}} user
   */
  /**
   * @type {[user:user,setUser:React.DispatchWithoutAction]}
   */
  const [user, setUser] = useReducer(
    (prev, newState) => {
      return { ...prev, ...newState };
    },
    { name: "", email: "", password: "" }
  );

  function login() {
    navigation.replace("Login");
  }
  async function crearCuenta() {
    console.log(user);
    try {
      const { data } = await axios.post("/auth/registro", user);
      const { rToken, aToken } = data;
      setAuth({ rToken, aToken });
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{ backgroundColor: "#f3f3f3", marginVertical: 5 }}
        label={"Nombre"}
        onChangeText={(name) => setUser({ name })}
        value={user.name}
      />
      <TextInput
        style={{ backgroundColor: "#f3f3f3", marginVertical: 5 }}
        label={"Email"}
        onChangeText={(email) => setUser({ email })}
        value={user.email}
      />
      <TextInput
        style={{ backgroundColor: "#f3f3f3", marginVertical: 5 }}
        label={"Clave"}
        secureTextEntry={paswdVisible}
        onChangeText={(password) => setUser({ password })}
        value={user.password}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => setPaswdVisible(!paswdVisible)}
          />
        }
      />
      <Button mode="contained" onPress={crearCuenta}>
        Crear Cuenta
      </Button>
      <Button onPress={login}>Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
});
