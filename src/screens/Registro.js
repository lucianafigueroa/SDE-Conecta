import React from "react";
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
  Alert, 
} from "react-native";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../config/firebaseConfig.js";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";

import logoImage from "../assets/images/logo.png";
import placeholder from "../assets/images/placeholder.png";

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get("window");

export default function Registrarse({ navigation }) {
  const [username, onChangeUsername] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    }
  );

  const handleGoogleRegister = async (idToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      console.info("Registro con Google exitoso.");
      navigation.navigate("Seleccion");
    } catch (error) {
      console.error("Error al autenticar con Google:", error.message);
      Alert.alert("Error", "Error al conectar con Google. Inténtalo de nuevo.");
    }
  };

  React.useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      const idToken = response.authentication.idToken;
      handleGoogleRegister(idToken);
    } else if (response?.type === "error") {
      Alert.alert("Error", "Error en la autenticación con Google.");
    }
  }, [response]);

  // --- Lógica de Registro con E-mail y Contraseña ---
  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, completa todos los campos para registrarte."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error de Contraseña",
        "Las contraseñas no coinciden. Por favor, verifica."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Contraseña Débil",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    try {
      // 1. Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Usuario registrado con éxito:", user.email);

      // 2. Intentar actualizar el perfil con el nombre de usuario (opcional)
      await updateProfile(user, {
        displayName: username,
      });

      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada. ¡Bienvenido!");
      // Navegar al flujo post-registro, como la selección de perfil
      navigation.navigate("Seleccion");
    } catch (error) {
      let errorMessage = "Ocurrió un error al registrar. Inténtalo de nuevo.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este e-mail ya está registrado.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "El formato del e-mail no es válido.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "El registro con e-mail/contraseña está deshabilitado.";
      }

      console.error("Error de Registro:", error.message);
      Alert.alert("Error de Registro", errorMessage);
    }
  };

  const socialButtons = [
    {
      name: "Google",
      icon: "G",
      color: "#DB4437",
      onPress: () => promptAsync(),
    },
  ];

  return (
    <SafeAreaView style={registerStyles.safeArea}>
      <ScrollView contentContainerStyle={registerStyles.container}>
        <View style={registerStyles.headerBackground} />

        <Image
          source={logoImage}
          style={registerStyles.logo}
          resizeMode="contain"
        />

        {/* Título y Subtítulo de Registro */}
        <Text style={registerStyles.title}>Registrarse</Text>
        <Text style={registerStyles.subtitle}>
          Creá tu cuenta para empezar.
        </Text>

        <View style={registerStyles.inputsSection}>
          {/* Input Nombre de Usuario */}
          <View style={registerStyles.inputWrapper}>
            <TextInput
              style={registerStyles.input}
              onChangeText={onChangeUsername}
              value={username}
              placeholder="Nombre de Usu"
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </View>

          {/* Input E-mail */}
          <View style={registerStyles.inputWrapper}>
            <TextInput
              style={registerStyles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="E-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input Contraseña */}
          <View style={registerStyles.inputWrapper}>
            <TextInput
              style={[registerStyles.input, { paddingRight: 50 }]}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Contraseña (mín. 6 caracteres)"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={registerStyles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              {/* Se asume que 'placeholder' es el icono de visibilidad/ojo */}
              <Image source={placeholder} style={registerStyles.passwordIcon} />
            </TouchableOpacity>
          </View>

          {/* Input Confirmar Contraseña */}
          <View style={registerStyles.inputWrapper}>
            <TextInput
              style={[registerStyles.input, { paddingRight: 50 }]}
              onChangeText={onChangeConfirmPassword}
              value={confirmPassword}
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
          </View>
        </View>

        {/* Botón Registrarse */}
        <TouchableOpacity
          style={[buttonStyles.main, registerStyles.registerButtonOverride]}
          onPress={handleRegister} // Llama a la función de registro con Firebase
        >
          <Text style={textStyles.mainText}>Registrarse</Text>
        </TouchableOpacity>

        {/* O Regístrate con Separador */}
        <View style={registerStyles.orLoginContainer}>
          <Text style={registerStyles.orLoginText}>O Regístrate con</Text>
        </View>

        {/* Botones Sociales */}
        <View style={registerStyles.socialButtonsContainer}>
          {socialButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={registerStyles.socialButton}
              onPress={button.onPress}
            >
              <Text
                style={[registerStyles.socialIconText, { color: button.color }]}
              >
                {button.icon}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer para iniciar sesión */}
        <View style={registerStyles.loginFooterContainer}>
          <Text style={registerStyles.registerText}>
            ¿Ya tienes una cuenta?{" "}
            <Text
              style={registerStyles.registerLink}
              onPress={() => navigation.navigate("Login")}
            >
              Iniciar Sesión
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos de Registro (Herencia y ajustes) ---

const registerStyles = StyleSheet.create({
  // Herencia de estilos base de IniciarSesion
  ...StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#e5e8ec" },
    container: { flexGrow: 1, alignItems: "center", paddingBottom: 50 },
    headerBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      width: width,
      height: 256,
      backgroundColor: "#d26e00",
    },
    logo: { width: 200, height: 200, marginTop: 20, zIndex: 2 },
    inputsSection: { width: "90%", maxWidth: 333, marginBottom: 10 },
    inputWrapper: { marginBottom: 15, position: "relative", height: 56 }, // Reducido el margen de inputs
    input: {
      width: "100%",
      height: 56,
      backgroundColor: "#f7f8f9",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e5e8ec",
      paddingHorizontal: 18,
      fontSize: 14,
      color: "#2c3e50",
    },
    passwordToggle: { position: "absolute", right: 15, top: 17, zIndex: 5 },
    passwordIcon: { width: 22, height: 22 },
    // Eliminado orLoginContainer y orLoginLine para simplificar el separador
    orLoginContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      maxWidth: 333,
      marginVertical: 20,
    },
    orLoginText: { paddingHorizontal: 10, fontSize: 14, color: "#2c3e50" },
    socialButtonsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      width: "80%",
      maxWidth: 333,
      marginBottom: 40,
    }, // Justify a center
    socialButton: {
      width: "80%", // Usar más ancho para un solo botón
      maxWidth: 200, // Limitar ancho
      height: 56,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#eee",
      justifyContent: "center",
      alignItems: "center",
    },
    socialIconText: { fontSize: 26, fontWeight: "bold" },
    registerText: { fontSize: 14, color: "#2c3e50", textAlign: "center" },
    registerLink: { fontWeight: "600", color: "#d26e00" },
  }),

  // --- Ajustes específicos para Registrarse ---

  // Títulos
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f9f5ee",
    textAlign: "center",
    marginTop: -50, // Subir al header
    zIndex: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9f5ee",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 40, // Espacio antes del primer input
    zIndex: 3,
  },

  // Botón Principal
  registerButtonOverride: {
    backgroundColor: "#154360", // Azul oscuro
    width: "80%",
    maxWidth: 333,
    marginHorizontal: 0,
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 20, // Espacio antes del separador social
  },

  // Footer para el link de Iniciar Sesión (posición relativa)
  loginFooterContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
});
