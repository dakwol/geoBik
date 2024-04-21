import React, { FC } from "react";
import { Text, View } from "react-native";

const LoadingScreen: FC = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Загрузка</Text>
    </View>
  );
};

export default LoadingScreen;
