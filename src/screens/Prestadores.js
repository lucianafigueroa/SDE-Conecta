import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";

import placeholder from "../assets/images/placeholder.png";

const { width } = Dimensions.get('window');

// --- Datos de ejemplo (Adaptados al diseño de la imagen) ---
const mainCategories = [
  { id: 't1', name: 'Todos', active: true },
  { id: 't2', name: 'Albañil', active: false },
  { id: 't3', name: 'Carpintero', active: false },
  { id: 't4', name: 'Electricista', active: false },
  { id: 't5', name: 'Gasista', active: false },
];

// Datos de prestadores sin colores de fondo específicos
const featuredProviders = [
    { id: 'f1', name: 'Jackson', service: 'Electrician', rating: 3.9, image: placeholder },
    { id: 'f2', name: 'Emily Jani', service: 'Electrician', rating: 4.8, image: placeholder },
    { id: 'f3', name: 'Shams Jack', service: 'Electrician', rating: 4.8, image: placeholder },
];

const cleaningProviders = [
    { id: 'c1', name: 'Luisina Martinez', service: 'Limpieza', rating: 3.9, image: placeholder, isVerified: true },
    { id: 'c2', name: 'Luisina Martinez', service: 'Limpieza', rating: 4.8, image: placeholder, isVerified: true },
    { id: 'c3', name: 'Luisina Martinez', service: 'Limpieza', rating: 4.8, image: placeholder, isVerified: true },
];

// --- Componente de Tarjeta de Prestador Horizontal (Nuevo Estilo) ---
const HorizontalProviderCard = ({ name, service, rating, image, navigation }) => (
    // Se elimina 'bgColor' como prop y de los estilos inline
    <TouchableOpacity style={newStyles.providerCardHorizontal}>
        <View style={newStyles.imageContainer}> {/* No se pasa bgColor al contenedor de la imagen */}
            <Image source={image} style={newStyles.providerImageHorizontal} />
        </View>
        <Text style={newStyles.providerNameHorizontal}>{name}</Text>
        <Text style={newStyles.providerServiceHorizontal}>{service}</Text>
        <View style={newStyles.ratingRow}>
            <Text style={newStyles.providerRatingText}>⭐ {rating}</Text>
        </View>
        <TouchableOpacity style={newStyles.verPerfilButton}>
            <Text style={newStyles.verPerfilText}>Ver Perfil</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);

// --- Componente Principal ---
export default function Prestadores({ navigation }) {

  const navTabs = [
    { name: "Inicio", icon: placeholder, screen: 'InicioCliente' },
    { name: "Prestadores", icon: placeholder, screen: 'Prestadores' },
    { name: "Calificaciones", icon: placeholder, screen: 'Calificaciones' },
    { name: "Perfil", icon: placeholder, screen: 'MenuUsuario' },
  ];

  const handleNavigation = (screenName) => {
    if (screenName) {
        navigation.navigate(screenName);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.headerBackground}>
        <Text style={styles.title}>Prestadores</Text>
      </View>

      {/* --- Barra de Búsqueda Flotante --- */}
      <View style={styles.searchBarContainer}>
        <Image source={placeholder} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar categoría"
          placeholderTextColor="#2c3e5080"
        />
        <Image source={placeholder} style={styles.filterIcon} />
      </View>

      {/* ScrollView para el contenido listado */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* --- Píldoras de Filtro de Categoría Principal --- */}
        <FlatList
          data={mainCategories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={newStyles.mainCategoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[newStyles.categoryPillMain, item.active && newStyles.categoryPillMainActive]}
            >
              <Text style={[newStyles.categoryTextMain, item.active && newStyles.categoryTextMainActive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* --- Sección 1: Electricistas/Recomendados (Estilo Carrusel) --- */}
        <View style={newStyles.sectionContainer}>
          <FlatList
            data={featuredProviders}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={newStyles.horizontalCardList}
            renderItem={({ item }) => (
              <HorizontalProviderCard
                {...item}
                image={placeholder}
                navigation={navigation}
              />
            )}
          />
        </View>

        {/* --- Sección 2: Limpieza --- */}
        <View style={newStyles.sectionHeaderRow}>
            <Text style={newStyles.sectionTitleHorizontal}>Limpieza</Text>
            <TouchableOpacity>
                <Text style={newStyles.verMasHorizontal}>Ver más ›</Text>
            </TouchableOpacity>
        </View>
        <View style={newStyles.sectionContainer}>
          <FlatList
            data={cleaningProviders}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={newStyles.horizontalCardList}
            renderItem={({ item }) => (
              <HorizontalProviderCard
                {...item}
                image={placeholder}
                // Se elimina la prop bgColor
                navigation={navigation}
              />
            )}
          />
        </View>

        {/* Espacio extra al final para el scroll */}
        <View style={{ height: 30 }} />

      </ScrollView>

      {/* --- Barra de Navegación Inferior (Tab Bar) --- */}
      <View style={styles.bottomNav}>
        {navTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => handleNavigation(tab.screen)}
          >
            <Image
              source={tab.icon}
              style={[
                styles.navIcon,
                tab.name === 'Prestadores' && styles.navIconActive
              ]}
            />
            <Text
              style={[
                styles.navText,
                tab.name === 'Prestadores' && styles.navTextActive
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

// --- Estilos para la Nueva Maqueta (Horizontal Cards) ---
const newStyles = StyleSheet.create({
    // --- Categorías Principales ---
    mainCategoryList: {
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 20,
    },
    categoryPillMain: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    categoryPillMainActive: {
        backgroundColor: '#d26e00', // Naranja
        borderColor: '#d26e00',
    },
    categoryTextMain: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
    },
    categoryTextMainActive: {
        color: 'white',
        fontWeight: '600',
    },

    // --- Secciones de Carrusel (Limpieza/Electricista) ---
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitleHorizontal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    verMasHorizontal: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
    },
    sectionContainer: {
        // Contenedor para el FlatList horizontal
    },
    horizontalCardList: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    // --- Tarjeta de Prestador Horizontal ---
    providerCardHorizontal: {
        width: width * 0.45, // Aproximadamente la mitad de la pantalla
        marginRight: 15,
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white', // Color de fondo ahora es blanco por defecto
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: 'white', // Aseguramos que el contenedor de la imagen también sea blanco
    },
    providerImageHorizontal: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    providerNameHorizontal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 2,
    },
    providerServiceHorizontal: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c3e50',
        opacity: 0.7,
        marginBottom: 5,
    },
    ratingRow: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginBottom: 10,
    },
    providerRatingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2c3e50',
    },
    verPerfilButton: {
        backgroundColor: '#d26e00', // Naranja
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 5,
    },
    verPerfilText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    }
});


// --- Estilos Base (Se mantienen y se ajustan) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e8ec',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 140, // Altura ajustada
    backgroundColor: 'white',
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 140, // Para que el contenido inicie debajo del header
    paddingBottom: 100,
  },
  // --- Barra de Estado ---
  statusBar: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  timeText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  statusIcons: {
    // Simulación
  },
  // --- Título ---
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 70, // Posición vertical ajustada
    alignSelf: 'center',
    zIndex: 1,
  },
  // --- Barra de Búsqueda (Ajustada para que flote) ---
  searchBarContainer: {
    width: '85%',
    height: 53,
    backgroundColor: 'white',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    alignSelf: 'center',
    position: 'absolute', // Hacemos que flote
    top: 105, // Posicionamos debajo del título
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    opacity: 0.5,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    opacity: 0.5,
  },
  // --- Bottom Navigation (Tab Bar) ---
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 84,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 20,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    opacity: 0.3,
  },
  navIconActive: {
    opacity: 1,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    opacity: 0.3,
  },
  navTextActive: {
    opacity: 1,
    fontWeight: '600',
    color: '#2c3e50',
  },
});