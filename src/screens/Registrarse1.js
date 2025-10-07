import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";

import clienteLogo from "../assets/images/cliente.png";
import profesionalLogo from "../assets/images/profesional.png";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function Registrarse1({ route, navigation }) {
  const { tipoUsuario } = route.params;

  const [imagenPerfil, setImagenPerfil] = useState(
    tipoUsuario === "profesional" ? profesionalLogo : clienteLogo
  );

  const subirFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.cancelled) {
      setImagenPerfil({ uri: result.uri });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Image source={imagenPerfil} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Completá tu perfil</Text>
        <Text style={styles.subtitle}>Es rápido, solo te tomará unos segundos.</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre y Apellido"
          placeholderTextColor="#7F8C8D"
        />
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
          placeholderTextColor="#7F8C8D"
        />

        <TouchableOpacity style={styles.uploadContainer} onPress={subirFoto}>
          <Text style={styles.uploadText}>Subir Foto de Perfil</Text>
          <Icon name="upload-file" size={24} color="#7F8C8D" />
        </TouchableOpacity>

        <Button
          title={tipoUsuario === "cliente" ? "Buscar Profesionales" : "Ser Profesional"}
          buttonStyle={[buttonStyles.main, styles.button]}
          textStyle={textStyles.mainText}
          onPress={() => navigation.navigate("VerificarNumero", { tipoUsuario })}
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
