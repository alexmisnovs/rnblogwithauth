import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

type iconButtonType = {
  icon: IconName;
  color: string;
  size: number;
  onPress: () => void;
};

function IconButton({ icon, color, size, onPress }: iconButtonType) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20
  },
  pressed: {
    opacity: 0.7
  }
});
