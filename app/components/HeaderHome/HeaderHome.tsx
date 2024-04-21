import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../../store/reducers/auth/action-creator";
import { useNavigation } from "@react-navigation/native";

const HeaderHome: FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem("account");
      setUserData(JSON.parse(data || "{}"));
    };

    fetchUserData();
  }, []);

  console.log("userData", userData);

  const logOut = () => {
    dispatch(
      //@ts-ignore
      AuthActionCreators.logout()
    );
    //@ts-ignore
    navigation.navigate("Login");
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nameUserContainer}>
        <Image
          source={require("../../images/Icon.png")}
          style={styles.logoHeader}
        />
        <Text style={styles.nameUserText}>
          {userData
            ? `${userData.last_name || ""} ${
                userData.first_name?.charAt(0) || ""
              }. ${userData.patronymic?.charAt(0) || ""}.`
            : "Загрузка..."}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => {
          logOut();
        }}
      >
        <Text>Выход</Text>
        <Image source={require("../../images/log-out.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  nameUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoHeader: {
    width: 32,
    height: 32,
  },
  nameUserText: {
    fontSize: 14,
    fontWeight: "700",
  },
  buttonLogout: {
    flexDirection: "row",
    gap: 4,
    padding: 6,
    backgroundColor: "#f3f3f5",
    borderRadius: 8,
  },
});

export default HeaderHome;
