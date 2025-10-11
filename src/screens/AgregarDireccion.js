import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const flechaAtras = require('../assets/images/flechaAtras.png');
const iconoUbicacion = require('../assets/images/ubicacion.png');
const iconoMapa = require('../assets/images/mapa.png');

const HEADER_PAD = 30;

export default function AgregarDireccion() {
  const navegacion = useNavigation();
  const ruta = useRoute();

  const [direccion, setDireccion] = useState(ruta.params?.direccionActual || '');

  // Recupera los datos persistentes
  const descripcionPersistente = ruta.params?.descripcionActual || '';
  const fotosPersistentes = ruta.params?.fotosActuales || [];

  // El botón de Guardar solo se habilita si hay texto en el input
  const puedeGuardar = direccion.trim().length > 0;

  const manejarGuardado = () => {
    if (puedeGuardar) {
      navegacion.navigate('RegistrarServicio', {
          // Datos NUEVOS
          direccionGuardada: true,
          direccionTexto: direccion,

          // Datos PERSISTENTES (para que RegistrarServicio los procese de nuevo)
          descripcionGuardada: descripcionPersistente.length > 0,
          descripcionTexto: descripcionPersistente,
          fotosGuardadas: fotosPersistentes.length > 0,
          fotosCargadas: fotosPersistentes,
      });
    }
  };

const manejarVolverAtras = () => {
    // Al usar navigate, garantizamos que el foco regresa a RegistrarServicio
    // sin parámetros de guardado, pero manteniendo el resto de los datos en la ruta
    navegacion.navigate('RegistrarServicio', {
        // Pasa los datos persistentes de vuelta (sin banderas de guardado)
        direccionTexto: direccion,
        descripcionTexto: descripcionPersistente,
        fotosCargadas: fotosPersistentes,
        // Las claves "Guardada" se omiten intencionalmente para evitar que el
        // useFocusEffect piense que hubo un "guardado" al hacer click en "Atrás".
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

          <Text style={estilos.tituloEncabezado}>
              Seleccionar ubicación
          </Text>

          {/* Botón Guardar (Ahora alineado por flexbox) */}
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

        {/* CONTENIDO PRINCIPAL */}
        <View style={estilos.contenedorPrincipal}>

          {/* 1. INPUT DE DIRECCIÓN (Se mantiene el estilo de texto grande) */}
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
              placeholder="Ingresar dirección"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
            />
          </View>

          <View style={estilos.separador} />

          {/* 2. ELEGIR DESDE EL MAPA */}
          <TouchableOpacity style={estilos.opcion}>
             <Image
              source={iconoMapa}
              style={estilos.iconoOpcionMapa}
              resizeMode="contain"
            />
            <Text style={estilos.textoMapa}>
              Elegir desde el mapa
            </Text>
          </TouchableOpacity>

          <Text style={estilos.textoSinResultados}>
            Sin Resultados
          </Text>

        </View>
      </SafeAreaView>
    );
  }


// --- Estilos de React Native ---
const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#e5e8ec' },
  contenedorPrincipal: { paddingHorizontal: 25, paddingTop: 30 },

  // --- ESTILOS DEL ENCABEZADO UNIFICADO ---
encabezado: {
    paddingHorizontal: 20,
    // Puedes usar Platform para un ajuste más preciso
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
  // Botón Guardar (Flotante)
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

  // --- ESTILOS DEL CONTENIDO DE UBICACIÓN ---
  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconoOpcion: {
    width: 19,
    height: 19,
    marginRight: 10,
    tintColor: 'black',
    opacity: 0.5,
  },
  iconoOpcionMapa: {
    width: 19,
    height: 19,
    marginRight: 10,
    tintColor: '#d26e00',
  },
  inputDireccion: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    paddingVertical: 5,
    opacity: 0.5,
  },
  separador: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
    marginLeft: 30,
  },
  textoMapa: {
    fontSize: 18,
    color: '#d26e00',
    fontWeight: '400',
  },
  textoSinResultados: {
    fontSize: 18,
    color: '#282828',
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 150,
  }
});