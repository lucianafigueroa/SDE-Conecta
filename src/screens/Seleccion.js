import React, { useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig.js";

import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import Button from "../components/Button";
import logo from "../assets/images/logo.png";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger'; // <-- 1. Importación añadida

export default function Seleccion({ navigation, route }) {
  useScreenFocusLogger(); // <-- 2. Hook en uso

  // Extraemos el UID que debe venir de la pantalla de Registro
  const { uid } = route.params || {};

  // Log específico del UID cuando se enfoca la pantalla
  useFocusEffect(
    useCallback(() => {
      if (uid) console.log("-> UID del usuario: " + uid);
      return () => {};
    }, [uid])
  );

  const primaryBackgroundColor = "#d26e00f2";
  const textColor = "#e5e8ec";

  // Función para actualizar el rol en Firestore y navegar
  const updateRoleAndNavigate = async (rol) => {
    if (!uid) {
      Alert.alert(
        "Error",
        "El ID de usuario es necesario para guardar el rol. Por favor, vuelve a registrarte."
      );
      return;
    }

    const dbRole = rol === "profesional" ? "prestador" : "cliente";

    try {
      const userRef = doc(db, "usuarios", uid);
      await updateDoc(userRef, { rol: dbRole });
      console.log(`Rol del usuario ${uid} actualizado a: ${dbRole}`);

      navigation.navigate("Registrarse1", {
        tipoUsuario: rol,
        uid: uid,
      });
    } catch (error) {
      console.error("Error al actualizar el rol en Firestore:", error);
      Alert.alert(
        "Error de Conexión",
        "No se pudo guardar la selección de rol. Verifica tu conexión o las reglas de seguridad de Firestore."
      );
    }
  };

  const handleClientPress = async () => {
    await updateRoleAndNavigate("cliente");
  };

  const handleProfessionalPress = async () => {
    await updateRoleAndNavigate("profesional");
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: primaryBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>¡Bienvenido!</Text>

        <Text style={[styles.subtitle, { color: textColor }]}>
          ¿Cuál es tu rol?
        </Text>

        <Image source={logo} resizeMode="contain" style={styles.logo} />

        <Button
          title="Soy un cliente"
          buttonStyle={[buttonStyles.main, styles.clientButton]}
          textStyle={textStyles.mainText}
          onPress={handleClientPress}
        />

        <Button
          title="Soy un Profesional"
          buttonStyle={[buttonStyles.secondary, styles.professionalButton]}
          textStyle={[textStyles.mainText, styles.professionalText]}
          onPress={handleProfessionalPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  logo: {
    width: 350,
    height: 350,
  },
  clientButton: {
    backgroundColor: "#154360",
    marginBottom: 24,
    width: "80%",
  },
  professionalButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#e5e8ec",
    width: "80%",
  },
  professionalText: {
    color: "#e5e8ec",
  },
});