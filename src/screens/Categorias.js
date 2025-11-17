import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";
const group427321957 = require("../assets/images/limpiezaIcono.png");
const group427321958 = require("../assets/images/albañilIcono.png");
const group427321961 = require("../assets/images/electricistaIcono.png");
const group427321963 = require("../assets/images/gasistaIcono.png");
const group427321959 = require("../assets/images/cerrajeroIcono.png");
const group427321962 = require("../assets/images/plomeroIcono.png");
const group427321966 = require("../assets/images/pintorIcono.png");
const group427321964 = require("../assets/images/pileteroIcono.png");
const group427321965 = require("../assets/images/durlockIcono.png");
const group427321969 = require("../assets/images/carpinteroIcono.png");
const group427321967 = require("../assets/images/herreroIcono.png");
const group427321968 = require("../assets/images/aireIcono.png");

const categories = [
  { id: 1, image: group427321957, label: "Limpieza" },
  { id: 2, image: group427321958, label: "Albañil" },
  { id: 3, image: group427321961, label: "Electricista" },
  { id: 4, image: group427321963, label: "Gasista" },
  { id: 5, image: group427321959, label: "Cerrajero" },
  { id: 6, image: group427321962, label: "Plomero" },
  { id: 7, image: group427321966, label: "Pintor" },
  { id: 8, image: group427321964, label: "Piletero" },
  { id: 9, image: group427321965, label: "Durlock" },
  { id: 10, image: group427321969, label: "Carpintero" },
  { id: 11, image: group427321967, label: "Herrero" },
  { id: 12, image: group427321968, label: "AireAcondicionado" },
];

const { width } = Dimensions.get("window");
const PADDING_HORIZONTAL = 40;
const GAP_X = 18;
const NUM_COLUMNS = 3;

const ITEM_WIDTH =
  (width - PADDING_HORIZONTAL * 2 - GAP_X * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const ArrowLeftSVG = ({ color = "#2c3e50", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function Categorias({ route }) {
  useScreenFocusLogger();
  const navigation = useNavigation();
  console.log(route.params);
  const handleSelectCategory = (category) => {
    navigation.navigate("RegistrarServicio", {
      ...route.params,
      categoriaSeleccionada: category,
    });
  };

  const manejarVolverAtras = () => {
    navigation.navigate("RegistrarServicio", {
      ...route.params
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => manejarVolverAtras()}
          style={styles.backButton}
        >
          <ArrowLeftSVG size={24} color="#2c3e50" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Categorias</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,

                { width: ITEM_WIDTH, height: 102 },
              ]}
              activeOpacity={0.7}
              onPress={() => handleSelectCategory(category)}
            >
              <Image
                source={category.image}
                style={styles.categoryImage}
                resizeMode="contain"
              />

              <Text style={styles.categoryLabel}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: "#e5e8ec",
  },

  header: {
    paddingHorizontal: 20,

    paddingTop: 40,

    paddingBottom: 40,

    backgroundColor: "white",

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 1 },

    shadowOpacity: 0.1,

    shadowRadius: 1,

    elevation: 2,

    zIndex: 10,
  },

  backButton: {
    paddingRight: 15,
  },

  headerTitle: {
    fontSize: 28,

    fontWeight: "bold",

    color: "#2c3e50",

    fontFamily: "Poppins-Bold",
  },

  scrollContainer: {
    paddingTop: 25,

    paddingHorizontal: PADDING_HORIZONTAL,
  },

  categoriesGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "flex-start",

    gap: GAP_X,

    paddingBottom: 40,
  },

  categoryButton: {
    borderRadius: 9.71,

    backgroundColor: "white",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 22,

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 1 },

    shadowOpacity: 0.1,

    shadowRadius: 2,

    elevation: 3,
  },

  categoryImage: {
    width: 50,

    height: 45,

    marginBottom: 8,
  },

  categoryLabel: {
    fontSize: 11.7,

    fontWeight: "500",

    color: "black",

    textAlign: "center",

    fontFamily: "Roboto-Medium",
  },
});
