import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons'; // Usamos iconos para el mapa

const { width } = Dimensions.get('window');

// Componente Button simple para los estilos reutilizables
const Button = ({ title, buttonStyle, textStyle, onPress, icon }) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress}>
    {icon}
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

// Placeholder para la imagen del mapa 3D
const MAP_IMAGE_URL = 'https://placehold.co/300x300/E5E8EC/2C3E50?text=Mapa+3D+Ubicacion';

export default function Bienvenida05({ navigation }) {
  // Navegación para "Elegir desde el mapa" (va a Bienvenida06)
  const handleMapSelect = () => {
    navigation.navigate('Bienvenida');
  };

  // Navegación para "Introducir manualmente"
  const handleManualInput = () => {
    navigation.navigate('Bienvenida');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Imagen/Gráfico del mapa con pin */}
        <View style={styles.mapGraphicContainer}>
            {/* Usamos un ícono de ubicación grande y un círculo para simular el mapa */}
            <View style={styles.mapCircle}>
                <Feather name="map-pin" size={80} color="#D26E00" />
            </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>
          ¿Cuál es tu ubicación?
        </Text>

        {/* Descripción */}
        <Text style={styles.description}>
          Necesitamos acceder a tu ubicación para sugerirte servicios cercanos relevantes.
        </Text>

        {/* Botón: Elegir desde el mapa (Naranja - Principal) */}
        <Button
          title="Elegir desde el mapa"
          buttonStyle={[styles.actionButton, styles.primaryButton]}
          textStyle={styles.primaryButtonText}
          onPress={handleMapSelect}
        />

        {/* Botón: Introducir la ubicación manualmente (Azul - Secundario) */}
        <Button
          title="Introducir la ubicación manualmente"
          buttonStyle={[styles.actionButton, styles.secondaryButton]}
          textStyle={styles.secondaryButtonText}
          onPress={handleManualInput}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E8EC',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 50,
    justifyContent: 'flex-start',
  },
  mapGraphicContainer: {
    width: width * 0.75,
    height: width * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Ajuste para centrar visualmente
    marginBottom: 50,
  },
  mapCircle: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.75) / 2,
    backgroundColor: 'rgba(44, 62, 80, 0.05)', // Gris/Azul muy claro
    justifyContent: 'center',
    alignItems: 'center',
    // Simulación de un mapa con líneas suaves
    borderWidth: 2,
    borderColor: 'rgba(44, 62, 80, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 32,
    width: '90%',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2C3E50',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 28,
    width: '90%',
    marginBottom: 80, // Espacio antes de los botones
  },
  actionButton: {
    width: width - 50, // width - 2*paddingHorizontal
    height: 62,
    borderRadius: 31, // rounded-[32px]
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#D26E00', // Naranja
  },
  primaryButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500', // Medium
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#154360', // Azul Oscuro
  },
  secondaryButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});