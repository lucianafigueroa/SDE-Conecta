import React, { useEffect, useState, useCallback } from "react";
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
} from "firebase/firestore";

export default function Chat({ navigation, route }) {
  const { prestador } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const user = auth.currentUser;
  const clienteEmail = user?.email || "cliente3@gmail.com";

  console.log("💬 Prestador recibido:", prestador?.email);
  console.log("👤 Cliente logueado:", clienteEmail);

  // ✅ Crear ID del chat ordenado y limpio
  const chatId = [prestador?.email?.trim(), clienteEmail.trim()]
    .sort()
    .join("_");

  console.log("🧩 Escuchando chatId:", chatId);

  // 🔄 Escucha los mensajes del chat en tiempo real
  useEffect(() => {
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");

    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("📸 Snapshot size:", snapshot.size);
      if (snapshot.empty) {
        console.warn("⚠️ No se encontraron mensajes en Firestore");
        setMessages([]);
      } else {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("✅ Mensajes recibidos:", newMessages.length);
        setMessages(newMessages);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  // ✉️ Enviar mensaje
  const handleSendMessage = useCallback(async () => {
    if (inputText.trim() === "") return;

    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");

    try {
      // ✅ Verificar si el chat ya existe, sino crearlo
      const chatSnap = await getDoc(chatRef);
      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          participants: [prestador.email.trim(), clienteEmail.trim()],
          createdAt: new Date(),
        });
        console.log("🆕 Chat creado en Firestore");
      }

      // ✅ Agregar mensaje
      await addDoc(messagesRef, {
        sender: clienteEmail,
        text: inputText,
        timestamp: new Date(),
        type: "text",
      });

      console.log("💬 Mensaje enviado correctamente:", inputText);
      setInputText("");
    } catch (error) {
      console.error("🚨 Error enviando mensaje:", error);
    }
  }, [inputText, chatId, clienteEmail]);

  // 💬 Render de mensaje individual
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === clienteEmail
          ? styles.myMessage
          : styles.theirMessage,
      ]}
    >
      <Text
        style={{
          color: item.sender === clienteEmail ? "#fff" : "#000",
        }}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Header con botón atrás y nombre del prestador --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {prestador?.nombre
            ? prestador.nombre
            : prestador?.email || "Chat"}
        </Text>
      </View>

      {/* --- Contenido del chat --- */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />

        {/* --- Input para enviar mensaje --- */}
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

// --- 🎨 Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  backArrow: {
    fontSize: 24,
    color: "#2C3E50",
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "75%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF8C00",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
