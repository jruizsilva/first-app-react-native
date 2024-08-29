import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { defaultImage } from "./assets/images";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import ButtonIcon from "./components/ButtonIcon";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonCircle from "./components/ButtonCircle";

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // we will implement this later
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <Image
        source={selectedImage ? { uri: selectedImage } : defaultImage}
        style={{
          width: "100%",
          maxWidth: 320,
          flexBasis: "70%",
          marginHorizontal: "auto",
          borderRadius: 8,
        }}
      />
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <ButtonIcon
              icon={<MaterialIcons name={"refresh"} size={24} color="#fff" />}
              label="Reset"
              onPress={onReset}
            />
            <ButtonCircle
              icon={<MaterialIcons name="add" size={38} color="#25292e" />}
              onPress={onAddSticker}
            />
            <ButtonIcon
              icon={<MaterialIcons name={"save-alt"} size={24} color="#fff" />}
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: "#25292e",
  },
  footerContainer: {
    marginTop: "auto",
    alignItems: "center",
  },
  optionsContainer: {
    marginTop: "auto",
    alignItems: "center",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
