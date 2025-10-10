import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const CARD_MARGIN = 20;
const USER_COLOR = '#2c3e50';
const ALERT_COLOR = '#FF8C00';
const LOGOUT_COLOR = 'red';

// --- ICONOS SVG (Asegúrate de tener estos componentes en un archivo aparte o definidos aquí) ---

// Icono de Usuario (Mi Perfil)
const UserIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><Circle cx="12" cy="7" r="4"/>
  </Svg>
);

// Icono de Contacto
const ContactIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3.08a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3.08L7.5 7.5l-2.45 2.45L10.95 16.4l2.45-2.45z"/>
  </Svg>
);

// Icono de Casco (Convertirse en Profesional)
const HardHatIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h7M11 15V9m0 6h7a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-7"/>
    <Path d="M17 19v-2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2"/>
  </Svg>
);

// Icono de Cerrar Sesión (Menú)
const LogOutIcon = ({ color, size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><Path d="M16 17l5-5-5-5M21 12H9"/>
  </Svg>
);

// Flecha Derecha
const ChevronRight = ({ color = "#A0A0A0", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6"/>
  </Svg>
);

// Icono de Cruz (Cerrar Menú)
const CrossIcon = ({ color = USER_COLOR, size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 6L6 18M6 6l12 12"/>
  </Svg>
);

// Flecha de Salida (Para el modal)
const ModalExitArrow = ({ color = "#FFF", size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
  </Svg>
);


// --- DATOS Y SUB-COMPONENTES ---

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


// --- COMPONENTE PRINCIPAL UNIFICADO ---
export const CerrarSesionProfesional = () => {
  const [isModalVisible, setModalVisible] = useState(false); // Iniciar oculto por defecto

  const userData = {
    name: 'Nombre de Usuario',
    email: 'email@ejemplo.com',
  };

  const handleAction = (action) => {
    if (action === 'showModal') {
      setModalVisible(true);
    } else if (action === 'confirmLogout') {
      setModalVisible(false);
      console.log('Cerrando sesión...');
      // Lógica real de cierre de sesión aquí
    } else {
      console.log(`Action taken: ${action}`);
      // Lógica de navegación
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* --- Menú de Fondo (Visible siempre) --- */}
        <View style={[styles.menuContent, isModalVisible && styles.menuContentDimmed]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>¡Bienvenido al menú!</Text>
            <TouchableOpacity onPress={() => handleAction('closeMenu')}>
              <CrossIcon />
            </TouchableOpacity>
          </View>

          {/* User Info Card (Simulando la tarjeta de la interfaz anterior) */}
          <View style={styles.userInfoCard}>
            {/* Nota: Imagen de avatar omitida para simplificar el ejemplo */}
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>

          {/* Menu Items List */}
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

        {/* --- Modal de Confirmación de Cierre de Sesión --- */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalCenteredView}>
            <View style={styles.modalView}>
              
              {/* Círculo Naranja con Icono */}
              <View style={styles.modalIconCircle}>
                <ModalExitArrow />
              </View>

              <Text style={styles.modalTitle}>¡Volvé pronto!</Text>
              <Text style={styles.modalText}>¿Estás seguro que deseas cerrar sesión?</Text>

              {/* Botones */}
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
          </View>
        </Modal>

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
  menuContent: {
    flex: 1,
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 10,
    backgroundColor: '#EAEAEA',
  },
  menuContentDimmed: {
    opacity: 0.3, // Opacidad reducida cuando el modal está activo
  },
  
  // --- Header Styles ---
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
    color: USER_COLOR,
  },

  // --- User Info Card Styles (Simplificado, solo texto) ---
  userInfoCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: USER_COLOR,
  },
  userEmail: {
    fontSize: 14,
    color: ALERT_COLOR,
    marginTop: 2,
  },
  
  // --- Menu List Styles ---
  menuList: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    marginRight: 10, 
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },

  // --- Modal Styles ---
  modalCenteredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // El fondo oscuro del modal ahora es parte del Modal
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ALERT_COLOR, // Naranja
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: USER_COLOR,
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#6f7485',
  },
  modalButtonPrimary: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalButtonPrimaryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonSecondary: {
    padding: 10,
  },
  modalButtonSecondaryText: {
    color: ALERT_COLOR, 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CerrarSesionProfesional;