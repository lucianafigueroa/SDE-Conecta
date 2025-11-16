import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger';

import { doc, updateDoc } from "firebase/firestore";

const Citas = () => {
  useScreenFocusLogger();

  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    if (user?.email) {
      obtenerCitas();
    }
  }, [user]);

  const obtenerCitas = async () => {
    try {
      const citasRef = collection(db, "usuarios", user.uid, "citas");
      const q = query(citasRef, orderBy("fecha", "asc"));
      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCitas(lista);
    } catch (error) {
      console.log("Error obteniendo citas:", error);
    }
  };

  // Función para finalizar una cita
  const finalizarCita = async (citaId) => {
    try {
      const citaRef = doc(db, "usuarios", user.uid, "citas", citaId);
      await updateDoc(citaRef, { estado: "finalizada" });
      console.log("Cita finalizada:", citaId);

      // Actualizar localmente el estado para que se refleje en la UI
      setCitas((prev) =>
        prev.map((cita) =>
          cita.id === citaId ? { ...cita, estado: "finalizada" } : cita
        )
      );
    } catch (error) {
      console.log("Error finalizando cita:", error);
    }
  };

  const citasFiltradas =
    filtro === "todas" ? citas : citas.filter((c) => c.estado === filtro);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Mis Citas</Text>

      <View style={styles.filtrosContainer}>
        {["todas", "pendiente", "finalizada", "cancelada"].map((estado) => (
          <TouchableOpacity
            key={estado}
            onPress={() => setFiltro(estado)}
            style={[
              styles.botonFiltro,
              filtro === estado && { backgroundColor: "#d26e00" },
            ]}
          >
            <Text style={filtro === estado ? styles.activo : styles.inactivo}>
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {citasFiltradas.map((cita) => (
        <View key={cita.id} style={styles.card}>
          <Text style={styles.cliente}>Cliente: {cita.ClienteNombre}</Text>
          <Text>Dirección: {cita.ClienteDireccion}</Text>
          <Text>Email: {cita.ClienteEmail}</Text>
          <Text>Fecha: {cita.fecha.toDate().toLocaleString()}</Text>
          <Text>Estado: {cita.estado}</Text>
          <Text>Descripción: {cita.descripcion}</Text>

          {/* Botón para finalizar solo si no está finalizada */}
          {cita.estado !== "finalizada" && (
            <TouchableOpacity
              style={styles.botonFinalizar}
              onPress={() => finalizarCita(cita.id)}
            >
              <Text style={styles.textoBotonFinalizar}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Citas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  titulo: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#2c3e50", textAlign: "center" },
  filtrosContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  botonFiltro: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: "#ecf0f1", elevation: 2 },
  activo: { fontWeight: "700", color: "#fff", textAlign: "center" },
  inactivo: { fontWeight: "500", color: "#34495e", textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 5 },
  cliente: { fontWeight: "700", fontSize: 16, marginBottom: 5, color: "#2c3e50" },
  texto: { fontSize: 14, color: "#7f8c8d", marginBottom: 3 },
  botonFinalizar: { marginTop: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: "#27ae60", alignItems: "center" },
  textoBotonFinalizar: { color: "#fff", fontWeight: "700" },
});