import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import BANNER_IMAGE from "../assets/images/banner.png";
import PLACEHOLDER_ICON from "../assets/images/placeholder.png";

export default function InicioProfesional({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      console.log("-> PANTALLA ENFOCADA: " + route.name);
      return () => {};
    }, [route.name])
  );

  const services = [
    { name: "Limpieza", icon: PLACEHOLDER_ICON, screen: "ServicioLimpieza" },
    { name: "Albañil", icon: PLACEHOLDER_ICON, screen: "ServicioAlbañil" },
    { name: "Electricista", icon: PLACEHOLDER_ICON, screen: "ServicioElectricista" },
    { name: "Gasista", icon: PLACEHOLDER_ICON, screen: "ServicioGasista" },
    { name: "Cerrajero", icon: PLACEHOLDER_ICON, screen: "ServicioCerrajero" },
    { name: "Plomero", icon: PLACEHOLDER_ICON, screen: "ServicioPlomero" },
    { name: "Pintor", icon: PLACEHOLDER_ICON, screen: "ServicioPintor" },
    { name: "Pileta", icon: PLACEHOLDER_ICON, screen: "ServicioPileta" },
    { name: "Durlock", icon: PLACEHOLDER_ICON, screen: "ServicioDurlock" },
    { name: "Carpintero", icon: PLACEHOLDER_ICON, screen: "ServicioCarpintero" },
    { name: "Herrero", icon: PLACEHOLDER_ICON, screen: "ServicioHerrero" },
    { name: "Aire Acondicionado", icon: PLACEHOLDER_ICON, screen: "ServicioAire" },
  ];

  const ServiceCard = ({ name, icon, screen }) => (
    <TouchableOpacity style={styles.serviceCard} onPress={() => navigation.navigate(screen)}>
      <Image source={icon} style={styles.serviceIcon} />
      <Text style={styles.serviceName}>{name}</Text>
    </TouchableOpacity>
  );

  const BottomMenu = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("InicioProfesional")}>
        <Ionicons name="home" size={24} color="#FF7F27" />
        <View style={{ width: 60, alignItems: "center" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={[styles.navText, styles.activeText]}
          >
            Inicio
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("PresupuestosProfesional")}>
        <Ionicons name="clipboard-outline" size={24} color="#6E6E6E" />
        <View style={{ width: 80, alignItems: "center" }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.navText}>
            Presupuestos
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("PromocionesProfesional")}>
        <Feather name="gift" size={24} color="#6E6E6E" />
        <View style={{ width: 80, alignItems: "center" }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.navText}>
            Promociones
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("NotificacionesProfesional")}>
        <Ionicons name="notifications-outline" size={24} color="#6E6E6E" />
        <View style={{ width: 90, alignItems: "center" }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.navText}>
            Notificaciones
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Hola Luciana</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={16} color="white" />
            <Text style={styles.locationText}>Av. Belgrano Sur 281</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.navigate("CerrarSesionProfesional")}
        >
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.searchBarContainer}>
        <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar categoría"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Feather name="sliders" size={20} color="#777" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerContainer}>
          <Image source={BANNER_IMAGE} style={styles.bannerImage} resizeMode="cover" />
          <Text style={styles.bannerText}>Los mejores servicios locales</Text>
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.servicesHeader}>
            <Text style={styles.servicesTitle}>Servicios</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Ver más &gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard key={index} name={service.name} icon={service.icon} screen={service.screen} />
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    width: "100%",
    backgroundColor: "#d26e00",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: { flex: 1 },
  headerText: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  locationContainer: { flexDirection: "row", alignItems: "center" },
  locationText: { fontSize: 16, color: "white", marginLeft: 5, marginRight: 5, fontWeight: "bold" },
  menuIcon: { padding: 5 },
  searchBarContainer: {
    position: "absolute",
    top: 150,
    left: 20,
    right: 20,
    zIndex: 10,
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 32,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 9,
    elevation: 10,
  },
  searchInput: { flex: 1, fontSize: 16, paddingHorizontal: 10 },
  filterIcon: { marginLeft: 8, padding: 5 },
  scrollContent: { paddingBottom: 20 },
  bannerContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    height: 181,
    marginBottom: 20,
  },
  bannerImage: { width: "100%", height: 181, position: "absolute" },
  bannerText: {
    position: "absolute",
    top: 80,
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 5,
    borderRadius: 5,
  },
  paginationDots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#CCC", marginHorizontal: 4 },
  activeDot: { backgroundColor: "white", width: 12, height: 8, borderRadius: 4 },
  servicesSection: { paddingHorizontal: 20, marginBottom: 10 },
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  servicesTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  seeMoreText: { fontSize: 14, color: "#FF7F27", fontWeight: "500" },
  servicesGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  serviceCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 2,
  },
  serviceIcon: { width: 60, height: 60, borderRadius: 30, marginBottom: 5, backgroundColor: "#EAEAEA" },
  serviceName: { fontSize: 12, fontWeight: "500", textAlign: "center", color: "#333" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingBottom: 20,
  },
  navItem: { alignItems: "center", justifyContent: "center" },
  navText: {
    fontSize: 11,
    marginTop: 4,
    color: "#6E6E6E",
    textAlign: "center",
    includeFontPadding: false,
  },
  activeText: { color: "#FF7F27", fontWeight: "bold" },
});
