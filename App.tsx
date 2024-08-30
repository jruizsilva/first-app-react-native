import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, View } from "react-native";
import { defaultImage } from "./assets/images";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import ButtonIcon from "./components/ButtonIcon";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonCircle from "./components/ButtonCircle";
import EmojiPickerModal from "./components/EmojiPickerModal";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<number | null>(null);
  const imageRef = useRef<View>(null);
  const [viewWith, setViewWith] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.measure((x, y, width, height) => {
        setViewWith(width);
        setViewHeight(height);
      });
    }
  }, [selectedImage]);

  if (status === null) {
    requestPermission();
  }

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
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (imageRef.current === null) {
      return;
    }
    try {
      if (Platform.OS !== "web") {
        const localUri = await captureRef(imageRef, {
          quality: 1,
          width: viewWith,
          height: viewHeight,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } else {
        const node = imageRef.current as unknown as HTMLElement;
        const dataUrl = await domtoimage.toJpeg(node, {
          quality: 1,
          width: viewWith,
          height: viewHeight,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectEmoji = (emoji: number) => {
    setPickedEmoji(emoji);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          flexBasis: "70%",
          maxWidth: 320,
          width: "100%",
          marginHorizontal: "auto",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
          }}
          ref={imageRef}
          collapsable={false}
        >
          <Image
            source={selectedImage ? { uri: selectedImage } : defaultImage}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
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

      <EmojiPickerModal visible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={onSelectEmoji} onCloseModal={onModalClose} />
      </EmojiPickerModal>

      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
