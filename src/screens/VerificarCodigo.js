import React, { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import Button from "../components/Button";

import logo from "../assets/images/logo1.png";

// 🚨 COMPONENTE PRINCIPAL CON PROPS
export default function VerificarNumero({ navigation, route }) { 


  // 🚨 LÓGICA DE LOGGING: Se ejecuta cada vez que la pantalla está visible
    useFocusEffect(
        useCallback(() => {
            // USAR route.name AQUÍ
            console.log("-> PANTALLA ENFOCADA: " + route.name);

            // Se omite la función de limpieza (desenfoque)
            return () => {}; 
        }, [route.name]) 
    );
    

   const handleVerificationPress = () => {
          // Aquí debería ir la lógica de verificación del código
          navigation.navigate("InicioCliente");
   };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Image source={logo} style={styles.logo} />

        <View style={styles.instructionContainer}>
          <Text style={styles.title}>Ingresar el código de verificación</Text>

          <Text style={styles.subtitle}>
            Enviamos un código de verificación a tu {"\n"} número de teléfono.
          </Text>

          <View style={styles.phoneRow}>
            <Text style={styles.phoneNumber}>+1-(954) 673-5555</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.edit}>Editar</Text>
            </TouchableOpacity>
          </View>

          {/* Contenedor de las cajas de código (idealmente serian TextInputs) */}
          <View style={styles.codeContainer}>
            <View style={styles.codeBox} />
            <View style={styles.codeBox} />
            <View style={styles.codeBox} />
            <View style={styles.codeBox} />
            <View style={styles.codeBox} />
          </View>

          <TouchableOpacity>
            <Text style={styles.resendText}>
              ¿No recibiste ningún código? <Text style={styles.resendLink}>Reenviar código</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Button
            title="Verificar y continuar"
            buttonStyle={[
                buttonStyles.secondary,
                styles.professionalButton,
                {
                    backgroundColor: "#d26e00", // fondo naranja
                    width: 320,                 // ancho mayor
                    alignSelf: "center",       // centrado en la pantalla
                    marginTop: 50, // Espacio superior
                }
            ]}
            textStyle={[textStyles.mainText, { color: "#fff", fontWeight: "bold" }]}
            onPress={handleVerificationPress}
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
  scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        padding: 30,
  },
// Estilos de status bar eliminados ya que no se usan en el JSX
// ...

  logo: {
    width: 350,
    height: 350,
  },

  instructionContainer: {
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#545e64",
    textAlign: "center",
    marginBottom: 10,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  phoneNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2c3e50",
  },
  edit: {
    fontSize: 14,
    fontWeight: "500",
    color: "#d26e00f2",
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%", // Asegura que las cajas de código ocupen el ancho
  },
  codeBox: {
    width: '16%', // Aproximadamente 16% para caber 6 cajas con espacio
    aspectRatio: 1, // Hace la caja cuadrada
    borderWidth: 1,
    borderColor: "#2c3e50",
    borderRadius: 16,
  },

  resendText: {
    fontSize: 14,
    color: "#545e64",
    textAlign: "center",
  },
  resendLink: {
    fontWeight: "500",
    color: "#121212",
  },
});