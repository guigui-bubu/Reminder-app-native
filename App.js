// Librairies
import React from "react";

// Redux
import { createStore, applyMiddleware } from "redux"; // applyMiddleware => pour appliquer un middleware
import { Provider } from "react-redux";
import appReducer from "./store/reducers/app";
import thunk from "redux-thunk"; // Middleware

// Composant
import AppNavigator from "./navigation/AppNavigators";

const store = createStore(appReducer, applyMiddleware(thunk)); // applyMiddleware => pour ajouter notre Middleware

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
