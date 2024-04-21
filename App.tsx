// App.js
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "@/screens/LoadingScreen/LoadingScreen";
import { store } from "./app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTypeSelector } from "@/hooks/useTypedSelector";
import Navigation from "@/navigation/Navigation";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
