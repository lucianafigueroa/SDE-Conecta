import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 20;

// --- ICONOS SVG COMO COMPONENTES ---
// 1. Icono de Flecha Derecha (ChevronRight)
const ChevronRight = ({ color = "#A0A0A0" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M9 18l6-6-6-6"/>
  </Svg>
);

// 2. Icono de Perfil (User)
const UserIcon = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
  </Svg>
);

// 3. Icono de Teléfono (Phone)
const PhoneIcon = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M22 16.92v3.08a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3.08L7.5 7.5l-2.45 2.45L10.95 16.4l2.45-2.45z"/>
  </Svg>
);

// 4. Icono de Cerrar Sesión (LogOut)
const LogOutIcon = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <Path d="M16 17l5-5-5-5M21 12H9"/>
  </Svg>
);

// 5. Icono de Cerrar Menú (Cross/X)
const CrossIcon = ({ color = "#2c3e50" }) => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <Path d="M18 6L6 18M6 6l12 12"/>
  </Svg>
);

// --- ARREGLOS DE DATOS Y LÓGICA ---
const menuItems = [
  { 
    id: "profile", 
    IconComponent: UserIcon,
    label: "Mi Perfil", 
    color: "#2c3e50", 
    action: "profile" 
  },
  { 
    id: "contact", 
    IconComponent: PhoneIcon,
    label: "Contáctanos", 
    color: "#2c3e50", 
    action: "contact" 
  },
  { 
    id: "logout", 
    IconComponent: LogOutIcon,
    label: "Cerrar Sesión", 
    color: "#D21818", 
    action: "logout" 
  },
];

// Helper Component for a single menu item
const MenuItem = ({ IconComponent, label, color, action, handleAction }) => (
  <TouchableOpacity style={styles.menuItemContainer} onPress={() => handleAction(action)}>
    <View style={styles.menuItemLeft}>
      <IconComponent color={color} style={styles.menuIcon} /> 
      <Text style={[styles.menuItemText, { color }]}>{label}</Text>
    </View>
    <ChevronRight /> 
  </TouchableOpacity>
);

// --- MAIN COMPONENT ---
export const MenuProfesional = ({ navigation }) => {
  const userData = {
    name: 'Maria Carrizo',
    email: 'mariacarrizo@gmail.com',
    profilePic: 'https://via.placeholder.com/150/d26e00/FFFFFF?text=MC', 
  };

  // Actualizamos handleAction para navegación
  const handleAction = (action) => {
    if (action === 'profile') {
      navigation.navigate('PerfilProfesional'); // Navega a PerfilProfesional
    } else if (action === 'contact') {
      console.log('Contact pressed');
    } else if (action === 'logout') {
      console.log('Logout pressed');
    } else if (action === 'close') {
      console.log('Close menu pressed');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>¡Bienvenido al menú!</Text>
          <TouchableOpacity onPress={() => handleAction('close')}>
            <CrossIcon /> 
          </TouchableOpacity>
        </View>

        {/* User Info Card */}
        <View style={styles.userInfoCard}>
          <Image 
            source={{ uri: userData.profilePic }} 
            style={styles.profileImage}
          />
          <View style={styles.userInfoText}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <MenuItem 
              key={item.id}
              IconComponent={item.IconComponent}
              label={item.label}
              color={item.color}
              action={item.action}
              handleAction={handleAction} // Pasamos la función actualizada
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.teamInfo}>
            <UserIcon color="#666" style={{ width: 16, height: 16 }} /> 
            <Text style={styles.teamText}>Los más copados team</Text>
          </View>
          <Text style={styles.versionText}>Version 1.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  container: {
    flex: 1,
    paddingHorizontal: CARD_MARGIN,
    paddingVertical: 10,
    backgroundColor: '#EAEAEA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Poppins-Bold',
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginRight: 16,
  },
  userInfoText: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    fontFamily: 'Poppins-SemiBold',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d26e00',
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
  },
  menuList: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 8,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.7,
  },
  teamText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0c0c0c',
    marginLeft: 5,
    fontFamily: 'Poppins-Bold',
  },
  versionText: {
    fontSize: 14,
    color: '#000',
    opacity: 0.5,
    fontFamily: 'Poppins-Regular',
  }
});

export default MenuProfesional;
