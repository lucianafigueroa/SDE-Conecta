import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions, // Necesario para estilos sensibles como los que usamos antes
} from "react-native";
// import Button from "../components/Button"; // Componente externo no definido, lo comentamos por ahora

import placeholder from "../assets/images/placeholder.png";
import banner from "../assets/images/banner.png";
import limpieza from "../assets/images/limpieza.png";
import mujer from "../assets/images/mujer.png";
import iconoLimpieza from "../assets/images/placeholder.png";
import iconoAlbanil from "../assets/images/placeholder.png";
import iconoElectricista from "../assets/images/placeholder.png";
import iconoGasista from "../assets/images/placeholder.png";


const { width } = Dimensions.get('window'); // Definimos width para estilos

export default function InicioCliente({ navigation }) {
  // Datos de navegación inferior
  const navTabs = [
    { name: "Inicio", icon: placeholder, screen: 'InicioCliente' },
    { name: "Prestadores", icon: placeholder, screen: 'Prestadores' },
    { name: "Calificaciones", icon: placeholder, screen: 'Calificaciones' },
    { name: "Perfil", icon: placeholder, screen: 'MenuUsuario' }, // ¡Aquí está el cambio!
  ];

  const handleNavigation = (screenName) => {
    // Solo navegamos si la pantalla no es la actual (o si queremos recargarla)
    if (screenName && screenName !== 'InicioCliente') {
        navigation.navigate(screenName);
    }
    // Si es "Inicio", podrías hacer un scroll to top o no hacer nada,
    // ya que probablemente ya estás en esta pantalla.
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* --- Header --- */}
        <View style={styles.header}>
          {/* El diseño anterior tenía el header naranja y el saludo en blanco/crema */}
          <Text style={styles.headerText}>Hola Luciana</Text>
          <Text style={styles.locationText}>Av. Belgrano Sur 281</Text>
          {/* Faltaría el botón de menú que estaba en la esquina superior derecha */}
        </View>

        {/* --- Search Bar (Simulación de barra flotante) --- */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Buscar categoría</Text>
        </View>


        {/* --- Banner --- */}
        <View style={styles.bannerContainer}>
          <Image source={banner} style={styles.bannerImage} resizeMode="cover" />
          {/* Aquí faltarían los puntos del carrusel y el texto del banner */}
        </View>

        {/* --- Servicios --- */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <TouchableOpacity onPress={() => console.log('Ver más servicios')}>
               <Text style={styles.verMasLink}>Ver más ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesContainer}>
            {/* Limitamos a 4 elementos por fila para el grid */}
            {["Limpieza", "Albañil", "Electricista", "Gasista"].map((service, index) => (
              <TouchableOpacity key={index} style={styles.serviceCard}>
                <Image source={limpieza} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{service}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- Recomendados --- */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendados</Text>
            <TouchableOpacity onPress={() => console.log('Ver más recomendados')}>
               <Text style={styles.verMasLink}>Ver más ›</Text>
            </TouchableOpacity>
          </View>

          {[
            { name: "Lucía Pérez", rating: 5, reviews: 150, service: "Servicio de Limpieza" },
            { name: "Pablo Mendoza", rating: 4, reviews: 90, service: "Servicio de Limpieza" },
          ].map((provider, index) => (
            <TouchableOpacity key={index} style={styles.providerCard}>
              <Image source={mujer} style={styles.providerImage} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerRating}>⭐ {provider.rating} ({provider.reviews})</Text>
                <Text style={styles.providerService}>{provider.service}</Text>
              </View>
              <Text style={styles.providerArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* --- Barra de Navegación Inferior (bottomNav) --- */}
      <View style={styles.bottomNav}>
        {navTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => handleNavigation(tab.screen)} // Uso de la función de navegación
          >
            <Image
              source={tab.icon}
              style={[styles.navIcon, tab.name === 'Inicio' && styles.navIconActive]}
            />
            <Text
              style={[
                styles.navText,
                tab.name === 'Inicio' && styles.navTextActive // 'Inicio' como activo
              ]}
            >
              {tab.name}
            </Text>
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
