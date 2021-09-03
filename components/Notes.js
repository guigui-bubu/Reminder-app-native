import React from "react";
import Colors from "../constants/Colors";
import { View, Text, StyleSheet } from "react-native";

function Note(props) {
  return (
    <View style={styles.note}>
      <Text>{props.item.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    backgroundColor: "white",
    padding: 15,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 7,
  },
  noteText: {},
});

export default Note;
