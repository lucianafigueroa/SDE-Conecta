import { View, Text } from 'react-native';
import Button from "../components/Button";

export default function Registro({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#154360' }}>
      <Text style={{ fontSize: 24, color: '#E5E8EC', marginBottom: 20 }}>Pantalla de Registro</Text>

      <Button
        title="Volver"
        buttonStyle={{ padding: 15, backgroundColor: '#E5E8EC', borderRadius: 10 }}
        textStyle={{ color: '#154360', fontWeight: 'bold' }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
