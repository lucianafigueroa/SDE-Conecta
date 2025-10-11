import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import Button from "../components/Button";

import iconLocation from "../assets/images/localizacion.png";
import placeholder from "../assets/images/MariaCarrizo.png";
import starFilled from "../assets/images/star.png";
import starEmpty from "../assets/images/siluetastar.png";
import uploadIcon from "../assets/images/subir.png";
import arrowBack from "../assets/images/back.png"; // ícono de volver (añádelo a tus imágenes)

export default function Calificar({ navigation }) {
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleUploadPhoto = () => {
    console.log("Seleccionar foto del servicio");
  };

  const handleSubmit = () => {
    navigation.navigate('InicioCliente');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado con flecha */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('InicioCliente')}>
            <Image source={arrowBack} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calificar Servicio</Text>
        </View>

        {/* Tarjeta principal */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={placeholder} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Maria Carrizo</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image key={i} source={starFilled} style={styles.smallStar} />
                ))}
                <Text style={styles.opinionsText}>4.9 (230 opiniones)</Text>
              </View>
              <View style={styles.location}>
                <Image source={iconLocation} style={styles.iconLocation} />
                <Text style={styles.locationText}>Catamarca 50, Sgo. del Estero</Text>
              </View>
              <Text style={styles.schedule}>Disponibilidad: Lunes a Viernes</Text>
              <Text style={styles.time}>9.00 Am - 4.00 Pm</Text>
            </View>
          </View>

          {/* Calificación con estrellas */}
          <Text style={styles.subtitle}>How would you rate it?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Image
                  source={star <= rating ? starFilled : starEmpty}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Subir foto */}
          <Text style={styles.subtitle}>Subir foto del servicio</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={handleUploadPhoto}>
            <Text style={styles.uploadText}>Subir foto</Text>
            <Image source={uploadIcon} style={styles.uploadIcon} />
          </TouchableOpacity>

          {/* Escribir opinión */}
          <Text style={styles.subtitle}>Escribir tu opinión</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={opinion}
            onChangeText={setOpinion}
            multiline
          />
        </View>

        {/* Botón Subir */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={!rating || !opinion}
        >
          <Text style={styles.submitText}>Subir</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E9EDF3",
  },
  container: {
    alignItems: "center",
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'white',
    width: '100%'
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#2C3E50",
    marginTop: 40
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    marginRight: 20,
    marginTop: 40
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 80
   },
  header: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 15,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2C3E50",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  smallStar: {
    width: 13,
    height: 13,
    marginRight: 2,
    tintColor: "#F39C12",
  },
  opinionsText: {
    color: "#606060",
    fontSize: 12,
    marginLeft: 4,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  iconLocation: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  locationText: {
    fontSize: 13,
    color: "#606060",
  },
  schedule: {
    color: "#606060",
    fontSize: 13,
    marginTop: 3,
  },
  time: {
    color: "#606060",
    fontSize: 13,
  },
  subtitle: {
    color: "#2C3E50",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  star: {
    width: 28,
    height: 28,
    marginHorizontal: 3,
    tintColor: "#F39C12",
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: "#B0B0B0",
    borderStyle: "dashed",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  uploadText: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  uploadIcon: {
    width: 20,
    height: 20,
    tintColor: "#B0B0B0",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 100,
    marginTop: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#0A3D62",
    borderRadius: 25,
    width: "90%",
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 25,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
