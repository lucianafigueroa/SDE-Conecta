import { useCallback } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';

export const useScreenFocusLogger = () => {
  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      console.log(`-> PANTALLA ENFOCADA: ${route.name}`);
      // Puedes añadir lógica de limpieza si la necesitas en el futuro
      return () => {}; 
    }, [route.name])
  );
};