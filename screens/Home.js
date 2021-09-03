// Librairies

import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import "moment/locale/fr"; // pour mettre la date en français
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as appActions from "../store/actions/app"; // importe ttes mes actions

function Home(props) {
  // Variables
  const date = moment().format("LL");
  const notes = useSelector((state) => state.notes);
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch(); // pour pouvoir lancer les actions

  //console.log(notes);

  // Cycle de vie
  useEffect(() => {
    // action pour charger les notes
    dispatch(appActions.getNotes()); // pour recuperer nos notes

    // action pour charger les projets
    dispatch(appActions.getProjects()); // pour recuperer nos projets
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.date}>{date}</Text>

        <View style={styles.cards}>
          <LinearGradient colors={["#ED89AF", "#F45384"]} style={styles.card}>
            <Text style={styles.cardNumber}>{notes.length}</Text>
            <Text style={styles.cardText}>Notes</Text>
          </LinearGradient>

          <LinearGradient colors={["#FED3A0", "#FFA63E"]} style={styles.card}>
            <Text style={styles.cardNumber}>{projects.length}</Text>
            <Text style={styles.cardText}>Projets</Text>
          </LinearGradient>
        </View>
        <Text style={styles.title}>Notes (0)</Text>
        <Image source={require("../assets/empty.png")} style={styles.image} />
        <Text>
          Commencer à créer votre premier projet pour ajouter note par la suite.
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate("TabProject")} // pour la direction du button navigation.navigate
        >
          <LinearGradient
            colors={["#A996F2", "#8F79FC"]}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Voir mes projets</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 25,
  },
  date: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: Platform.OS === "android" ? 60 : 30,
    //marginLeft: Platform.OS === "android" ? 15 : 5,
  },
  cards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    height: 150,
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  cardNumber: {
    fontSize: 50,
    color: "white",
  },
  cardText: {
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 45,
    marginBottom: 15,
  },
  image: {
    width: 350,
    height: 200,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Home;
