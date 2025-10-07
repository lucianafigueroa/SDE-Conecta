import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import Button from "../components/Button";

import logo from "../assets/images/logo.png";

export default function Seleccion({ navigation }) {

    const primaryBackgroundColor = '#d26e00f2';
    const textColor = '#e5e8ec';

    const handleClientPress = () => {
        navigation.navigate("Registrarse1", { tipoUsuario: "cliente" });
    };

    const handleProfessionalPress = () => {
        navigation.navigate("Registrarse1", { tipoUsuario: "profesional" });
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: primaryBackgroundColor }]}>
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={[styles.title, { color: textColor }]}>
                    ¡Bienvenido!
                </Text>

                <Text style={[styles.subtitle, { color: textColor }]}>
                    ¿Cuál es tu rol?
                </Text>

                <Image
                    source={logo}
                    resizeMode="contain"
                    style={styles.logo}
                />

                <Button
                    title="Soy un cliente"
                    buttonStyle={[buttonStyles.main, styles.clientButton]}
                    textStyle={textStyles.mainText}
                    onPress={handleClientPress}
                />

                <Button
                    title="Soy un Profesional"
                    buttonStyle={[buttonStyles.secondary, styles.professionalButton]}
                    textStyle={[textStyles.mainText, styles.professionalText]}
                    onPress={handleProfessionalPress}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 350,
        height: 350,
    },
    clientButton: {
        backgroundColor: '#154360',
        marginBottom: 24,
        width: '80%',
    },
    professionalButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#e5e8ec',
        width: '80%',
    },
    professionalText: {
        color: '#e5e8ec',
    },
});
