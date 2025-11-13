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
import { useScreenFocusLogger } from '../hooks/useScreenFocusLogger'; // <-- 1. Importación añadida

// Importaciones de imágenes
import onboardingImage3 from '../assets/images/bienvenida03.png';
import onboardingImage4 from '../assets/images/bienvenida04.png';

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
    <View style={styles.imageContainer}>
      <Image
        source={slide.image}
        style={styles.mainImage}
        resizeMode="contain"
      />
    </View>
    <View style={styles.textContent}>
      <Text style={styles.slideTitle}>{slide.title}</Text>
      <Text style={styles.slideDescription}>{slide.description}</Text>
    </View>
  </View>
);

// --- Componente Principal ---
export default function OnboardingScreen({ navigation }) {
  useScreenFocusLogger(); // <-- 2. Hook en uso

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const onViewableItemsChanged = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      navigation.navigate('Bienvenida05');
    }
  };

  const handleSkip = () => {
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
          <TouchableOpacity
            onPress={currentIndex > 0 ? () => scrollRef.current?.scrollTo({ x: width * (currentIndex - 1), animated: true }) : handleSkip}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>
              {currentIndex > 0 ? "Atrás" : "Saltar"}
            </Text>
          </TouchableOpacity>

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
    backgroundColor: '#E5E8EC',
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: width,
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
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 32,
  },
  slideDescription: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 80,
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
    backgroundColor: '#D26E00',
  },
  inactiveDot: {
    backgroundColor: '#BDC3C7',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  skipText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#D26E00',
    borderRadius: 31,
    width: 150,
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