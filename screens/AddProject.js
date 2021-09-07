// Librairies

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as appActions from "../store/actions/app"; // importe ttes mes actions
import * as ImagePicker from "expo-image-picker";

function AddProject(props) {
  // State
  const [image, setImage] = useState();
  // Variable
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch(); // pour pouvoir lancer les actions

  // Fonction
  const onSubmit = (data) => {
    let image64;
    if (image) {
      const uriParts = image.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      image64 = `data:image/${fileType};base64,${image.base64}`;
    }
    const project = {
      name: data.name,
      logo: image64,
    };
    dispatch(appActions.addProject(project));
    props.navigation.goBack();
  };

  // Permission pour utiliser les photos du phone

  const onPressPickerHandler = async () => {
    // Permission
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Désolé, vous n'avez pas accordé l'accés à vos photos"
        );
      }
    }

    // Ouvrir la fênetre
    let result = await ImagePicker.launchImageLibraryAsync({
      // permet de lancer la librairie de photo
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // selectionne le type de donne
      allowsEditing: true,
      //aspect: [] //type de format, carré, 16/9, rond
      quality: 0.8, // qualité du format (image)
      base64: true,
    });
    //console.log(result);
    if (result.cancelled) {
      Alert.alert(
        "impossible d'ajouter une image",
        "vous avez annulé la selection"
      );
      setImage();
    } else {
      setImage(result);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Ajouter un projet</Text>
        <View style={styles.containerInput}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }} // régle pour les conditions du formulaire
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="Tapez quelque chose..."
                style={styles.input}
                value={value}
                onChangeText={(value) => onChange(value)}
                multiline={true} // pour ecrire sur plusieurs lignes
              />
            )}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressPickerHandler}>
          <View
            style={{
              ...styles.containerInput,
              marginTop: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons size={23} color={Colors.primary} name="images" />
            <Text style={{ marginLeft: 15 }}>
              {image ? "Vous avez sélectionné une image" : "Ajouter une image"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.submit}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitText}>Créer</Text>
          <Ionicons name="arrow-forward" size={23} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.close}
          onPress={() => props.navigation.goBack()} // pour fermer la modal et revenir sur la page d'avant
        >
          <Ionicons name="close" size={23} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryFaded,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
    alignSelf: "center",
    marginTop: Platform.OS == "android" ? 60 : 30,
  },
  close: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute", // pour la possitioner en bas
    bottom: 50,
  },
  containerInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  input: {
    maxHeight: 150,
    fontSize: 16,
  },
  submit: {
    backgroundColor: Colors.primary,
    padding: 10,
    width: 130,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
  },
  submitText: {
    color: "white",
    fontSize: 17,
  },
});

export default AddProject;
