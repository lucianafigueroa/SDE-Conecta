import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";

const flechaAtras = require("../assets/images/flechaAtras.png");
const IconoGaleria = require("../assets/images/foto.png");
const IconoCamara = require("../assets/images/camara.png");
const IconoPlaceholder = require("../assets/images/placeholder.png");
const IconoCerrar = require("../assets/images/cerrar.png");

const CLOUDINARY_CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const MAX_FOTOS = 4;

const subirFotoACloudinary = async (localUri) => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Credenciales Cloudinary faltantes.");
  }

  const formData = new FormData();
  formData.append("file", {
    uri: localUri,
    type: "image/jpeg",
    name: "foto.jpg",
  });
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    console.error("Cloudinary error:", data);
    throw new Error(data.error?.message || "Error subiendo imagen.");
  }
};

export default function AgregarFoto({ route }) {
  useScreenFocusLogger();

  const navegacion = useNavigation();
  const [fotos, setFotos] = useState(route.params?.fotosActuales || []);
  const [isUploading, setIsUploading] = useState(false);

  const puedeGuardar = fotos.length > 0 && !isUploading;
  const maximoAlcanzado = fotos.length >= MAX_FOTOS;

  const manejarGuardado = async () => {
    if (!puedeGuardar) return;

    setIsUploading(true);
    const uploadedUrls = [];

    try {
      for (const foto of fotos) {
        if (foto.uri) {
          const publicUrl = await subirFotoACloudinary(foto.uri);
          uploadedUrls.push(publicUrl);
        }
      }
      navegacion.navigate("RegistrarServicio", {
        ...route.params,
        fotosGuardadas: true,
        fotosActuales: uploadedUrls,
      });
    } catch (error) {
      console.error("Error subiendo fotos:", error.message);
      Alert.alert(
        "Error de subida",
        "Ocurrió un error al subir las fotos. Verifica la consola o las credenciales de Cloudinary."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const manejarVolverAtras = () => {
    if (isUploading) return;

    const fotosEstanCargadas = fotos.length > 0;

    navegacion.navigate("RegistrarServicio", {
      ...route.params,
      fotosGuardadas: fotosEstanCargadas,
      fotosCargadas: fotos,
    });
  };

  const manejarElegirGaleria = async () => {
    if (isUploading || maximoAlcanzado) return;

    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos necesarios",
        "Se necesitan permisos para acceder a la galería."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const assetsToAdd = result.assets
        .slice(0, MAX_FOTOS - fotos.length)
        .map((asset) => ({ uri: asset.uri }));

      setFotos((prevFotos) => [...prevFotos, ...assetsToAdd]);
    }
  };

  const manejarTomarFoto = async () => {
    if (isUploading || maximoAlcanzado) return;

    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos necesarios",
        "Se necesitan permisos para acceder a la cámara."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFotos((prevFotos) => [...prevFotos, { uri: result.assets[0].uri }]);
    }
  };

  const eliminarFoto = (index) => {
    if (isUploading) return;
    Alert.alert(
      "Eliminar foto",
      "¿Estás seguro de que quieres eliminar esta imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            setFotos((prevFotos) => prevFotos.filter((_, i) => i !== index));
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar barStyle="dark-content" />
      <View style={estilos.encabezado}>
        <TouchableOpacity
          onPress={manejarVolverAtras}
          style={estilos.botonAtras}
          disabled={isUploading}
        >
          <Image
            source={flechaAtras}
            style={[estilos.iconoAtras, isUploading && { opacity: 0.5 }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={estilos.tituloEncabezado}>
          {isUploading ? "Subiendo..." : "Agregar fotos"}
        </Text>

        <TouchableOpacity
          onPress={manejarGuardado}
          disabled={!puedeGuardar}
          style={[
            estilos.botonGuardar,
            {
              backgroundColor: puedeGuardar
                ? "#282828"
                : "rgba(40, 40, 40, 0.3)",
            },
          ]}
        >
          {isUploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={estilos.textoGuardar}> Guardar </Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.contenedorPrincipal}>
          <View style={estilos.contenedorPrincipalYMiniaturas}>
            <View style={estilos.contenedorFotoPrincipal}>
              {fotos.length > 0 ? (
                <Image
                  source={{ uri: fotos[0].uri }}
                  style={estilos.imagenCargada}
                />
              ) : (
                <Image
                  source={IconoPlaceholder}
                  style={estilos.placeholderIcono}
                  resizeMode="contain"
                />
              )}
            </View>

            <View style={estilos.contenedorMiniaturas}>
              {Array.from({ length: MAX_FOTOS }).map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={estilos.miniaturaWrapper}
                  onPress={() => fotos[index] && eliminarFoto(index)}
                  disabled={!fotos[index] || isUploading}
                >
                  {fotos[index] ? (
                    <View>
                      <Image
                        source={{ uri: fotos[index].uri }}
                        style={estilos.imagenCargada}
                      />
                      <View style={estilos.botonEliminar}>
                        <Image
                          source={IconoCerrar}
                          style={estilos.iconoEliminar}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={estilos.miniaturaVacia}>
                      <Text style={estilos.miniaturaTexto}>
                        Foto {index + 1}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={estilos.textoLimite}>
            {`Máximo de ${MAX_FOTOS} fotos. (${fotos.length} cargadas)`}
          </Text>

          <View style={estilos.contenedorBotones}>
            <TouchableOpacity
              onPress={manejarElegirGaleria}
              style={[
                estilos.botonAccion,
                maximoAlcanzado && estilos.botonDeshabilitado,
              ]}
              disabled={maximoAlcanzado || isUploading}
            >
              <Image source={IconoGaleria} style={estilos.iconoBotonAccion} />
              <Text style={estilos.textoBotonAccion}>
                Elegir desde la galería
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={manejarTomarFoto}
              style={[
                estilos.botonAccion,
                maximoAlcanzado && estilos.botonDeshabilitado,
              ]}
              disabled={maximoAlcanzado || isUploading}
            >
              <Image source={IconoCamara} style={estilos.iconoBotonAccion} />
              <Text style={estilos.textoBotonAccion}>Tomar una foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: "#e5e8ec" },
  scrollContent: { paddingBottom: 50 },
  contenedorPrincipal: {
    paddingHorizontal: 25,
    paddingTop: 30,
    alignItems: "center",
  },
  encabezado: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 50,
    paddingBottom: 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 10,
  },
  botonAtras: { paddingRight: 15, paddingVertical: 5 },
  iconoAtras: { width: 24, height: 24, tintColor: "#2c3e50" },
  tituloEncabezado: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    flex: 1,
  },
  botonGuardar: {
    width: 99,
    height: 37,
    borderRadius: 3.53,
    alignItems: "center",
    justifyContent: "center",
  },
  textoGuardar: {
    fontSize: 13.9,
    fontWeight: "500",
    color: "white",
  },

  contenedorPrincipalYMiniaturas: {
    flexDirection: "row",
    marginBottom: 40,
    gap: 10,
    alignItems: "flex-start",
  },
  contenedorFotoPrincipal: {
    width: 180,
    height: 240,
    backgroundColor: "#D1D7DC",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imagenCargada: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderIcono: {
    width: 80,
    height: 80,
    tintColor: "#FFFFFF",
  },
  contenedorMiniaturas: {
    flexWrap: "wrap",
    width: 100,
    gap: 10,
  },
  miniaturaWrapper: {
    width: 45,
    height: 55,
    backgroundColor: "#D1D7DC",
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  miniaturaVacia: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E5E9",
  },
  miniaturaTexto: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
    padding: 2,
  },
  botonEliminar: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    padding: 3,
  },
  iconoEliminar: {
    width: 10,
    height: 10,
    tintColor: "white",
  },
  textoLimite: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 40,
  },
  contenedorBotones: {
    width: "100%",
    maxWidth: 300,
    gap: 15,
  },
  botonAccion: {
    height: 50,
    backgroundColor: "#154360",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconoBotonAccion: {
    width: 24,
    height: 24,
    tintColor: "white",
    marginRight: 15,
  },
  textoBotonAccion: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
  botonDeshabilitado: {
    backgroundColor: "#95a5a6",
  },
});
