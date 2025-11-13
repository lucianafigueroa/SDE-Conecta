import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger'; // <-- 1. Importación añadida

import profilePlaceholder from '../assets/images/placeholder.png';

const { width } = Dimensions.get('window');

// --- Componente de Tarjeta de Perfil de Cliente ---
const CustomerProfile = ({ name, email, onProfilePress }) => (
  <TouchableOpacity style={styles.customerProfileContainer} onPress={onProfilePress}>
    <View style={styles.profileImageWrapper}>
      <Image source={profilePlaceholder} style={styles.profileImage} />
    </View>
    <View style={styles.profileText}>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileEmail}>{email}</Text>
    </View>
  </TouchableOpacity>
);

// --- Componente de Item de Menú ---
const MenuItem = ({ text, icon, color, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={[styles.menuItemIcon, { color: color || '#2c3e50' }]}>{icon}</Text>
    <Text style={[styles.menuItemText, { color: color || '#2c3e50' }]}>{text}</Text>
    {text !== "Cerrar Sesión" && (
      <Text style={[styles.menuItemArrow, { color: color || '#2c3e50' }]}>›</Text>
    )}
  </TouchableOpacity>
);


// --- Componente Principal ---
export default function MenuUsuario({ navigation }) {
  useScreenFocusLogger(); // <-- 2. Hook en uso

  const handleSignOut = () => {
    console.log("Cerrar Sesión");
    // Lógica de navegación o autenticación aquí
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack ? navigation.goBack() : console.log("Cerrar Menú")}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {/* --- Título del Menú --- */}
        <Text style={styles.title}>¡Bienvenido al menú!</Text>

        {/* --- Perfil del Cliente --- */}
        <CustomerProfile
          name="Maria Carrizo"
          email="mariacarrizo@gmail.com"
        />

        {/* --- ScrollView para la Lista de Opciones --- */}
        <ScrollView style={styles.menuItemsScroll} contentContainerStyle={styles.menuItemsContent}>
          <View style={styles.menuItemsBox}>
            <MenuItem
              text="Mi Perfil"
              icon="👤" // Simulación de icono
              onPress={() => navigation.navigate('MiPerfil')}
            />
            <MenuItem
              text="Contáctanos"
              icon="📞" // Simulación de icono
              onPress={() => navigation.navigate('Contactanos')}
            />
            <MenuItem
              text="Convertirse en Profesional"
              icon="🛠️" // Simulación de icono
              onPress={() => console.log("Navegar a Convertirse en Profesional")}
            />
            <MenuItem
              text="Cerrar Sesión"
              icon="🚪" // Simulación de icono
              color="#C62828"
              onPress={handleSignOut}
            />
          </View>
        </ScrollView>

        {/* --- Footer de la App --- */}
        <View style={styles.footer}>
          <Text style={styles.footerTeamText}>Los más copados team</Text>
          <Text style={styles.footerVersionText}>Version 1.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e8ec',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 90,
    right: 30,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 30,
    fontWeight: '300',
    color: '#2C3E50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 85,
    marginLeft: 30,
    width: 250,
  },
  customerProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 60,
    height: 132,
    marginTop: 30,
    marginHorizontal: 30,
  },
  profileImageWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginRight: 15,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 38,
  },
  profileText: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d26e00',
    marginTop: 2,
  },
  menuItemsScroll: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  menuItemsContent: {
    paddingBottom: 20,
  },
  menuItemsBox: {
    width: width - 60,
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f8f9',
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 15,
  },
  menuItemIcon: {
    fontSize: 20,
    width: 20,
    textAlign: 'center',
  },
  menuItemArrow: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 'auto',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerTeamText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0c0c0c',
    opacity: 0.5,
    marginBottom: 5,
  },
  footerVersionText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    opacity: 0.5,
  },
});