import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Para la flecha de atrás
import Svg, { Path } from 'react-native-svg';


const group427321957 = require('../assets/images/placeholder.png'); // Placeholder
const group427321958 = require('../assets/images/placeholder.png'); // Placeholder
const group427321961 = require('../assets/images/placeholder.png'); // Placeholder
const group427321963 = require('../assets/images/placeholder.png'); // Placeholder
const group427321959 = require('../assets/images/placeholder.png'); // Placeholder
const group427321962 = require('../assets/images/placeholder.png'); // Placeholder
const group427321966 = require('../assets/images/placeholder.png'); // Placeholder
const group427321964 = require('../assets/images/placeholder.png'); // Placeholder
const group427321965 = require('../assets/images/placeholder.png'); // Placeholder
const group427321969 = require('../assets/images/placeholder.png'); // Placeholder
const group427321967 = require('../assets/images/placeholder.png'); // Placeholder
const group427321968 = require('../assets/images/placeholder.png'); // Placeholder
const group427321972 = require('../assets/images/placeholder.png'); // Placeholder
const group427321970 = require('../assets/images/placeholder.png'); // Placeholder
const group427321971 = require('../assets/images/placeholder.png'); // Placeholder
const group427321975 = require('../assets/images/placeholder.png'); // Placeholder
const group427321973 = require('../assets/images/placeholder.png'); // Placeholder
const group427321974 = require('../assets/images/placeholder.png'); // Placeholder


// -----------------------------------------------------------------------------
//  2. DATOS DE CATEGORÍAS
// -----------------------------------------------------------------------------
const categories = [
  { id: 1, image: group427321957, label: 'Cleaning' },
  { id: 2, image: group427321958, label: 'Repairing' },
  { id: 3, image: group427321961, label: 'Electrician' },
  { id: 4, image: group427321963, label: 'Carpenter' },
  { id: 5, image: group427321959, label: 'Repairing' },
  { id: 6, image: group427321962, label: 'Electrician' },
  { id: 7, image: group427321966, label: 'Carpenter' },
  { id: 8, image: group427321964, label: 'Repairing' },
  { id: 9, image: group427321965, label: 'Electrician' },
  { id: 10, image: group427321969, label: 'Carpenter' },
  { id: 11, image: group427321967, label: 'Repairing' },
  { id: 12, image: group427321968, label: 'Electrician' },
  { id: 13, image: group427321972, label: 'Carpenter' },
  { id: 14, image: group427321970, label: 'Repairing' },
  { id: 15, image: group427321971, label: 'Electrician' },
  { id: 16, image: group427321975, label: 'Carpenter' },
  { id: 17, image: group427321973, label: 'Repairing' },
  { id: 18, image: group427321974, label: 'Electrician' },
];

const { width } = Dimensions.get('window');
const PADDING_HORIZONTAL = 40; // El left-8 de tu diseño original
const GAP_X = 18;
const NUM_COLUMNS = 3;
const ITEM_WIDTH = (width - (PADDING_HORIZONTAL * 2) - (GAP_X * (NUM_COLUMNS - 1))) / NUM_COLUMNS;

const ArrowLeftSVG = ({ color = '#2c3e50', size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Este Path dibuja una flecha simple apuntando a la izquierda */}
    <Path
      d="M19 12H5M12 19l-7-7 7-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


// -----------------------------------------------------------------------------
//  3. COMPONENTE CATEGORIAS
// -----------------------------------------------------------------------------
export default function Categorias() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER: Título y botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity
          //onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate('Bienvenida')}
          style={styles.backButton}
        >
        <ArrowLeftSVG size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categorias</Text>
      </View>

      {/* CONTENIDO SCROLLEABLE */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* CUADRÍCULA DE CATEGORÍAS */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, { width: ITEM_WIDTH, height: 102 }]}
              activeOpacity={0.7}
              onPress={() => console.log(`Categoría seleccionada: ${category.label}`)}
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

// -----------------------------------------------------------------------------
//  4. ESTILOS (STYLESHEET)
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e8ec',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    // La elevación es para simular la sombra que tiene la barra de estado en el diseño
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Poppins-Bold',
  },
  scrollContainer: {
    paddingTop:25,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: GAP_X, // Simula el gap-x y gap-y de Tailwind CSS
    paddingBottom: 40, // Espacio al final del scroll
  },
  categoryButton: {
    // El width se calcula dinámicamente arriba (ITEM_WIDTH)
    // El height es fijo a 102px
    borderRadius: 9.71,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22, // Simula el gap-y
    // Sombra sutil para el efecto de card
    shadowColor: '#000',
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
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
});