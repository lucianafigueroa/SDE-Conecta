import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import { buttonStyles } from '../styles/buttons';
import { textStyles } from '../styles/texts';

import logoImage from '../assets/images/logo.png';
import placeholder from '../assets/images/placeholder.png';

const { width } = Dimensions.get('window');

export default function IniciarSesion({ navigation }) {

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Definición de los botones sociales con texto/emojis
  const socialButtons = [
    { name: 'Facebook', icon: 'f', color: '#1877F2', onPress: () => console.log('Login con Facebook') },
    { name: 'Google', icon: 'G', color: '#DB4437', onPress: () => console.log('Login con Google') },
    { name: 'Other', icon: '🔒', color: '#000', onPress: () => console.log('Login con otro método') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.headerBackground} />

        <Image
          source={logoImage}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>¡Bienvenido de Nuevo!</Text>

        <View style={styles.inputsSection}>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Ingresá tu e-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 50 }]} // Espacio para el icono de visibilidad
              onChangeText={onChangePassword}
              value={password}
              placeholder="Ingresá tu contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
              <Image source={placeholder} style={styles.passwordIcon} />
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={styles.forgotPassword} onPress={() => console.log("Ir a recuperar contraseña")}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.main, styles.loginButtonOverride]}
          onPress={() => navigation.navigate('InicioCliente')}
        >
          <Text style={textStyles.mainText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.orLoginContainer}>
          <Image source={placeholder} style={styles.orLoginLine} resizeMode="contain" />
          <Text style={styles.orLoginText}>O Iniciá con</Text>
          <Image source={placeholder} style={styles.orLoginLine} resizeMode="contain" />
        </View>

        {/* --- CAMBIO AQUÍ: Botones Sociales usando íconos de texto/emojis --- */}
        <View style={styles.socialButtonsContainer}>
          {socialButtons.map((button, index) => (
            <TouchableOpacity key={index} style={styles.socialButton} onPress={button.onPress}>
              <Text style={[styles.socialIconText, { color: button.color }]}>
                {button.icon}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* ------------------------------------------------------------------ */}

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿Todavía no tienes una cuenta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Registro')}
            >
              Registrate ahora
            </Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e8ec', // Fondo gris claro
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 256,
    backgroundColor: '#d26e00',
  },
  statusIconsContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20, // Mantener el logo arriba
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    // fontFamily: 'Poppins-Bold', // Asumir que la fuente está cargada
    fontWeight: 'bold',
    color: '#f9f5ee', // Color del título (blanco/crema)
    textAlign: 'center',
    // --- CAMBIO AQUÍ ---
    marginTop: -50, // Ajusta este valor para subir el título dentro del header
    zIndex: 3, // Asegura que el texto esté sobre el fondo naranja
  },
  subtitle: {
    fontSize: 16,
    // fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#f9f5ee', // ¡Bienvenido de Nuevo! también blanco/crema para contrastar
    textAlign: 'center',
    // --- CAMBIO AQUÍ ---
    marginTop: 5, // Un pequeño margen debajo del título
    marginBottom: 80, // Mantener el margen para los inputs
    zIndex: 3, // Asegura que el texto esté sobre el fondo naranja
  },
  inputsSection: {
    width: '90%',
    maxWidth: 333,
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 20,
    position: 'relative',
    height: 56,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e8ec',
    paddingHorizontal: 18,
    fontSize: 14,
    // fontFamily: 'Poppins-Medium',
    color: '#2c3e50',
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 17,
    zIndex: 5,
  },
  passwordIcon: {
    width: 22,
    height: 22,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: (width - 333) / 2,
    marginBottom: 40,
  },
  forgotPasswordText: {
    fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    color: '#154360',
    textAlign: 'right',
  },
  loginButtonOverride: {
    backgroundColor: '#154360',
    width: '80%',
    maxWidth: 333,
    marginHorizontal: 0,
    borderRadius: 8,
    paddingVertical: 14,
  },
  orLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    maxWidth: 333,
    marginBottom: 20,
  },
  orLoginLine: {
    flex: 1,
    height: 1,
    width: 'auto',
  },
  orLoginText: {
    paddingHorizontal: 10,
    fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    color: '#2c3e50',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: 333,
    marginBottom: 80,
  },
  socialButton: {
    width: '30%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  registerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 40
  },
  registerLink: {
    // fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#d26e00',
  },
});