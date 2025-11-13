import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

// Lógica de Firebase
import { signOut } from "firebase/auth"; 
import { auth } from "../config/firebaseConfig.js"; 

const { width } = Dimensions.get('window');
const CARD_MARGIN = 20;

// --- ICONOS SVG ---
const ChevronRight = ({ color = "#A0A0A0" }) => ( <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M9 18l6-6-6-6"/></Svg> );
const UserIcon = ({ color, style }) => ( <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></Svg> );
const PhoneIcon = ({ color }) => ( <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M22 16.92v3.08a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3.08L7.5 7.5l-2.45 2.45L10.95 16.4l2.45-2.45z"/></Svg> );
const LogOutIcon = ({ color }) => ( <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><Path d="M16 17l5-5-5-5M21 12H9"/></Svg> );
const CrossIcon = ({ color = "#2c3e50" }) => ( <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><Path d="M18 6L6 18M6 6l12 12"/></Svg> );
const ModalExitArrow = ({ color = "#FFF", size = 40 }) => ( <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/></Svg> );

const menuItems = [
  { id: "profile", IconComponent: UserIcon, label: "Mi Perfil", color: "#2c3e50", action: "profile" },
  { id: "contact", IconComponent: PhoneIcon, label: "Contáctanos", color: "#2c3e50", action: "contact" },
  { id: "logout", IconComponent: LogOutIcon, label: "Cerrar Sesión", color: "#D21818", action: "logout" },
];

const MenuItem = ({ IconComponent, label, color, action, handleAction }) => (
  <TouchableOpacity style={styles.menuItemContainer} onPress={() => handleAction(action)}>
    <View style={styles.menuItemLeft}>
      <IconComponent color={color} style={styles.menuIcon} /> 
      <Text style={[styles.menuItemText, { color }]}>{label}</Text>
    </View>
    <ChevronRight /> 
  </TouchableOpacity>
);

export default function MenuProfesional({ navigation }) {
  useScreenFocusLogger();
  const navigationHook = useNavigation(); // Usamos el hook para la función de logout

  const [isModalVisible, setModalVisible] = useState(false);

  const userData = {
    name: 'Maria Carrizo',
    email: 'mariacarrizo@gmail.com',
    profilePic: 'https://via.placeholder.com/150/d26e00/FFFFFF?text=MC', 
  };
  
  // --- LÓGICA DEL MODAL (traída de CerrarSesionProfesional) ---
  const handleLogout = async () => {
    setModalVisible(false);
    try {
      await signOut(auth);
      console.log('Sesión cerrada con éxito.');
      navigationHook.reset({
        index: 0,
        routes: [{ name: 'Bienvenida' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión. Inténtalo de nuevo.');
    }
  };

  const handleAction = (action) => {
    if (action === 'profile') {
      navigation.navigate('PerfilInfoPersonal'); // NAVEGACIÓN CORREGIDA
    } else if (action === 'contact') {
      navigation.navigate('Contactanos');
    } else if (action === 'logout') {
      setModalVisible(true); // Abre el modal
    } else if (action === 'confirmLogout') {
      handleLogout(); // Llama a la función de cierre de sesión
    } else if (action === 'close') {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.mainContent, isModalVisible && styles.mainContentDimmed]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>¡Bienvenido al menú!</Text>
            <TouchableOpacity onPress={() => handleAction('close')}>
              <CrossIcon /> 
            </TouchableOpacity>
          </View>

          <View style={styles.userInfoCard}>
            <Image source={{ uri: userData.profilePic }} style={styles.profileImage} />
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.id}
                IconComponent={item.IconComponent}
                label={item.label}
                color={item.color}
                action={item.action}
                handleAction={handleAction}
              />
            ))}
          </View>
          
          <View style={styles.footer}>
            <View style={styles.teamInfo}>
              <UserIcon color="#666" style={{ width: 16, height: 16 }} /> 
              <Text style={styles.teamText}>Los más copados team</Text>
            </View>
            <Text style={styles.versionText}>Version 1.0</Text>
          </View>
        </View>

        {/* --- JSX DEL MODAL (traído de CerrarSesionProfesional) --- */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalCenteredView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={styles.modalIconCircle}>
                    <ModalExitArrow />
                  </View>
                  <Text style={styles.modalTitle}>¡Volvé pronto!</Text>
                  <Text style={styles.modalText}>¿Estás seguro que deseas cerrar sesión?</Text>
                  <TouchableOpacity
                    style={styles.modalButtonPrimary}
                    onPress={() => handleAction('confirmLogout')}
                  >
                    <Text style={styles.modalButtonPrimaryText}>Sí, Cerrar Sesión</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButtonSecondary}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalButtonSecondaryText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

// --- ESTILOS (Incluyendo los del modal) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAEAEA' },
  container: { flex: 1 },
  mainContent: { flex: 1, paddingHorizontal: CARD_MARGIN, backgroundColor: '#EAEAEA' },
  mainContentDimmed: { opacity: 0.3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', fontFamily: 'Poppins-Bold' },
  userInfoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 },
  profileImage: { width: 76, height: 76, borderRadius: 38, marginRight: 16 },
  userInfoText: { justifyContent: 'center' },
  userName: { fontSize: 20, fontWeight: '600', color: '#2c3e50', fontFamily: 'Poppins-SemiBold' },
  userEmail: { fontSize: 14, fontWeight: '500', color: '#d26e00', marginTop: 2, fontFamily: 'Poppins-Medium' },
  menuList: { backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 8 },
  menuItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 8 },
  menuItemText: { fontSize: 15, fontWeight: '500', lineHeight: 20, fontFamily: 'Poppins-Medium' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, marginBottom: 10, paddingHorizontal: 16 },
  teamInfo: { flexDirection: 'row', alignItems: 'center', opacity: 0.7 },
  teamText: { fontSize: 10, fontWeight: 'bold', color: '#0c0c0c', marginLeft: 5, fontFamily: 'Poppins-Bold' },
  versionText: { fontSize: 14, color: '#000', opacity: 0.5, fontFamily: 'Poppins-Regular' },
  
  // Estilos del modal
  modalCenteredView: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { width: '100%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 35, alignItems: 'center' },
  modalIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FF8C00', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  modalText: { marginBottom: 30, textAlign: 'center', fontSize: 16, color: '#6f7485' },
  modalButtonPrimary: { backgroundColor: '#333333', borderRadius: 8, padding: 15, width: '100%', alignItems: 'center', marginBottom: 15 },
  modalButtonPrimaryText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalButtonSecondary: { padding: 10 },
  modalButtonSecondaryText: { color: '#FF8C00', fontSize: 16, fontWeight: 'bold' },
});