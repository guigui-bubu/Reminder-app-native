// Librairies
import React from "react";
import { AppModalsNavigator } from "./Navigators";
import { NavigationContainer } from "@react-navigation/native";

function AppNavigator() {
  return (
    <NavigationContainer>
      <AppModalsNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
