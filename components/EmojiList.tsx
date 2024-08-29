import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";
import { emojiList } from "../assets/images";

interface Props {
  onSelect: (emoji: number) => void;
  onCloseModal: () => void;
}

export default function EmojiList({
  onSelect,
  onCloseModal,
}: Props): JSX.Element {
  const [emojis] = useState(emojiList);

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === "web"}
        data={emojis}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              onSelect(item as number);
              onCloseModal();
            }}
          >
            <Image source={item} key={index} style={styles.image} />
          </Pressable>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
