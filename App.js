import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bienvenida from './src/screens/Bienvenida.js';
import Bienvenida02 from './src/screens/Bienvenida02.js';
import OnboardingScreen  from './src/screens/OnboardingScreen.js';
import Bienvenida05 from './src/screens/Bienvenida05.js';
import Login from './src/screens/Login.js';
import Registro from './src/screens/Registro.js';
import Seleccion from './src/screens/Seleccion.js';
import Registrarse1 from './src/screens/Registrarse1.js';
import VerificarNumero from './src/screens/VerificarNumero.js';
import VerificarCodigo from './src/screens/VerificarCodigo.js';
import InicioCliente from './src/screens/InicioCliente.js';

const Stack = createNativeStackNavigator();

// -----------------------------------------------------------------------------
// LOGICA DE FLUJO PRINCIPAL
// SIMULACIÓN: En una app real, esta variable se obtendría de AsyncStorage.
// Cambia a 'false' para probar el flujo de usuario recurrente.
// -----------------------------------------------------------------------------
const IS_FIRST_LAUNCH = true; // true -> Inicia en Bienvenida02 | false -> Inicia en Bienvenida

const INITIAL_ROUTE = IS_FIRST_LAUNCH ? 'Bienvenida02' : 'Bienvenida';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={INITIAL_ROUTE}>
        {/* Flujo de Primer Ingreso: 02 -> 03 -> 04 -> 05 -> Bienvenida */}
        <Stack.Screen name="Bienvenida02" component={Bienvenida02} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="Bienvenida05" component={Bienvenida05} />

        {/* Flujo Principal/Recurrente: Bienvenida -> Login -> Registro */}
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />

        {/* Otras pantallas */}
        <Stack.Screen name="Seleccion" component={Seleccion} />
        <Stack.Screen name="Registrarse1" component={Registrarse1} />
        <Stack.Screen name="VerificarNumero" component={VerificarNumero} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />
        <Stack.Screen name="InicioCliente" component={InicioCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
