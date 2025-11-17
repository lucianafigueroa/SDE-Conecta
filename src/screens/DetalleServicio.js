import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function DetalleServicio({ navigation, route }) {
  useScreenFocusLogger();
  const { servicio, prestador } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>

      {/* 🔵 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
          <Text style={styles.headerBackText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de Servicio</Text>
      </View>

      {/* CONTENIDO SCROLLEABLE */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 10 }}>

        {/* Card principal */}
        <View style={styles.card}>
          <Text style={styles.title}>{servicio.descripcion}</Text>
          <Text style={styles.proName}>👤 Profesional: {prestador.nombre}</Text>

          {/* Categorías */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>📌 Categorías</Text>
            <Text style={styles.info}>
              {servicio.categorias?.join(", ") || "Sin categorías"}
            </Text>
          </View>

          {/* Dirección */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>📍 Dirección</Text>
            <Text style={styles.info}>
              {servicio.direccion || "Sin dirección especificada"}
            </Text>
          </View>

          {/* Fotos */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>🖼️ Fotos del servicio</Text>
            {servicio.fotosUrls?.map((url, i) => (
              <Image key={i} source={{ uri: url }} style={styles.image} />
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

/* 🎨 Estilos PREMIUM */
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 10,
    paddingTop: 50
  },
  headerBack: {
    paddingRight: 12,
    paddingVertical: 5,
  },
  headerBackText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#D26E00",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
  },

  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  title: { fontSize: 24, fontWeight: "700", marginBottom: 10, color: "#1F2937" },
  proName: { fontSize: 16, color: "#4B5563", marginBottom: 20 },

  sectionBox: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingBottom: 12,
  },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6, color: "#374151" },
  info: { fontSize: 15, color: "#4B5563" },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 14,
    marginBottom: 12,
  },
});
