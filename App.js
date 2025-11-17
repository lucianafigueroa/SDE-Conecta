import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, View, ActivityIndicator } from "react-native";

// Importa tu AuthProvider y el hook para usarlo
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 

// Importa el navegador de pestañas UNIFICADO
import AppTabs from "./src/components/AppTabs";

// Importa TODAS las pantallas que NO están en los navegadores de pestañas
import Bienvenida from "./src/screens/Bienvenida.js";
import OnboardingScreen from "./src/screens/OnboardingScreen.js";
import Bienvenida02 from './src/screens/Bienvenida02';
import Bienvenida05 from './src/screens/Bienvenida05';
import Login from "./src/screens/Login.js"; 
import Registro from "./src/screens/Registro.js";
import Seleccion from "./src/screens/Seleccion.js";
import Registrarse1 from "./src/screens/Registrarse1.js";
import VerificarNumero from "./src/screens/VerificarNumero.js";
import VerificarCodigo from "./src/screens/VerificarCodigo.js";
import VerPerfil from "./src/screens/VerPerfil.js";
import Chat from "./src/screens/Chat.js"; // Pantalla de conversación individual
import ChatList from "./src/screens/ChatList.js"; // <-- CAMBIO 1: Importa la pantalla de lista de chats
import Calificar from "./src/screens/Calificar.js";
import VerMasServicios from './src/screens/VerMasServicios';
import MenuUsuario from './src/screens/MenuUsuario';
import MenuProfesional from './src/screens/MenuProfesional';
import RegistrarServicio from './src/screens/RegistrarServicio';
import Categorias from './src/screens/Categorias';
import AgregarDescripcion from './src/screens/AgregarDescripcion.js';
import AgregarDireccion from './src/screens/AgregarDireccion.js';
import AgregarFoto from './src/screens/AgregarFoto.js';
import InicioProfesional from './src/screens/InicioProfesional.js';

const Stack = createNativeStackNavigator();

// --- Navegador para el flujo de Autenticación ---
const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Bienvenida">
        <Stack.Screen name="Bienvenida" component={Bienvenida} />
        <Stack.Screen name="Bienvenida02" component={Bienvenida02} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="Bienvenida05" component={Bienvenida05} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Seleccion" component={Seleccion} />
        <Stack.Screen name="Registrarse1" component={Registrarse1} />
        <Stack.Screen name="VerificarNumero" component={VerificarNumero} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />
    </Stack.Navigator>
);

// --- Navegador para la App Principal ---
const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AppTabs">
        <Stack.Screen name="AppTabs" component={AppTabs} />
        
        {/* Pantallas que se abren ENCIMA de los tabs */}
        <Stack.Screen name="VerPerfil" component={VerPerfil} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Calificar" component={Calificar} />
        <Stack.Screen name="VerMasServicios" component={VerMasServicios} />
        <Stack.Screen name="MenuUsuario" component={MenuUsuario} />
        <Stack.Screen name="MenuProfesional" component={MenuProfesional} />
        <Stack.Screen name="RegistrarServicio" component={RegistrarServicio} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="AgregarDescripcion" component={AgregarDescripcion} />
        <Stack.Screen name="AgregarDireccion" component={AgregarDireccion} />
        <Stack.Screen name="AgregarFoto" component={AgregarFoto} />
        <Stack.Screen name="InicioProfesional" component={InicioProfesional} />
        {/* <-- CAMBIO 2: Añadimos ChatList aquí también, aunque se muestre en un tab */}
        <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
);

// --- El "Cerebro" que decide qué navegador mostrar ---
const RootNavigator = () => {
    const { user, isLoading } = useAuth(); 

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e5e8ec' }}>
                <ActivityIndicator size="large" color="#d26e00" />
            </View>
        );
    }
    return user ? <AppStack /> : <AuthStack />; 
};

// --- Componente principal que envuelve todo ---
export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar 
                    barStyle="dark-content" 
                    backgroundColor="transparent" 
                    translucent={true}
                />
                <RootNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}