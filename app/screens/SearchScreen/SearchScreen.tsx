import React, { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header/Header";
import LandploatsApiRequest from "../../api/Landploat/Landploat";
import { useTypeSelector } from "../../hooks/useTypedSelector";
import { SearchActionCreators } from "../../store/reducers/searchPressItem/action-creator";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const SearchScreen: FC = () => {
  const landploatApi = new LandploatsApiRequest();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchDataPress = useTypeSelector(
    (state: any) => state.search.dataPress
  );

  const [landploatData, setLandploatData] = useState([]);
  const [landploatOptions, setLandploatOptions] = useState([]);

  const inputData = [
    {
      id: 1,
      label: "Кадастровый номер",
      type: "string",
      key: "cadastral",
    },
    {
      id: 2,
      label: "ФИО",
      type: "string",
      key: "contragent_fio",
    },
    {
      id: 3,
      label: "Номер договора",
      type: "string",
      key: "contract_number",
    },
  ];

  const handleChange = (fieldName: string, fieldValue: string | boolean) => {
    //@ts-ignore
    dispatch(SearchActionCreators.setSearchDataPress(fieldName, fieldValue));
  };

  const onSearch = () => {
    const queryParams = Object.entries(searchDataPress)
      //@ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    landploatApi.getConstruction(`?${queryParams}`).then((resp) => {
      if (resp.success) {
        //@ts-ignore
        resp.data && setLandploatData(resp.data);
      }
    });
    landploatApi.options().then((resp) => {
      if (resp.success) {
        //@ts-ignore
        resp.data && setLandploatOptions(resp.data);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={"Поиск"} />
      <View style={styles.formContainer}>
        {inputData?.map((item) => {
          return (
            <View key={item.id} style={styles.inputContainer}>
              <Text style={styles.label}>{item.label}</Text>
              {/* {item.key === "cadastral" ? (
                <TextInputMask
                  style={styles.input}
                  onChangeText={(formatted, extracted) => {
                    handleChange(item.key, formatted);
                  }}
                  mask={"99:99:9999999:999"} // Пример маски для ввода номера телефона
                />
              ) : ( */}
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  handleChange(item.key, text);
                }}
              />
              {/* )} */}
            </View>
          );
        })}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onSearch();
          }}
        >
          <Text style={styles.buttonText}>Поиск</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerSearchLandploat}>
        {
          //@ts-ignore
          landploatData?.results &&
            //@ts-ignore
            landploatData?.results?.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.landploatContainer}
                  onPress={() =>
                    //@ts-ignore
                    navigation.navigate("Create", { id: item.id })
                  }
                >
                  <View>
                    <Text style={styles.upText}>{item.cadastral}</Text>
                    <Text style={styles.fio}>{item.contragent_fio}</Text>
                  </View>
                  <View>
                    <Text style={styles.upText}>
                      {
                        //@ts-ignore
                        landploatOptions?.actions?.[
                          "construction-control-list"
                        ].constructions_stage.style.choices.map(
                          //@ts-ignore
                          (data) => {
                            if (data[0] === item.constructions_stage) {
                              return data[1];
                            }
                          }
                        )
                      }
                    </Text>

                    <Text style={styles.fioRight}>{item.contract_number}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  formContainer: {
    gap: 12,
    borderBottomColor: "rgba(0, 16, 61, 0.12)",
    borderBottomWidth: 1,
  },
  inputContainer: {
    gap: 4,
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
    color: "#919399",
  },
  button: {
    backgroundColor: "#0B83D9",
    padding: 10,
    height: 40,
    borderRadius: 8,
    marginVertical: 24,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
  containerSearchLandploat: {
    gap: 12,
    marginVertical: 24,
  },
  landploatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#f3f3f5",
    borderRadius: 8,
  },
  upText: {
    fontSize: 14,
  },
  fio: {
    fontSize: 12,
    color: "#919399",
  },
  fioRight: {
    fontSize: 12,
    color: "#919399",
    textAlign: "right",
  },
});

export default SearchScreen;
