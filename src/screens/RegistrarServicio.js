import React, { useState, useMemo } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';


const IconoAtras = require('../assets/images/flechaAtras.png');
const IconoCruz = require('../assets/images/cerrar.png');
const IconoSuma = require('../assets/images/mas.png');
const IconoUbicacion = require('../assets/images/ubicacion.png');
const IconoDescripcion = require('../assets/images/descripcion.png');
const IconoFotos = require('../assets/images/foto.png');

// --- Datos de Prueba y Constantes ---
const PADDING_HORIZONTAL = 32;

const ImagenLimpieza = require('../assets/images/limpiezaIcono.png');


const BotonDetalle = ({ titulo, onPress, fuenteIcono }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[estilos.botonDetalle]}
      activeOpacity={0.7}
    >
      <Image
        source={fuenteIcono}
        style={[estilos.iconoDetalle, { tintColor: 'white' }]}
        resizeMode="contain"
      />
      <Text style={estilos.textoDetalle}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const DetalleTextoBloque = ({ etiqueta, contenido, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Text style={estilos.detalleTextoEtiqueta}>{etiqueta}</Text>
            <View style={estilos.detalleTextoContenedor}>
                <Text style={estilos.detalleTextoContenido}>
                    {contenido}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

export default function RegistrarServicio() {
  const navegacion = useNavigation();
  const ruta = useRoute();

  // ESTADOS PARA DATOS REALES (para mostrar en el bloque de texto)
  const [direccionTexto, setDireccionTexto] = useState("");
  const [descripcionTexto, setDescripcionTexto] = useState("");
  const [fotosArray, setFotosArray] = useState([]); // Array de URIs

  // ESTADOS DE COMPLETITUD (booleanos)
  const [categoriasSeleccionadas] = useState([
    { id: 1, nombre: "Limpieza", imagen: ImagenLimpieza, seleccionado: true },
  ]);
  const [direccionAgregada, setDireccionAgregada] = useState(false);
  const [descripcionAgregada, setDescripcionAgregada] = useState(false);
  const [fotosAgregadas, setFotosAgregadas] = useState(false);


  // LÓGICA DE ACTUALIZACIÓN AL VOLVER
useFocusEffect(
  React.useCallback(() => {
    let shouldClearParams = false; // Bandera para saber si algo fue procesado
    const currentParams = ruta.params || {};
    // Función auxiliar para leer los parámetros, usando un valor de fallback
    const getParam = (name) => currentParams[name];

    // LECTURA DE DIRECCIÓN
    const isDireccionGuardada = getParam('direccionGuardada');
    if (isDireccionGuardada !== undefined) {
        setDireccionTexto(getParam('direccionTexto') || "");
        setDireccionAgregada(isDireccionGuardada === true);
        shouldClearParams = true;
    }

    // LECTURA DE DESCRIPCIÓN
    const isDescripcionGuardada = getParam('descripcionGuardada');
    if (isDescripcionGuardada !== undefined) {
        setDescripcionTexto(getParam('descripcionTexto') || "");
        setDescripcionAgregada(isDescripcionGuardada === true);
        shouldClearParams = true;
    }

    // LECTURA DE FOTOS
    const isFotosGuardadas = getParam('fotosGuardadas');
        setFotosArray(getParam('fotosCargadas') || []);
        setFotosAgregadas(isFotosGuardadas === true);
        shouldClearParams = true;
    }

    // Al limpiar TODOS los parámetros, garantizamos que el próximo navigate (con nuevos datos)
    // no se mezcle con los que acabas de procesar.
    if (shouldClearParams) {
        navegacion.setParams({
            direccionGuardada: undefined, direccionTexto: undefined,
            descripcionGuardada: undefined, descripcionTexto: undefined,
            fotosGuardadas: undefined, fotosCargadas: undefined,
        });
    }

  }, [ruta.params, navegacion])
);


  // LÓGICA DE HABILITACIÓN DEL BOTÓN
  const formularioEstaCompleto = useMemo(() => {
    return (
      categoriasSeleccionadas.length > 0 &&
      direccionAgregada &&
      descripcionAgregada &&
      fotosAgregadas
    );
  }, [categoriasSeleccionadas, direccionAgregada, descripcionAgregada, fotosAgregadas]);

const manejarAgregarDireccion = () => {
  navegacion.navigate('AgregarDireccion', {
    direccionActual: direccionTexto,
    descripcionActual: descripcionTexto,
    fotosActuales: fotosArray,
  });
};

const manejarAgregarDescripcion = () => {
  navegacion.navigate('AgregarDescripcion', {
    direccionActual: direccionTexto,
    descripcionActual: descripcionTexto,
    fotosActuales: fotosArray,
  });
};

const manejarAgregarFotos = () => {
  navegacion.navigate('AgregarFoto', {
    direccionActual: direccionTexto,
    descripcionActual: descripcionTexto,
    fotosActuales: fotosArray,
  });
};

  const manejarVolverAtras = () => { navegacion.goBack(); };
  const manejarEliminarFoto = (index) => {
      // Lógica para eliminar una foto del array
      setFotosArray(prev => {
          const newArray = prev.filter((_, i) => i !== index);
          if (newArray.length === 0) setFotosAgregadas(false);
          return newArray;
      });
  };

const manejarRegistrarServicio = () => {
  // Datos que se registran
  const datosRegistro = {
    categoria: categoriasSeleccionadas,
    direccion: direccionTexto,
    descripcion: descripcionTexto,
    fotos: fotosArray,
  };

  console.log('Servicio Registrado:', datosRegistro);

  // 1. Mostrar la alerta de éxito
  Alert.alert(
    "¡Servicio Registrado con Éxito!",
    "Tu solicitud de servicio ha sido enviada para su procesamiento.",
    [
      {
        text: "OK",
        onPress: () => {
          // 2. Reiniciar todos los estados del formulario
          setDireccionTexto("");
          setDescripcionTexto("");
          setFotosArray([]);
          setDireccionAgregada(false);
          setDescripcionAgregada(false);
          setFotosAgregadas(false);

          // 3. (Opcional) Navegar a la pantalla principal de la app o a una de confirmación.
          // Para volver a la pantalla inicial del Stack Navigator (si es Home):
          // navegacion.popToTop();

          // Si quieres quedarte en RegistrarServicio (pero limpio):
          // No se hace nada, el componente ya se re-renderizará con los estados limpios.

          // Si el botón de "Volver" del encabezado lleva a la pantalla principal (Home),
          // Se puede usar: navegacion.navigate('Home');
        }
      }
    ]
  );
}

  // --- RENDERIZADO ---
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar barStyle="dark-content" />

      {/* 1. ENCABEZADO */}
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={manejarVolverAtras} style={estilos.botonAtras}>
          <Image source={IconoAtras} style={[estilos.iconoPequeno, { tintColor: '#2c3e50' }]} />
        </TouchableOpacity>
        <Text style={estilos.tituloEncabezado}>Registrar Servicio</Text>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView contentContainerStyle={estilos.contenedorScroll}>

        {/* SECCIÓN CATEGORÍA (Muestra el título) */}
        <Text style={estilos.tituloSeccion}>Categoría</Text>
        <View style={estilos.contenedorCategoria}>
          {/* ... (Tarjeta de Categoría Seleccionada y Botón de Agregar) ... */}
           {categoriasSeleccionadas.map((categoria) => (
            <View key={categoria.id} style={estilos.tarjetaCategoriaSeleccionada}>
              <Image source={categoria.imagen} style={estilos.imagenCategoria} resizeMode="contain" />
              <Text style={estilos.etiquetaCategoria}>{categoria.nombre}</Text>
              <TouchableOpacity
                style={estilos.botonRemover} activeOpacity={0.7}>
                <Image source={IconoCruz} style={[estilos.iconoMinimo, { tintColor: '#2c3e50', opacity: 0.8 }]} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          ))}
        </View>


        {/* SECCIÓN DETALLES DEL SERVICIO (Lógica Condicional) */}
        <View style={estilos.seccionDetalles}>

          {/* DIRECCIÓN */}
          {direccionAgregada ? (
            <DetalleTextoBloque
                etiqueta="Dirección"
                contenido={direccionTexto}
                onPress={manejarAgregarDireccion} // Permite editar
            />
          ) : (
            <BotonDetalle
              titulo="Agregar Dirección"
              onPress={manejarAgregarDireccion}
              fuenteIcono={IconoUbicacion}
            />
          )}

          {/* DESCRIPCIÓN */}
          {descripcionAgregada ? (
            <DetalleTextoBloque
                etiqueta="Detalles"
                contenido={descripcionTexto}
                onPress={manejarAgregarDescripcion} // Permite editar
            />
          ) : (
            <BotonDetalle
              titulo="Agregar Descripción"
              onPress={manejarAgregarDescripcion}
              fuenteIcono={IconoDescripcion}
            />
          )}

          {/* FOTOS */}
          {fotosAgregadas ? (
            <View style={estilos.contenedorFotos}>
                <Text style={estilos.detalleTextoEtiqueta}>Fotos</Text>
                <View style={estilos.fotosWrapper}>
                    {/* Renderiza las fotos cargadas */}
                    {fotosArray.map((foto, index) => (
                        <View key={index} style={estilos.tarjetaFoto}>
                            <Image
                                // source usa el URI de la foto cargada
                                source={{ uri: foto.uri }}
                                style={estilos.imagenFoto}
                                resizeMode="cover"
                            />
                            {/* Botón de Remover Foto */}
                            <TouchableOpacity
                                onPress={() => manejarEliminarFoto(index)}
                                style={estilos.botonRemoverFoto}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={IconoCruz}
                                    style={[estilos.iconoMinimo, { tintColor: 'white' }]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {/* Placeholders para agregar más fotos (hasta 5 en total) */}
                    {[...Array(5 - fotosArray.length)].map((_, index) => (
                        <TouchableOpacity key={index} style={estilos.tarjetaAgregarFoto} onPress={manejarAgregarFotos} />
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

        {/* BOTÓN REGISTRAR SERVICIO */}
        <TouchableOpacity
          onPress={manejarRegistrarServicio}
          disabled={!formularioEstaCompleto}
          style={[
            estilos.botonRegistro,
            {
              backgroundColor: formularioEstaCompleto ? '#154360' : 'rgba(40, 40, 40, 0.3)',
            }
          ]}
          activeOpacity={0.7}
        >
          <Text style={estilos.textoBotonRegistro}>
            Registrar Servicio
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

// --- Estilos de React Native ---
const estilos = StyleSheet.create({
    areaSegura: { flex: 1, backgroundColor: '#e5e8ec' },
    iconoPequeno: { width: 24, height: 24 },
    iconoMinimo: { width: 10, height: 10 },
    encabezado: {
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 40,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 2,
      zIndex: 10,
    },
    botonAtras: { paddingRight: 15 },
    tituloEncabezado: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
    contenedorScroll: { paddingHorizontal: PADDING_HORIZONTAL, paddingVertical: 20 },
    tituloSeccion: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginBottom: 10 },
    contenedorCategoria: { flexDirection: 'row', gap: 9, marginBottom: 40 },
    tarjetaCategoriaSeleccionada: {
        width: 93,
        height: 94,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    imagenCategoria: { width: 43, height: 41, marginBottom: 5 },
    etiquetaCategoria: { fontSize: 10.9, fontWeight: '500', color: '#2c3e50' },
    botonRemover: {
        position: 'absolute',
        top: -5,
        right: -5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    tarjetaAgregarCategoria: { width: 93, height: 94, backgroundColor: 'white', borderRadius: 8, alignItems: 'center', justifyContent: 'center', opacity: 0.8 },
    seccionDetalles: { gap: 7, marginBottom: 40 },
    botonDetalle: {
        height: 59,
        backgroundColor: '#154360',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 13,
    },
    iconoDetalle: { width: 26, height: 26, marginRight: 10 },
    textoDetalle: { fontSize: 14, color: 'white', fontWeight: '400' },

    // --- ESTILOS PARA LA TRANSFORMACIÓN A TEXTO  ---
    detalleTextoEtiqueta: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8
    },
    detalleTextoContenedor: {
        backgroundColor: '#154360',
        borderRadius: 5,
        paddingHorizontal: 13,
        paddingVertical: 18,
        marginBottom: 10, // Espacio entre bloques
    },
    detalleTextoContenido: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        lineHeight: 20,
    },

    // --- ESTILOS PARA FOTOS  ---
    contenedorFotos: {
        marginBottom: 30, // Menos espacio para el bloque final
        marginTop: 10,
    },
    fotosWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
    tarjetaFoto: {
        width: 65,
        height: 65,
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    imagenFoto: {
        width: '100%',
        height: '100%',
    },
    botonRemoverFoto: {
        position: 'absolute',
        top: -3,
        right: -3,
        width: 15,
        height: 15,
        backgroundColor: '#2c3e50',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    tarjetaAgregarFoto: {
        width: 65,
        height: 65,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },

    // BOTÓN REGISTRAR SERVICIO
    botonRegistro: {
        height: 57,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    textoBotonRegistro: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
});