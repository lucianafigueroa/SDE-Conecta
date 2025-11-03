import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

// Pantallas de profesional
import InicioProfesional from "../screens/InicioProfesional";
import NotificacionesProfesional from "../screens/NotificacionesProfesional";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF7F27",
        tabBarInactiveTintColor: "#6E6E6E",
        tabBarLabelStyle: { fontSize: 11 },
        tabBarStyle: { paddingVertical: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Inicio":
              return <Ionicons name="home" size={24} color={color} />;
            case "Presupuestos":
              return <Ionicons name="clipboard-outline" size={24} color={color} />;
            case "Promociones":
              return <Feather name="gift" size={24} color={color} />;
            case "Notificaciones":
              return <Ionicons name="notifications-outline" size={24} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioProfesional} />
      <Tab.Screen name="Notificaciones" component={NotificacionesProfesional} />
    </Tab.Navigator>
  );
}
