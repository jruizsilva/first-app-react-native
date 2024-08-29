import { View, Pressable, StyleSheet, PressableProps } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props extends PressableProps {
  icon: JSX.Element;
}

export default function ButtonCircle({ icon: Icon, ...rest }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} {...rest}>
        {Icon && Icon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});
