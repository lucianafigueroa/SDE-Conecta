import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import logo from "../assets/images/logo1.png";

import phoneIcon from "../assets/images/llamar.png";
import mailIcon from "../assets/images/sobre.png";
import linkedinIcon from "../assets/images/linkedin.png";
import facebookIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png"; // Asegúrate de tener este
import instagramIcon from "../assets/images/instagram.png";
import whatsappIcon from "../assets/images/whatsapp.png";


const { width } = Dimensions.get("window");

export default function Contactanos({ navigation }) {
  // Función para simular el back button de la cabecera
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    // El color de fondo claro se aplica a todo el SafeAreaView
    <SafeAreaView style={styles.safe}>

      {/* Cabecera de la App (como en la imagen) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          {/* Se usa un Text simple para simular la flecha de 'back' */}
          <Text style={styles.backIcon}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contáctanos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo y Descripción */}
        <Image source={logo} style={styles.logo} />

        <Text style={styles.description}>
          Si tienes alguna pregunta, estaremos encantados de ayudarte.
        </Text>

        {/* Sección de contacto (Teléfono y Email) */}
        <View style={styles.contactSection}>

          {/* Teléfono */}
          <TouchableOpacity
            style={styles.contactIconContainer}
            onPress={() => Linking.openURL("tel:+9234709635")}
          >
            <Image source={phoneIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={styles.contactText}
            onPress={() => Linking.openURL("tel:+9234709635")}
          >
            +92 347 096 35
          </Text>

          {/* Email */}
          <TouchableOpacity
            style={[styles.contactIconContainer, { marginTop: 30 }]} // Espacio entre items
            onPress={() => Linking.openURL("mailto:contacto@sdeconecta.com")}
          >
            <Image source={mailIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={styles.contactText}
            onPress={() => Linking.openURL("mailto:contacto@sdeconecta.com")}
          >
            contacto@sdeconecta.com
          </Text>
        </View>

        {/* Sección "Encontranos en" */}
        <Text style={styles.findUsText}>
          Encontranos en
        </Text>

        {/* Redes sociales */}
        <View style={styles.socialContainer}>
          {/* LinkedIn */}
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.linkedin.com")}
          >
            <Image source={linkedinIcon} style={styles.socialIcon} />
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.facebook.com")}
          >
            <Image source={facebookIcon} style={styles.socialIcon} />
          </TouchableOpacity>

          {/* Twitter */}
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.twitter.com")}
          >
            {/* El ícono de Twitter no se ve en la imagen, pero está en tu código original.
            Lo incluimos por si lo necesitas. Si la imagen es fiel, lo quitarías.
            Según la imagen, el orden parece ser LinkedIn, Facebook, Twitter, Instagram, WhatsApp.
            Asegúrate de que los íconos de tu `assets` son los correctos. */}
            <Image source={twitterIcon} style={styles.socialIcon} />
          </TouchableOpacity>

          {/* Instagram */}
          <TouchableOpacity
            // Se corrige el método a Linking.openURL
            onPress={() => Linking.openURL("https://www.instagram.com")}
          >
            <Image source={instagramIcon} style={styles.socialIcon} />
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity
            // Se corrige el método a Linking.openURL
            onPress={() => Linking.openURL("https://api.whatsapp.com/send?phone=+9234709635")}
          >
            <Image source={whatsappIcon} style={styles.socialIcon} />
          </TouchableOpacity>

        </View>

        {/* Se elimina el Botón "Volver al Menú" que no aparece en la foto */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    // Color de fondo de la imagen: un gris muy claro/blanco roto
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 60,
    backgroundColor: '#F5F5F5', // El mismo color que el fondo
  },
  backButton: {
    paddingRight: 15,
  },
  backIcon: {
    fontSize: 28,
    color: '#2C3E50', // Color del texto del título
    fontWeight: 'normal',
  },
  // El 'title' se mueve a la cabecera, pero mantenemos el estilo para el texto
  title: {
    fontSize: 24, // Ajustado para que se vea más grande en la cabecera
    fontWeight: "bold",
    color: "#2C3E50",
  },
  container: {
    alignItems: "center",
    flexGrow: 1, // Permite que el contenido se centre verticalmente si es corto
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  description: {
    color: "#6F7485",
    textAlign: "center",
    fontSize: 16,
    marginHorizontal: 40,
    marginBottom: 50, // Más espacio antes de los contactos
  },
  contactSection: {
    // Ya no es una tarjeta, solo un contenedor para centrar
    alignItems: "center",
    marginBottom: 50, // Espacio antes de la sección de redes sociales
  },
  contactIconContainer: {
    // Contenedor para el ícono con el fondo naranja circular
    width: 50,
    height: 50,
    backgroundColor: "#FF8C42", // Naranja de los íconos
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8, // Espacio entre el ícono y el texto
  },
  icon: {
    width: 25,
    height: 25
  },
  contactText: {
    color: "#2C3E50", // Color oscuro para el texto
    fontSize: 18, // Ligeramente más grande
  },
  findUsText: {
    fontSize: 14,
    color: "#6F7485", // Color gris del texto
    marginBottom: 20, // Espacio antes de los íconos de redes
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15, // Espacio entre los íconos
  },
  socialIcon: {
    width: 38, // Un poco más grandes para coincidir con la foto
    height: 38,
    resizeMode: "contain",
  },
});