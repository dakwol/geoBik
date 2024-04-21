import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IHeader {
  title: string;
}

const Header: FC<IHeader> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        //@ts-ignore
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../../images/chevron-left.png")} />
        <Text style={styles.backButtonText}>Назад</Text>
      </TouchableOpacity>
      <Text style={styles.titleHeader}>{title}</Text>
      <View style={{ width: "13%" }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 12,
    color: "#0B83D9",
  },
  titleHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Header;
