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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth, db } from "../config/firebaseConfig.js";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import logoImage from "../assets/images/logo.png";
import placeholder from "../assets/images/placeholder.png";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

// --- CAMBIO 1: Importar la librería de íconos ---
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get("window");

const checkUserRoleAndNavigate = async (user, navigation) => {
  const userRef = doc(db, "usuarios", user.uid);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const rol = userData.rol;
      if (rol === "prestador") {
        navigation.navigate("InicioProfesional");
      } else if (rol === "cliente") {
        navigation.navigate("InicioCliente", { user: { ...user, rol } });
      } else {
        Alert.alert("Error de Rol", "Tu perfil no tiene un rol válido. Contacta a soporte.");
      }
    } else {
      Alert.alert("Perfil Incompleto", "No encontramos tu información de perfil. Regístrate de nuevo.");
    }
  } catch (error) {
    console.error("Error al obtener el rol:", error.message);
    Alert.alert("Error de Conexión", "No se pudo verificar tu rol. Inténtalo más tarde.");
  }
};

export default function IniciarSesion({ navigation }) {
  useScreenFocusLogger();

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  const handleGoogleLogin = async (idToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      console.log("Login con Google exitoso.");
      await checkUserRoleAndNavigate(user, navigation);
    } catch (error) {
      console.error("Error al autenticar con Google:", error.message);
      alert("Error al conectar con Google. Inténtalo de nuevo.");
    }
  };

  React.useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      const idToken = response.authentication.idToken;
      handleGoogleLogin(idToken);
    } else if (response?.type === "error") {
      alert("Error en la autenticación con Google.");
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, ingresa tu e-mail y contraseña.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario logueado con éxito:", user.email);
      await checkUserRoleAndNavigate(user, navigation);
    } catch (error) {
      let errorMessage = "Error al iniciar sesión. Verifica tus credenciales.";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "E-mail o contraseña inválidos. Por favor, intenta de nuevo.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Acceso bloqueado temporalmente debido a demasiados intentos fallidos.";
      }
      console.error("Error de Login:", error.message);
      alert(errorMessage);
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBackground} />
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>¡Bienvenido!</Text>

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
              style={[styles.input, { paddingRight: 50 }]}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Ingresá tu contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              {/* --- CAMBIO AQUÍ: Lógica del ícono corregida --- */}
              <Ionicons
                name={showPassword ? "eye" : "eye-off"} // Si se muestra, ojo normal. Si no, ojo tachado.
                size={24}
                color="#7F8C8D"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => console.log("Ir a recuperar contraseña")}
        >
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.main, styles.loginButtonOverride]}
          onPress={handleLogin}
        >
          <Text style={textStyles.mainText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.orLoginContainer}>
          <Image source={placeholder} style={styles.orLoginLine} resizeMode="contain" />
          <Text style={styles.orLoginText}>O Iniciá con</Text>
          <Image source={placeholder} style={styles.orLoginLine} resizeMode="contain" />
        </View>

        <View style={styles.socialButtonsContainer}>
          {socialButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={button.onPress}
            >
              <Text style={[styles.socialIconText, { color: button.color }]}>{button.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿Todavía no tienes una cuenta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Registro")}
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
    backgroundColor: "#e5e8ec",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 50,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 256,
    backgroundColor: "#d26e00",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 20,
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f9f5ee",
    textAlign: "center",
    marginTop: -50,
    zIndex: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9f5ee",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 80,
    zIndex: 3,
  },
  inputsSection: {
    width: "90%",
    maxWidth: 333,
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 20,
    position: "relative",
    height: 56,
    justifyContent: 'center', // Ayuda a centrar verticalmente el contenido
  },
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
  passwordToggle: {
    position: "absolute",
    right: 15,
    // top y height ya no son necesarios si el wrapper usa justifyContent: 'center'
    zIndex: 5,
  },
  // La propiedad passwordIcon ya no es necesaria, se puede borrar
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: (width - 333) / 2,
    marginBottom: 40,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#154360",
    textAlign: "right",
  },
  loginButtonOverride: {
    backgroundColor: "#154360",
    width: "80%",
    maxWidth: 333,
    borderRadius: 8,
    paddingVertical: 14,
  },
  orLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    maxWidth: 333,
    marginBottom: 20,
  },
  orLoginLine: {
    flex: 1,
    height: 1,
  },
  orLoginText: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#2c3e50",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    maxWidth: 333,
    marginBottom: 80,
  },
  socialButton: {
    width: "30%",
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  registerContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 40,
  },
  registerLink: {
    fontWeight: "600",
    color: "#d26e00",
  },
});