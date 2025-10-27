import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
// Íconos necesarios para el Header, Buscador y AHORA EL MENU INFERIOR
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'; 

// ----------------------------------------------------------------------
// CAMBIO A IMPORT: Sintaxis de módulos ES6 para las imágenes locales
// ----------------------------------------------------------------------
import BANNER_IMAGE from '../assets/images/banner.png'; 
import PLACEHOLDER_ICON from '../assets/images/placeholder.png'; 

// -----------------------------------------------------
// ELIMINADOS: Se eliminan los imports de íconos del menú inferior (nav_inicio_activo, etc.)
// -----------------------------------------------------

// -----------------------------------------------------
// El nombre del componente es InicioProfesional
// -----------------------------------------------------
const InicioProfesional = () => {
    // Datos de los servicios
    const services = [
        { name: 'Limpieza', icon: PLACEHOLDER_ICON },
        { name: 'Albañil', icon: PLACEHOLDER_ICON },
        { name: 'Electricista', icon: PLACEHOLDER_ICON },
        { name: 'Gasista', icon: PLACEHOLDER_ICON },
        { name: 'Cerrajero', icon: PLACEHOLDER_ICON },
        { name: 'Plomero', icon: PLACEHOLDER_ICON },
        { name: 'Pintor', icon: PLACEHOLDER_ICON },
        { name: 'Pileta', icon: PLACEHOLDER_ICON },
        { name: 'Durlock', icon: PLACEHOLDER_ICON },
        { name: 'Carpintero', icon: PLACEHOLDER_ICON },
        { name: 'Herrero', icon: PLACEHOLDER_ICON },
        { name: 'AireAcondicionado', icon: PLACEHOLDER_ICON }, 
    ];

    // Componente para una tarjeta de servicio
    const ServiceCard = ({ name, icon }) => (
        <TouchableOpacity style={styles.serviceCard}>
            <Image source={icon} style={styles.serviceIcon} /> 
            <Text style={styles.serviceName}>{name}</Text>
        </TouchableOpacity>
    );

    // Componente para el menú inferior (VOLVIENDO A ICONS)
    const BottomMenu = () => (
        <View style={styles.bottomNav}>
            {/* INICIO (ACTIVO) */}
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="home" size={24} color="#FF7F27" /> 
                <Text style={[styles.navText, { color: '#FF7F27' }]}>Inicio</Text>
            </TouchableOpacity>

            {/* PRESUPUESTOS (INACTIVO) */}
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="clipboard-outline" size={24} color="#6E6E6E" />
                <Text style={styles.navText}>Presupuestos</Text>
            </TouchableOpacity>

            {/* PROMOCIONES (INACTIVO) */}
            <TouchableOpacity style={styles.navItem}>
                <Feather name="gift" size={24} color="#6E6E6E" />
                <Text style={styles.navText}>Promociones</Text>
            </TouchableOpacity>

            {/* NOTIFICACIONES (INACTIVO) */}
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="notifications-outline" size={24} color="#6E6E6E" />
                <Text style={styles.navText}>Notificaciones</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header Naranja (Ahora más largo para el buscador) */}
            <SafeAreaView style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerText}>Hola Luciana</Text>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-sharp" size={16} color="white" />
                        {/* Se aplica fontWeight: 'bold' al locationText */}
                        <Text style={styles.locationText}>Av. Belgrano Sur 281</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
                    </View>
                </View>
                <TouchableOpacity style={styles.menuIcon}>
                    <Feather name="menu" size={24} color="white" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Search Bar - FLOTANTE (ABSOLUTE) */}
            <View style={styles.searchBarContainer}>
                <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar categoría"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.filterIcon}>
                    <Feather name="sliders" size={20} color="#777" />
                </TouchableOpacity>
            </View>

            {/* ScrollView permite ver todos los servicios y el banner */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Banner - Ajustado el marginTop para iniciar debajo del buscador flotante */}
                <View style={styles.bannerContainer}>
                    {/* Se usa la variable importada */}
                    <Image source={BANNER_IMAGE} style={styles.bannerImage} resizeMode="cover" />
                    <Text style={styles.bannerText}>Los mejores servicios locales</Text>
                    <View style={styles.paginationDots}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Sección de Servicios */}
                <View style={styles.servicesSection}>
                    <View style={styles.servicesHeader}>
                        <Text style={styles.servicesTitle}>Servicios</Text>
                        <TouchableOpacity>
                            {/* Corrección para evitar error de sintaxis */}
                            <Text style={styles.seeMoreText}>Ver más &gt;</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lista de Servicios */}
                    <View style={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <ServiceCard key={index} name={service.name} icon={service.icon} />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Menú Inferior */}
            <BottomMenu />
        </View>
    );
};

// --- Hoja de Estilos ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // --- Header Naranja (Ajustado a los estilos solicitados) ---
    header: {
        width: "100%",
        backgroundColor: '#d26e00', // Nuevo color
        paddingHorizontal: 20,
        paddingTop: 40, 
        // AUMENTADO para crear el espacio donde flotará el buscador
        paddingBottom: 70, 
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },
    headerContent: {
        flex: 1,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff', 
        marginBottom: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold', // Aplicado bold como en el ejemplo de estilos
    },
    menuIcon: {
        padding: 5,
    },
    // --- Scroll Content ---
    scrollContent: {
        paddingBottom: 20,
    },
    // --- Search Bar (AHORA ES ABSOLUTO Y FLOTANTE) ---
    searchBarContainer: {
        // AJUSTES CLAVE DE POSICIONAMIENTO
        position: 'absolute',
        top: 150, // Posicionado sobre el padding inferior del header
        left: 20,
        right: 20,
        zIndex: 10,
        height: 53, // Altura del ejemplo del usuario
        
        // Estilos visuales
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 32, // Más redondeado
        paddingHorizontal: 15,
        
        // Estilos de sombra del ejemplo del usuario
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 9,
        elevation: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    searchIcon: {
        // Se mantiene
    },
    filterIcon: {
        marginLeft: 8,
        padding: 5,
    },
    // --- Banner (Ajustado el margen superior para compensar el buscador) ---
    bannerContainer: {
        // Empuja el banner hacia abajo para que el buscador flotante no lo tape.
        marginTop: 50, 
        marginHorizontal: 20,
        borderRadius: 15,
        overflow: 'hidden',
        // AJUSTE CLAVE: Altura de 181 para coincidir con la referencia anterior del usuario
        height: 181, 
        marginBottom: 20,
        elevation: 2,
    },
    bannerImage: {
        width: '100%',
        // AJUSTE CLAVE: Altura de 181 para coincidir con la referencia anterior del usuario
        height: 181,
        position: 'absolute',
    },
    bannerText: {
        position: 'absolute',
        top: 80,
        left: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 5,
        borderRadius: 5,
    },
    paginationDots: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCC',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 12,
        height: 8,
        borderRadius: 4,
    },
    // --- Servicios ---
    servicesSection: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    servicesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    servicesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    seeMoreText: {
        fontSize: 14,
        color: '#FF7F27',
        fontWeight: '500',
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    serviceCard: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    serviceIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
        backgroundColor: '#EAEAEA',
    },
    serviceName: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    // --- Menú Inferior ---
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingBottom: 20, 
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    navItem: {
        alignItems: 'center',
    },
    // ESTILOS ELIMINADOS: Ya no se usan imágenes estáticas en el menú inferior
    // navIcon style removed.
    navText: {
        fontSize: 11,
        marginTop: 4, // Restaurado a 4px de margen superior para los íconos vectoriales
        color: '#6E6E6E',
    },
});

export default InicioProfesional;