import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
// Importaciones de imágenes (usaremos mocks por ahora)
import onboardingImage3 from '../assets/images/bienvenida03.png';
import onboardingImage4 from '../assets/images/bienvenida04.png';

// Obtenemos el ancho de la pantalla para la paginación
const { width } = Dimensions.get('window');

// --- DATOS DEL CARRUSEL ---
const slides = [
  {
    key: 'slide3',
    image: onboardingImage3,
    title: 'Buscá un servicio',
    description: 'Encontrá fácilmente el servicio adecuado a tus necesidades, con una variedad de opciones disponibles a tu alcance.',
  },
  {
    key: 'slide4',
    image: onboardingImage4,
    title: 'La solución, a un par de clics.',
    description: 'Conectamos tu necesidad con la red de expertos más confiable de la región. Calidad y eficiencia garantizadas.',
  },
];

// --- Subcomponente de la página individual (Slide) ---
const OnboardingSlide = ({ slide }) => (
  <View style={styles.slideContainer}>
    {/* Imagen principal */}
    <View style={styles.imageContainer}>
      <Image
        source={slide.image}
        style={styles.mainImage}
        resizeMode="contain"
      />
    </View>

    {/* Contenido de texto */}
    <View style={styles.textContent}>
      <Text style={styles.slideTitle}>{slide.title}</Text>
      <Text style={styles.slideDescription}>{slide.description}</Text>
    </View>
  </View>
);

// --- Componente Principal ---
export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const onViewableItemsChanged = (event) => {
    // Calcula el índice actual basado en el desplazamiento
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      // Navegar al siguiente slide
      scrollRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      // Finalizar el carrusel y pasar a la siguiente etapa (Bienvenida05)
      navigation.navigate('Bienvenida05');
    }
  };

  const handleSkip = () => {
    // Saltar todo el carrusel e ir a la siguiente etapa
    navigation.navigate('Bienvenida05');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onViewableItemsChanged}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <OnboardingSlide key={index} slide={slide} />
        ))}
      </ScrollView>

      {/* Footer Fijo con Botones y Puntos */}
      <View style={styles.footer}>
        {/* Puntos (Dots) */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          {/* Botón Saltar/Atrás */}
          <TouchableOpacity
            onPress={currentIndex > 0 ? () => scrollRef.current?.scrollTo({ x: width * (currentIndex - 1), animated: true }) : handleSkip}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>
              {currentIndex > 0 ? "Atrás" : "Saltar"}
            </Text>
          </TouchableOpacity>

          {/* Botón Siguiente/Empezar */}
          <Button
            title={currentIndex === slides.length - 1 ? "Siguiente" : "Siguiente"}
            buttonStyle={styles.nextButton}
            textStyle={styles.nextButtonText}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E8EC', // Fondo de color claro
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: width, // Ocupa el ancho completo para la paginación
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  imageContainer: {
    height: width * 1.0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainImage: {
    width: '150%',
    height: '150%',
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50', // Texto oscuro
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 32,
  },
  slideDescription: {
    fontSize: 16,
    color: '#2C3E50', // Texto oscuro
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 80, // Espacio desde el borde inferior
    backgroundColor: '#E5E8EC',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#D26E00', // Naranja
  },
  inactiveDot: {
    backgroundColor: '#BDC3C7', // Gris suave
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60, // Para que el botón "Saltar" se alinee verticalmente con "Siguiente"
  },
  skipButton: {
    // Ocupa el espacio restante a la izquierda
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  skipText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
    // Alineación para que quede en la misma línea que el texto del botón
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#D26E00', // Naranja
    borderRadius: 31,
    width: 150, // Ancho fijo, similar al diseño
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText: {
    color: '#E5E8EC',
    fontSize: 20,
    fontWeight: '600',
  },
});
