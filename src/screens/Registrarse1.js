import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../components/Button";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebaseConfig.js";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import clienteLogo from "../assets/images/cliente.png";
import profesionalLogo from "../assets/images/profesional.png";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger'; // <-- 1. Importación añadida

export default function Registrarse1({ route, navigation }) {
  useScreenFocusLogger(); // <-- 2. Hook en uso

  const { tipoUsuario, uid } = route.params || {};
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [localImageUri, setLocalImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log("UID del Usuario: " + uid);
      return () => {};
    }, [uid])
  );

  const uploadImage = async (uri, uid) => {
    if (!uri) return null;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const fileRef = ref(storage, `perfiles/${uid}/${Date.now()}.jpg`);
    await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
  };

  const subirFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos", "Se necesitan permisos para acceder a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalImageUri(uri);
    }
  };

  const handleSaveAndVerify = async () => {
    if (!uid) {
      Alert.alert("Error", "No se encontró el usuario (UID). Intenta ir a Iniciar Sesión.");
      return;
    }

    if (!nombre || !telefono) {
      Alert.alert("Campos Requeridos", "Por favor, ingresa tu Nombre y Apellido, y Número de teléfono.");
      return;
    }

    setIsLoading(true);
    let photoUrl = "";

    try {
      if (localImageUri) {
        photoUrl = await uploadImage(localImageUri, uid);
        console.log("Foto de perfil subida a Storage.");
      }

      const userRef = doc(db, "usuarios", uid);
      await updateDoc(userRef, {
        nombre: nombre,
        telefono: telefono,
        ...(photoUrl && { fotoPerfil: photoUrl }),
      });
      console.log("Datos de perfil guardados en Firestore.");

      navigation.navigate("VerificarNumero", { tipoUsuario: tipoUsuario, uid: uid, telefono: telefono });
    } catch (error) {
      console.error("Error al guardar perfil o subir foto:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error al guardar tu perfil. Asegúrate de que las reglas de Firebase Storage permitan escribir si intentaste subir una foto."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={
            localImageUri
              ? { uri: localImageUri }
              : tipoUsuario === "profesional"
              ? profesionalLogo
              : clienteLogo
          }
          style={styles.logo}
          resizeMode={localImageUri ? "cover" : "contain"}
        />

        <Text style={styles.title}>Completá tu perfil</Text>
        <Text style={styles.subtitle}>Es rápido, solo te tomará unos segundos.</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre y Apellido"
          placeholderTextColor="#7F8C8D"
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          placeholderTextColor="#7F8C8D"
          onChangeText={setTelefono}
          value={telefono}
        />

        <TouchableOpacity style={styles.uploadContainer} onPress={subirFoto} disabled={isLoading}>
          <Text style={styles.uploadText}>Subir Foto de Perfil</Text>
          <Icon name="upload-file" size={24} color="#7F8C8D" />
        </TouchableOpacity>

        <Button
          title={
            isLoading
              ? "Guardando..."
              : tipoUsuario === "cliente"
              ? "Buscar Profesionales"
              : "Ser Profesional"
          }
          buttonStyle={[buttonStyles.main, styles.button]}
          textStyle={textStyles.mainText}
          onPress={handleSaveAndVerify}
          disabled={isLoading}
        />
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    width: "85%",
    height: 55,
    backgroundColor: "#f7f8f9",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "#2c3e50",
  },
  uploadContainer: {
    width: "85%",
    height: 55,
    backgroundColor: "#f7f8f9",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  uploadText: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  button: {
    width: "85%",
    backgroundColor: "#154360",
    borderRadius: 32,
  },
});