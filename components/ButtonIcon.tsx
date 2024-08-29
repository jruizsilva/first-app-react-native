import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Icon, IconProps } from "@expo/vector-icons/build/createIconSet";

interface Props extends PressableProps {
  label: string;
  icon: JSX.Element;
}

export default function ButtonIcon({ icon: Icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      {Icon && Icon}
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
