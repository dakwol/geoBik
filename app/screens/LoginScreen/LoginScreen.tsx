import React, { FC, Fragment, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { DataPressActionCreators } from "../../store/reducers/dataPressItem/action-creator";
import { useTypeSelector } from "../../hooks/useTypedSelector";
import { AuthActionCreators } from "../../store/reducers/auth/action-creator";
import { useNavigation } from "@react-navigation/native";

const LoginScreen: FC = () => {
  const dispatch = useDispatch();
  const dataPress = useTypeSelector((state: any) => state.dataPress.dataPress);
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const { isAuth, error, isLoading } = useTypeSelector((state) => state.auth);

  const handleChange = (fieldName: string, fieldValue: string | boolean) => {
    //@ts-ignore
    dispatch(DataPressActionCreators.setDataPress(fieldName, fieldValue));
  };

  const authUser = () => {
    dispatch(
      //@ts-ignore
      AuthActionCreators.login(dataPress?.username, dataPress?.password)
    );
  };

  useEffect(() => {
    if (isAuth) {
      //@ts-ignore
      navigation.navigate("Home");
    }
  }, [isAuth]);

  return (
    <Fragment>
      <Image
        source={require("../../images/BG.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image source={require("../../images/Icon.png")}></Image>
          <Text style={styles.subtitle}>Контроль</Text>
          <Text style={styles.title}>ГЕОИЖС</Text>
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.titleForm}>Вход в систему</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Учетная запись</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChange("username", text)}
            />

            <View>
              <Text style={styles.label}>Пароль</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={isVisible}
                onChangeText={(text) => handleChange("password", text)}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: "45%" }}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Image
                  source={
                    !isVisible
                      ? require("../../images/eye-off.png")
                      : require("../../images/eye.png")
                  }
                ></Image>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonForm}
              onPress={() => authUser()}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Загрузка" : "Войти"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "120%",
    resizeMode: "cover",
    position: "absolute",
  },
  containerLogo: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
  },
  containerForm: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    gap: 16,
    marginBottom: 64,
  },
  titleForm: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
  },
  form: {
    gap: 8,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "rgba(0, 16, 61, 0.12)",
    borderWidth: 1,
    fontSize: 14,
    height: 40,
  },
  label: {
    fontSize: 12,
    paddingHorizontal: 12,
  },
  buttonForm: {
    backgroundColor: "#0B83D9",
    padding: 10,
    borderRadius: 8,
    height: 40,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
  },
});

export default LoginScreen;
