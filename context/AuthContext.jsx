import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
/**
 * @typedef {{aToken:string,rToken:string,isAuth:boolean,setAuth:React.DispatchWithoutAction}} IAuthContext
 */

/**
 * @type {React.Context<IAuthContext>}
 */
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, setAuth] = useReducer(
    (prev, newState) => {
      return { ...prev, ...newState };
    },
    {
      isAuth: false,
      aToken: "",
      rToken: "",
    }
  );
  useEffect(() => {
    // guardar
    if (state.rToken) {
      AsyncStorage.setItem("rToken", state.rToken);
    }
  }, [state.rToken]);

  useEffect(() => {
    axios.defaults.headers = {
      autenticacion: state.aToken,
    };
    axios
      .get("/auth/me")
      .then(({ data }) => {
        if (data.user) {
          setAuth({ isAuth: true });
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [state.aToken]);

  useEffect(() => {
    AsyncStorage.getItem("rToken").then((rToken) => {
      console.log("get from async storage:", res);
      setAuth({ rToken });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
