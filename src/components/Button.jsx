import { TouchableOpacity, Text } from "react-native";

export default function Button({ onPress, title, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style = {textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
