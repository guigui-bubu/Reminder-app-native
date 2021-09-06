import React from "react";
import Colors from "../constants/Colors";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as appActions from "../store/actions/app"; // importe ttes mes actions

function Note(props) {
  // Variables
  const dispatch = useDispatch();

  // Fonction

  const onLongPressHandler = () => {
    Alert.alert("Que souhaitez-vous faire ?", undefined, [
      {
        text: "Annuler",
        style: "Cancel",
      },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => onDeleteHandler(),
      },
    ]);
  };

  const onDeleteHandler = () => {
    Alert.alert(
      "Attention",
      "Vous allez supprimer cette note, en êtes vous sur ?",
      [
        {
          text: "Annuler",
          style: "Cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => dispatch(appActions.deleteNote(props.item.id)),
        },
      ]
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onLongPress={onLongPressHandler}>
      <View style={styles.note}>
        <Text>{props.item.content}</Text>
      </View>
    </TouchableOpacity>
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
