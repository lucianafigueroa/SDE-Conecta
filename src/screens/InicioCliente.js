import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Button from "../components/Button";

import placeholder from "../assets/images/placeholder.png";
import banner from "../assets/images/banner.png";
import limpieza from "../assets/images/limpieza.png";
import mujer from "../assets/images/mujer.png";

export default function InicioCliente({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Hola Luciana</Text>
          <Text style={styles.locationText}>Av. Belgrano Sur 281</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Buscar categoría</Text>
        </View>


        <View style={styles.bannerContainer}>
          <Image source={banner} style={styles.bannerImage} resizeMode="cover" />
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          <View style={styles.servicesContainer}>
            {["Limpieza", "Albañil", "Electricista", "Gasista"].map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <Image source={limpieza} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{service}</Text>
                <TouchableOpacity>
                  <Text style={styles.verMas}>Ver más</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recomendados</Text>
          {[
            { name: "Lucía Pérez", rating: 5, reviews: 150, service: "Servicio de Limpieza" },
            { name: "Pablo Mendoza", rating: 5, reviews: 150, service: "Servicio de Limpieza" },
          ].map((provider, index) => (
            <View key={index} style={styles.providerCard}>
              <Image source={mujer} style={styles.providerImage} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerRating}>⭐ {provider.rating} ({provider.reviews})</Text>
                <Text style={styles.providerService}>{provider.service}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      <View style={styles.bottomNav}>
        {["Inicio", "Prestadores", "Calificaciones", "Perfil"].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <Image source={placeholder} style={styles.navIcon} />
            <Text style={styles.navText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e5e8ec",
    position: "relative",
  },
  container: {
    paddingBottom: 100,
  },
  header: {
    width: "100%",
    backgroundColor: "#d26e00",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70, // espacio para que el buscador flote,
  },
  headerText: {
    marginTop: 10,
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    marginBottom: 5,
    fontWeight: "bold",
  },locationText: {
      fontSize: 14,
      fontFamily: "Poppins-Regular",
      color: "#fff",
      fontWeight: "bold",
    },

    searchContainer: {
      position: "absolute",
      top: 150, // ajustá según el alto del header
      left: 20,
      right: 20,
      height: 53,
      backgroundColor: "#fff",
      borderRadius: 32,
      justifyContent: "center",
      paddingHorizontal: 15,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 9,
      zIndex: 10,
    },

    searchText: {
      fontSize: 16,
      fontFamily: "Poppins-Medium",
      color: "#2c3e50",
    },
  iconSmall: {
    width: 20,
    height: 20,
  },
  bannerContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    marginBottom: 10,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 181,
    borderRadius: 15,
  },
  bannerTitle: {
    position: "absolute",
    bottom: 10,
    left: 15,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#ffff63",
  },
  servicesSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    color: "#2c3e50",
  },
  verMas: {
    fontSize: 12,
    color: "#d26e00",
    marginTop: 5,
  },
  recommendedSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  providerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#2c3e50",
  },
  providerRating: {
    fontSize: 14,
    color: "#f39c12",
  },
  providerService: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#2c3e50",
  },
});
