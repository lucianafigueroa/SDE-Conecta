import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Animated,
  Keyboard,
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
import { Ionicons } from '@expo/vector-icons';
import { useScreenFocusLogger } from "../hooks/useScreenFocusLogger";

export default function Chat({ navigation, route }) {
  useScreenFocusLogger();
  const { prestador } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const flatListRef = useRef(null);
  const inputTranslate = useRef(new Animated.Value(0)).current;

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
  const show = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
  const hide = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

  const showListener = Keyboard.addListener(show, (e) => {
    Animated.timing(inputTranslate, {
      toValue: e.endCoordinates.height + 10,
      duration: 250,
      useNativeDriver: false,
    }).start();

    // 👇 Scroll automático al último mensaje al abrir teclado
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  });

  const hideListener = Keyboard.addListener(hide, () => {
    Animated.timing(inputTranslate, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  });

  return () => {
    showListener.remove();
    hideListener.remove();
  };
}, []);


  useEffect(() => {
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(newMessages);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 120);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 350);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return;

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
        text: inputText.trim(),
        timestamp: serverTimestamp(),
      });

      setInputText("");

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  }, [inputText, chatId, currentUserEmail, prestador]);

  const renderMessage = ({ item }) => {
    const isMyMessage = item.sender === currentUserEmail;

    return (
      <View style={[styles.messageRow, { justifyContent: isMyMessage ? 'flex-end' : 'flex-start' }]}>
        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessage : styles.theirMessage,
          ]}
        >
          <Text style={[styles.messageText, { color: isMyMessage ? 'white' : 'black' }]}>
            {`${item.text} `}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{prestador?.nombre || prestador?.email || "Chat"}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
          style={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <Animated.View style={[
          styles.inputContainer,
          {
            transform: [{
              translateY: inputTranslate.interpolate({
                inputRange: [0, 500],
                outputRange: [0, -500],
                extrapolate: "clamp"
              })
            }]
          }
        ]}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#8e8e93"
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Ionicons name="arrow-up-circle" size={32} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
    backgroundColor: '#f7f8fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backArrow: { marginRight: 15 },
  title: { fontSize: 20, fontWeight: "bold", color: "#2C3E50" },
  messageList: { flex: 1, paddingHorizontal: 10 },
  messageRow: { marginVertical: 4, flexDirection: 'row' },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#d26e00",
    borderBottomRightRadius: 5,
  },
  theirMessage: {
    backgroundColor: "#e5e5ea",
    borderBottomLeftRadius: 5,
  },
  messageText: {
  fontSize: 18,
  paddingHorizontal: 2, // ⬅️ NUEVO: da espacio a la última letra
},

  // 👉 ÚNICA MODIFICACIÓN
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f7f8fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 12, // 🔼 Subido más arriba del teclado
  },

  input: {
    flex: 1,
    backgroundColor: '#e5e5ea',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    marginRight: 10,
    fontSize: 16,
    borderWidth: 0,
  },
  sendButton: {
    backgroundColor: "#d26e00",
    borderRadius: 25,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
