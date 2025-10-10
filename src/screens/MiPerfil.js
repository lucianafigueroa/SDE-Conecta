import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Button from '../components/Button';
import { buttonStyles } from '../styles/buttons';
import { textStyles } from '../styles/texts';

import profilePlaceholder from '../assets/images/placeholder.png';

const { width } = Dimensions.get('window');

export default function MiPerfil({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Header con botón atrás y título --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mi Perfil</Text>
        </View>

        {/* --- Imagen de perfil --- */}
        <View style={styles.profileContainer}>
          <Image source={profilePlaceholder} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* --- Formulario de datos del usuario --- */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Sarah Johnson"
              placeholderTextColor="#555"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="sarahjohnson@gmail.com"
              placeholderTextColor="#555"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="(964) 677-7646"
              placeholderTextColor="#555"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección primaria</Text>
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>34076 NW 120th ave</Text>
              <TouchableOpacity>
                <Text style={styles.pencilIcon}>✏️</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addAddress}>
              <Text style={styles.addAddressIcon}>＋</Text>
              <Text style={styles.addAddressText}>Agregar nueva dirección</Text>
            </TouchableOpacity>
          </View>

          {/* --- Botón Guardar --- */}
          <View style={styles.buttonContainer}>
            <Button
              title="Guardar cambios"
              onPress={() => navigation.navigate('MenuUsuario')}
              buttonStyle={[buttonStyles.main, styles.saveButton]}
              textStyle={textStyles.mainText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  backArrow: {
    fontSize: 24,
    color: '#2C3E50',
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  profileContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    resizeMode: 'cover',
  },
  editIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  editText: {
    fontSize: 16,
    color: '#D26E00',
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#2C3E50',
    backgroundColor: '#fff',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addressText: {
    fontSize: 15,
    color: '#2C3E50',
  },
  pencilIcon: {
    fontSize: 18,
    color: '#828D94',
  },
  addAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addAddressIcon: {
    fontSize: 20,
    color: '#D26E00',
    marginRight: 6,
  },
  addAddressText: {
    fontSize: 15,
    color: '#D26E00',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  saveButton: {
    width: width * 0.85,
  },
});
