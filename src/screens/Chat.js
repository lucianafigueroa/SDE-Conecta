import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { auth, db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";

export default function Chat({ navigation, route }) {
  useScreenFocusLogger();
  
  const { prestador } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);
  
  const user = auth.currentUser;
  const currentUserEmail = user?.email;

  if (!currentUserEmail || !prestador?.email) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}><Text>Error: Faltan datos para cargar el chat.</Text></View>
      </SafeAreaView>
    );
  }

  const chatId = [prestador.email.trim(), currentUserEmail.trim()].sort().join("_");

  useEffect(() => {
    // Protección extra: No intentes suscribirte si el chatId es inválido
    if (!chatId || chatId.includes('undefined')) {
        console.error("Chat ID inválido, no se puede suscribir a los mensajes.");
        return;
    }

    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
    }, (error) => {
        console.error("Error en el listener de onSnapshot (Chat.js):", error);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = useCallback(async () => {
    if (inputText.trim() === "" || !prestador?.email || !currentUserEmail) return;

    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");

    try {
        const chatSnap = await getDoc(chatRef);
        if (!chatSnap.exists()) {
          await setDoc(chatRef, {
            participants: [prestador.email.trim(), currentUserEmail.trim()],
            createdAt: serverTimestamp(),
          });
        }

        await addDoc(messagesRef, {
          sender: currentUserEmail,
          text: inputText,
          timestamp: serverTimestamp(),
        });

        setInputText("");
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
    }
    // --- CORRECCIÓN CLAVE AQUÍ ---
  }, [inputText, chatId, currentUserEmail, prestador]);

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === currentUserEmail ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={{ color: item.sender === currentUserEmail ? "#fff" : "#000", fontSize: 16 }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{prestador?.nombre || prestador?.email || "Chat"}</Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe un mensaje..."
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Tus estilos originales
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f7f8fa" },
  header: { marginTop: 60, marginBottom: 20, flexDirection: "row", alignItems: "center", paddingHorizontal: 25, },
  backArrow: { fontSize: 24, marginRight: 10, color: "#2C3E50" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2C3E50" },
  messageBubble: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginVertical: 6, maxWidth: "95%", flexShrink: 1, },
  myMessage: { alignSelf: "flex-end", backgroundColor: "#FF8C00", borderBottomRightRadius: 0, },
  theirMessage: { alignSelf: "flex-start", backgroundColor: "#ECECEC", borderBottomLeftRadius: 0, },
  inputContainer: { flexDirection: "row", borderTopWidth: 1, borderColor: "#ccc", padding: 8, backgroundColor: "#fff", },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, paddingHorizontal: 12, marginRight: 10, paddingVertical: 6, },
  sendButton: { backgroundColor: "#FF8C00", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 15, },
  sendText: { color: "#fff", fontWeight: "bold" },
});