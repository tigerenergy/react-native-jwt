import AsyncStorage from "@react-native-async-storage/async-storage";
import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
/**
 * @typedef {{user:{},aToken:string,rToken:string,isAuth:boolean,setAuth:React.DispatchWithoutAction}} IAuthContext
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
      user: {},
    }
  );
  useEffect(() => {
    // guardar
    if (state.rToken) {
      AsyncStorage.setItem("rToken", state.rToken);
    }
  }, [state.rToken]);

  useEffect(() => {
    if (!state.aToken) {
      // si el token esta vacio
      // no hacemos nada y salimos de esta funcion
      return;
    }
    axios.defaults.headers = {
      autenticacion: state.aToken,
    };
    axios
      .get("/auth/me")
      .then(({ data }) => {
        console.log("get /auth/me");
        if (data.user) {
          setAuth({ isAuth: true, user: data.user });
        }
      })
      .catch((error) => {
        console.warn("error-get /auth/me", error);
      });
  }, [state.aToken]);

  useEffect(() => {
    // funcion inicial
    AsyncStorage.getItem("rToken")
      .then(async (rToken) => {
        console.log("get from async storage:", rToken);
        // refresh token
        const { data } = await axios.get("/auth/refresh", {
          params: { rToken },
        });
        if (data.aToken) {
          // refrecsra el token si hay un error minestra el usuario hace una solicitud
          axios.interceptors.response.use(
            (res) => {
              return res;
            },
            async (error) => {
              console.log("interceptor error");
              const { data } = await axios.get("/auth/refresh", {
                params: { rToken },
              });
              if (data.aToken) {
                console.log("interceptor-Token refrescado");
                setAuth({ rToken, aToken: data.aToken });
                // volver a ntentar ultima request
                if (error.config) {
                  console.log("volver a intentar", error.config);
                  error.config.headers.autenticacion = data.aToken;
                  axios.request(error.config);
                }
              }
            }
          );
          setAuth({ rToken, aToken: data.aToken });
        }
      })
      .catch(() => {
        console.log("no se ha guardado ningun rToken");
      });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
