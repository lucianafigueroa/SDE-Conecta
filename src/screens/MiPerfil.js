import React, { useState, useEffect } from 'react';
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
  ActivityIndicator, // Para la carga inicial
} from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // Importamos el hook de autenticación
import { doc, getDoc } from 'firebase/firestore'; // Para leer datos
import { db } from '../config/firebaseConfig';
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

import profilePlaceholder from '../assets/images/placeholder.png';

const { width } = Dimensions.get('window');

export default function MiPerfil({ navigation }) {
  useScreenFocusLogger();
  const { user, signOut } = useAuth(); // Obtenemos el usuario y la función signOut del contexto

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nombre: 'Cargando...',
    email: 'Cargando...',
    telefono: 'Cargando...',
  });

  // Carga los datos del usuario desde Firestore cuando la pantalla se monta
  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        setLoading(true);
        const userDocRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            nombre: data.nombre || 'Sin nombre',
            email: data.email || user.email,
            telefono: data.telefono || 'Sin teléfono',
          });
        }
        setLoading(false);
      };
      fetchUserData();
    }
  }, [user?.uid]);

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut();
      // No necesitas navegar, el RootNavigator en App.js hará el cambio automáticamente
      console.log('Sesión cerrada con éxito.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d26e00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mi Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image source={profilePlaceholder} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              value={userData.nombre}
              onChangeText={(text) => setUserData({ ...userData, nombre: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]} // Estilo para deshabilitado
              value={userData.email}
              editable={false} // El email no se puede editar
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de teléfono</Text>
            <TextInput
              style={styles.input}
              value={userData.telefono}
              onChangeText={(text) => setUserData({ ...userData, telefono: text })}
              keyboardType="phone-pad"
            />
          </View>
          
          {/* Aquí podrías añadir la lógica de direcciones si es necesario */}

          {/* --- BOTÓN DE CERRAR SESIÓN AÑADIDO --- */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f8fa' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContainer: { paddingHorizontal: 25, paddingBottom: 40, alignItems: 'center' },
  header: { width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 30 },
  backArrow: { fontSize: 24, color: '#2C3E50', marginRight: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50' },
  profileContainer: { position: 'relative', width: 150, height: 150, borderRadius: 75, marginBottom: 30 },
  profileImage: { width: '100%', height: '100%', borderRadius: 75, resizeMode: 'cover' },
  editIcon: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'white', borderRadius: 20, padding: 6, elevation: 3 },
  editText: { fontSize: 16, color: '#D26E00', fontWeight: 'bold' },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 25 },
  label: { fontSize: 15, fontWeight: '600', color: '#2C3E50', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 15, fontSize: 15, color: '#2C3E50', backgroundColor: '#fff' },
  disabledInput: { backgroundColor: '#f0f0f0', color: '#888' },
  addressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderColor: '#E0E0E0' },
  addressText: { fontSize: 15, color: '#2C3E50' },
  pencilIcon: { fontSize: 18, color: '#828D94' },
  addAddress: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  addAddressIcon: { fontSize: 20, color: '#D26E00', marginRight: 6 },
  addAddressText: { fontSize: 15, color: '#D26E00', fontWeight: '500' },
  buttonContainer: { marginTop: 30, alignItems: 'center' },
  saveButton: { width: width * 0.85 },
  // Estilos para el nuevo botón de logout
  logoutButton: {
    backgroundColor: '#c0392b',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});