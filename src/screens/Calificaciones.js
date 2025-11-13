import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger'; // <-- 1. Importación añadida

// Importaciones de assets (usaremos placeholder para simular todos los SVG/PNG)
import placeholder from "../assets/images/placeholder.png"; // Usaremos uno general
const ArrowPrevSmall = placeholder; // Simulación

// --- Componente CustomerReviews (Filtro) ---
const CustomerReviews = ({ text, text1, style }) => (
  <View style={[styles.customerReviewsContainer, style]}>
    <Text style={styles.customerReviewsTitle}>{text}</Text>
    <Text style={styles.customerReviewsSubtitle}>{text1}</Text>
  </View>
);

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 140;

// --- Componente de Tarjeta de Calificación (Revisión) ---
const ReviewCard = ({ name, date, text, image }) => (
  <View style={reviewStyles.card}>
    {/* Contenedor principal: Imagen a la izquierda, detalles a la derecha */}
    <View style={reviewStyles.contentContainer}>

      {/* 1. Imagen a la izquierda */}
      <Image source={image} style={reviewStyles.mainImage} />

      {/* 2. Detalles de la revisión a la derecha */}
      <View style={reviewStyles.details}>

        {/* Fila del Título (Nombre, Fecha, Estrellas) */}
        <View style={reviewStyles.headerRow}>
          <Text style={reviewStyles.name}>{name}</Text>
          <View style={reviewStyles.ratingDateColumn}>

            {/* Fecha */}
            <Text style={reviewStyles.dateText}>{date}</Text>

            {/* Estrellas de Calificación */}
            <View style={reviewStyles.starContainer}>
              {/* 4 estrellas rellenas y 1 vacía para simular 4.0 */}
              <Text style={reviewStyles.star}>★</Text>
              <Text style={reviewStyles.star}>★</Text>
              <Text style={reviewStyles.star}>★</Text>
              <Text style={reviewStyles.star}>★</Text>
              <Text style={reviewStyles.starEmpty}>★</Text>
            </View>
          </View>
        </View>

        {/* Texto de la Reseña */}
        <Text style={reviewStyles.reviewText}>{text}</Text>

        {/* Enlace Leer más */}
        <TouchableOpacity>
          <Text style={reviewStyles.readMore}>Leer más</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// --- Datos de ejemplo para las Reseñas ---
const reviewsData = [
  {
    id: 'r1',
    name: 'Maria Carrizo',
    date: '22:40 12/09/2025',
    text: '"María es una profesional increíble. Dejó mi departamento impecable y se nota que trabaja con mucho cuidado. Totalmente recomendable, ¡la volveré a contratar!"',
    image: placeholder,
  },
  {
    id: 'r2',
    name: 'Maria Carrizo',
    date: '22:40 12/09/2025',
    text: '"María es una profesional increíble. Dejó mi departamento impecable y se nota que trabaja con mucho cuidado. Totalmente recomendable, ¡la volveré a contratar!"',
    image: placeholder,
  },
  {
    id: 'r3',
    name: 'Maria Carrizo',
    date: '22:40 12/09/2025',
    text: '"María es una profesional increíble. Dejó mi departamento impecable y se nota que trabaja con mucho cuidado. Totalmente recomendable, ¡la volveré a contratar!"',
    image: placeholder,
  },
];


export default function Calificaciones({ navigation }) {
  useScreenFocusLogger(); // <-- 2. Hook en uso

  const navTabs = [
    { name: "Inicio", icon: placeholder, screen: 'InicioCliente' },
    { name: "Prestadores", icon: placeholder, screen: 'Prestadores' },
    { name: "Calificaciones", icon: placeholder, screen: 'Calificaciones' },
    { name: "Perfil", icon: placeholder, screen: 'MenuUsuario' },
  ];

  const handleNavigation = (screenName) => {
    if (screenName) {
      navigation.navigate(screenName)
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* --- Header Fijo Blanco --- */}
      <View style={styles.headerBackground} />

      {/* --- Título de la Vista --- */}
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={ArrowPrevSmall} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Calificaciones</Text>
      </View>

      {/* --- Componente de Filtrado (CustomerReviews) --- */}
      <View style={styles.filterContainer}>
        <CustomerReviews
          text="Historial de tus calificaciones"
          text1="Ordenado por (Más reciente)"
          style={styles.reviewsFilter}
        />
        <Image source={placeholder} style={styles.filterIcon} />
      </View>

      {/* ScrollView para el contenido listado */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Lista de Calificaciones */}
        <FlatList
          data={reviewsData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ReviewCard
              name={item.name}
              date={item.date}
              text={item.text}
              image={item.image}
            />
          )}
        />

        {/* --- Paginación/Indicadores (Simulación) --- */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Espacio final para evitar que el Tab Bar oculte contenido */}
        <View style={{ height: 30 }} />

      </ScrollView>

      {/* --- Barra de Navegación Inferior (bottomNav) --- */}
      <View style={styles.bottomNav}>
        {navTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => handleNavigation(tab.screen)} // Uso de la función de navegación
          >
            <Image
              source={tab.icon}
              style={[styles.navIcon, tab.name === 'Inicio' && styles.navIconActive]}
            />
            <Text
              style={[
                styles.navText,
                tab.name === 'Inicio' && styles.navTextActive // 'Inicio' como activo
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --- NOTA: Añade aquí tus objetos de estilo completos para `reviewStyles` y `styles` ---
const reviewStyles = StyleSheet.create({
  // ... tus estilos para las tarjetas de revisión
});

const styles = StyleSheet.create({
  // ... tus estilos principales para la pantalla
});