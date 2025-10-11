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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const flechaAtras = require('../assets/images/flechaAtras.png');

export default function AgregarDescripcion() {
  const navegacion = useNavigation();
  const ruta = useRoute();

  const [descripcion, setDescripcion] = useState(ruta.params?.descripcionActual || ''); // Inicializa con valor actual
    const puedeGuardar = descripcion.trim().length > 0;

  // Recupera los datos persistentes
  const direccionPersistente = ruta.params?.direccionActual || '';
  const fotosPersistentes = ruta.params?.fotosActuales || [];

  const manejarGuardado = () => {
    if (puedeGuardar) {
      navegacion.navigate('RegistrarServicio', {
          // Datos NUEVOS
          descripcionGuardada: true,
          descripcionTexto: descripcion,

          // Datos PERSISTENTES
          direccionGuardada: direccionPersistente.length > 0,
          direccionTexto: direccionPersistente,
          fotosGuardadas: fotosPersistentes.length > 0,
          fotosCargadas: fotosPersistentes,
      });
    }
  };

  const manejarVolverAtras = () => {
    navegacion.goBack();
  };

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar barStyle="dark-content" />

      {/* ENCABEZADO */}
      <View style={estilos.encabezado}>

        {/* Botón de Atrás */}
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

        {/* Título */}
        <Text style={estilos.tituloEncabezado}>
          Descripción del servicio
        </Text>

        {/* Botón Guardar */}
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

        <Text style={estilos.etiquetaDetalles}>
          Añadir detalles
        </Text>

        {/* Área de Texto (Input) */}
        <View style={estilos.areaTextoContainer}>
          <TextInput
            style={estilos.areaTextoInput}
            onChangeText={setDescripcion}
            value={descripcion}
            placeholder="Escribe aquí los detalles del servicio..."
            placeholderTextColor="#888"
            multiline={true} // Permite múltiples líneas
            textAlignVertical="top" // Alinea el texto en la parte superior
            maxLength={500}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

// --- Estilos de React Native ---
const estilos = StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: '#e5e8ec' },
  contenedorPrincipal: { paddingHorizontal: 25, paddingTop: 20 },

  // ENCABEZADO
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
  botonAtras: { paddingRight: 15, paddingVertical: 5 },
  iconoAtras: { width: 24, height: 24, tintColor: '#2c3e50' },
  tituloEncabezado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },

  // Botón Guardar
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

  // Área de Detalles
  etiquetaDetalles: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    marginTop: 20,
  },
  areaTextoContainer: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 20,
    minHeight: 253,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  areaTextoInput: {
    minHeight: 250,
    fontSize: 16,
    color: '#2c3e50',
  }
});