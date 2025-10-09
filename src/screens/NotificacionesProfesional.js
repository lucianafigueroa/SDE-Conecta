import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 20;

// Placeholder para la imagen de ilustración del centro (Bell Illustration)
const BELL_ILLUSTRATION_URI = 'https://via.placeholder.com/179x169/F0F0F0/D26E00?text=SIN+NOTIFICACIONES';

// --- ICONOS SVG COMO COMPONENTES ---

// 1. Icono de Campana (Bell) - Usado típicamente en la barra de navegación para Notificaciones
const BellIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><Path d="M13.73 21a2 2 0 01-3.46 0"/>
  </Svg>
);

// 2. Icono de Inicio (Home) - Usado en la barra de navegación
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

// --- COMPONENTE PRINCIPAL ---
export const NotificacionesProfesional = () => {
  
  const navigationItems = [
    { label: "Inicio", Icon: HomeIcon, route: 'Inicio', isActive: false },
    { label: "Presupuestos", Icon: InvoiceIcon, route: 'Presupuestos', isActive: false },
    { label: "Promociones", Icon: StarIcon, route: 'Promociones', isActive: false },
    { label: "Notificaciones", Icon: BellIcon, route: 'Notificaciones', isActive: true }, // Pantalla activa
  ];

  const NavItem = ({ label, Icon, isActive, route }) => {
    const color = isActive ? styles.activeText.color : styles.inactiveText.color;
    return (
      <TouchableOpacity 
        style={styles.navItemContainer}
        onPress={() => console.log(`Navigating to ${route}`)}
      >
        <Icon color={color} size={20} />
        <Text style={[styles.navText, { color }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Section: Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>

        {/* Content: Empty State */}
        <View style={styles.emptyStateContainer}>
          <Image 
            source={{ uri: BELL_ILLUSTRATION_URI }}
            style={styles.illustrationImage}
            resizeMode="cover"
          />
          <Text style={styles.emptyStateTitle}>No hay notificaciones todavía</Text>
          <Text style={styles.emptyStateSubtitle}>
            No tienes notificaciones en este momento. Volvé más tarde.
          </Text>
        </View>

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
    backgroundColor: '#EAEAEA', // Fondo principal
  },
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  // --- Header Styles ---
  header: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // La imagen original tenía el título centrado en un área blanca
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    // Sombra sutil para separar el header del fondo
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 28, // '28px'
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Poppins-Bold',
  },

  // --- Empty State Styles (Content) ---
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL * 2,
    marginTop: -80, // Subimos el contenido para centrar visualmente
  },
  illustrationImage: {
    width: 179,
    height: 169,
    marginBottom: 40,
  },
  emptyStateTitle: {
    fontSize: 20, // 'text-xl'
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14, // 'text-sm'
    fontWeight: '400',
    color: '#6f7485',
    textAlign: 'center',
    lineHeight: 18.2,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 20,
  },

  // --- Footer Navigation Styles ---
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 83, // 'h-[83px]'
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
  navText: {
    fontSize: 12, // 'text-xs'
    marginTop: 4,
    fontFamily: 'Roboto-Medium',
  },
  activeText: {
    color: '#2c3e50', // Color para el ítem activo
    fontWeight: '600', // 'Roboto-SemiBold'
  },
  inactiveText: {
    color: 'rgba(0, 0, 0, 0.3)', // Opacidad 30% para inactivo
    fontWeight: '500', // 'Roboto-Medium'
  },
});

export default NotificacionesProfesional;