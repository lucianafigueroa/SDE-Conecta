import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../config/firebaseConfig";
import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// --- Importaciones de Auth añadidas ---
import { getAuth, signOut } from "firebase/auth";
// ---
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";

// Íconos locales
import locationOnIcon from "../assets/images/localizacion.png";
import alarmIcon from "../assets/images/tiempo.png";
import arrowForwardIosIcon from "../assets/images/arrow.png";
import starIcon from "../assets/images/star.png";
import starEmptyIcon from "../assets/images/siluetastar.png";
import userProfilePlaceholder from "../assets/images/placeholder.png";

const { width, height } = Dimensions.get("window");
const PADDING_HORIZONTAL_CONTENT = 25;
const GAP_BETWEEN_IMAGES = 8;
const contentWidth = width - 2 * PADDING_HORIZONTAL_CONTENT;
const serviceImageWidth = (contentWidth - 2 * GAP_BETWEEN_IMAGES) / 3;
const MAX_LINES = 5;

const fotosPerfil = {
  mujer: require("../assets/images/mujer.png"),
  fotoNicolas: require("../assets/images/fotoNicolas.jpg"),
};

// Tarjeta de Opinión
const ReviewCard = ({ name, date, reviewText, rating = 5 }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <View style={reviewStyles.card}>
      <View style={reviewStyles.header}>
        <Image
          source={userProfilePlaceholder}
          style={reviewStyles.profileImage}
        />
        <View>
          <Text style={reviewStyles.nameText}>{name}</Text>
          <Text style={reviewStyles.dateTextSmall}>{date}</Text>
        </View>

        <View style={reviewStyles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              source={starIcon}
              style={[
                reviewStyles.starIcon,
                { tintColor: i < rating ? "#D26E00" : "#ccc" },
              ]}
            />
          ))}
        </View>
      </View>

      <Text
        numberOfLines={expanded ? undefined : 3}
        style={reviewStyles.reviewText}
      >
        {reviewText}
      </Text>

      {reviewText?.length > 100 && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={reviewStyles.readMoreText}>
            {expanded ? "Ver menos" : "Leer más"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function MiPerfilProfesional({ navigation, route }) {
  useScreenFocusLogger();
  const { uid } = route.params; // ID del prestador
  const [prestador, setPrestador] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [reseñas, setReseñas] = useState([]);

  const handleGoBack = () => navigation.goBack();
  // Cargar datos del profesional
  const obtenerPrestador = async () => {
    const ref = doc(db, "usuarios", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) setPrestador({ id: snap.id, ...snap.data() });
  };

  // Cargar servicios del profesional
  const obtenerServicios = async () => {
    const q = query(collection(db, "servicios"), where("usuarioId", "==", uid));
    const snap = await getDocs(q);
    let lista = [];
    snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));
    setServicios(lista);
  };

  const guardarCambios = async () => {
    try {
      await updateDoc(doc(db, "usuarios", prestador.id), {
        domicilio: prestador.domicilio,
        descripcion: prestador.descripcion,
        disponibilidad: prestador.disponibilidad,
        horario: prestador.horario,
      });

      Alert.alert("Éxito", "Cambios guardados correctamente");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudieron guardar los cambios");
    }
  };

  // --- Función de Cerrar Sesión Añadida ---
  const handleCerrarSesion = () => {
  Alert.alert("Cerrar Sesión", "¿Estás seguro de que deseas cerrar sesión?", [
    { text: "Cancelar", style: "cancel" },
    {
      text: "Sí, cerrar sesión",
      onPress: async () => {
        try {
          const auth = getAuth();
          await signOut(auth); // Solo esto
        } catch (error) {
          console.error(error);
        }
      },
      style: "destructive",
    },
  ]);
};

  // ---

  useEffect(() => {
    obtenerPrestador();
    obtenerServicios();
  }, []);

  // Eliminar servicio
  const eliminarServicio = (id) => {
    Alert.alert("Eliminar servicio", "¿Estás seguro de borrar este servicio?", [
      { text: "Cancelar" },
      {
        text: "Eliminar",
        onPress: async () => {
          await deleteDoc(doc(db, "servicios", id));
          obtenerServicios();
        },
      },
    ]);
  };

  if (!prestador) return <Text>Cargando...</Text>;

  let fotoPerfil = userProfilePlaceholder;
  if (prestador.foto) {
    if (fotosPerfil[prestador.foto]) {
      fotoPerfil = fotosPerfil[prestador.foto];
    } else if (prestador.foto.startsWith("http")) {
      fotoPerfil = { uri: prestador.foto };
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.profileNameHeader}>{prestador.nombre}</Text>
        </View>
        <Image source={fotoPerfil} style={styles.profileImage} />
        <View style={styles.contentCard}>
          <View style={styles.nameRatingContainer}>
            <Text style={styles.nameText}>{prestador.nombre}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {prestador.puntuacion?.toFixed(1) || "0.0"}
              </Text>
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  source={starIcon}
                  style={[
                    styles.starIcon,
                    {
                      tintColor:
                        i < Math.round(prestador.puntuacion || 0)
                          ? "#D26E00"
                          : "#ccc",
                    },
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Image source={locationOnIcon} style={styles.locationIcon} />
            <TextInput
              style={[styles.locationText, styles.inputEditable]}
              value={prestador.domicilio}
              onChangeText={(text) =>
                setPrestador({ ...prestador, domicilio: text })
              }
            />
          </View>
          <TextInput
            style={[
              styles.descriptionText,
              {
                backgroundColor: "#F7F7F7",
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#D6D6D6",
                marginTop: 10,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              },
            ]}
            multiline
            value={
              prestador.descripcion ||
              `Profesional especializado en ${
                prestador.profesion?.toLowerCase() || "servicios generales"
              }.`
            }
            onChangeText={(text) =>
              setPrestador({ ...prestador, descripcion: text })
            }
          />
          <Text style={[styles.descriptionText, styles.serviceListTitle]}>
            Servicios:
          </Text>
          <View style={styles.serviceListContainer}>
            {Array.isArray(prestador.profesion) ? (
              prestador.profesion.map((prof, i) => (
                <Text key={i} style={styles.serviceListItem}>
                  • {prof}
                </Text>
              ))
            ) : (
              <Text style={styles.serviceListItem}>
                • {prestador.profesion || "Servicio general"}
              </Text>
            )}
          </View>
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.availabilityText}>Disponibilidad: </Text>

                <TextInput
                  style={[
                    styles.availabilityText,
                    styles.inputEditable,
                    { flex: 1 },
                  ]}
                  value={prestador.disponibilidad || "Sin información"}
                  onChangeText={(text) =>
                    setPrestador({ ...prestador, disponibilidad: text })
                  }
                />
              </View>
            </View>
            <Image source={alarmIcon} style={styles.alarmIcon} />
            <TextInput
              style={[styles.hoursText, styles.inputEditable]}
              value={prestador.horario || "Todo el día"}
              onChangeText={(text) =>
                setPrestador({ ...prestador, horario: text })
              }
            />
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {servicios.length > 0 ? (
              servicios.slice(0, 3).map((servicio, i) => (
                <View key={i} style={{ position: "relative" }}>
                  {/* BOTÓN ELIMINAR */}
                  <TouchableOpacity
                    onPress={() => eliminarServicio(servicio.id)}
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      backgroundColor: "red",
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      X
                    </Text>
                  </TouchableOpacity>

                  {/* IMAGEN DEL SERVICIO */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetalleServicio", {
                        servicio,
                        prestador,
                      })
                    }
                  >
                    <Image
                      source={{ uri: servicio.fotosUrls?.[0] }}
                      style={styles.serviceImage}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={{ color: "#606060", fontSize: 12 }}>
                No hay imágenes disponibles
              </Text>
            )}
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Opiniones de Clientes</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
          {Array.isArray(reseñas) && reseñas.length > 0 ? (
            reseñas.map((r, index) => (
              <ReviewCard
                key={index}
                name={r.clienteNombre || "Anónimo"}
                date={
                  r.fecha
                    ? new Date(r.fecha.seconds * 1000).toLocaleDateString(
                        "es-AR"
                      )
                    : "Sin fecha"
                }
                reviewText={r.comentario || "Sin comentario"}
                rating={r.calificacion || 0}
              />
            ))
          ) : (
            <Text
              style={{ color: "#606060", fontSize: 12, marginBottom: 10 }}
            >
              No hay opiniones todavía.
            </Text>
          )}

          {/* --- Botón Guardar Cambios --- */}
          <TouchableOpacity
            style={styles.saveButtonModern}
            onPress={guardarCambios}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonModernText}>Guardar cambios</Text>
          </TouchableOpacity>

          {/* --- Botón Cerrar Sesión --- */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleCerrarSesion}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const reviewStyles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  nameText: { fontSize: 14, fontWeight: "600", color: "#2C3E50" },
  dateTextSmall: { fontSize: 10, color: "#606060" },
  ratingContainer: { flexDirection: "row", marginLeft: "auto" },
  starIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    tintColor: "#D26E00",
    marginRight: 2,
  },
  reviewText: {
    fontSize: 12,
    color: "#606060",
    lineHeight: 18,
    marginBottom: 5,
  },
  readMoreText: { fontSize: 12, color: "#D26E00", fontWeight: "600" },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#e5e8ec" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingBottom: 150,
    backgroundColor: "white",
    width: "100%",
  },
  backButton: { paddingRight: 15 },
  backIcon: { fontSize: 28, color: "#2C3E50" },
  profileNameHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginLeft: 5,
  },
  scrollViewContent: { alignItems: "center", paddingBottom: 100 },
  profileImage: {
    width: width * 0.9,
    height: width * 0.9 * (238 / 390),
    resizeMode: "cover",
    position: "absolute",
    top: 100,
    zIndex: 1,
    borderRadius: 15,
  },
  contentCard: {
    backgroundColor: "white",
    width: "100%",
    minHeight: height * 0.7,
    marginTop: 60,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: PADDING_HORIZONTAL_CONTENT,
    paddingTop: 20,
    zIndex: 2,
  },
  nameRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
    marginRight: 10,
  },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 14, color: "#606060", marginRight: 5 },
  starIcon: { width: 13, height: 13, resizeMode: "contain" },
  locationContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  locationIcon: { width: 15, height: 15, marginRight: 5, tintColor: "#606060" },
  locationText: { fontSize: 14, color: "#606060" },
  descriptionText: {
    fontSize: 12,
    color: "#606060",
    lineHeight: 18,
    marginTop: 10,
  },
  serviceListTitle: { fontWeight: "600" },
  serviceListContainer: { paddingLeft: 10 },
  serviceListItem: {
    fontSize: 12,
    color: "#606060",
    lineHeight: 20,
    marginTop: 2,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
    justifyContent: "space-between",
  },
  availabilityRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  alarmIcon: { width: 15, height: 15, marginRight: 5, tintColor: "#606060" },
  availabilityText: { fontSize: 14, fontWeight: "600", color: "#606060" },
  hoursText: { fontSize: 14, color: "#606060" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#2c3e50" },
  viewMoreButton: { flexDirection: "row", alignItems: "center" },
  viewMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2c3e50",
    marginRight: 5,
  },
  arrowIcon: { width: 13, height: 13, tintColor: "#2c3e50" },
  servicesImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  serviceImage: {
    width: serviceImageWidth > 0 ? serviceImageWidth : 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  bottomButton: {
    width: "48%",
    borderRadius: 32,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  calificarButton: { backgroundColor: "#2c3e50", opacity: 0.9 },
  orangeButton: { backgroundColor: "#D26E00" },
  bottomButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  inputEditable: {
    backgroundColor: "#F7F7F7",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    marginTop: 10,
    elevation: 2,

    // Sombras iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: "#2c3e50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  saveButtonModern: {
    marginTop: 25,
    // width: "100%", // <-- Línea quitada para que respete el padding
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "#2c3e50",

    // Sombra elegante
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Centrado
    justifyContent: "center",
    alignItems: "center",

    // Efecto visual de botón 3D
    borderWidth: 1,
    borderColor: "#1f2a36",
  },

  saveButtonModernText: {
    fontSize: 17,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // --- Estilos del botón Cerrar Sesión ---
  logoutButton: {
    marginTop: 15,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#c0392b", // Un tono rojo
    
    justifyContent: "center",
    alignItems: "center",
  },

  logoutButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#c0392b", // Un tono rojo
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  // ---
});