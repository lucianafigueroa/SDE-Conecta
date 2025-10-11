import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';

const CARD_MARGIN = 20;
const USER_COLOR = '#2c3e50';
const ALERT_COLOR = '#FF8C00';
const LOGOUT_COLOR = 'red';

// --- ICONOS SVG ---
const UserIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><Circle cx="12" cy="7" r="4"/>
  </Svg>
);

const ContactIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3.08a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3.08L7.5 7.5l-2.45 2.45L10.95 16.4l2.45-2.45z"/>
  </Svg>
);

const HardHatIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h7M11 15V9m0 6h7a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-7"/>
    <Path d="M17 19v-2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2"/>
  </Svg>
);

const LogOutIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><Path d="M16 17l5-5-5-5M21 12H9"/>
  </Svg>
);

const ChevronRight = ({ color = "#A0A0A0", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6"/>
  </Svg>
);

const CrossIcon = ({ color = USER_COLOR, size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 6L6 18M6 6l12 12"/>
  </Svg>
);

const ModalExitArrow = ({ color = "#FFF", size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
  </Svg>
);

// --- DATOS ---
const menuItems = [
  { id: 'profile', Icon: UserIcon, label: 'Mi Perfil', color: USER_COLOR, action: 'profile' },
  { id: 'contact', Icon: ContactIcon, label: 'Contáctanos', color: USER_COLOR, action: 'contact' },
  { id: 'professional', Icon: HardHatIcon, label: 'Convertirse en Profesional', color: USER_COLOR, action: 'toProfessional' },
  { id: 'logout', Icon: LogOutIcon, label: 'Cerrar Sesión', color: LOGOUT_COLOR, action: 'showModal' }, 
];

const MenuItem = ({ Icon, label, color, onPress }) => (
  <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Icon color={color} size={22} style={styles.menuIcon} />
      <Text style={[styles.menuItemText, { color }]}>{label}</Text>
    </View>
    <ChevronRight color="#A0A0A0" size={24} />
  </TouchableOpacity>
);

// --- COMPONENTE PRINCIPAL ---
export const CerrarSesionProfesional = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // ✅ Hook de navegación

  const userData = {
    name: 'Nombre de Usuario',
    email: 'email@ejemplo.com',
  };

  const handleAction = (action) => {
    if (action === 'showModal') {
      setModalVisible(true);
    } 
    else if (action === 'confirmLogout') {
      setModalVisible(false);
      console.log('Cerrando sesión...');
    } 
    else if (action === 'profile') {
      navigation.navigate('PerfilProfesional'); // ✅ Navega a tu pantalla de perfil
    }
    else {
      console.log(`Action taken: ${action}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.menuContent, isModalVisible && styles.menuContentDimmed]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>¡Bienvenido al menú!</Text>
            <TouchableOpacity onPress={() => handleAction('closeMenu')}>
              <CrossIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfoCard}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>

          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.id}
                Icon={item.Icon}
                label={item.label}
                color={item.color}
                onPress={() => handleAction(item.action)}
              />
            ))}
          </View>
        </View>

        {/* Modal */}
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
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EAEAEA' },
  container: { flex: 1, backgroundColor: '#EAEAEA' },
  menuContent: { flex: 1, paddingHorizontal: CARD_MARGIN, paddingTop: 10, backgroundColor: '#EAEAEA' },
  menuContentDimmed: { opacity: 0.3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: USER_COLOR },
  userInfoCard: { backgroundColor: '#FFF', borderRadius: 10, padding: 20, marginBottom: 20, elevation: 2 },
  userName: { fontSize: 18, fontWeight: '600', color: USER_COLOR },
  userEmail: { fontSize: 14, color: ALERT_COLOR, marginTop: 2 },
  menuList: { backgroundColor: '#FFF', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  menuItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 10 },
  menuItemText: { fontSize: 16, fontWeight: '500' },
  modalCenteredView: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { width: '100%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 35, alignItems: 'center' },
  modalIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: ALERT_COLOR, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: USER_COLOR },
  modalText: { marginBottom: 30, textAlign: 'center', fontSize: 16, color: '#6f7485' },
  modalButtonPrimary: { backgroundColor: '#333333', borderRadius: 8, padding: 15, width: '100%', alignItems: 'center', marginBottom: 15 },
  modalButtonPrimaryText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  modalButtonSecondary: { padding: 10 },
  modalButtonSecondaryText: { color: ALERT_COLOR, fontSize: 16, fontWeight: 'bold' },
});

export default CerrarSesionProfesional;
