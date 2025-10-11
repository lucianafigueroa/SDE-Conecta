import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const flechaAtras = require('../assets/images/flechaAtras.png');
const IconoGaleria = require('../assets/images/foto.png');
const IconoCamara = require('../assets/images/camara.png');
const IconoPlaceholder = require('../assets/images/placeholder.png');


export default function AgregarFoto() {
  const navegacion = useNavigation();
  const ruta = useRoute();
  // Usar un estado para almacenar la URI o un array de URIs de las fotos
  const fotosActuales = ruta.params?.fotosActuales || [];
  const [fotos, setFotos] = useState(ruta.params?.fotosActuales || []);

 // Recupera los datos persistentes de otras secciones
  const direccionPersistente = ruta.params?.direccionActual || '';
  const descripcionPersistente = ruta.params?.descripcionActual || '';

   // Define los estados de guardado para devolverlos a RegistrarServicio
  const direccionGuardadaEstado = direccionPersistente.length > 0;
  const descripcionGuardadaEstado = descripcionPersistente.length > 0;

  // Lógica para determinar si el botón Guardar debe estar habilitado
  const puedeGuardar = fotos.length > 0;

  const manejarGuardado = () => {
    navegacion.navigate('RegistrarServicio', {
        // Datos NUEVOS
        fotosGuardadas: true,
        fotosCargadas: fotos,

        // DATOS PERSISTENTES (Dirección y Descripción)
        direccionGuardada: direccionGuardadaEstado,
        direccionTexto: direccionPersistente,
        descripcionGuardada: descripcionGuardadaEstado,
        descripcionTexto: descripcionPersistente,
    });
  };

  const manejarVolverAtras = () => {
    // Usar navigate para regresar y asegurar que los datos persistentes
    // se mantengan sin activar un "guardado" en RegistrarServicio.
    navegacion.navigate('RegistrarServicio', {
        // Devolvemos los datos SIN las banderas `Guardada` si el usuario solo usó "Atrás".
        direccionTexto: direccionPersistente,
        descripcionTexto: descripcionPersistente,
        fotosCargadas: fotos,
    });
  };

  const manejarElegirGaleria = async () => {
      // 1. Solicitar permisos de la galería (necesario en iOS/Android)
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesitan permisos para acceder a la galería.');
        return;
      }

      // 2. Abrir la interfaz de la galería (permite múltiples selecciones si es necesario, aunque aquí solo se agrega uno a la vez)
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        // Mantener la opción allowsEditing: true (si es deseado)
        quality: 1,
      });

      // 3. Procesar el resultado
      if (!result.canceled && result.assets && result.assets.length > 0) {

        setFotos(prevFotos => {
            let newPhotos = [...prevFotos];

            // Recorrer las fotos seleccionadas y agregarlas si hay espacio
            result.assets.forEach(asset => {
                if (newPhotos.length < 5) {
                    newPhotos.push({ uri: asset.uri });
                }
            });
            return newPhotos;
        });
      }
  };

  const manejarTomarFoto = async () => {
      // 1. Solicitar permisos de la cámara
      let { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesitan permisos para acceder a la cámara.');
        return;
      }

      // 2. Abrir la cámara
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // Mantener la opción allowsEditing: true (si es deseado)
        aspect: [4, 3],
        quality: 1,
      });

      // 3. Procesar el resultado
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFotos(prevFotos => {
            if (prevFotos.length < 5) {
                return [...prevFotos, { uri: result.assets[0].uri }];
            }
            return prevFotos;
        });
      }
  };

    return (
      <SafeAreaView style={estilos.areaSegura}>
        {/* ... (El JSX de la UI sigue igual) ... */}
        <StatusBar barStyle="dark-content" />

        {/* ENCABEZADO (IDÉNTICO) */}
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

          <Text style={estilos.tituloEncabezado}>
            Agregar fotos
          </Text>

          <TouchableOpacity
            onPress={manejarGuardado}
            disabled={!puedeGuardar}
            style={[
              estilos.botonGuardar,
              { backgroundColor: puedeGuardar ? '#282828' : 'rgba(40, 40, 40, 0.3)' }
            ]}
          >
            <Text style={estilos.textoGuardar}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.contenedorPrincipal}>

          {/* Placeholder/Vista previa de la foto principal */}
          <View style={estilos.contenedorFotoPrincipal}>
              {fotos.length > 0 ? (
                  <Image
                      // Muestra la imagen usando la URI guardada en el estado
                      source={{ uri: fotos[0].uri }}
                      style={estilos.imagenCargada}
                  />
              ) : (
                  // Muestra el placeholder si no hay fotos
                  <Image
                      source={IconoPlaceholder}
                      style={estilos.placeholderIcono}
                      resizeMode="contain"
                  />
              )}
          </View>


          {/* Botones de acción */}
          <View style={estilos.contenedorBotones}>
              <TouchableOpacity
                  onPress={manejarElegirGaleria}
                  style={estilos.botonAccion}
              >
                  <Image source={IconoGaleria} style={estilos.iconoBotonAccion} />
                  <Text style={estilos.textoBotonAccion}>Elegir desde la galería</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={manejarTomarFoto}
                  style={estilos.botonAccion}
              >
                  <Image source={IconoCamara} style={estilos.iconoBotonAccion} />
                  <Text style={estilos.textoBotonAccion}>Tomar una foto</Text>
              </TouchableOpacity>
          </View>


        </View>
      </SafeAreaView>
    );
  }

// --- Estilos de React Native ---
const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#e5e8ec' },
  contenedorPrincipal: {
      paddingHorizontal: 25,
      paddingTop: 50,
      alignItems: 'center'
  },

  // --- ESTILOS DEL ENCABEZADO ---
  encabezado: {
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'android' ? 40 : 50,
      paddingBottom: 20,
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
  botonAtras: { paddingRight: 15, paddingVertical: 5 },
  iconoAtras: { width: 24, height: 24, tintColor: '#2c3e50' },
  tituloEncabezado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  botonGuardar: {
    width: 99,
    height: 37,
    borderRadius: 3.53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoGuardar: {
    fontSize: 13.9,
    fontWeight: '500',
    color: 'white',
  },

  // --- ESTILOS DEL CONTENIDO DE FOTOS ---
  contenedorFotoPrincipal: {
      width: 162,
      height: 162,
      backgroundColor: '#D1D7DC',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 60,
      overflow: 'hidden',
  },
  imagenCargada: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover', // Asegura que la imagen cubra todo el contenedor
  },
  placeholderIcono: {
      width: 80,
      height: 80,
      tintColor: '#FFFFFF',
  },
  contenedorBotones: {
      width: '100%',
      maxWidth: 300,
      gap: 15,
  },
  botonAccion: {
      height: 50,
      backgroundColor: '#154360',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
  },
  iconoBotonAccion: {
      width: 24,
      height: 24,
      tintColor: 'white',
      marginRight: 15,
  },
  textoBotonAccion: {
      fontSize: 14,
      color: 'white',
      fontWeight: '500',
  },
});