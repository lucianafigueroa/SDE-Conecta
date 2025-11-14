import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Pantallas de Cliente
import InicioCliente from "../screens/InicioCliente";
import Prestadores from "../screens/Prestadores";
import Calificaciones from "../screens/Calificaciones";
import MiPerfil from "../screens/MiPerfil";
import Chat from "../screens/Chat";

// Pantallas de Profesional
import InicioProfesional from "../screens/InicioProfesional";
import NotificacionesProfesional from "../screens/NotificacionesProfesional";

const Tab = createBottomTabNavigator();

const customerTabs = [
  { name: "Inicio", component: InicioCliente, iconFocused: "home", iconInactive: "home-outline" },
  { name: "Prestadores", component: Prestadores, iconFocused: "search", iconInactive: "search-outline" },
  { name: "Chat", component: Chat, iconFocused: "chatbubbles", iconInactive: "chatbubbles-outline" },
  { name: "Calificaciones", component: Calificaciones, iconFocused: "star", iconInactive: "star-outline" },
  { name: "Perfil", component: MiPerfil, iconFocused: "person-circle", iconInactive: "person-circle-outline" },
];

// --- CAMBIO AQUÍ: Reordenamos y ajustamos las pestañas del profesional ---
const professionalTabs = [
  { name: "Inicio", component: InicioProfesional, iconFocused: "home", iconInactive: "home-outline" },
  { name: "Presupuestos", component: InicioProfesional, iconFocused: "clipboard", iconInactive: "clipboard-outline" },
  { name: "Chat", component: Chat, iconFocused: "chatbubbles", iconInactive: "chatbubbles-outline" },
  { name: "Notificaciones", component: NotificacionesProfesional, iconFocused: "notifications", iconInactive: "notifications-outline" },
  { name: "Perfil", component: MiPerfil, iconFocused: "person-circle", iconInactive: "person-circle-outline" },
];

export default function AppTabs() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().rol);
        } else {
          setUserRole('cliente'); 
        }
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
      {tabsToRender.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
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