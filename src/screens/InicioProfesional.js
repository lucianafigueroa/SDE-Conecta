import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

import BANNER_IMAGE from "../assets/images/banner.png";

const iconos = {
  carpinteroIcono: require("../assets/images/carpinteroIcono.png"),
  limpiezaIcono: require("../assets/images/limpiezaIcono.png"),
  plomeroIcono: require("../assets/images/plomeroIcono.png"),
  pintorIcono: require("../assets/images/pintorIcono.png"),
  albañilIcono: require("../assets/images/albañilIcono.png"),
  electricistaIcono: require("../assets/images/electricistaIcono.png"),
  niñeraIcono: require("../assets/images/niñeraIcono.png"),
  sobre: require("../assets/images/sobre.png"),
};

export default function InicioProfesional({ navigation }) {
  useScreenFocusLogger();

  const [userName, setUserName] = useState("Cargando...");
  const [userAddress, setUserAddress] = useState("Domicilio no disponible");
  const [profesiones, setProfesiones] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  // cargar nombre del usuario
  useEffect(() => {
    let mounted = true;

    const fetchUserData = async (user) => {
      try {
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && mounted) {
          const data = userDoc.data();
          const nombre = data.nombre || "Usuario";
          const domicilio = data.domicilio || "Domicilio no disponible";

          setUserName(nombre.split(" ")[0]);
          setUserAddress(domicilio);
        }
      } catch (e) {
        console.error("Error Firestore:", e);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) fetchUserData(u);
      else {
        setUserName("Invitado");
        setUserAddress("Domicilio no disponible");
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  // cargar profesiones igual que InicioCliente
  useEffect(() => {
    let mounted = true;

    const cargarProfesiones = async () => {
      try {
        const snap = await getDocs(collection(db, "profesiones"));
        if (!mounted) return;
        const lista = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProfesiones(lista);
      } catch (err) {
        console.error("Error cargando profesiones:", err);
      } finally {
        if (mounted) setLoadingServicios(false);
      }
    };

    cargarProfesiones();

    return () => {
      mounted = false;
    };
  }, []);

  const ServiceCard = ({ nombre, icono }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() =>
        navigation.navigate("RegistrarServicio", {
          categoriaSeleccionada: {
            id: nombre,
            label: nombre,
          },
          categoriasActuales: [],
        })
      }
    >
      <Image
        source={iconos[icono] || iconos["sobre"]}
        style={styles.serviceIcon}
      />
      <Text style={styles.serviceName}>{nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* ------------------ HEADER IGUAL A INICIOCLIENTE ------------------ */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Hola {userName}</Text>

          <Text style={styles.locationText}>
            {userAddress}
          </Text>
        </View>
        {/* ------------------------------------------------------------------ */}

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={BANNER_IMAGE} style={styles.bannerImage} resizeMode="cover" />
          <Text style={styles.bannerText}>Los mejores servicios locales</Text>
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Servicios dinámicos */}
        <View style={styles.servicesSection}>
          <View style={styles.servicesHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
          </View>

          <View style={styles.servicesGrid}>
            {loadingServicios ? (
              <Text style={{ color: "#555" }}>Cargando...</Text>
            ) : (
              profesiones.map((serv) => (
                <ServiceCard
                  key={serv.id}
                  nombre={serv.nombre}
                  icono={serv.icono}
                />
              ))
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#e5e8ec" },
  container: { paddingBottom: 100 },

  /* ---------- HEADER IGUAL A INICIOCLIENTE ---------- */
  header: {
    width: "100%",
    backgroundColor: "#d26e00",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  /* --------------------------------------------------- */

  bannerContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    height: 181,
    marginBottom: 10,
  },
  bannerImage: { width: "100%", height: 181, position: "absolute" },
  bannerText: {
    position: "absolute",
    top: 80,
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
    borderRadius: 5,
  },
  paginationDots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#CCC", marginHorizontal: 4 },
  activeDot: { backgroundColor: "white", width: 12, height: 8, borderRadius: 4 },

  servicesSection: { marginHorizontal: 20, marginTop: 20 },
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  verMasLink: { fontSize: 14, color: "#d26e00", fontWeight: "600" },

  servicesGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  serviceCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  serviceIcon: { width: 60, height: 60, marginBottom: 5 },
  serviceName: { fontSize: 14, color: "#2c3e50" },
});
