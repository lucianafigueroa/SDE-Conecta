import React, { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  FlatList, // Para la lista cargada
  Image,
  Dimensions 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import campana from "../assets/images/campana.png"; // Imagen para el estado vacío

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 20;

// --- DATOS SIMULADOS (Para pruebas) ---
// Puedes vaciar este arreglo (dejarlo []) para ver el Empty State.
const mockNotifications = [
  { id: '1', name: 'Nicole', time: '25 min', avatar: 'https://via.placeholder.com/150/F08080/FFFFFF?text=N' },
  { id: '2', name: 'Sofía', time: '35 min', avatar: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=S' },
  { id: '3', name: 'Marco', time: '55 min', avatar: 'https://via.placeholder.com/150/9370DB/FFFFFF?text=M' },
]; 
// const mockNotifications = []; // 👈 Descomenta para probar el estado vacío

// --- ICONOS SVG (sin cambios) ---
// 1. Icono de Campana (Bell)
const BellIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><Path d="M13.73 21a2 2 0 01-3.46 0"/>
  </Svg>
);
// 2. Icono de Inicio (Home)
const HomeIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><Path d="M9 22V12h6v10"/>
  </Svg>
);
// 3. Icono de Presupuestos (Invoice/Clipboard)
const InvoiceIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><Path d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z"/>
  </Svg>
);
// 4. Icono de Promociones (Star/Promotion)
const StarIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M12 2l3.09 6.36L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.28z"/>
  </Svg>
);


// --- SUB-COMPONENTES Y RENDERIZADO ---

// Componente para una sola notificación (VISTA CARGADA)
const NotificationItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity 
        style={styles.notificationCard}
        onPress={() => console.log(`Abrir notificacion ${item.id}`)}
    >
      <Image 
        source={{ uri: item.avatar }}
        style={styles.avatar}
      />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationText}>
          Recibiste una nueva calificación de <Text style={styles.notificationName}>{item.name}</Text>
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente de Ítem de Navegación
const NavItem = ({ label, Icon, isActive, route, navigation }) => {
  const color = isActive ? styles.activeText.color : styles.inactiveText.color;
  const activeFontWeight = isActive ? styles.activeText.fontWeight : styles.inactiveText.fontWeight;

  return (
    <TouchableOpacity 
      style={styles.navItemContainer}
      onPress={() => navigation.navigate(route)}
    >
      <View style={styles.navIconWrapper}>
        <Icon color={color} size={22} />
        {/* Simulación del punto de notificación */}
        {isActive && (
          <View style={styles.notificationDot} />
        )}
      </View>
      <Text style={[styles.navText, { color, fontWeight: activeFontWeight }]}>{label}</Text>
    </TouchableOpacity>
  );
};


// --- COMPONENTE PRINCIPAL FUSIONADO ---
export default function NotificacionesProfesional({ navigation, route }) {
    
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
    
    // 🚨 LÓGICA DE FUSIÓN: Determinar si la lista está vacía
    const isListEmpty = mockNotifications.length === 0;

  const navigationItems = [
    { label: "Inicio", Icon: HomeIcon, route: 'InicioProfesional', isActive: false },
    { label: "Presupuestos", Icon: InvoiceIcon, route: 'PresupuestosProfesional', isActive: false },
    { label: "Promociones", Icon: StarIcon, route: 'PromocionesProfesional', isActive: false },
    { label: "Notificaciones", Icon: BellIcon, route: 'NotificacionesProfesional', isActive: true }, 
  ];
  
  // --- RENDERIZADO CONDICIONAL ---
  const renderContent = () => {
    if (isListEmpty) {
      return (
        // VISTA DE ESTADO VACÍO
        <View style={styles.emptyStateContainer}>
          <Image 
            source={campana} 
            resizeMode="stretch"
            style={styles.illustrationImage} // Usamos el estilo del empty state
          />
          <Text style={styles.emptyStateTitle}>No hay notificaciones todavía</Text>
          <Text style={styles.emptyStateSubtitle}>
            No tienes notificaciones en este momento. Volvé más tarde.
          </Text>
        </View>
      );
    } else {
      return (
        // VISTA DE LISTA CARGADA
        <FlatList
          data={mockNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} navigation={navigation} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };
    
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Section: Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>

        {/* Renderizado del Contenido (Condicional) */}
        {renderContent()}

        {/* --- Footer Navigation --- */}
        <View style={styles.footerNav}>
          {navigationItems.map(item => (
            <NavItem
              key={item.label}
              label={item.label}
              Icon={item.Icon}
              isActive={item.isActive}
              route={item.route}
              navigation={navigation} // Pasamos la prop navigation
            />
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
}

// --- STYLES (Fusionados y Ajustados) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Fondo principal
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  // --- Header Styles ---
  header: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Poppins-Bold',
  },

  // --- Empty State Styles (Contenido Vacío) ---
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL * 2,
    // El marginTop se maneja implícitamente por justifyContent: 'center'
    paddingBottom: 100, // Espacio para la barra de navegación
  },
  illustrationImage: {
    // Dimensiones del estado vacío
    width: 100, 
    height: 130, 
    marginBottom: 40,
  },
  emptyStateTitle: {
    fontSize: 20, 
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6f7485',
    textAlign: 'center',
    lineHeight: 18.2,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 20,
  },
  
  // --- Notification List Styles (Contenido Cargado) ---
  listContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 15,
    paddingBottom: 100, 
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 15,
    color: '#2c3e50',
    fontFamily: 'Poppins-Regular',
  },
  notificationName: {
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6f7485',
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
  },

  // --- Footer Navigation Styles (Compartidos) ---
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 83, 
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
  navItemContainer: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIconWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Roboto-Medium',
  },
  activeText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  inactiveText: {
    color: 'rgba(0, 0, 0, 0.5)', 
    fontWeight: '500',
  },
});