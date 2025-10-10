import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ScrollView, 
  Modal, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import Svg, { Path, Circle, Polyline, Rect } from 'react-native-svg';

const USER_COLOR = '#2c3e50';
const ALERT_COLOR = '#FF8C00';
const RED_ERROR = '#FF0000';
const PADDING_HORIZONTAL = 20;

// --- DEFINICIÓN DE ICONOS SVG EN EL MISMO ARCHIVO ---

// Flecha Izquierda (Volver)
const ChevronLeft = ({ color = USER_COLOR, size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="15 18 9 12 15 6"/>
  </Svg>
);

// Icono de Lápiz (Editar dirección)
const EditIcon = ({ color = USER_COLOR, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </Svg>
);

// Icono de Círculo con Cruz (Añadir)
const AddCircleIcon = ({ color = ALERT_COLOR, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/><Path d="M12 8v8m-4-4h8"/>
  </Svg>
);

// Icono de Círculo con 'i' (Error Email)
const ErrorIcon = ({ color = RED_ERROR, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/><Path d="M12 16v-4M12 8h.01"/>
  </Svg>
);

// Icono de Cruz (Cerrar Modal)
const CrossIcon = ({ color = USER_COLOR, size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 6L6 18M6 6l12 12"/>
  </Svg>
);


// --- COMPONENTE PRINCIPAL ---
export const PerfilInfoPersonal = () => {
  const [data, setData] = useState({
    name: 'Maria Carrizo',
    email: 'mariacarrizo@gmail.com',
    phone: '(964) 677-7646',
    address: '34076 NW 120th ave',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Simula el estado de verificación
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  const userData = {
    profilePic: 'https://via.placeholder.com/150/F08080/FFFFFF?text=MC', // Placeholder
  };

  const handleUpdate = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // Muestra el modal de error de email si no está verificado
  const handleEmailTouch = () => {
    if (!isEmailVerified) {
      setErrorModalVisible(true);
    }
  };

  const handleAction = (action) => {
    console.log(`Action: ${action}`);
    // Aquí iría la lógica de navegación real, backend, etc.
  };

  // Campo de texto reutilizable
  const EditableField = ({ label, value, onChangeText, isEditable = true, icon, onIconPress }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldInputWrapper, isEditable ? styles.editableInput : styles.readOnlyInput]}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          editable={isEditable}
          keyboardType={label.includes('teléfono') ? 'phone-pad' : 'default'}
        />
        {icon && (
          <TouchableOpacity onPress={onIconPress} style={styles.fieldIcon}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            
            {/* --- Header --- */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => handleAction('goBack')}>
                <ChevronLeft />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Mi perfil</Text>
            </View>

            {/* --- Profile Image --- */}
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={() => setPhotoModalVisible(true)}>
                <Image 
                  source={{ uri: userData.profilePic }} 
                  style={styles.profileImage}
                />
                <View style={styles.cameraIconBadge}>
                  <EditIcon color="white" size={16} />
                </View>
              </TouchableOpacity>
            </View>

            {/* --- Editable Fields --- */}
            <View style={styles.fieldsContainer}>
              
              <EditableField
                label="Nombre Completo"
                value={data.name}
                onChangeText={(text) => handleUpdate('name', text)}
              />

              <EditableField
                label="Email"
                value={data.email}
                isEditable={false} // Se mantiene como NO editable, aunque se toca para el error
                icon={!isEmailVerified ? <ErrorIcon color={RED_ERROR} size={20} /> : null}
                onIconPress={handleEmailTouch}
              />

              <EditableField
                label="Número de teléfono"
                value={data.phone}
                onChangeText={(text) => handleUpdate('phone', text)}
              />
              
              {/* --- Dirección Primaria --- */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Dirección primaria</Text>
                <View style={styles.addressWrapper}>
                  <Text style={styles.addressText}>{data.address}</Text>
                  <TouchableOpacity onPress={() => handleAction('editAddress')}>
                    <EditIcon color="#A0A0A0" size={20} />
                  </TouchableOpacity>
                </View>
                
                {/* --- Añadir Nueva Dirección --- */}
                <TouchableOpacity onPress={() => handleAction('addNewAddress')} style={styles.addNewAddress}>
                  <AddCircleIcon color={ALERT_COLOR} size={20} />
                  <Text style={styles.addNewAddressText}>Add new address</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- Modal 1: Elegir/Tomar Foto (PhotoModal - Aparece desde abajo) --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPhotoModalVisible}
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.photoModalView}>
            <TouchableOpacity onPress={() => setPhotoModalVisible(false)} style={styles.photoModalCloseButton}>
              <CrossIcon color={USER_COLOR} size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAction('selectFromGallery')} style={styles.photoModalOption}>
              <Text style={styles.photoModalOptionText}>Elegir desde la galería</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAction('takePhoto')} style={styles.photoModalOption}>
              <Text style={styles.photoModalOptionText}>Tomar foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- Modal 2: Error de Email (ErrorModal - Aparece en el centro) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isErrorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={[styles.modalCenteredView, styles.centerModal]}>
          <View style={styles.errorModalView}>
            {/* Círculo Rojo con Signo de Exclamación */}
            <View style={styles.errorModalIconCircle}>
                <Text style={styles.exclamationMark}>!</Text>
            </View>

            <Text style={styles.errorModalTitle}>¡Tu e-mail no está verificado!</Text>

            <TouchableOpacity
              style={styles.modalButtonPrimary}
              onPress={() => handleAction('verifyEmail')}
            >
              <Text style={styles.modalButtonPrimaryText}>Verificar email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};


// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: '#EAEAEA',
  },
  
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: USER_COLOR,
    marginLeft: 15,
  },

  // --- Profile Image Section ---
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#357C45', // Verde
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },

  // --- Fields Styles ---
  fieldsContainer: {
    paddingHorizontal: 0,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: USER_COLOR,
    marginBottom: 8,
    fontWeight: '500',
  },
  fieldInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  editableInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  readOnlyInput: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: USER_COLOR,
    paddingVertical: 0,
  },
  fieldIcon: {
    marginLeft: 10,
    padding: 5,
  },

  // --- Address Styles ---
  addressWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
  },
  addressText: {
    fontSize: 16,
    color: USER_COLOR,
    flexShrink: 1,
  },
  addNewAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  addNewAddressText: {
    marginLeft: 8,
    fontSize: 16,
    color: ALERT_COLOR,
    fontWeight: 'bold',
  },

  // --- MODAL BASE STYLES ---
  modalCenteredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerModal: {
    justifyContent: 'center',
  },

  // --- Photo Modal Styles (Parte inferior) ---
  photoModalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  photoModalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    padding: 5,
    zIndex: 1,
  },
  photoModalOption: {
    width: '100%',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    alignItems: 'center',
  },
  photoModalOptionText: {
    fontSize: 18,
    color: USER_COLOR,
    fontWeight: '500',
  },
  
  // --- Error Modal Styles (Centro) ---
  errorModalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  errorModalIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: RED_ERROR, // Rojo
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  exclamationMark: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
      lineHeight: 50,
  },
  errorModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: USER_COLOR,
  },
  modalButtonPrimary: {
    backgroundColor: USER_COLOR,
    borderRadius: 8,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PerfilInfoPersonal;