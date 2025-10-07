import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bienvenida from './src/screens/Bienvenida.js';
import Login from './src/screens/Login.js';
import Registro from './src/screens/Registro.js';
import Seleccion from './src/screens/Seleccion.js';
import Registrarse1 from './src/screens/Registrarse1.js';
import VerificarNumero from './src/screens/VerificarNumero.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Seleccion" component={Seleccion} />
        <Stack.Screen name="Registrarse1" component={Registrarse1} />
        <Stack.Screen name="VerificarNumero" component={VerificarNumero} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
