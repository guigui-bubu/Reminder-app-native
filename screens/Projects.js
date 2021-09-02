// Librairies

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

function Projects(props) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Projets</Text>
        <View style={styles.emptyProject}>
          <Image
            source={require("../assets/folder.png")}
            style={styles.illustration}
          />
          <Text>Commencez par créer votre promier projet.</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.navigate("addProject")}
          >
            <LinearGradient
              colors={["#A996F2", "#8F79FC"]}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Créer un projet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: Platform.OS == "android" ? 60 : 30,
  },
  illustration: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  emptyProject: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default Projects;
