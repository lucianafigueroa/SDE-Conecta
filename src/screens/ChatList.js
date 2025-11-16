import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// --- CAMBIO CLAVE AQUÍ ---
import { collection, query, where, onSnapshot, getDoc, getDocs, doc, orderBy, limit } from 'firebase/firestore'; // <-- Añadimos getDocs
import { db } from '../config/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

// --- Componente para una sola fila de la lista de chat ---
const ChatItem = ({ item, navigation }) => {
  if (!item.otherUser) return null;

  return (
    <TouchableOpacity 
      style={styles.chatItemContainer}
      // --- SOLUCIÓN DEFINITIVA: Usamos getParent() para navegar en el Stack principal ---
      onPress={() => navigation.getParent()?.navigate('Chat', { 
        prestador: { id: item.otherUser.id, nombre: item.otherUser.nombre, foto: item.otherUser.foto, email: item.otherUser.email }, 
        user: item.currentUser 
      })}
    >
      <Image 
        source={item.otherUser.foto ? { uri: item.otherUser.foto } : require('../assets/images/placeholder.png')} 
        style={styles.avatar} 
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.otherUser.nombre}</Text>
          <Text style={styles.chatTime}>{item.lastMessage?.timestamp ?? ''}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.chatLastMessage} numberOfLines={1}>
            {item.lastMessage?.text ?? 'No hay mensajes todavía'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Componente Principal de la Lista de Chats ---
export default function ChatList({ navigation }) {
  const { user } = useAuth();
  const [allChats, setAllChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);

      const chatsQuery = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', user.uid)
      );

      const unsubscribe = onSnapshot(chatsQuery, 
        async (querySnapshot) => {
          const chatsDataPromises = querySnapshot.docs.map(async (chatDoc) => {
            try {
              const chatData = chatDoc.data();
              const otherUserId = chatData.participants.find(id => id !== user.uid);
              if (!otherUserId) return null;

              const userDoc = await getDoc(doc(db, 'usuarios', otherUserId));
              const otherUserData = userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
              
              const lastMessageQuery = query(collection(db, 'chats', chatDoc.id, 'messages'), orderBy('timestamp', 'desc'), limit(1));
              const lastMessageSnapshot = await getDocs(lastMessageQuery);
              let lastMessage = null;
              if (!lastMessageSnapshot.empty) {
                const msgData = lastMessageSnapshot.docs[0].data();
                lastMessage = { 
                  text: msgData.text, 
                  timestamp: msgData.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '' 
                };
              }
              return { id: chatDoc.id, otherUser: otherUserData, lastMessage: lastMessage, currentUser: user };
            } catch (e) {
              console.error("Error procesando un documento de chat:", e);
              return null;
            }
          });
          
          const resolvedChats = (await Promise.all(chatsDataPromises)).filter(Boolean);
          setAllChats(resolvedChats);
          setLoading(false);
        }, 
        (error) => {
          console.error("Error al escuchar los chats:", error);
          Alert.alert("Error de Conexión", "No se pudieron cargar los chats.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }, [user])
  );
  
  const filteredChats = useMemo(() => {
    if (!searchQuery) {
      return allChats;
    }
    return allChats.filter(chat => 
      chat.otherUser?.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allChats]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar por nombre"
          style={styles.searchInput}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#d26e00" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatItem item={item} navigation={navigation} />}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes chats activos.</Text>
                <Text style={styles.emptySubText}>Inicia una conversación con un profesional para que aparezca aquí.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f8fa' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  backButton: {
    padding: 5,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginLeft: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e9ecef', margin: 15, borderRadius: 10, paddingHorizontal: 10 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  listContainer: { paddingHorizontal: 15, flexGrow: 1 },
  chatItemContainer: { flexDirection: 'row', paddingVertical: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15, backgroundColor: '#e0e0e0' },
  chatContent: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 15 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatTime: { fontSize: 12, color: '#888' },
  messageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatLastMessage: { fontSize: 14, color: '#666', flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  }
});