import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as appActions from "../store/actions/app";

function Authenticator(props) {
  // Variables
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  // state
  const [loginMode, setLoginMode] = useState(false);

  // Fonctions
  const onSubmit = (data) => {
    console.log(data);
    if (loginMode) {
      // Connexion
    } else {
      // Inscription+
      try {
        dispatch(appActions.signup(email, password));
      } catch (error) {
        /* switch (error.message) {
          case "EMAIL_EXISTS":
            Alert.alert(
              "Impossible de vous inscrire",
              "cette adresse est déjà utilisée sur un autre compte"
            );
        }*/
        console.log(error);
      }
    }
    // userId
    // token
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "height" : "padding"} // paramètre clavier OS et android
    >
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.littleContainer}>
            <Text style={styles.title}>reminder</Text>
            <Text style={styles.slogan}>
              Stocker toutes vos idées dans un même endroit
            </Text>
            <View style={styles.form}>
              <Text style={styles.label}>Adresse email</Text>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  message: "Vous devez renseigner votre adresse email",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Vous devez renseigner une adresse email correct",
                  },
                }} // régle pour les conditions du formulaire
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    placeholder="E-mail"
                    style={styles.input}
                    keyboardType="email-address"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
              <Text style={{ ...styles.label, marginTop: 15 }}>
                Mot de passe
              </Text>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Vous devez renseigner un mot de passe",
                  },
                  minLength: {
                    value: 6,
                    message: "Mot de passe doit faire plus de 6 caractères",
                  },
                }}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    placeholder="Mot de passe"
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    secureTextEntry={true} // permet de pas voir ce qu'on tape
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmit)}
            >
              <View style={styles.mainBtn}>
                <Text style={styles.mainBtnText}>
                  {loginMode ? "Se connecter" : "Inscription"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setLoginMode((prevState) => !prevState)}
            >
              <Text style={styles.switchBtn}>
                {loginMode ? `Passer à l'inscription` : `Passer à la connexion`}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  littleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  slogan: {
    color: "white",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  mainBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  mainBtnText: {},
  input: {
    padding: 5,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    width: "100%",
  },
  form: {
    backgroundColor: "#2c3e50",
    borderRadius: 5,
    marginTop: 30,
    padding: 30,
    width: Dimensions.get("window").width * 0.7,
  },
  label: {
    marginBottom: 5,
    color: "white",
  },
  error: {
    color: Colors.primary,
    marginTop: 5,
  },
  switchBtn: {
    marginTop: 15,
    color: "white",
  },
});

export default Authenticator;
