import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { defaultImage } from "./assets/images";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
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
      <View style={styles.footerContainer}>
        <Button
          label="Choose a photo"
          theme="primary"
          onPress={pickImageAsync}
        />
        <Button label="Use this photo" />
      </View>
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
});
