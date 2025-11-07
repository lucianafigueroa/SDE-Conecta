import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const { width } = Dimensions.get("window");

// --- Iconos locales ---
const iconos = {
  carpinteroIcono: require("../assets/images/carpinteroIcono.png"),
  limpiezaIcono: require("../assets/images/limpiezaIcono.png"),
  plomeroIcono: require("../assets/images/plomeroIcono.png"),
  pintorIcono: require("../assets/images/pintorIcono.png"),
  albañilIcono: require("../assets/images/albañilIcono.png"),
  electricistaIcono: require("../assets/images/electricistaIcono.png"),
};

export default function VerMasServicios({ navigation, route }) {
  const [profesiones, setProfesiones] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Detectar enfoque de pantalla ---
  useFocusEffect(
    useCallback(() => {
      console.log("-> PANTALLA ENFOCADA:", route.name);
      return () => {};
    }, [route.name])
  );

  // --- Cargar profesiones desde Firestore ---
  useEffect(() => {
    const cargarProfesiones = async () => {
      try {
        const profesionesSnap = await getDocs(collection(db, "profesiones"));
        const lista = profesionesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfesiones(lista);
      } catch (error) {
        console.error("Error al cargar profesiones:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProfesiones();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#D26E00"
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Header con botón atrás y título --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Servicios</Text>
        </View>

        {/* --- Contenido principal --- */}
        <View style={styles.servicesContainer}>
          {profesiones.map((serv) => (
            <TouchableOpacity key={serv.id} style={styles.serviceCard}>
              <Image
                source={iconos[serv.icono] || require("../assets/images/sobre.png")}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceName}>{serv.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  backArrow: {
    fontSize: 24,
    color: "#2C3E50",
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: 15,
    elevation: 3,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: "contain",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
});
