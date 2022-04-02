import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Perfil, Posts } from "../pages";

const Tab = createMaterialTopTabNavigator();
// requieren autenticacion
export function TabsMenu() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Posts" component={Posts} />
    </Tab.Navigator>
  );
}
