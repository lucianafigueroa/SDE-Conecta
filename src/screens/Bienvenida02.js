import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import plomeroSentado from '../assets/images/plomeroSentado.png';

// Obtenemos el ancho de la pantalla para una mejor respuesta en el tamaño de la imagen
const { width } = Dimensions.get('window');

export default function Bienvenida02({ navigation }) {
  const handleStart = () => {
    navigation.navigate('OnboardingScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Título */}
        <Text style={styles.title}>
          Los mejores profesionales a tu servicio
        </Text>

        <View style={styles.imageContainer}>
            <Image
                source={plomeroSentado}
                style={styles.mainImage}
                resizeMode="contain"
            />
        </View>

        {/* Botón "Empezar" */}
        <Button
          title="Empezar"
          buttonStyle={styles.startButton}
          textStyle={styles.startButtonText}
          onPress={handleStart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E8EC', // Fondo de color claro (Figma: #e5e8ec)
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 25,
    // Justificación para que el botón quede cerca del borde inferior
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    width: '90%',
    marginTop: 50,
    lineHeight: 32,
  },
  imageContainer: {
    flex: 1, // Permite que el contenedor de la imagen ocupe el espacio disponible
    justifyContent: 'center',
    alignItems: 'center',
    // La imagen se encuentra entre el título y el botón
    marginBottom: 10,
  },
  mainImage: {
    width: width * 1.65,
    height: width * 0.85 * (518 / 350), // Mantiene la relación de aspecto
  },
  startButton: {
    backgroundColor: '#D26E00', // Color naranja
    borderRadius: 31,
    width: '100%',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    // Sombra para darle profundidad
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  startButtonText: {
    color: '#E5E8EC', // Texto blanco/claro
    fontSize: 20,
    fontWeight: '600', // SemiBold
  },
});