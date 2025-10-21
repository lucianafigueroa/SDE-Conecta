import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bienvenida from "./src/screens/Bienvenida.js";
import Bienvenida02 from "./src/screens/Bienvenida02.js";
import OnboardingScreen from "./src/screens/OnboardingScreen.js";
import Bienvenida05 from "./src/screens/Bienvenida05.js";
import Login from "./src/screens/Login.js";
import Registro from "./src/screens/Registro.js";
import Seleccion from "./src/screens/Seleccion.js";
import Registrarse1 from "./src/screens/Registrarse1.js";
import VerificarNumero from "./src/screens/VerificarNumero.js";
import VerificarCodigo from "./src/screens/VerificarCodigo.js";
import InicioCliente from "./src/screens/InicioCliente.js";
import MenuUsuario from "./src/screens/MenuUsuario.js";
import Prestadores from "./src/screens/Prestadores.js";
import Calificaciones from "./src/screens/Calificaciones.js";
import MenuProfesional from "./src/screens/MenuProfesional.js";
import NotificacionesProfesional from "./src/screens/NotificacionesProfesional.js";
import Categorias from "./src/screens/Categorias.js";

import * as WebBrowser from "expo-web-browser";

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

const [request, response, promptAsync] = Google.useAuthRequest({
  webClientId: EXPO_PUBLIC_WEB_CLIENT_ID,
  androidClientId: EXPO_PUBLIC_ANDROID_CLIENT_ID,
});

const handleGoogleRegister = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
    console.log("Registro con Google exitoso.");
    navigation.navigate("Seleccion");
  } catch (error) {
    console.error("Error al autenticar con Google:", error.message);
    Alert.alert("Error", "Error al conectar con Google. Inténtalo de nuevo.");
  }
};

const handleGoogleLogin = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);

    console.log("Login con Google exitoso.");
    navigation.navigate("InicioCliente");
  } catch (error) {
    console.error("Error al autenticar con Google:", error.message);
    alert("Error al conectar con Google. Inténtalo de nuevo.");
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Bienvenida"
      >
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />

        {/* Otras pantallas */}
        <Stack.Screen name="Seleccion" component={Seleccion} />
        <Stack.Screen name="Registrarse1" component={Registrarse1} />
        <Stack.Screen name="VerificarNumero" component={VerificarNumero} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />
        <Stack.Screen name="InicioCliente" component={InicioCliente} />
        <Stack.Screen name="MenuUsuario" component={MenuUsuario} />
        <Stack.Screen name="Prestadores" component={Prestadores} />
        <Stack.Screen name="Calificaciones" component={Calificaciones} />
        <Stack.Screen name="MenuProfesional" component={MenuProfesional} />
        <Stack.Screen
          name="NotificacionesProfesional"
          component={NotificacionesProfesional}
        />
        <Stack.Screen name="Categorias" component={Categorias} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
