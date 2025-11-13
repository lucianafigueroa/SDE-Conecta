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
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger'; // <-- 1. Importación añadida

import logo from "../assets/images/logo1.png";
import phoneIcon from "../assets/images/llamar.png";
import mailIcon from "../assets/images/sobre.png";
import linkedinIcon from "../assets/images/linkedin.png";
import facebookIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png";
import instagramIcon from "../assets/images/instagram.png";
import whatsappIcon from "../assets/images/whatsapp.png";


const { width } = Dimensions.get("window");

export default function Contactanos({ navigation }) {
  useScreenFocusLogger(); // <-- 2. Hook en uso

  // Función para simular el back button de la cabecera
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Cabecera de la App */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
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
          <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com")}>
            <Image source={linkedinIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com")}>
            <Image source={facebookIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.twitter.com")}>
            <Image source={twitterIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com")}>
            <Image source={instagramIcon} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://api.whatsapp.com/send?phone=+9234709635")}>
            <Image source={whatsappIcon} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 60,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    paddingRight: 15,
  },
  backIcon: {
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: 'normal',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  container: {
    alignItems: "center",
    flexGrow: 1,
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
    marginBottom: 50,
  },
  contactSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#FF8C42",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 25,
    height: 25
  },
  contactText: {
    color: "#2C3E50",
    fontSize: 18,
  },
  findUsText: {
    fontSize: 14,
    color: "#6F7485",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  socialIcon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
});