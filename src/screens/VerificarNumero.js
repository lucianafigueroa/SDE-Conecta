import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";

import logo from "../assets/images/logo1.png";

export default function VerificarNumero({ navigation }) {
  const [numero, setNumero] = useState("");
  const [error, setError] = useState(false);

  const validarNumero = (num) => {
    return /^\d{10}$/.test(num);
  };

  const handleChange = (value) => {
    setNumero(value);
    setError(!validarNumero(value));
  };

  const handleContinuar = () => {
    if (!error && numero) {
      navigation.navigate("VerificarCodigo");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Ingresá tu número de teléfono para verificación</Text>

        <View style={styles.inputWrapper}>
          <View style={styles.codigoPaisContainer}>
            <Text style={styles.codigoPais}>🇦🇷 +54</Text>
          </View>

          <TextInput
            style={[styles.numeroInput, error && styles.inputError]}
            keyboardType="phone-pad"
            value={numero}
            onChangeText={handleChange}
            placeholder="Número de teléfono"
            placeholderTextColor="#7F8C8D"
          />
        </View>

        {error && <Text style={styles.errorText}>Número inválido</Text>}

        <Button
          title="Continuar"
          onPress={handleContinuar}
          buttonStyle={[
            buttonStyles.main,
            { width: "90%" }, //
            numero && !error ? {} : { backgroundColor: "#ccc" }
          ]}
          textStyle={textStyles.mainText}
          disabled={!numero || error}
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
    flexGrow: 1,
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 350,
    height: 350,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 60,
  },

  inputWrapper: {
    flexDirection: "row",
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  codigoPaisContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 20,
  },
  codigoPais: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  numeroInput: {
    flex: 1,
    height: 55,
    backgroundColor: "#f7f8f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 100,
    marginBottom: 20,
  }
});
