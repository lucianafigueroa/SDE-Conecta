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

// Importaciones de assets (usaremos placeholder para simular todos los SVG/PNG)
import placeholder from "../assets/images/placeholder.png"; // Usaremos uno general
const ArrowPrevSmall = placeholder; // Simulación
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
    // Definimos las pestañas de navegación para la barra inferior (Tab Bar)
    const navTabs = [
        { name: "Inicio", icon: placeholder, screen: 'InicioCliente' },
        { name: "Prestadores", icon: placeholder, screen: 'Prestadores' },
        { name: "Calificaciones", icon: placeholder, screen: 'Calificaciones' },
        { name: "Perfil", icon: placeholder, screen: 'MenuUsuario' },
    ];

    const handleNavigation = (screenName) => {
        if (screenName) {
            // navigation.navigate(screenName);
            console.log(`Navegando a: ${screenName}`);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* --- Header Fijo Blanco --- */}
            <View style={styles.headerBackground} />

            {/* --- Barra de Estado (Simulación) --- */}
            <View style={styles.statusBar}>
                <Text style={styles.timeText}>9:41</Text>
                <View style={styles.statusIcons} />
            </View>

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
                                tab.name === 'Calificaciones' && styles.navIconActive
                            ]}
                        />
                        <Text
                            style={[
                                styles.navText,
                                tab.name === 'Calificaciones' && styles.navTextActive
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

// --- Estilos de la Tarjeta de Revisión (Ajustados) ---
const reviewStyles = StyleSheet.create({
    card: {
        width: width * 0.9,
        backgroundColor: 'white',
        borderRadius: 32,
        padding: 15,
        marginHorizontal: width * 0.05,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainImage: {
        width: 118,
        height: 147,
        borderRadius: 15,
        marginRight: 10,
        resizeMode: 'cover',
    },
    details: {
        flex: 1,
        paddingTop: 5, // Pequeño ajuste para centrar verticalmente el contenido
    },
    headerRow: {
        flexDirection: 'column',
        marginBottom: 8,
    },
    ratingDateColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        width: '100%',
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2c3e50',
    },
    starContainer: {
        flexDirection: 'row',
        order: 2, // Mueve las estrellas a la derecha de la fecha
    },
    star: {
        fontSize: 16,
        color: '#ffc107',
        marginRight: 2,
    },
    starEmpty: {
        fontSize: 16,
        color: '#c4c4c4',
        marginRight: 2,
    },
    dateText: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: 12,
        color: '#606060',
        order: 1, // Mueve la fecha a la izquierda
    },
    reviewText: {
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 10,
        color: '#606060',
        lineHeight: 17,
        marginBottom: 8,
        textAlign: 'left',
    },
    readMore: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: 14,
        color: '#d26e00',
        alignSelf: 'flex-start',
    }
});


// --- Estilos Base ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#e5e8ec',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        width: width,
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        zIndex: 1,
    },
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
        fontFamily: 'Inter-Medium',
    },
    statusIcons: {},
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 73,
        paddingHorizontal: 32,
        zIndex: 10,
        width: '100%',
    },
    backButton: {
        paddingRight: 15,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#2C3E50',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        fontFamily: 'Poppins-Bold',
    },
    // --- NUEVO CONTENEDOR DE FILTRO PARA ALINEAR EL ICONO ---
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 32,
        marginTop: 20,
        zIndex: 5,
        width: '100%',
    },
    reviewsFilter: {
        // Estilos internos ya definidos en el componente CustomerReviews
    },
    filterIcon: {
        width: 24, // Tamaño del icono de filtro (como en la imagen)
        height: 24,
        marginTop: 10, // Ajuste para alineación visual
        tintColor: '#2C3E50',
    },
    customerReviewsContainer: {
        marginBottom: 10,
    },
    customerReviewsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    customerReviewsSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#606060',
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: HEADER_HEIGHT + 30,
        paddingBottom: 100,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#c4c4c4',
    },
    dotActive: {
        backgroundColor: '#2c3e50',
    },
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
        tintColor: 'black',
    },
    navIconActive: {
        opacity: 1,
        tintColor: '#2c3e50',
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
        fontFamily: 'Roboto-Medium',
    },
});