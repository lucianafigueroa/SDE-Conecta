import React from "react";
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
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";

// Ajusta las rutas de importación de imágenes según tu estructura de carpetas.

// Íconos y imágenes específicos de la pantalla VerPerfil
import group33437 from "../assets/images/MariaCarrizo.png"; // Imagen principal
import locationOnIcon from "../assets/images/localizacion.png";
import alarmIcon from "../assets/images/tiempo.png";
import arrowForwardIosIcon from "../assets/images/arrow.png";
import starIcon from "../assets/images/star.png";
import userProfilePlaceholder from "../assets/images/placeholder.png"; // Imagen del reviewer

// Imágenes de servicios
import rectangle196 from "../assets/images/servicio1.png";
import rectangle241 from "../assets/images/servicio3.png";
import rectangle242 from "../assets/images/servicio2.png";

const { width, height } = Dimensions.get("window");

// --- Componente de Tarjeta de Opinión Simplificada (Inline) ---
const SimpleReviewCard = ({ name, date, reviewText }) => (
    <View style={reviewStyles.card}>
        <View style={reviewStyles.header}>
            <Image
                source={userProfilePlaceholder}
                style={reviewStyles.profileImage}
            />
            <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={reviewStyles.nameText}>{name}</Text>
                <Text style={reviewStyles.dateTextSmall}>{date}</Text>
            </View>
            <View style={reviewStyles.ratingContainer}>
                {/* Estrellas Duras (5 estrellas llenas) */}
                {[...Array(5)].map((_, i) => (
                    <Image key={i} source={starIcon} style={reviewStyles.starIcon} />
                ))}
            </View>
        </View>
        <Text style={reviewStyles.reviewText} numberOfLines={5}>
            {reviewText}
        </Text>
        <Text style={reviewStyles.readMoreText}>Leer menos</Text>
    </View>
);

// --- ESTILO DE TEXTO PARA CENTRAR BOTONES ---
const centeredButtonText = {
    textAlign: 'center',       // Centrado horizontal
    lineHeight: 51,            // Centrado vertical (Igual a la altura del botón: 51)
};

const VerPerfil = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header con flecha de retroceso y nombre */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backIcon}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.profileNameHeader}>Maria Carrizo</Text>
        </View>

        {/* Imagen principal del perfil */}
        <Image source={group33437} style={styles.profileImage} />

        {/* Contenedor principal del contenido (fondo blanco) */}
        <View style={styles.contentCard}>
          {/* Nombre y calificación (dentro del card) */}
          <View style={styles.nameRatingContainer}>
            <Text style={styles.nameText}>Maria Carrizo</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.9</Text>
              {/* Estrellas */}
              {[...Array(5)].map((_, i) => (
                <Image key={i} source={starIcon} style={styles.starIcon} />
              ))}
            </View>
            <Text style={styles.distanceText}>700 m</Text>
          </View>

          {/* Ubicación */}
          <View style={styles.locationContainer}>
            <Image source={locationOnIcon} style={styles.locationIcon} />
            <Text style={styles.locationText}>Catamarca 50, Sgo. del Estero</Text>
          </View>

          {/* Descripción del perfil */}
          <Text style={styles.descriptionText}>
            Especialista en limpieza profunda y detallada de hogares y
            departamentos. Brindo un servicio de alta calidad, con un servicio
            de confianza, garantizando ambientes impecables y ordenados.
          </Text>
          <Text style={styles.descriptionText}>
            Me encargo de todo, desde la limpieza diaria hasta la
            organización de espacios, para que te quedes tranquilo y
            disfrutes de tu hogar.
          </Text>
            <Text style={[styles.descriptionText, styles.serviceListTitle]}>
                Servicios:
            </Text>
            {/* Lista de servicios (Simulada con Text) */}
            <View style={styles.serviceListContainer}>
                <Text style={styles.serviceListItem}>• Limpieza general de casas y departamentos.</Text>
                <Text style={styles.serviceListItem}>• Limpieza profunda y fin de obra.</Text>
                <Text style={styles.serviceListItem}>• Organización de interiores.</Text>
                <Text style={styles.serviceListItem}>• Limpieza de oficinas y comercios.</Text>
            </View>


          {/* Disponibilidad */}
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityRow}>
                <Image source={alarmIcon} style={styles.alarmIcon} />
                <Text style={styles.availabilityText}>Disponibilidad: Lunes a Viernes</Text>
            </View>
            <Text style={styles.hoursText}>9:00 Am - 6:00 Pm</Text>
          </View>

          {/* Sección de Servicios Imágenes */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {/* Imágenes de servicios */}
          <View style={styles.servicesImageContainer}>
            <Image source={rectangle196} style={styles.serviceImage} />
            <Image source={rectangle241} style={styles.serviceImage} />
            <Image source={rectangle242} style={styles.serviceImage} />
          </View>

          {/* Sección de Opiniones de Clientes */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Opiniones de Clientes</Text>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>Ver más</Text>
              <Image source={arrowForwardIosIcon} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          {/* Tarjeta de Reseña 1 */}
          <SimpleReviewCard
            name="Nicole"
            date="1 day ago"
            reviewText="Hi, Booking the task was quick and easy. The professional arrived on time and did an excellent job. I’ll definitely use this app again! I’ll definitely use this app again! I’ll definitely use this app again! I’ll definitely use this app again! I’ll definitely use this app again!"
          />

          {/* Tarjeta de Reseña 2 (Duplicada para replicar la imagen) */}
          <SimpleReviewCard
            name="Nicole"
            date="1 day ago"
            reviewText="Hi, Booking the task was quick and easy. The professional arrived on time and did an excellent job. I’ll definitely use this app again! I’ll definitely use this app again! I’ll definitely use this app again! I’ll definitely use this app again! I’ll definitely use this app again!"
          />

        </View>
      </ScrollView>

      {/* Botones inferiores (Calificar y Contactarse) - Fijos */}
      <View style={styles.bottomButtonsContainer}>
        <Button
          title="Calificar"
          onPress={() => navigation.navigate('Calificar')}
          // El color secundario simulado con opacidad o un gris
          buttonStyle={[styles.bottomButton, styles.calificarButton]}
          // APLICA EL CENTRADO
          textStyle={[textStyles.mainText, centeredButtonText]}
        />
        <Button
          title="Contactarse"
          onPress={() => navigation.navigate('Chat')}
          buttonStyle={[buttonStyles.main, styles.bottomButton]} // Usar main (naranja)
          // APLICA CENTRADO Y FUERZA EL COLOR BLANCO
          textStyle={[
            textStyles.mainText
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

// --- Estilos de la Tarjeta de Opinión Simplificada ---
const reviewStyles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 10,
        backgroundColor: '#C4C4C4',
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3E50',
    },
    dateTextSmall: {
        fontSize: 10,
        color: '#606060',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    starIcon: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        tintColor: '#D26E00',
        marginRight: 2,
    },
    reviewText: {
        fontSize: 12,
        color: '#606060',
        lineHeight: 16,
        marginBottom: 5,
    },
    readMoreText: {
        fontSize: 11,
        color: '#D26E00',
        fontWeight: 'normal',
    },
});

export default VerPerfil;

// --- Estilos del Componente Principal VerPerfil ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e5e8ec",
  },
  // --- Estilos del Header ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingBottom: 150,
    backgroundColor: 'white',
    width: '100%',
  },
  backButton: {
    paddingRight: 15,
    paddingVertical: 5,
  },
  backIcon: {
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: 'normal',
  },
  profileNameHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 5,
  },
  // --- ScrollView y Contenido ---
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  profileImage: {
      width: width * 0.9,
      height: width * 0.9 * (238 / 390),
      resizeMode: 'cover',
      position: 'absolute',
      top: 100,
      zIndex: 1,
      borderRadius: 15,
  },
  contentCard: {
      backgroundColor: 'white',
      width: '100%',
      minHeight: height * 0.7,
      marginTop: 60,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      paddingHorizontal: 25,
      paddingTop: 20,
      alignItems: 'flex-start',
      zIndex: 2,
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
    marginTop: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#606060',
    marginRight: 5,
  },
  starIcon: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    tintColor: '#D26E00',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#606060',
    textAlign: 'right',
    marginLeft: 'auto',
    marginTop: 0,
  },

  // --- Ubicación y Descripción ---
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 0,
  },
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#606060',
  },
  locationText: {
    fontSize: 14,
    color: '#606060',
  },
  descriptionText: {
    fontSize: 12,
    color: '#606060',
    lineHeight: 18,
    marginTop: 10,
    marginHorizontal: 0,
  },
  serviceListTitle: {
      fontWeight: '600',
  },
  serviceListContainer: {
      paddingLeft: 10,
  },
  serviceListItem: {
      fontSize: 12,
      color: '#606060',
      lineHeight: 20,
      marginTop: 2,
  },

  // --- Disponibilidad ---
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 0,
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 0,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alarmIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#606060',
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#606060',
  },
  hoursText: {
    fontSize: 14,
    color: '#606060',
    textAlign: 'right',
  },

  // --- Secciones de Servicios y Opiniones ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 5,
  },
  arrowIcon: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    tintColor: '#2c3e50',
  },
  servicesImageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 30,
  },
  serviceImage: {
      width: (width * 0.9 - 40) / 3,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 8,
  },

  // --- Botones Inferiores Fijos ---
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bottomButton: {
    width: '45%',
    borderRadius: 32,
    height: 51,
  },
  calificarButton: {
      backgroundColor: '#282828',
      opacity: 0.3,
  }
});