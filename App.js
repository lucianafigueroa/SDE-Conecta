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
import InicioProfesional from "./src/screens/InicioProfesional.js";
import VerPerfil from "./src/screens/VerPerfil.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

        {/* Inicio */}

      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Bienvenida"
      >
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />

        {/* Registro */}

        <Stack.Screen name="Seleccion" component={Seleccion} />
        <Stack.Screen name="Registrarse1" component={Registrarse1} />
        <Stack.Screen name="VerificarNumero" component={VerificarNumero} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />

        {/* Cliente */}

        <Stack.Screen name="InicioCliente" component={InicioCliente} />

        {/* Profesional */}

        {/* Otras pantallas */}

        <Stack.Screen name="MenuUsuario" component={MenuUsuario} />
        <Stack.Screen name="Prestadores" component={Prestadores} />
        <Stack.Screen name="Calificaciones" component={Calificaciones} />
        <Stack.Screen name="MenuProfesional" component={MenuProfesional} />
        <Stack.Screen
          name="NotificacionesProfesional"
          component={NotificacionesProfesional}
        />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="InicioProfesional" component={InicioProfesional} />
        <Stack.Screen name="VerPerfil" component={VerPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
