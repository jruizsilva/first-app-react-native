import { StyleSheet, Image, ImageProps } from "react-native";

export default function ImageViewer({ ...rest }: ImageProps) {
  return <Image style={styles.image} {...rest} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
  },
});
