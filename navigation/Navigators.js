// Librairies
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

// Ecrans
import HomeScreen from "../screens/Home";
import ProjectsScreen from "../screens/Projects";
import ProjectScreen from "../screens/Project";
import AddProjectScreen from "../screens/AddProject";
import AddNoteScreen from "../screens/AddNote";

// AppModalsNavigator
const ModalsNavigator = createStackNavigator();

export const AppModalsNavigator = () => {
  return (
    <ModalsNavigator.Navigator mode="modal">
      <ModalsNavigator.Screen
        name="app"
        component={AppTabNavigator}
        options={{ headerShown: false }}
      />
      <ModalsNavigator.Screen
        name="addNote"
        component={AddNoteScreen}
        options={{ headerShown: false }}
      />
      <ModalsNavigator.Screen
        name="addProject"
        component={AddProjectScreen}
        options={{ headerShown: false }}
      />
    </ModalsNavigator.Navigator>
  );
};

// AppTabNavigator
const TabNavigator = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "TabHome") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name == "TabProject") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        headerShown: false, // retirer le header de la tab
      })}
    >
      <TabNavigator.Screen
        name="TabHome"
        component={HomeScreen}
        options={{ title: "Notes" }}
      />
      <TabNavigator.Screen
        name="TabProject"
        component={ProjectsStackNavigator}
        options={{ title: "Projets" }}
      />
    </TabNavigator.Navigator>
  );
};

// ProjectsStackNavigator
const ProjectsNavigator = createStackNavigator();

const ProjectsStackNavigator = () => {
  return (
    <ProjectsNavigator.Navigator>
      <ProjectsNavigator.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ headerShown: false }}
      />
      <ProjectsNavigator.Screen
        name="Project"
        component={ProjectScreen}
        options={{ headerShown: false }}
      />
    </ProjectsNavigator.Navigator>
  );
};
