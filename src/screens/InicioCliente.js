import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

const { width } = Dimensions.get("window");
import BANNER_IMAGE from "../assets/images/banner.png";

const iconos = {
  carpinteroIcono: require("../assets/images/carpinteroIcono.png"),
  limpiezaIcono: require("../assets/images/limpiezaIcono.png"),
  plomeroIcono: require("../assets/images/plomeroIcono.png"),
  pintorIcono: require("../assets/images/pintorIcono.png"),
  albañilIcono: require("../assets/images/albañilIcono.png"),
  electricistaIcono: require("../assets/images/electricistaIcono.png"),
  niñeraIcono: require("../assets/images/niñeraIcono.png"),
};

const fotosPerfil = {
  mujer: require("../assets/images/mujer.png"),
  fotoNicolas: require("../assets/images/fotoNicolas.jpg"),
};

export default function InicioCliente({ navigation }) {
  useScreenFocusLogger();
  const { user } = useAuth();

  const [clienteData, setClienteData] = useState(null);
  const [profesiones, setProfesiones] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [
          profesionesSnap,
          prestadoresSnap,
          clienteDocSnap
        ] = await Promise.all([
          getDocs(collection(db, "profesiones")),
          getDocs(query(collection(db, "usuarios"), where("rol", "==", "prestador"))),
          getDoc(doc(db, "usuarios", user.uid)),
        ]);

        if (clienteDocSnap.exists()) {
          setClienteData(clienteDocSnap.data());
        }

        setProfesiones(profesionesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setRecomendados(prestadoresSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [user?.uid]);

  const firstName = clienteData?.nombre?.split(' ')[0] || "Usuario";

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#d26e00" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hola {firstName}</Text>
          <Text style={styles.locationText}>
            {clienteData?.domicilio || "Domicilio no disponible"}
          </Text>
        </View>

        <View style={styles.bannerContainer}>
          <Image source={BANNER_IMAGE} style={styles.bannerImage} resizeMode="cover" />
          <Text style={styles.bannerText}>Los mejores servicios locales</Text>
        </View>

        {/* SERVICIOS */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Prestadores")}>
              <Text style={styles.verMasLink}>Ver más ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesContainer}>
            {profesiones.slice(0, 4).map((serv) => (
              <TouchableOpacity
                key={serv.id}
                style={styles.serviceCard}
                onPress={() =>
                  navigation.navigate("Prestadores", { categoria: serv.nombre })
                }
              >
                <Image
                  source={iconos[serv.icono] || require("../assets/images/sobre.png")}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceName}>{serv.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* RECOMENDADOS */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendados</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Prestadores")}>
              <Text style={styles.verMasLink}>Ver más ›</Text>
            </TouchableOpacity>
          </View>

          {recomendados.map((prov) => (
            <TouchableOpacity
              key={prov.id}
              style={styles.providerCard}
              onPress={() => navigation.navigate("VerPerfil", { prestador: prov, user })}
            >
              <Image
                source={fotosPerfil[prov.foto] || require("../assets/images/defaultUser.png")}
                style={styles.providerImage}
              />

              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{prov.nombre}</Text>
                <Text style={styles.providerRating}>
                  ⭐ {prov.puntuacion || 0} ({prov.opiniones || 0})
                </Text>
                <Text style={styles.providerService}>{prov.profesion}</Text>
              </View>

              <Text style={styles.providerArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#e5e8ec" },
  container: { paddingBottom: 100 },

  header: {
    width: "100%",
    backgroundColor: "#d26e00",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  locationText: { fontSize: 14, color: "#fff", fontWeight: "bold" },

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

  servicesSection: { marginHorizontal: 20, marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  verMasLink: { fontSize: 14, color: "#d26e00", fontWeight: "600" },

  servicesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
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

  recommendedSection: { marginHorizontal: 20, marginBottom: 20 },
  providerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  providerImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 16, fontWeight: "bold", color: "#2c3e50" },
  providerRating: { fontSize: 14, color: "#f39c12" },
  providerService: { fontSize: 14, color: "#7f8c8d" },
  providerArrow: { fontSize: 22, color: "#ccc" },
});
