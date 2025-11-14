import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from 'react-native';

import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 

import Bienvenida from "./src/screens/Bienvenida.js";
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
import BottomTabs from "./src/components/BottomTabs";
import VerMasServicios from "./src/screens/VerMasServicios.js";
import Chat from "./src/screens/Chat.js";
import Calificar from "./src/screens/Calificar.js";
import Bienvenida02 from "./src/screens/Bienvenida02.js";
import OnboardingScreen from "./src/screens/OnboardingScreen.js";
import Bienvenida05 from "./src/screens/Bienvenida05.js";


const Stack = createNativeStackNavigator();

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

const ClientStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="InicioCliente">
        <Stack.Screen name="InicioCliente" component={InicioCliente} />
        <Stack.Screen name="VerMasServicios" component={VerMasServicios} />
        <Stack.Screen name="Calificar" component={Calificar} />
        <Stack.Screen name="MenuUsuario" component={MenuUsuario} />
        <Stack.Screen name="Prestadores" component={Prestadores} />
        <Stack.Screen name="Calificaciones" component={Calificaciones} />
        <Stack.Screen name="VerPerfil" component={VerPerfil} />
        <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
);

const ProfessionalStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTabs">
        <Stack.Screen name="BottomTabs" component={BottomTabs} /> 
        <Stack.Screen name="MenuProfesional" component={MenuProfesional} />
        <Stack.Screen name="NotificacionesProfesional" component={NotificacionesProfesional}/>
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="InicioProfesional" component={InicioProfesional} />
        <Stack.Screen name="VerPerfil" component={VerPerfil} />
    </Stack.Navigator>
);


const RootNavigator = () => {
    const { user, userRole, isLoading } = useAuth(); 

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#d26e00" />
            </View>
        );
    }
    if (user && userRole === 'cliente') {
        return <ClientStack />;
    }
    
    if (user && userRole === 'prestador') {
        return <ProfessionalStack />;
    }

    return <AuthStack />; 
};


// 5. App Componente principal
export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}