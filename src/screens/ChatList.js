import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth, db } from "../config/firebaseConfig";
import { collection, query, where, onSnapshot, getDocs, orderBy, limit } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

const ChatItem = ({ item, navigation }) => {
  const isOwnMessage = item.lastMessage?.sender === item.currentUserEmail;
  const previewText = item.lastMessage
    ? `${isOwnMessage ? "Yo: " : ""}${item.lastMessage.text}`
    : "No hay mensajes todavía";

  const timestamp = item.lastMessage?.timestamp?.toDate();
  const timeString = timestamp
    ? `${String(timestamp.getHours()).padStart(2, "0")}:${String(timestamp.getMinutes()).padStart(2, "0")}`
    : "";

  return (
    <TouchableOpacity
      style={styles.chatItemContainer}
      onPress={() =>
        navigation.getParent()?.navigate("Chat", {
          prestador: {
            email: item.otherUserEmail,
            nombre: item.otherUser?.nombre,
            foto: item.otherUser?.foto,
            id: item.otherUser?.id,
          },
        })
      }
    >
      {item.otherUser?.foto ? (
        <Image source={{ uri: item.otherUser.foto }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={28} color="#6E6E6E" />
        </View>
      )}

      <View style={styles.chatContent}>
        {/* Header: fila con nombre y hora */}
        <View style={styles.chatHeader}>
          <Text numberOfLines={1} style={styles.chatName}>
            {item.otherUser?.nombre || item.otherUserEmail}
          </Text>
          <Text style={styles.chatTime}>{timeString}</Text>
        </View>

        {/* Mensaje debajo */}
        <Text numberOfLines={1} style={styles.chatLastMessage}>
          {previewText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ChatList({ navigation }) {
  const [allChats, setAllChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const currentUserEmail = user?.email;

  useFocusEffect(
    useCallback(() => {
      if (!currentUserEmail) {
        setLoading(false);
        return;
      }
      setLoading(true);

      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", currentUserEmail)
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const chatsDataPromises = snapshot.docs.map(async (chatDoc) => {
          const chatData = chatDoc.data();
          const otherUserEmail = chatData.participants.find((email) => email !== currentUserEmail);
          if (!otherUserEmail) return null;

          let otherUserData = null;
          const userQuery = query(collection(db, "usuarios"), where("email", "==", otherUserEmail), limit(1));
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            otherUserData = { id: userDoc.id, ...userDoc.data() };
          }

          const msgsQuery = query(collection(db, "chats", chatDoc.id, "messages"), orderBy("timestamp", "desc"), limit(1));
          const msgsSnapshot = await getDocs(msgsQuery);
          const lastMessage = msgsSnapshot.docs.length ? msgsSnapshot.docs[0].data() : null;

          return {
            id: chatDoc.id,
            otherUser: otherUserData,
            otherUserEmail: otherUserEmail,
            lastMessage,
            currentUserEmail: currentUserEmail,
          };
        });

        const resolvedChats = (await Promise.all(chatsDataPromises)).filter(Boolean);
        resolvedChats.sort((a, b) => (b.lastMessage?.timestamp?.toMillis() || 0) - (a.lastMessage?.timestamp?.toMillis() || 0));

        setAllChats(resolvedChats);
        setLoading(false);
      }, (error) => {
        console.error("Error al escuchar chats:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    }, [currentUserEmail])
  );

  const filteredChats = useMemo(() => {
    if (!searchQuery) return allChats;
    return allChats.filter((item) =>
      item.otherUser?.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.otherUserEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allChats, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#d26e00" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={({ item }) => <ChatItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          extraData={searchQuery}
        />
      )}
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f7f8fa" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 40,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15, // separa la flecha del título
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16
  },
  listContainer: {
    paddingHorizontal: 15,
    flexGrow: 1
  },
  chatItemContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
    width: 50, // ancho fijo para la hora
    textAlign: "right",
  },
  chatLastMessage: {
    fontSize: 14,
    color: "#666",
    flexShrink: 1,
  },
  chatTimeAbsolute: {
    position: 'absolute',
    right: 0,
    top: 10,
    fontSize: 12,
    color: '#888',
  },
});
