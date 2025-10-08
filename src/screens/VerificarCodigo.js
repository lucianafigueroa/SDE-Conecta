import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import Button from "../components/Button";

import logo from "../assets/images/logo1.png";

export default function VerificarNumero({ navigation }) {

   const handleVerificationPress = () => {
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
            <TouchableOpacity>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
          </View>

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
                    width: 320,                 // ancho mayor
                    alignSelf: "center"         // centrado en la pantalla
                }
            ]}
            textStyle={[textStyles.mainText, styles.professionalText, { color: "#fff" }]} // texto blanco
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
  statusBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  time: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  batteryEnd: { width: 18, height: 10 },
  batteryFill: { width: 21, height: 10 },
  wifiPath: { width: 17, height: 5 },
  wifiDot: { width: 11, height: 1 },
  wifiPath2: { width: 5, height: 1 },
  mobileSignal: { width: 18, height: 12 },

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
  },
  codeBox: {
    width: 60,
    height: 60,
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

  button: {
    width: 308,
    height: 62,
    borderRadius: 32,
    backgroundColor: "#154360",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
