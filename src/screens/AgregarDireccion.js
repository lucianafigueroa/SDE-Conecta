import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";

const flechaAtras = require("../assets/images/flechaAtras.png");
const iconoUbicacion = require("../assets/images/ubicacion.png");
const iconoMapa = require("../assets/images/mapa.png");

export default function AgregarDireccion({route}) {
  useScreenFocusLogger();

  const navegacion = useNavigation();

  const [direccion, setDireccion] = useState(
    route.params?.direccionActual || ""
  );

  const puedeGuardar = direccion.trim().length > 0;
  const manejarGuardado = () => {
    if (puedeGuardar) {
      navegacion.navigate("RegistrarServicio", {
        ...route.params,
        direccionGuardada: true,
        direccionActual: direccion,
      });
    }
  };

  const manejarVolverAtras = () => {
    navegacion.navigate("RegistrarServicio", {
      ...route.params,
      direccionGuardada: false,
    });
  };

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar barStyle="dark-content" />

      <View style={estilos.encabezado}>
        <TouchableOpacity
          onPress={manejarVolverAtras}
          style={estilos.botonAtras}
        >
          <Image
            source={flechaAtras}
            style={estilos.iconoAtras}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={estilos.tituloEncabezado}>Seleccionar ubicación</Text>

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
          <Text style={estilos.textoGuardar}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.contenedorPrincipal}>
        <View style={estilos.opcion}>
          <Image
            source={iconoUbicacion}
            style={estilos.iconoOpcion}
            resizeMode="contain"
          />
          <TextInput
            style={estilos.inputDireccion}
            onChangeText={setDireccion}
            value={direccion}
            placeholder="Ingresar dirección completa"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
          />
        </View>

        <View style={estilos.separador} />

        <Text style={estilos.descripcionAyuda}>
          Por favor, ingresa la dirección completa incluyendo calle, altura,
          barrio y localidad para evitar errores. Ejemplo: "Av. Belgrano Norte
          1500, Huaico Hondo, Santiago del Estero."
        </Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: "#e5e8ec" },
  contenedorPrincipal: { paddingHorizontal: 25, paddingTop: 30 },

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

  opcion: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconoOpcion: {
    width: 19,
    height: 19,
    marginRight: 10,
    tintColor: "black",
    opacity: 0.5,
  },
  iconoOpcionMapa: {
    width: 19,
    height: 19,
    marginRight: 10,
    tintColor: "#d26e00",
  },
  inputDireccion: {
    flex: 1,
    fontSize: 18,
    color: "black",
    paddingVertical: 5,
  },
  separador: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
    marginLeft: 30,
  },
  textoMapa: {
    fontSize: 18,
    color: "#d26e00",
    fontWeight: "400",
  },

  descripcionAyuda: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15,
  },
});
