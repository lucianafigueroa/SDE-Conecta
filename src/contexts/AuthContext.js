import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserRole = async (user) => {
        if (!user) return null;
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
    
    const signIn = async (firebaseUser) => {
        setUser(firebaseUser);
        await fetchUserRole(firebaseUser);
    };
    
    const signOut = async () => {
        await auth.signOut();
        setUser(null);
        setUserRole(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchUserRole(currentUser); 
            } else {
                setUserRole(null);
            }
            // Marcamos la carga como completa al final, después de tener el usuario y el rol.
            setIsLoading(false);
        });

        return unsubscribe; // Limpia el listener al desmontar el componente
    }, []);

    const value = {
        user,
        userRole,
        isLoading,
        signIn,
        signOut,
    };

    // El proveedor ahora solo se encarga de proveer los datos, no de mostrar UI.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};