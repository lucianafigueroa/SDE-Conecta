import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function ServiciosProfesional({ navigation, route }) {
  useScreenFocusLogger();
  const { fotos, prestador } = route.params;

  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Servicios de {prestador.nombre}</Text>

      {fotos.map((url, i) => (
        <View key={i} style={styles.card}>
          <Image source={{ uri: url }} style={styles.image} />

          {/* Info adicional opcional según Firestore */}
          <Text style={styles.infoText}>
            {prestador.descripcionServicio}
          </Text>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginBottom: 15 },
  backText: { fontSize: 16, color: "#D26E00", fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#2c3e50" },
  card: { marginBottom: 20, borderRadius: 12, overflow: "hidden", backgroundColor: "#f2f2f2" },
  image: { width: "100%", height: 220, resizeMode: "cover" },
  infoText: { padding: 10, fontSize: 14, color: "#444" }
});
