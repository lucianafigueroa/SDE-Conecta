import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";

import { db, auth } from "../config/firebaseConfig"; // 💡 Importación de 'auth'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const IconoAtras = require("../assets/images/flechaAtras.png");
const IconoCruz = require("../assets/images/cerrar.png");
const IconoUbicacion = require("../assets/images/ubicacion.png");
const IconoDescripcion = require("../assets/images/descripcion.png");
const IconoFotos = require("../assets/images/foto.png");

const PADDING_HORIZONTAL = 32;

const categoryImageMap = {
  Limpieza: require("../assets/images/limpiezaIcono.png"),
  Albañil: require("../assets/images/albañilIcono.png"),
  Electricista: require("../assets/images/electricistaIcono.png"),
  Gasista: require("../assets/images/gasistaIcono.png"),
  Cerrajero: require("../assets/images/cerrajeroIcono.png"),
  Plomero: require("../assets/images/plomeroIcono.png"),
  Pintor: require("../assets/images/pintorIcono.png"),
  Piletero: require("../assets/images/pileteroIcono.png"),
  Durlock: require("../assets/images/durlockIcono.png"),
  Carpintero: require("../assets/images/carpinteroIcono.png"),
  Herrero: require("../assets/images/herreroIcono.png"),
  AireAcondicionado: require("../assets/images/aireIcono.png"),
};

const BotonDetalle = ({ titulo, onPress, fuenteIcono }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[estilos.botonDetalle]}
    activeOpacity={0.7}
  >
    <Image
      source={fuenteIcono}
      style={[estilos.iconoDetalle, { tintColor: "white" }]}
      resizeMode="contain"
    />
    <Text style={estilos.textoDetalle}>{titulo}</Text>
  </TouchableOpacity>
);

const DetalleTextoBloque = ({ etiqueta, contenido, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <Text style={estilos.detalleTextoEtiqueta}>{etiqueta}</Text>
    <View style={estilos.detalleTextoContenedor}>
      <Text style={estilos.detalleTextoContenido}>{contenido}</Text>
    </View>
  </TouchableOpacity>
);

export default function RegistrarServicio({ navigation, route }) {
  useScreenFocusLogger();
  const [isSaving, setIsSaving] = useState(false);

  const [direccionTexto, setDireccionTexto] = useState("");
  const [descripcionTexto, setDescripcionTexto] = useState("");
  const [fotosArray, setFotosArray] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  const [direccionAgregada, setDireccionAgregada] = useState(false);
  const [descripcionAgregada, setDescripcionAgregada] = useState(false);
  const [fotosAgregadas, setFotosAgregadas] = useState(false);

  const manejarEliminarCategoria = (id) => {
    setCategoriasSeleccionadas((prev) => prev.filter((c) => c.id !== id));
  };

  useFocusEffect(
    React.useCallback(() => {
      const currentParams = route.params || {};
      const getParam = (name) => currentParams[name];
      const nuevaCategoria = getParam("categoriaSeleccionada");
      const previasDeNavegacion = getParam("categoriasActuales") || [];

      if (nuevaCategoria) {
        const categoriaExiste = categoriasSeleccionadas.some(
          (c) => c.id === nuevaCategoria.id
        );

        if (!categoriaExiste) {
          const catToAdd = {
            id: nuevaCategoria.id,
            nombre: nuevaCategoria.label,
            imagen: categoryImageMap[nuevaCategoria.label],
          };
          setCategoriasSeleccionadas(() => {
            if (!previasDeNavegacion.some((c) => c.id === catToAdd.id)) {
              return [...previasDeNavegacion, catToAdd];
            }
            return previasDeNavegacion;
          });
        }
        navigation.setParams({
          categoriaSeleccionada: undefined,
        });
      } else {
        if (previasDeNavegacion.length > 0) {
          setCategoriasSeleccionadas(previasDeNavegacion);
        }
      }

      if (getParam("direccionGuardada") !== undefined) {
        setDireccionTexto(getParam("direccionActual") || "");
        setDireccionAgregada(getParam("direccionGuardada") === true);

        navigation.setParams({
          direccionGuardada: undefined,
        });
      }

      if (getParam("descripcionGuardada") !== undefined) {
        setDescripcionTexto(getParam("descripcionActual") || "");
        setDescripcionAgregada(getParam("descripcionGuardada") === true);

        navigation.setParams({
          descripcionGuardada: undefined,
        });
      }

      if (getParam("fotosGuardadas") !== undefined) {
        setFotosArray(getParam("fotosActuales") || []);
        setFotosAgregadas(getParam("fotosGuardadas") === true);

        navigation.setParams({
          fotosGuardadas: undefined,
        });
      }
    }, [route.params, navigation, categoriasSeleccionadas])
  );

  const formularioEstaCompleto = useMemo(() => {
    return (
      categoriasSeleccionadas.length > 0 &&
      direccionAgregada &&
      descripcionAgregada &&
      fotosAgregadas &&
      fotosArray.length > 0
    );
  }, [
    categoriasSeleccionadas,
    direccionAgregada,
    descripcionAgregada,
    fotosAgregadas,
    fotosArray,
  ]);

  const navegarConDatosActuales = (nombreVista) => {
    navigation.navigate(nombreVista, {
      categoriasActuales: categoriasSeleccionadas,
      direccionGuardada: direccionAgregada,
      descripcionGuardada: descripcionAgregada,
      fotosGuardadas: fotosAgregadas,
      direccionActual: direccionTexto,
      descripcionActual: descripcionTexto,
      fotosActuales: fotosArray,
    });
  };

  const manejarAgregarDireccion = () =>
    navegarConDatosActuales("AgregarDireccion");
  const manejarAgregarDescripcion = () =>
    navegarConDatosActuales("AgregarDescripcion");
  const manejarAgregarFotos = () => navegarConDatosActuales("AgregarFoto");
  const manejarAgregarCategoria = () => navegarConDatosActuales("Categorias");

  const manejarVolverAtras = () => {
    navigation.navigate("InicioProfesional");
  };

  const manejarEliminarFoto = (index) => {
    setFotosArray((prev) => {
      const newArray = prev.filter((_, i) => i !== index);
      if (newArray.length === 0) setFotosAgregadas(false);
      return newArray;
    });
  };

  // ⭐️ FUNCIÓN ACTUALIZADA PARA PRESTADORES
  const manejarRegistrarServicio = async () => {
    if (!formularioEstaCompleto || isSaving) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert(
        "Error de Autenticación",
        "Debes iniciar sesión para publicar un servicio."
      );
      return;
    }

    setIsSaving(true);

    // El objeto de registro debe incluir 'usuarioId' para cumplir la regla de Firestore.
    const datosRegistro = {
      usuarioId: currentUser.uid, // 🔑 ID del prestador
      categorias: categoriasSeleccionadas.map((c) => c.nombre),
      direccion: direccionTexto,
      descripcion: descripcionTexto,
      fotosUrls: fotosArray,
      fechaCreacion: serverTimestamp(),
      estado: "Activo", // Estado inicial de un servicio publicado por un prestador
      // Puedes añadir más campos relevantes como 'titulo' o 'tarifa' si existen.
    };

    try {
      const serviciosRef = collection(db, "servicios");
      await addDoc(serviciosRef, datosRegistro);
      Alert.alert(
        "¡Servicio Publicado con Éxito!",
        "Tu anuncio ya está visible para los clientes.",
        [
          {
            text: "OK",
            onPress: () => {
              // Resetear estados del formulario
              setDireccionTexto("");
              setDescripcionTexto("");
              setFotosArray([]);
              setDireccionAgregada(false);
              setDescripcionAgregada(false);
              setFotosAgregadas(false);
              setCategoriasSeleccionadas([]);
              navigation.navigate("InicioProfesional");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error al registrar el servicio en Firebase:", error);
      Alert.alert(
        "Error al Publicar",
        "Ocurrió un error al guardar el servicio. Por favor, asegúrate que las reglas de Firestore sean correctas."
      );
    } finally {
      setIsSaving(false); // Finalizar la carga
    }
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
            source={IconoAtras}
            style={[estilos.iconoPequeno, { tintColor: "#2c3e50" }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={estilos.tituloEncabezado}>Registrar Servicio</Text>
      </View>

      <ScrollView contentContainerStyle={estilos.contenedorScroll}>
        <Text style={estilos.tituloSeccion}>Categoría</Text>
        <View style={estilos.contenedorCategoria}>
          {categoriasSeleccionadas.map((categoria) => (
            <View
              key={categoria.id}
              style={estilos.tarjetaCategoriaSeleccionada}
            >
              <Image
                source={categoria.imagen}
                style={estilos.imagenCategoria}
                resizeMode="contain"
              />

              <Text style={estilos.etiquetaCategoria}>{categoria.nombre}</Text>

              <TouchableOpacity
                style={estilos.botonRemover}
                activeOpacity={0.7}
                onPress={() => manejarEliminarCategoria(categoria.id)}
              >
                <Image
                  source={IconoCruz}
                  style={[
                    estilos.iconoMinimo,
                    { tintColor: "#2c3e50", opacity: 0.8 },
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Este es para agregar una categoria */}
          <TouchableOpacity
            key={"add-category"}
            style={estilos.tarjetaCategoriaSeleccionada}
            onPress={() =>
              categoriasSeleccionadas.length < 5 && manejarAgregarCategoria()
            }
          >
            <Text style={estilos.agregarCategoria}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.seccionDetalles}>
          {/* Dirección */}
          {direccionAgregada ? (
            <DetalleTextoBloque
              etiqueta="Dirección"
              contenido={direccionTexto}
              onPress={manejarAgregarDireccion}
            />
          ) : (
            <BotonDetalle
              titulo="Agregar Dirección"
              onPress={manejarAgregarDireccion}
              fuenteIcono={IconoUbicacion}
            />
          )}

          {/* Descripción */}
          {descripcionAgregada ? (
            <DetalleTextoBloque
              etiqueta="Detalles"
              contenido={descripcionTexto}
              onPress={manejarAgregarDescripcion}
            />
          ) : (
            <BotonDetalle
              titulo="Agregar Descripción"
              onPress={manejarAgregarDescripcion}
              fuenteIcono={IconoDescripcion}
            />
          )}

          {/* Fotos */}
          {fotosAgregadas ? (
            <View style={estilos.contenedorFotos}>
              <Text style={estilos.detalleTextoEtiqueta}>Fotos</Text>
              <View style={estilos.fotosWrapper}>
                {fotosArray.map((foto, index) => (
                  <View key={foto || index} style={estilos.tarjetaFoto}>
                    <Image
                      source={{ uri: foto }}
                      style={estilos.imagenFoto}
                      resizeMode="cover"
                    />

                    <TouchableOpacity
                      onPress={() => manejarEliminarFoto(index)}
                      style={estilos.botonRemoverFoto}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={IconoCruz}
                        style={[estilos.iconoMinimo, { tintColor: "white" }]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Agrega el botón de Añadir foto solo si hay espacio */}
                {[...Array(5 - fotosArray.length)].map((_, index) => (
                  <TouchableOpacity
                    key={`placeholder-${index}`}
                    style={estilos.tarjetaAgregarFoto}
                    onPress={manejarAgregarFotos}
                  />
                ))}
              </View>
            </View>
          ) : (
            <BotonDetalle
              titulo="Agregar Fotos"
              onPress={manejarAgregarFotos}
              fuenteIcono={IconoFotos}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={manejarRegistrarServicio}
          disabled={!formularioEstaCompleto || isSaving}
          style={[
            estilos.botonRegistro,
            {
              backgroundColor:
                formularioEstaCompleto && !isSaving
                  ? "#154360"
                  : "rgba(40, 40, 40, 0.3)",
            },
          ]}
          activeOpacity={0.7}
        >
          <Text style={estilos.textoBotonRegistro}>
            {isSaving ? "Publicando..." : "Registrar Servicio"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: "#e5e8ec" },
  agregarCategoria: {
    fontSize: 40,
    color: "#2c3e50",
  },
  iconoPequeno: { width: 24, height: 24 },
  iconoMinimo: { width: 10, height: 10 },
  encabezado: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
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
  botonAtras: { paddingRight: 15 },
  tituloEncabezado: { fontSize: 28, fontWeight: "bold", color: "#2c3e50" },
  contenedorScroll: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
  tituloSeccion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 10,
  },
  contenedorCategoria: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 40,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tarjetaCategoriaSeleccionada: {
    width: 93,
    height: 94,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  imagenCategoria: { width: 43, height: 41, marginBottom: 5 },
  etiquetaCategoria: { fontSize: 10.9, fontWeight: "500", color: "#2c3e50" },
  botonRemover: {
    position: "absolute",
    top: -5,
    right: -5,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 100,
  },
  seccionDetalles: { gap: 7, marginBottom: 40 },
  botonDetalle: {
    height: 59,
    backgroundColor: "#154360",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 13,
  },
  iconoDetalle: { width: 26, height: 26, marginRight: 10 },
  textoDetalle: { fontSize: 14, color: "white", fontWeight: "400" },
  detalleTextoEtiqueta: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  detalleTextoContenedor: {
    backgroundColor: "#154360",
    borderRadius: 5,
    paddingHorizontal: 13,
    paddingVertical: 18,
    marginBottom: 10,
  },
  detalleTextoContenido: {
    fontSize: 14,
    color: "white",
    fontWeight: "400",
    lineHeight: 20,
  },
  contenedorFotos: {
    marginBottom: 30,
    marginTop: 10,
  },
  fotosWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  tarjetaFoto: {
    width: 65,
    height: 65,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  imagenFoto: {
    width: "100%",
    height: "100%",
  },
  botonRemoverFoto: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 15,
    height: 15,
    backgroundColor: "#2c3e50",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  tarjetaAgregarFoto: {
    width: 65,
    height: 65,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },
  botonRegistro: {
    height: 57,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  textoBotonRegistro: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});
