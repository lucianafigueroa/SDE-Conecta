import { View, ScrollView, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { buttonStyles } from "../styles/buttons";
import { textStyles } from "../styles/texts";
import pincel from "../assets/images/pincel.png";
import destornillador from "../assets/images/destornillador.png";
import tuercas from "../assets/images/tuercas.png";
import pulverizador from "../assets/images/pulverizador.png";
import Button from "../components/Button";

export default function Bienvenida({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#154360" }}>
        <View style={{ flexDirection: "row", marginBottom: 67, justifyContent: "space-between" }}>
          <Image source={pincel} resizeMode={"stretch"} style={{ borderRadius: 30, width: 204, height: 270 }} />
          <Image source={destornillador} resizeMode={"stretch"} style={{ width: 204, height: 270 }} />
        </View>

        <View style={{ alignItems: "center", marginBottom: 113 }}>
          <Text style={{ color: "#E5E8EC", fontSize: 42, fontWeight: "bold", marginBottom: 18 }}>
            SDE Conecta
          </Text>
          <Text style={{ color: "#E5E8EC", fontSize: 16, fontWeight: "bold" }}>
            Tu conexión de servicios locales
          </Text>
        </View>

        <Button
          title="Iniciar Sesión"
          buttonStyle={buttonStyles.main}
          textStyle={textStyles.mainText}
          onPress={() => navigation.navigate('Login')}
        />

        <Button
          title="Registrarse"
          buttonStyle={buttonStyles.secondary}
          textStyle={textStyles.mainText}
          onPress={() => navigation.navigate('Registro')}
        />

        <View style={{ flexDirection: "row", marginBottom: 67, justifyContent: "space-between" }}>
          <Image source={tuercas} resizeMode={"stretch"} style={{ borderRadius: 30, width: 204, height: 270 }} />
          <Image source={pulverizador} resizeMode={"stretch"} style={{ width: 204, height: 270 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
