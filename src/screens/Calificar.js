import React, { useState, useEffect } from "react"; // <-- Agregué useEffect
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query, // <-- Importación para consulta
  where, // <-- Importación para filtro
  getDocs, // <-- Importación para ejecutar
} from "firebase/firestore";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

// Íconos locales
import iconLocation from "../assets/images/localizacion.png";
import placeholder from "../assets/images/MariaCarrizo.png";
import starFilled from "../assets/images/star.png";
import starEmpty from "../assets/images/siluetastar.png";
import uploadIcon from "../assets/images/subir.png";
import arrowBack from "../assets/images/back.png";

// Fotos disponibles
const fotosPerfil = {
  mujer: require("../assets/images/mujer.png"),
  fotoNicolas: require("../assets/images/fotoNicolas.jpg"),
};

export default function Calificar({ navigation, route }) {
  useScreenFocusLogger();
  const { prestador, user } = route.params || {};

  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false); // <-- Nuevo estado de control

  const clientEmail = user?.email || "desconocido";

  // Función de verificación de reseña existente
  const checkExistingReview = async () => {
    if (!prestador?.id || clientEmail === "desconocido") return;

    try {
      const reseñasRef = collection(db, "usuarios", prestador.id, "resenias");
      // Consulta: ¿Existe una reseña de este cliente para este prestador?
      const q = query(reseñasRef, where("clienteEmail", "==", clientEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setHasReviewed(true);
        // Alert.alert(
        //   "Ya has calificado",
        //   "Ya calificaste a este prestador. Solo puedes enviar una reseña."
        // );
      }
    } catch (error) {
      console.error("Error al verificar reseña existente:", error);
    }
  };

  // Ejecutar la verificación al cargar
  useEffect(() => {
    checkExistingReview();
  }, [prestador?.id, clientEmail]);

  const handleUploadPhoto = () => {
    Alert.alert("Función no implementada", "Aquí se podrá subir una foto pronto.");
  };

  const handleSubmit = async () => {
    // 1. Verificación preliminar (Estado local)
    if (hasReviewed) {
      Alert.alert(
        "No permitido",
        "Ya has calificado a este prestador. No puedes enviar otra reseña."
      );
      return;
    }

    if (!rating || !opinion) {
      Alert.alert("Completa los campos", "Debes dar una calificación y escribir una opinión.");
      return;
    }

    // 2. Verificación final (Seguridad contra reenvíos rápidos)
    try {
      const reseñasRef = collection(db, "usuarios", prestador.id, "resenias");
      const q = query(reseñasRef, where("clienteEmail", "==", clientEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setHasReviewed(true);
        Alert.alert(
          "Ya has calificado",
          "Ya calificaste a este prestador. Solo puedes enviar una reseña."
        );
        return;
      }
    } catch (error) {
        console.error("Error de verificación final:", error);
        Alert.alert("Error de verificación", "Hubo un problema. Inténtalo de nuevo.");
        return;
    }

    try {
      setLoading(true);
      const reseñasRef = collection(db, "usuarios", prestador.id, "resenias");

      await addDoc(reseñasRef, {
        comentario: opinion.trim(),
        calificacion: rating,
        clienteEmail: clientEmail, // Usamos el email del cliente para la restricción
        clienteNombre:
          user?.nombre || user?.displayName || user?.fullName || "Anónimo",
        fecha: Timestamp.now(),
      });

      setHasReviewed(true); // Evitar reenvíos tras el éxito
      Alert.alert("Éxito", "Tu reseña se ha enviado correctamente.");
      navigation.navigate("VerPerfil", { prestador, user });
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      Alert.alert("Error", "Hubo un problema al enviar la reseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowBack} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calificar Servicio</Text>
        </View>

        {/* Tarjeta principal */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={
                prestador?.foto && fotosPerfil[prestador.foto]
                  ? fotosPerfil[prestador.foto]
                  : placeholder
              }
              style={styles.avatar}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{prestador?.nombre || "Profesional"}</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image key={i} source={starFilled} style={styles.smallStar} />
                ))}
                <Text style={styles.opinionsText}>
                  {prestador?.puntuacion?.toFixed(1) || "0.0"} ⭐
                </Text>
              </View>
              <View style={styles.location}>
                <Image source={iconLocation} style={styles.iconLocation} />
                <Text style={styles.locationText}>
                  {prestador?.domicilio || "Sin dirección"}
                </Text>
              </View>
            </View>
          </View>

          {/* Calificación */}
          <Text style={styles.subtitle}>¿Cómo calificarías el servicio?</Text>
          <View style={[styles.starsContainer, hasReviewed && { opacity: 0.5 }]}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => !hasReviewed && setRating(star)} // <-- Evita la acción si ya calificó
                disabled={hasReviewed} // <-- Deshabilita la interacción
              >
                <Image
                  source={star <= rating ? starFilled : starEmpty}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Subir foto */}
          <Text style={styles.subtitle}>Subir foto del servicio</Text>
          <TouchableOpacity
            style={[styles.uploadBox, hasReviewed && { opacity: 0.5 }]} // <-- Opacidad si ya calificó
            onPress={handleUploadPhoto}
            disabled={hasReviewed} // <-- Deshabilita la interacción
          >
            <Text style={styles.uploadText}>Subir foto</Text>
            <Image source={uploadIcon} style={styles.uploadIcon} />
          </TouchableOpacity>

          {/* Opinión */}
          <Text style={styles.subtitle}>Escribir tu opinión</Text>
          <TextInput
            style={[styles.input, hasReviewed && { backgroundColor: '#E0E0E0' }]} // <-- Cambia color si ya calificó
            placeholder={hasReviewed ? "Ya enviaste tu reseña para este servicio." : "Escribe tu experiencia..."} // <-- Placeholder informativo
            value={opinion}
            onChangeText={setOpinion}
            multiline
            editable={!hasReviewed} // <-- Deshabilita la edición
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (loading || hasReviewed) && { opacity: 0.6, backgroundColor: hasReviewed ? '#95A5A6' : '#0A3D62' } // <-- Cambia color y opacidad
          ]}
          onPress={handleSubmit}
          disabled={loading || hasReviewed} // <-- Deshabilita si cargando o si ya calificó
        >
          <Text style={styles.submitText}>
            {loading ? "Enviando..." : hasReviewed ? "Ya Calificado" : "Subir"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E9EDF3" },
  container: { alignItems: "center", paddingBottom: 30 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "white",
    width: "100%",
  },
  arrowIcon: { width: 20, height: 20, tintColor: "#2C3E50", marginTop: 40 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    marginRight: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 80,
  },
  header: { flexDirection: "row", marginBottom: 15 },
  avatar: { width: 90, height: 90, borderRadius: 15, marginRight: 15 },
  infoContainer: { flex: 1 },
  name: { fontWeight: "700", fontSize: 16, color: "#2C3E50" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  smallStar: { width: 13, height: 13, marginRight: 2, tintColor: "#F39C12" },
  opinionsText: { color: "#606060", fontSize: 12, marginLeft: 4 },
  location: { flexDirection: "row", alignItems: "center", marginTop: 3 },
  iconLocation: { width: 14, height: 14, marginRight: 5 },
  locationText: { fontSize: 13, color: "#606060" },
  subtitle: {
    color: "#2C3E50",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 10,
  },
  starsContainer: { flexDirection: "row", marginVertical: 10 },
  star: { width: 28, height: 28, marginHorizontal: 3, tintColor: "#F39C12" },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: "#B0B0B0",
    borderStyle: "dashed",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  uploadText: { color: "#B0B0B0", fontSize: 14 },
  uploadIcon: { width: 20, height: 20, tintColor: "#B0B0B0" },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 100,
    marginTop: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#0A3D62",
    borderRadius: 25,
    width: "90%",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 25,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});