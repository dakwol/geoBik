import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const HomeScreen: FC = () => {
  const navigation = useNavigation();

  const [dataLandploat, setDataLandploat] = useState<any>([]);
  const dispatch = useDispatch();
  const buttonData = [
    {
      id: 1,
      text: "Добавить",
      //@ts-ignore
      onClick: () => navigation.navigate("Search"),
    },
    {
      id: 2,
      text: "Карта микрорайона",
      onClick: () => {},
    },
  ];

  // useEffect(() => {
  //   const fetchDataLandploat = async () => {
  //     const data = await AsyncStorage.getItem("data");
  //     setDataLandploat(JSON.parse(data || "{}"));
  //   };

  //   fetchDataLandploat();
  // }, []);

  return (
    <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
      <HeaderHome />

      <View style={styles.buttonContainer}>
        {buttonData.map((item) => {
          return (
            <TouchableOpacity
              style={styles.button}
              key={item.id}
              onPress={() => item.onClick()}
            >
              <Text style={styles.textButton}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* <Text>Последние действия</Text>
      <View>
        {dataLandploat.lenght > 0 &&
          dataLandploat?.map((item: any) => {
            return <Text>{item.cadastral}</Text>;
          })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 8,
    marginVertical: 24,
  },
  button: {
    backgroundColor: "#0b83d9",
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
});

export default HomeScreen;
