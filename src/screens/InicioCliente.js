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
import { useAuth } from "../contexts/AuthContext"; // Importamos el hook del contexto
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

const { width } = Dimensions.get("window");

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

  // Obtenemos el usuario logueado desde el contexto
  const { user } = useAuth();

  // Estados para los datos de la pantalla
  const [clienteData, setClienteData] = useState(null);
  const [profesiones, setProfesiones] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      // Si no hay UID, no podemos cargar nada
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Usamos Promise.all para cargar todo en paralelo y mejorar la velocidad
        const [
          profesionesSnap,
          prestadoresSnap,
          clienteDocSnap
        ] = await Promise.all([
          getDocs(collection(db, "profesiones")),
          getDocs(query(collection(db, "usuarios"), where("rol", "==", "prestador"))),
          getDoc(doc(db, "usuarios", user.uid)) // Forma más eficiente de obtener el documento del cliente
        ]);

        // Procesamos los datos
        if (clienteDocSnap.exists()) {
          setClienteData(clienteDocSnap.data());
        }

        const listaProfesiones = profesionesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const listaPrestadores = prestadoresSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setProfesiones(listaProfesiones);
        setRecomendados(listaPrestadores);

      } catch (error) {
        console.error("Error al cargar datos de la pantalla:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [user?.uid]); // El efecto se ejecuta solo si cambia el UID del usuario

  // Calculamos el primer nombre para el saludo
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
          <Text style={styles.headerText}>
            Hola {firstName}
          </Text>
          <Text style={styles.locationText}>
            {clienteData?.domicilio || "Domicilio no disponible"}
          </Text>
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/images/banner.png")}
            style={styles.bannerImage}
          />
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity onPress={() => navigation.navigate("VerMasServicios")}>
              <Text style={styles.verMasLink}>Ver más ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesContainer}>
            {profesiones.slice(0, 4).map((serv) => (
              <TouchableOpacity key={serv.id} style={styles.serviceCard}>
                <Image
                  source={iconos[serv.icono] || require("../assets/images/sobre.png")}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceName}>{serv.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendados</Text>
            <TouchableOpacity onPress={() => navigation.navigate("VerMasRecomendados")}>
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
  header: { width: "100%", backgroundColor: "#d26e00", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 70 },
  headerText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  locationText: { fontSize: 14, color: "#fff", fontWeight: "bold" },
  searchContainer: { position: "absolute", top: 150, left: 20, right: 20, height: 53, backgroundColor: "#fff", borderRadius: 32, justifyContent: "center", paddingHorizontal: 15, shadowColor: "#000", shadowOpacity: 0.25, shadowOffset: { width: 0, height: 4 }, shadowRadius: 9, zIndex: 10 },
  searchText: { fontSize: 16, color: "#2c3e50" },
  bannerContainer: { marginTop: 50, marginHorizontal: 20, marginBottom: 10 },
  bannerImage: { width: "100%", height: 181, borderRadius: 15 },
  servicesSection: { marginHorizontal: 20, marginTop: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  verMasLink: { fontSize: 14, color: "#d26e00", fontWeight: "600" },
  servicesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  serviceCard: { width: "47%", backgroundColor: "#fff", borderRadius: 10, marginBottom: 20, alignItems: "center", paddingVertical: 10 },
  serviceIcon: { width: 60, height: 60, marginBottom: 5 },
  serviceName: { fontSize: 14, color: "#2c3e50" },
  recommendedSection: { marginHorizontal: 20, marginBottom: 20 },
  providerCard: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 10, marginBottom: 15, padding: 10, alignItems: "center" },
  providerImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 16, fontWeight: "bold", color: "#2c3e50" },
  providerRating: { fontSize: 14, color: "#f39c12" },
  providerService: { fontSize: 14, color: "#7f8c8d" },
  providerArrow: { fontSize: 22, color: "#ccc" },
});