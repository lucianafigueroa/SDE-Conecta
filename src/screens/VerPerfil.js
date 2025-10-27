import React, { useState } from "react";
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

// Imágenes e íconos
import group33437 from "../assets/images/MariaCarrizo.png";
import locationOnIcon from "../assets/images/localizacion.png";
import alarmIcon from "../assets/images/tiempo.png";
import arrowForwardIosIcon from "../assets/images/arrow.png";
import starIcon from "../assets/images/star.png";
import userProfilePlaceholder from "../assets/images/placeholder.png";

// Imágenes de servicios
import rectangle196 from "../assets/images/servicio1.png";
import rectangle241 from "../assets/images/servicio3.png";
import rectangle242 from "../assets/images/servicio2.png";

const { width, height } = Dimensions.get("window");
const PADDING_HORIZONTAL_CONTENT = 25;
const GAP_BETWEEN_IMAGES = 8;
const contentWidth = width - 2 * PADDING_HORIZONTAL_CONTENT;
const serviceImageWidth = (contentWidth - 2 * GAP_BETWEEN_IMAGES) / 3;
const MAX_LINES = 5; // Constante para el límite de líneas

// Tarjeta de Opinión expandible
// Añadimos isInitiallyLong para controlar la aparición del botón
const ReviewCard = ({ name, date, reviewText, isInitiallyLong = false }) => {
  const [expanded, setExpanded] = useState(false);
  // Usamos el prop isInitiallyLong para la visibilidad del botón.
  const [isTextLong] = useState(isInitiallyLong); 

  const toggleExpanded = () => setExpanded(!expanded);
  
  // Hemos eliminado onTextLayout para evitar el error de medición.

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
        // Si expanded es true, mostramos todo. Si es false, mostramos solo MAX_LINES.
        numberOfLines={expanded ? undefined : MAX_LINES}
      >
        {reviewText}
      </Text>

      {/* El botón SÓLO se muestra si le pasamos isInitiallyLong=true */}
      {isTextLong && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={reviewStyles.readMoreText}>
            {expanded ? "Leer menos" : "Leer más"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const centeredButtonText = {
  textAlign: "center",
  lineHeight: 51,
};

const VerPerfil = ({ navigation }) => {
  const handleGoBack = () => navigation.goBack();

  // Texto largo (SE LE PASARÁ isInitiallyLong=true)
  const longReviewText = 
    "¡Excelente profesional! Puntual, amable y dejó todo impecable. La recomiendo totalmente. Además, se encargó de cada detalle y dejó la casa reluciente. Sin dudas volvería a contratar sus servicios para cualquier limpieza especial o profunda. Dejó la cocina como nueva, y los baños brillando. Realmente es la mejor opción para la limpieza del hogar. La comunicación fue fluida y su trabajo superó ampliamente mis expectativas. Es un servicio de 5 estrellas. Una mención especial a su atención al detalle, incluso en áreas que no había solicitado específicamente. Limpió los marcos de las ventanas y los zócalos con una dedicación que no he visto antes. Es un trabajo de calidad insuperable.";

  // Texto corto (NO SE LE PASARÁ la prop, se usará el valor por defecto: false)
  const shortReviewText = 
    "Muy buena experiencia, hizo un gran trabajo con la limpieza de mi departamento. La atención fue personalizada y se adaptó a mis necesidades. Los espacios quedaron organizados y limpios, superando mis expectativas.";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backIcon}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.profileNameHeader}>Maria Carrizo</Text>
        </View>

        {/* Imagen principal */}
        <Image source={group33437} style={styles.profileImage} />

        {/* Contenedor blanco */}
        <View style={styles.contentCard}>
          {/* Nombre + Calificación */}
          <View style={styles.nameRatingContainer}>
            <Text style={styles.nameText}>Maria Carrizo</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.9</Text>
              {[...Array(5)].map((_, i) => (
                <Image key={i} source={starIcon} style={styles.starIcon} />
              ))}
            </View>
            <Text style={styles.distanceText}>700 m</Text>
          </View>

          {/* Ubicación */}
          <View style={styles.locationContainer}>
            <Image source={locationOnIcon} style={styles.locationIcon} />
            <Text style={styles.locationText}>
              Catamarca 50, Sgo. del Estero
            </Text>
          </View>

          {/* Descripción */}
          <Text style={styles.descriptionText}>
            Especialista en limpieza profunda y detallada de hogares y
            departamentos. Brindo un servicio de alta calidad, con un servicio
            de confianza, garantizando ambientes impecables y ordenados.
          </Text>
          <Text style={styles.descriptionText}>
            Me encargo de todo, desde la limpieza diaria hasta la organización
            de espacios, para que te quedes tranquilo y disfrutes de tu hogar.
          </Text>
          <Text style={[styles.descriptionText, styles.serviceListTitle]}>
            Servicios:
          </Text>

          {/* Lista de servicios */}
          <View style={styles.serviceListContainer}>
            <Text style={styles.serviceListItem}>
              • Limpieza general de casas y departamentos.
            </Text>
            <Text style={styles.serviceListItem}>
              • Limpieza profunda y fin de obra.
            </Text>
            <Text style={styles.serviceListItem}>
              • Organización de interiores.
            </Text>
            <Text style={styles.serviceListItem}>
              • Limpieza de oficinas y comercios.
            </Text>
          </View>

          {/* Disponibilidad */}
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityRow}>
              <Image source={alarmIcon} style={styles.alarmIcon} />
              <Text style={styles.availabilityText}>
                Disponibilidad: Lunes a Viernes
              </Text>
            </View>
            <Text style={styles.hoursText}>9:00 Am - 6:00 Pm</Text>
          </View>

          {/* Sección servicios */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {/* Imágenes servicios */}
          <View style={styles.servicesImageContainer}>
            <Image source={rectangle196} style={styles.serviceImage} />
            <Image source={rectangle241} style={styles.serviceImage} />
            <Image source={rectangle242} style={styles.serviceImage} />
          </View>

          {/* Opiniones */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Opiniones de Clientes</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {/* Review Card con texto largo: PASAMOS isInitiallyLong={true} */}
          <ReviewCard
            key="Nicole"
            name="Nicole"
            date="1 day ago"
            reviewText={longReviewText}
            isInitiallyLong={true} // <-- FORZAMOS la aparición del botón
          />
          
          {/* Review Card con texto corto: NO PASAMOS la prop */}
          <ReviewCard
            key="Laura"
            name="Laura"
            date="2 days ago"
            reviewText={shortReviewText}
            // isInitiallyLong por defecto es false, el botón NO aparece
          />
        </View>
      </ScrollView>

      {/* Botones inferiores */}
      <View style={styles.bottomButtonsContainer}>
        <Button
          title="Calificar"
          onPress={() => navigation.navigate("Calificar")}
          buttonStyle={[styles.bottomButton, styles.calificarButton]}
          textStyle={[textStyles.mainText, centeredButtonText, { color: "#fff", fontWeight: "700" }]}
        />
        <Button
          title="Contactarse"
          onPress={() => navigation.navigate("Chat")}
          buttonStyle={[styles.bottomButton, styles.orangeButton]}
          textStyle={[textStyles.mainText, centeredButtonText, { color: "#fff", fontWeight: "700" }]}
        />
      </View>
    </SafeAreaView>
  );
};

// Estilos de opiniones
const reviewStyles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10, backgroundColor: "#C4C4C4" },
  nameText: { fontSize: 14, fontWeight: "600", color: "#2C3E50" },
  dateTextSmall: { fontSize: 10, color: "#606060" },
  ratingContainer: { flexDirection: "row", marginLeft: "auto" },
  starIcon: { width: 10, height: 10, resizeMode: "contain", tintColor: "#D26E00", marginRight: 2 },
  reviewText: { fontSize: 12, color: "#606060", lineHeight: 18, marginBottom: 5 },
  readMoreText: { fontSize: 12, color: "#D26E00", fontWeight: "600" },
});

// Estilos principales
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#e5e8ec" },
  headerContainer: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 40, paddingBottom: 150, backgroundColor: "white", width: "100%" },
  backButton: { paddingRight: 15, paddingVertical: 5 },
  backIcon: { fontSize: 28, color: "#2C3E50" },
  profileNameHeader: { fontSize: 24, fontWeight: "700", color: "#2c3e50", marginLeft: 5 },
  scrollViewContent: { alignItems: "center", paddingBottom: 100 },
  profileImage: { width: width * 0.9, height: width * 0.9 * (238 / 390), resizeMode: "cover", position: "absolute", top: 100, zIndex: 1, borderRadius: 15 },
  contentCard: { backgroundColor: "white", width: "100%", minHeight: height * 0.7, marginTop: 60, borderTopLeftRadius: 35, borderTopRightRadius: 35, paddingHorizontal: PADDING_HORIZONTAL_CONTENT, paddingTop: 20, alignItems: "flex-start", zIndex: 2 },
  nameRatingContainer: { flexDirection: "row", alignItems: "center", width: "100%", marginTop: 10 },
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
  availabilityContainer: { flexDirection: "row", alignItems: "center", marginTop: 15, width: "100%", justifyContent: "space-between" },
  availabilityRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  alarmIcon: { width: 15, height: 15, marginRight: 5, tintColor: "#606060" },
  availabilityText: { fontSize: 14, fontWeight: "600", color: "#606060" },
  hoursText: { fontSize: 14, color: "#606060" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: 30, marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#2c3e50" },
  viewMoreButton: { flexDirection: "row", alignItems: "center" },
  viewMoreText: { fontSize: 12, fontWeight: "600", color: "#2c3e50", marginRight: 5 },
  arrowIcon: { width: 13, height: 13, tintColor: "#2c3e50" },
  servicesImageContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 30, flexWrap: "wrap" },
  serviceImage: { width: serviceImageWidth > 0 ? serviceImageWidth : 100, height: 100, borderRadius: 8, resizeMode: "cover", backgroundColor: "#f0f0f0", marginBottom: 8 },
  bottomButtonsContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", position: "absolute", bottom: 0, paddingHorizontal: 20, backgroundColor: "white", paddingTop: 10, paddingBottom: 20, borderTopWidth: 1, borderTopColor: "#E0E0E0" },
  bottomButton: { width: "48%", borderRadius: 32, height: 51 },
  calificarButton: { backgroundColor: "#2c3e50", opacity: 0.8 },
  orangeButton: { backgroundColor: "#D26E00" }, // Botón naranja
});

export default VerPerfil;