import { Image } from "react-native";

interface Props {
  imageSize: number;
  stickerSource: any;
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <Image
      source={stickerSource}
      resizeMode="contain"
      style={{ width: imageSize, height: imageSize, top: -350 }}
    />
  );
}
