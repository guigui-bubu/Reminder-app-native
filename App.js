// Librairies
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";

// Redux
import { createStore, applyMiddleware } from "redux"; // applyMiddleware => pour appliquer un middleware
import { Provider } from "react-redux";
import appReducer from "./store/reducers/app";
import thunk from "redux-thunk"; // Middleware

// Composant
import AppNavigator from "./navigation/AppNavigators";

const store = createStore(appReducer, applyMiddleware(thunk)); // applyMiddleware => pour ajouter notre Middleware

export default function App() {
  // Demander la permission pour envoyer des Notifs
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== "granted") {
        const { requestStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = requestStatus;
      }
    };
    getPermissions();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
