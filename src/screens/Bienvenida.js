import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar 
} from "react-native";
import pincel from "../assets/images/pincel.png";
import destornillador from "../assets/images/destornillador.png";
import tuercas from "../assets/images/tuercas.png";
import pulverizador from "../assets/images/pulverizador.png";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

export default function Bienvenida({ navigation }) {
  useScreenFocusLogger();

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true}
      />

      {/* --- CAPA 1: Imágenes de fondo posicionadas absolutamente --- */}
      <Image source={pincel} style={styles.cornerImageTopLeft} resizeMode="contain" />
      <Image source={destornillador} style={styles.cornerImageTopRight} resizeMode="contain" />
      <Image source={tuercas} style={styles.cornerImageBottomLeft} resizeMode="contain" />
      <Image source={pulverizador} style={styles.cornerImageBottomRight} resizeMode="contain" />

      {/* --- CAPA 2: Contenido central en una capa superpuesta --- */}
      {/* StyleSheet.absoluteFill hace que este View ocupe toda la pantalla */}
      <View style={[StyleSheet.absoluteFill, styles.contentOverlay]}>
        
        {/* Contenido de texto */}
        <View style={styles.textContent}>
          <Text style={styles.titleText}>SDE Conecta</Text>
          <Text style={styles.subtitleText}>Tu conexión de servicios locales</Text>
        </View>

        {/* Contenido de botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => navigation.navigate('Registro')}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#154360", // El color de fondo azul oscuro
  },
  // Capa que se superpone para centrar el contenido
  contentOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Posiciones y tamaños ajustados meticulosamente para coincidir con la imagen
  cornerImageTopLeft: {
    position: 'absolute',
    top: 20,
    left: -60,
    width: 250,
    height: 250,
  },
  cornerImageTopRight: {
    position: 'absolute',
    top: 20,
    right: -70,
    width: 250,
    height: 250,
  },
  cornerImageBottomLeft: {
    position: 'absolute',
    bottom: -30,
    left: -80,
    width: 280,
    height: 280,
  },
  cornerImageBottomRight: {
    position: 'absolute',
    bottom: -20,
    right: -70,
    width: 250,
    height: 250,
  },
  // Contenido de texto y botones
  textContent: {
    alignItems: "center",
    marginBottom: 60,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitleText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonContainer: {
    width: '80%', // Ancho ajustado para coincidir con la imagen
  },
  mainButton: {
    backgroundColor: '#d26e00',
    paddingVertical: 16, // Ligeramente más alto
    borderRadius: 30, // Redondeo perfecto
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600', // Un poco menos grueso que 'bold'
  },
});