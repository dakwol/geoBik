// Navigation.js
import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import CreateScreen from "@/screens/CreateScreen/CreateScreen";
import HomeScreen from "@/screens/HomeScreen/HomeScreen";
import LoginScreen from "@/screens/LoginScreen/LoginScreen";
import SearchScreen from "@/screens/SearchScreen/SearchScreen";
import { useTypeSelector } from "@/hooks/useTypedSelector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "@/screens/LoadingScreen/LoadingScreen";

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const { isAuth, error, isLoading } = useTypeSelector((state) => state.auth);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem("account");
      setUserData(JSON.parse(data || "{}"));
      setIsUserDataLoaded(true); // Устанавливаем флаг загрузки данных пользователя
    };

    fetchUserData();
  }, [isAuth]);

  if (!isUserDataLoaded) {
    return <LoadingScreen />; // Показываем загрузочный экран, пока данные загружаются
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          userData && Object.keys(userData).length !== 0 ? "Home" : "Login"
        }
        screenOptions={{ headerTitle: "", headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
