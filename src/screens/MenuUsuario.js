import React, { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
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

// Importaciones de estilos externos (asumiendo que están en la ruta ../styles/)
// Puedes adaptar estos estilos a tu sistema de diseño.
// import { buttonStyles } from '../styles/buttons';
// import { textStyles } from '../styles/texts';

// Placeholder para la imagen de perfil (reemplazar con tu asset real)
import profilePlaceholder from '../assets/images/placeholder.png';

const { width, height } = Dimensions.get('window');

// --- Componente de Tarjeta de Perfil de Cliente ---
const CustomerProfile = ({ name, email, onProfilePress }) => (
  <TouchableOpacity style={styles.customerProfileContainer} onPress={onProfilePress}>
    <View style={styles.profileImageWrapper}>
      {/* Asumiendo que 'placeholder' es la imagen de perfil */}
      <Image source={profilePlaceholder} style={styles.profileImage} />
    </View>
    <View style={styles.profileText}>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileEmail}>{email}</Text>
    </View>
  </TouchableOpacity>
);

// --- Componente de Item de Menú (UserProfileItems en el código original) ---
const MenuItem = ({ text, icon, color, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {/* Icono (simulado con emoji o componente real si lo tienes) */}
    <Text style={[styles.menuItemIcon, { color: color || '#2c3e50' }]}>{icon}</Text>

    {/* Texto de la Opción */}
    <Text style={[styles.menuItemText, { color: color || '#2c3e50' }]}>{text}</Text>

    {/* Icono de flecha derecha (>) */}
    {text !== "Cerrar Sesión" && (
      <Text style={[styles.menuItemArrow, { color: color || '#2c3e50' }]}>›</Text>
    )}
  </TouchableOpacity>
);


// --- Componente Principal ---
export default function MenuUsuario({ navigation, route}) {

  // USAR useFocusEffect PARA LOGUEAR CUANDO PIERDE EL FOCO
    useFocusEffect(
        useCallback(() => {
            // USAR route.name AQUÍ
            console.log("-> PANTALLA ENFOCADA: " + route.name);

            // Se omite la función de limpieza (desenfoque)
            return () => {}; 
        }, [route.name]) // Añadir route.name a las dependencias
    );
    // ------------------------------------------------------------

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

            {/* Mi Perfil */}
            <MenuItem
              text="Mi Perfil"
              icon="👤" // Simulación de icono
              onPress={() => navigation.navigate('MiPerfil')}
            />

            {/* Contáctanos (asumiendo que el icono es un teléfono o chat) */}
            <MenuItem
              text="Contáctanos"
              icon="📞" // Simulación de icono
              onPress={() => navigation.navigate('Contactanos')}
            />

            {/* Convertirse en Profesional */}
            <MenuItem
              text="Convertirse en Profesional"
              icon="🛠️" // Simulación de icono (herramientas)
              onPress={() => console.log("Navegar a Convertirse en Profesional")}
            />

            {/* Cerrar Sesión (con color de error) */}
            <MenuItem
              text="Cerrar Sesión"
              icon="🚪" // Simulación de icono de salida
              color="#C62828" // statuserrorerror-dark
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

// --- Estilos Específicos del Componente ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e8ec', // Fondo gris principal
  },
  container: {
    flex: 1,
    backgroundColor: 'white', // El fondo de la pantalla principal (Menú) es blanco
  },
  // --- Barra de Estado ---
  statusBar: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  timeText: {
    fontSize: 17,
    fontWeight: '500', // Inter-Medium
    color: 'black',
  },
  statusIcons: {
    // Simulación
  },
  // --- Título y Botón de Cerrar ---
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
    fontWeight: '300', // Un peso más ligero para la 'x'
    color: '#2C3E50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold', // Poppins-Bold
    color: '#2c3e50',
    marginTop: 85, // Ajuste para quedar debajo de la barra de estado
    marginLeft: 30,
    width: 250,
  },
  // --- Perfil del Cliente ---
  customerProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 60,
    height: 132,
    marginTop: 30,
    marginHorizontal: 30,
    // El original no tiene padding, pero lo centramos visualmente con el margen
  },
  profileImageWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginRight: 15,
    backgroundColor: '#eee', // Color de fondo si no carga la imagen
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
    fontWeight: '600', // Poppins-SemiBold
    color: '#2c3e50',
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '500', // Poppins-Medium
    color: '#d26e00', // Naranja
    marginTop: 2,
  },
  // --- Lista de Opciones del Menú ---
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
    borderRadius: 24, // rounded-3xl
    paddingVertical: 10, // Un poco de padding vertical en la caja
    // Sombra si fuera necesario:
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f8f9', // Línea de separación sutil
  },
  // Eliminar el borde inferior para el último elemento (Cerrar Sesión)
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500', // Poppins-Medium
    marginLeft: 15,
  },
  menuItemIcon: {
    fontSize: 20,
    width: 20, // Ancho fijo para alinear
    textAlign: 'center',
  },
  menuItemArrow: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 'auto',
  },
  // --- Footer ---
  footer: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      alignItems: 'center',
  },
  footerTeamText: {
    fontSize: 10,
    fontWeight: 'bold', // Poppins-Bold
    color: '#0c0c0c',
    opacity: 0.5,
    marginBottom: 5,
  },
  footerVersionText: {
    fontSize: 14,
    fontWeight: '400', // Poppins-Regular
    color: 'black',
    opacity: 0.5,
  },
});