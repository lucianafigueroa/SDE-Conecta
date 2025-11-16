import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";
import { useAuth } from "../contexts/AuthContext";

const { width } = Dimensions.get("window");

const fotosPerfil = {
  mujer: require("../assets/images/mujer.png"),
  fotoNicolas: require("../assets/images/fotoNicolas.jpg"),
};

// ------------------------------
// * COMPONENTE TARJETA PRESTADOR
// ------------------------------
const ProviderCard = ({ item, navigation, user }) => (
  <TouchableOpacity
    style={styles.providerCard}
    onPress={() => navigation.navigate("VerPerfil", { prestador: item, user })}
  >
    <Image
      source={fotosPerfil[item.foto] || require("../assets/images/defaultUser.png")}
      style={styles.providerImage}
    />

    <Text style={styles.providerName}>{item.nombre}</Text>
    <Text style={styles.providerService}>{item.profesion}</Text>
    <Text style={styles.rating}>⭐ {item.puntuacion || 0}</Text>
  </TouchableOpacity>
);

export default function Prestadores({ navigation }) {
  useScreenFocusLogger();
  const { user } = useAuth();

  const [profesiones, setProfesiones] = useState([]);
  const [prestadores, setPrestadores] = useState([]);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  // --------------------------------
  // * CARGAR PROFESIONES + PRESTADORES
  // --------------------------------
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);

        const [profesionesSnap, prestadoresSnap] = await Promise.all([
          getDocs(collection(db, "profesiones")),
          getDocs(query(collection(db, "usuarios"), where("rol", "==", "prestador"))),
        ]);

        setProfesiones(profesionesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setPrestadores(prestadoresSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.log("Error cargando prestadores:", e);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // --------------------------
  // * FILTRO COMBINADO
  // --------------------------
  const prestadoresFiltrados = prestadores.filter((p) => {
    const coincideCategoria =
      categoriaActiva === "Todos" ||
      p.profesion?.toLowerCase() === categoriaActiva.toLowerCase();

    const coincideTexto =
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.profesion?.toLowerCase().includes(busqueda.toLowerCase());

    return coincideCategoria && coincideTexto;
  });

  if (cargando) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#d26e00" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* TÍTULO */}
      <View style={styles.headerBackground}>
        <Text style={styles.title}>Prestadores</Text>
      </View>

      {/* BUSCADOR */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar prestador o categoría"
          placeholderTextColor="#777"
          style={styles.searchInput}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* CATEGORÍAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            onPress={() => setCategoriaActiva("Todos")}
            style={[
              styles.categoryPill,
              categoriaActiva === "Todos" && styles.categoryPillActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                categoriaActiva === "Todos" && styles.categoryTextActive,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {profesiones.map((prof) => (
            <TouchableOpacity
              key={prof.id}
              onPress={() => setCategoriaActiva(prof.nombre)}
              style={[
                styles.categoryPill,
                categoriaActiva === prof.nombre && styles.categoryPillActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  categoriaActiva === prof.nombre && styles.categoryTextActive,
                ]}
              >
                {prof.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          key={"grid2"}                       // 👈 fuerza re-render para evitar el error
          data={prestadoresFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
          renderItem={({ item }) => (
            <ProviderCard item={item} navigation={navigation} user={user} />
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------------------
// * ESTILOS
// ------------------------------
const CARD_WIDTH = width * 0.42;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#e5e8ec" },

  headerBackground: {
    backgroundColor: "#d26e00",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  searchContainer: {
    marginTop: -25,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 4,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
  },

  categoryScroll: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  categoryPill: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryPillActive: {
    backgroundColor: "#d26e00",
  },
  categoryText: {
    color: "#2c3e50",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  // → Cada fila del grid
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  providerCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    elevation: 3,
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  providerService: {
    fontSize: 14,
    color: "#666",
  },
  rating: {
    marginTop: 5,
    fontSize: 14,
    color: "#d26e00",
  },
});
