import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { View, ActivityIndicator } from 'react-native';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserRole = async (user) => {
        const userRef = doc(db, "usuarios", user.uid);
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const rol = docSnap.data().rol;
                setUserRole(rol);
                return rol;
            }
        } catch (error) {
            console.error("Error al obtener el rol del usuario:", error);
        }
        setUserRole(null);
        return null;
    };
    
    const signIn = (firebaseUser) => {
        setUser(firebaseUser);
    };
    
    const signOut = async () => {
        await auth.signOut();
        setUser(null);
        setUserRole(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await fetchUserRole(currentUser); 
            } else {
                setUser(null);
                setUserRole(null);
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        userRole,
        isLoading,
        signIn,
        signOut,
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#d26e00" />
            </View>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};