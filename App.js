import { View, ScrollView, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { buttonStyles } from "./src/styles/buttons";
import { textStyles } from "./src/styles/texts";
import pincel from "./src/assets/images/pincel.png";
import destornillador from "./src/assets/images/destornillador.png";
import tuercas from "./src/assets/images/tuercas.png";
import pulverizador from "./src/assets/images/pulverizador.png";

import Button from "./src/components/Button";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#154360",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 67,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={pincel}
            resizeMode={"stretch"}
            style={{ borderRadius: 30, width: 204, height: 270 }}
          />
          <Image
            source={destornillador}
            resizeMode={"stretch"}
            style={{
              width: 204,
              height: 270,
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 113,
          }}
        >
          <Text
            style={{
              color: "#E5E8EC",
              fontSize: 42,
              fontWeight: "bold",
              marginBottom: 18,
            }}
          >
            {"SDE Conecta"}
          </Text>
          <Text
            style={{
              color: "#E5E8EC",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"Tu conexión de servicios locales"}
          </Text>
        </View>

        <Button
          title="Iniciar Sesión"
          buttonStyle={buttonStyles.main}
          textStyle={textStyles.mainText}
        />
        <Button
          title="Registrarse"
          buttonStyle={buttonStyles.secondary}
          textStyle={textStyles.mainText}
        />

        <View
          style={{
            flexDirection: "row",
            marginBottom: 67,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={tuercas}
            resizeMode={"stretch"}
            style={{ borderRadius: 30, width: 204, height: 270 }}
          />
          <Image
            source={pulverizador}
            resizeMode={"stretch"}
            style={{
              width: 204,
              height: 270,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
