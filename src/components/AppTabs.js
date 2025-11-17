import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig"; // Asegúrate de que las rutas de importación sean correctas
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Pantallas de Cliente
import InicioCliente from "../screens/InicioCliente";
import Prestadores from "../screens/Prestadores";
import Calificaciones from "../screens/Calificaciones";
import MiPerfil from "../screens/MiPerfil";
// --- CAMBIO 1: Importamos la nueva pantalla de lista de chats ---
import ChatList from "../screens/ChatList"; 

// Pantallas de Profesional
import InicioProfesional from "../screens/InicioProfesional";
import RegistrarServicio from "../screens/RegistrarServicio";
import Citas from "../screens/Citas";
import MiPerfilProfesional from "../screens/MiPerfilProfesional";

const Tab = createBottomTabNavigator();

// Definición de las pestañas para Clientes
const customerTabs = [
  { name: "Inicio", component: InicioCliente, iconFocused: "home", iconInactive: "home-outline" },
  { name: "Prestadores", component: Prestadores, iconFocused: "search", iconInactive: "search-outline" },
  // --- CAMBIO 2: La pestaña "Chat" ahora usa el componente ChatList ---
  { name: "Chat", component: ChatList, iconFocused: "chatbubbles", iconInactive: "chatbubbles-outline" },
  { name: "Calificaciones", component: Calificaciones, iconFocused: "star", iconInactive: "star-outline" },
  { name: "Perfil", component: MiPerfil, iconFocused: "person-circle", iconInactive: "person-circle-outline" },
];

const professionalTabs = [
  { name: "Inicio", component: InicioProfesional, iconFocused: "home", iconInactive: "home-outline" },
  { name: "Presupuestos", component: InicioProfesional, iconFocused: "clipboard", iconInactive: "clipboard-outline" },
  // --- CAMBIO 3: La pestaña "Chat" del profesional también usa ChatList ---
  { name: "Chat", component: ChatList, iconFocused: "chatbubbles", iconInactive: "chatbubbles-outline" },
  { name: "Notificaciones", component: NotificacionesProfesional, iconFocused: "notifications", iconInactive: "notifications-outline" },
  { name: "Perfil", component: MiPerfil, iconFocused: "person-circle", iconInactive: "person-circle-outline" },
];

export default function AppTabs() {
  const [userRole, setUserRole] = useState(null);
  const [userUid, setUserUid] = useState(null); // Nuevo estado para guardar el UID del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener para el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. Guardar el UID del usuario autenticado
        setUserUid(user.uid);

        const userDocRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().rol);
        } else {
          // Si no existe en Firestore, por defecto es cliente
          setUserRole('cliente');
        }
      } else {
        // No hay usuario autenticado
        setUserUid(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d26e00" />
      </View>
    );
  }

  const tabsToRender = userRole === 'prestador' ? professionalTabs : customerTabs;
  const activeColor = userRole === 'prestador' ? "#FF7F27" : "#d26e00";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: "#6E6E6E",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginBottom: 5,
        },
        tabBarStyle: {
          height: 70,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          const tabInfo = tabsToRender.find(tab => tab.name === route.name);

          if (tabInfo) {
            iconName = focused ? tabInfo.iconFocused : tabInfo.iconInactive;
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {tabsToRender.map((tab) => {
        let initialParams = {};

        // 2. Lógica CRÍTICA: Inyectar el UID si la pestaña es "Perfil" y el rol es 'prestador'
        // Esto resuelve el error de "Cannot read property 'uid' of undefined"
        if (tab.name === "Perfil" && userRole === 'prestador' && userUid) {
          initialParams = { uid: userUid };
        }

        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            initialParams={initialParams} // Inyecta el UID en la ruta del Perfil Profesional
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e8ec',
  },
});