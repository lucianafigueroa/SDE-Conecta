import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Button from "../components/Button";
import { textStyles } from "../styles/texts";

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


const fotosServicios = {
    fotoServicio1Nicolas: require("../assets/images/fotoServicio1Nicolas.jpg"),
    fotoServicio2Nicolas: require("../assets/images/fotoServicio2Nicolas.jpg"),
    fotoServicio3Nicolas: require("../assets/images/fotoServicio3Nicolas.jpg"),
    fotoServicio1Catalina: require("../assets/images/fotoServicio1Catalina.jpg"),
    fotoServicio2Catalina: require("../assets/images/fotoServicio2Catalina.jpg"),
    fotoServicio3Catalina: require("../assets/images/fotoServicio3Catalina.jpg"),

}

// Tarjeta de Opinión
const ReviewCard = ({ name, date, reviewText, isInitiallyLong = false }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <View style={reviewStyles.card}>
      <View style={reviewStyles.header}>
        <Image source={userProfilePlaceholder} style={reviewStyles.profileImage} />
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={reviewStyles.nameText}>{name}</Text>
          <Text style={reviewStyles.dateTextSmall}>{date}</Text>
        </View>
        <View style={reviewStyles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Image key={i} source={starIcon} style={reviewStyles.starIcon} />
          ))}
        </View>
      </View>

      <Text
        style={reviewStyles.reviewText}
        numberOfLines={expanded ? undefined : MAX_LINES}
      >
        {reviewText}
      </Text>

      {reviewText.length > 150 && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={reviewStyles.readMoreText}>
            {expanded ? "Leer menos" : "Leer más"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function VerPerfil({ navigation, route }) {
  const { prestador, user } = route.params || {};
  console.log("🔍 fotosServicios en Firestore:", prestador.fotosServicios);
  console.log("👤 Cliente logueado:", user?.email);

  const handleGoBack = () => navigation.goBack();

  useFocusEffect(
    useCallback(() => {
      console.log("-> PANTALLA ENFOCADA: " + route.name);
      return () => {};
    }, [route.name])
  );

  if (!prestador) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ margin: 40, fontSize: 18, color: "#2C3E50" }}>
          No se encontró la información del prestador.
        </Text>
        <TouchableOpacity onPress={handleGoBack} style={{ marginLeft: 40 }}>
          <Text style={{ color: "#D26E00", fontWeight: "600" }}>← Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 📸 Foto de perfil
  let fotoPerfil = userProfilePlaceholder;
  if (prestador.foto) {
    if (fotosPerfil[prestador.foto]) {
      fotoPerfil = fotosPerfil[prestador.foto];
    } else if (prestador.foto.startsWith("http")) {
      fotoPerfil = { uri: prestador.foto };
    }
  }

  const longReviewText =
    "¡Excelente profesional! Puntual, amable y dejó todo impecable. La recomiendo totalmente. Además, se encargó de cada detalle y dejó la casa reluciente. Es un servicio de 5 estrellas.";
  const shortReviewText =
    "Muy buena experiencia, hizo un gran trabajo. La atención fue personalizada y de calidad.";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.profileNameHeader}>{prestador.nombre}</Text>
        </View>

        {/* Imagen principal */}
        <Image source={fotoPerfil} style={styles.profileImage} />

        {/* Contenido */}
        <View style={styles.contentCard}>
          {/* Nombre + Calificación */}
          <View style={styles.nameRatingContainer}>
            <Text style={styles.nameText}>{prestador.nombre}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {prestador.puntuacion?.toFixed(1) || "0.0"}
              </Text>
              {[...Array(5)].map((_, i) => {
                const filled = i < Math.round(prestador.puntuacion || 0);
                return (
                  <Image
                    key={i}
                    source={starIcon}
                    style={[
                      styles.starIcon,
                      { tintColor: filled ? "#D26E00" : "#ccc" }, // naranja si está llena, gris si no
                    ]}
                  />
                );
              })}
            </View>
            /*
            <Text style={styles.distanceText}>
              {prestador.distancia || "700 m"}
            </Text>*/
          </View>

          {/* Ubicación */}
          <View style={styles.locationContainer}>
            <Image source={locationOnIcon} style={styles.locationIcon} />
            <Text style={styles.locationText}>
              {prestador.domicilio || "Catamarca 50, Sgo. del Estero"}
            </Text>
          </View>

          {/* Descripción */}
          <Text style={styles.descriptionText}>
            {prestador.descripcion ||
              `Profesional especializado en ${prestador.profesion?.toLowerCase() ||
                "servicios generales"}.`}
          </Text>

          {/* Lista de servicios */}
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

          {/* Disponibilidad */}
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityRow}>
              <Image source={alarmIcon} style={styles.alarmIcon} />
              <Text style={styles.availabilityText}>
                {prestador.disponibilidad || "Sin información"}
              </Text>
            </View>
            <Text style={styles.hoursText}>
              {prestador.horario || "Sin información"}
            </Text>
          </View>

          {/* 🧰 Servicios (imágenes desde Firebase) */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.servicesImageContainer}>
            {prestador.fotosServicios && prestador.fotosServicios.length > 0 ? (
              prestador.fotosServicios.map((nombreFoto, i) => {
                // Buscar la imagen local por su nombre
                const imagenLocal = fotosServicios[nombreFoto];

                // Si existe en el objeto fotosServicios, la muestra
                if (imagenLocal) {
                  return (
                    <Image
                      key={i}
                      source={imagenLocal}
                      style={styles.serviceImage}
                    />
                  );
                }

                // Si no se encuentra, muestra un placeholder o un texto
                return (
                  <View
                    key={i}
                    style={[
                      styles.serviceImage,
                      { justifyContent: "center", alignItems: "center", backgroundColor: "#eee" },
                    ]}
                  >
                    <Text style={{ fontSize: 10, color: "#606060" }}>Sin imagen</Text>
                  </View>
                );
              })
            ) : (
              <Text style={{ color: "#606060", fontSize: 12 }}>
                No hay imágenes disponibles
              </Text>
            )}
          </View>

          {/* Opiniones */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Opiniones de Clientes</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <ReviewCard
            name="Nicole"
            date="1 día atrás"
            reviewText={longReviewText}
            isInitiallyLong={true}
          />
          <ReviewCard
            name="Laura"
            date="2 días atrás"
            reviewText={shortReviewText}
          />
        </View>
      </ScrollView>

      {/* Botones inferiores */}
      <View style={styles.bottomButtonsContainer}>
        <Button
          title="Calificar"
          onPress={() => navigation.navigate("Calificar")}
          buttonStyle={[styles.bottomButton, styles.calificarButton]}
          textStyle={[
            textStyles.mainText,
            { textAlign: "center", color: "#fff", fontWeight: "700" },
          ]}
        />
        <Button
          title="Contactarse"
          onPress={() => navigation.navigate("Chat", { prestador, user })}
          buttonStyle={[styles.bottomButton, styles.orangeButton]}
          textStyle={[
            textStyles.mainText,
            { textAlign: "center", color: "#fff", fontWeight: "700" },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

// ------------------ ESTILOS ------------------
const reviewStyles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
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
  nameRatingContainer: { flexDirection: "row", alignItems: "center", width: "100%" },
  nameText: { fontSize: 20, fontWeight: "700", color: "#2c3e50", marginRight: 10 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 14, color: "#606060", marginRight: 5 },
  starIcon: { width: 13, height: 13, tintColor: "#D26E00", resizeMode: "contain" },
  distanceText: { fontSize: 12, color: "#606060", marginLeft: "auto" },
  locationContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  locationIcon: { width: 15, height: 15, marginRight: 5, tintColor: "#606060" },
  locationText: { fontSize: 14, color: "#606060" },
  descriptionText: { fontSize: 12, color: "#606060", lineHeight: 18, marginTop: 10 },
  serviceListTitle: { fontWeight: "600" },
  serviceListContainer: { paddingLeft: 10 },
  serviceListItem: { fontSize: 12, color: "#606060", lineHeight: 20, marginTop: 2 },
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
  viewMoreText: { fontSize: 12, fontWeight: "600", color: "#2c3e50", marginRight: 5 },
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
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  bottomButton: { width: "48%", borderRadius: 32, height: 51 },
  calificarButton: { backgroundColor: "#2c3e50", opacity: 0.8 },
  orangeButton: { backgroundColor: "#D26E00" },
});
