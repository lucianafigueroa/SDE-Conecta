import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  FlatList, // Usaremos FlatList para la lista de notificaciones
  Image,
  Dimensions 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 20;

// --- DATOS SIMULADOS ---
const mockNotifications = [
  { id: '1', name: 'Nicole', time: '25 min', avatar: 'https://via.placeholder.com/150/F08080/FFFFFF?text=N' },
  { id: '2', name: 'Sofía', time: '35 min', avatar: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=S' },
  { id: '3', name: 'Marco', time: '55 min', avatar: 'https://via.placeholder.com/150/9370DB/FFFFFF?text=M' },
  { id: '4', name: 'Nicole', time: '54 min', avatar: 'https://via.placeholder.com/150/F08080/FFFFFF?text=N' },
  { id: '5', name: 'Nicole', time: '56 min', avatar: 'https://via.placeholder.com/150/F08080/FFFFFF?text=N' },
  { id: '6', name: 'Sofía', time: '58 min', avatar: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=S' },
  { id: '7', name: 'Marco', time: '1 hour', avatar: 'https://via.placeholder.com/150/9370DB/FFFFFF?text=M' },
];

// --- ICONOS SVG (De la interfaz anterior para mantener consistencia) ---

// Icono de Campana (Bell) - Para Notificaciones (activo)
const BellIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><Path d="M13.73 21a2 2 0 01-3.46 0"/>
  </Svg>
);

// Icono de Inicio (Home)
const HomeIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><Path d="M9 22V12h6v10"/>
  </Svg>
);

// Icono de Presupuestos (Invoice/Clipboard)
const InvoiceIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><Path d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z"/>
  </Svg>
);

// Icono de Promociones (Star/Promotion)
const StarIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M12 2l3.09 6.36L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.28z"/>
  </Svg>
);


// --- SUB-COMPONENTES Y RENDERIZADO ---

// Componente para una sola notificación
const NotificationItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.notificationCard}>
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
const NavItem = ({ label, Icon, isActive, route }) => {
  const color = isActive ? styles.activeText.color : styles.inactiveText.color;
  return (
    <TouchableOpacity 
      style={styles.navItemContainer}
      onPress={() => console.log(`Navigating to ${route}`)}
    >
      <View style={styles.navIconWrapper}>
        <Icon color={color} size={22} />
        {/* Simulación del punto de notificación (solo en el activo en la imagen) */}
        {isActive && (
          <View style={styles.notificationDot} />
        )}
      </View>
      <Text style={[styles.navText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};


// --- COMPONENTE PRINCIPAL ---
export const NotificacionesProfesionalCargada = () => {

  const navigationItems = [
    { label: "Inicio", Icon: HomeIcon, route: 'Inicio', isActive: false },
    { label: "Presupuestos", Icon: InvoiceIcon, route: 'Presupuestos', isActive: false },
    { label: "Promociones", Icon: StarIcon, route: 'Promociones', isActive: false },
    { label: "Notificaciones", Icon: BellIcon, route: 'Notificaciones', isActive: true }, 
  ];
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Section: Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>

        {/* Notificaciones List */}
        <FlatList
          data={mockNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* --- Footer Navigation --- */}
        <View style={styles.footerNav}>
          {navigationItems.map(item => (
            <NavItem
              key={item.label}
              label={item.label}
              Icon={item.Icon}
              isActive={item.isActive}
              route={item.route}
            />
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo principal blanco
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  // --- Header Styles ---
  header: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra para el header
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Poppins-Bold',
  },

  // --- Notification List Styles ---
  listContent: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 15,
    paddingBottom: 100, // Espacio para que la lista no quede oculta por la barra de navegación
    backgroundColor: '#F7F7F7', // Fondo gris claro para el área de la lista
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

  // --- Footer Navigation Styles ---
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 83, // Altura ajustada para RN
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    color: 'rgba(0, 0, 0, 0.5)', // Ajustado para mejor visibilidad
    fontWeight: '500',
  },
});

export default NotificacionesProfesionalCargada;