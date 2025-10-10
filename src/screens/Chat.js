import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import ChatMessage from "../styles/ChatMessage";


import userAvatar from "../assets/images/placeholder.png";
import placeholder from "../assets/images/placeholder.png";
import sendIcon from "../assets/images/phone.png";
import micIcon from "../assets/images/mic.png";
import phoneIcon from "../assets/images/phone.png";
import attachIcon from "../assets/images/clip.png";

export default function Chat({ navigation }) {
  const navTabs = [
    { name: "Inicio", icon: placeholder, screen: 'InicioCliente' },
    { name: "Prestadores", icon: placeholder, screen: 'Prestadores' },
    { name: "Calificaciones", icon: placeholder, screen: 'Calificaciones' },
    { name: "Perfil", icon: placeholder, screen: 'MenuUsuario' },
  ];

  const handleNavigation = (screenName) => {
    if (screenName && screenName !== 'InicioCliente') {
      navigation.navigate(screenName);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={userAvatar} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>George Alan</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <Image source={phoneIcon} style={styles.headerIcon} />
          <Image source={micIcon} style={styles.headerIcon} />
          <Image source={attachIcon} style={styles.headerIcon} />
        </View>
      </View>

      {/* Chat messages */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <ChatMessage type="voice" time="7:38 AM" isUser={false} />
        <ChatMessage
          type="text"
          text="¡Sí, solo contesta mi pregunta primero! ¿Qué tamaño tiene tu televisor y en qué tipo de pared se va a montar?"
          time="7:38 AM"
          isUser={true}
        />
        <ChatMessage
          type="text"
          text="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
          time="7:38 AM"
          isUser={false}
        />
        <ChatMessage type="voice" time="7:39 AM" isUser={true} />
        <ChatMessage type="text" text="Yes, see you then!" time="7:38 AM" isUser={false} />
        <ChatMessage
          type="info"
          text="Tina programó una cita para el miércoles 23 de abril a las 11:30."
        />
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Messages..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Image source={attachIcon} style={styles.inputIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={micIcon} style={styles.inputIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={sendIcon} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => handleNavigation(tab.screen)}
          >
            <Image
              source={tab.icon}
              style={[styles.navIcon, tab.name === 'Inicio' && styles.navIconActive]}
            />
            <Text
              style={[
                styles.navText,
                tab.name === 'Inicio' && styles.navTextActive
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E5E8EC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  headerStatus: {
    fontSize: 12,
    color: "green",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  headerIcon: {
    width: 22,
    height: 22,
    tintColor: "#2c3e50",
  },
  chatContainer: {
    padding: 15,
    backgroundColor: "#F2F3F5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 80,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 22,
    height: 22,
    tintColor: "#2c3e50",
    marginHorizontal: 5,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#2c3e50",
  },
  navIconActive: {
    tintColor: "#000",
  },
  navTextActive: {
    fontWeight: "bold",
    color: "#000",
  },
});
