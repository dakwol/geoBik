import React, { FC, Fragment, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import Header from "../../components/Header/Header";
import LandploatsApiRequest from "../../api/Landploat/Landploat";
import ImagePickerExample from "../../components/ImagePicker/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  formatDateIntlDateTime,
  getFormattedStandartDate,
} from "../../components/UI/functions/functions";
import apiConfig from "../../api/apiConfig";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

type Props = {
  route: any;
};

const CreateScreen: FC<Props> = ({ route }) => {
  const { id } = route.params;
  const landploatApi = new LandploatsApiRequest();
  const navigation = useNavigation();
  const [landploatData, setLandploatData] = useState();
  const [landploatOptions, setLandploatOptions] = useState([]);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [isComment, setIsComment] = useState("");
  const [visibleChoices, setVisibleChoices] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // State to store selected images
  const [selectedType, setSelectedType] = useState(null);
  const currentDate = new Date();

  const typeVerification = [
    {
      id: 1,
      label: "Проверка",
      value: "Проверка",
    },
    {
      id: 2,
      label: "Нарушение",
      value: "Нарушение",
    },
    {
      id: 3,
      label: "Ситуации",
      value: "Ситуации",
    },
  ];

  useEffect(() => {
    landploatApi.getConstructionById(`${id}/`).then((resp) => {
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
  }, []);
  const showImagePicker = () => {
    setIsImagePickerVisible(true);
  };

  const hideImagePicker = () => {
    setIsImagePickerVisible(!isImagePickerVisible);
  };
  const loadImage = async (acceptedFiles: any) => {
    const formData = new FormData();
    const isConnected = await checkInternetConnectivity();

    acceptedFiles.forEach((file: any) => {
      //@ts-ignore
      formData.append("file", {
        uri: file.uri,
        type: "image/jpeg",
        name: "imagename.jpg",
      });
    });

    if (isConnected) {
      landploatApi.uploadImage(formData).then((resp) => {
        if (resp.success) {
          setSelectedImages((prevSelectedImages) =>
            //@ts-ignore
            prevSelectedImages.concat(resp.data)
          );
        }
      });
    } else {
      //@ts-ignore
      setSelectedImages(formData);
    }
  };

  const changeType = (value: any) => {
    setSelectedType(value);
    setVisibleChoices(false);
  };

  const checkInternetConnectivity = async () => {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected;
    } catch (error) {
      console.error("Error checking internet connectivity:", error);
      return false;
    }
  };

  const createInspections = async () => {
    let hasError = false;

    if (!isComment || isComment.length === 0) {
      hasError = true;
    }
    if (hasError) {
      // setIsErr("Заполните все обязательные поля.");
    } else {
      const isConnected = await checkInternetConnectivity();
      const dataInspections = {
        name:
          //@ts-ignore
          selectedType && selectedType.value === "Нарушение"
            ? `Нарушение ${formatDateIntlDateTime(currentDate)}`
            : `Проверка ${formatDateIntlDateTime(currentDate)}`,
        images: selectedImages,
        date: getFormattedStandartDate(currentDate),
        comment: isComment,
        //@ts-ignore
        is_situation: selectedType.value === "Ситуации",
        //@ts-ignore
        is_violation: selectedType.value === "Нарушение",
        //@ts-ignore
        violation: selectedType.value === "Нарушение" ? "OTHER" : null,
      };
      if (isConnected) {
        landploatApi.createInspection(id, dataInspections).then((resp) => {
          if (resp.success) {
            navigation.goBack();
          }
        });
      } else {
        await AsyncStorage.setItem("data", JSON.stringify(dataInspections));
        //@ts-ignore
        navigation.navigate("Home");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={"Создание"} />
      {landploatData && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#f3f3f5",
            padding: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <View>
            <Text style={{ fontSize: 14 }}>
              {
                //@ts-ignore
                landploatData.cadastral
              }
            </Text>
            <Text style={{ color: "#919399", fontSize: 12 }}>
              {
                //@ts-ignore
                landploatData.contragent_fio
              }
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>
              {
                //@ts-ignore
                landploatOptions?.actions?.[
                  "construction-control-list"
                ].constructions_stage.style.choices.map(
                  //@ts-ignore
                  (data) => {
                    //@ts-ignore
                    if (data[0] === landploatData.constructions_stage) {
                      return data[1];
                    }
                  }
                )
              }
            </Text>
            <Text
              style={{ color: "#919399", fontSize: 12, textAlign: "right" }}
            >
              {
                //@ts-ignore
                landploatData.contract_number
              }
            </Text>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Тип проверки</Text>
        <TextInput
          style={styles.input}
          //@ts-ignore
          value={selectedType ? selectedType.value : ""}
          onFocus={() => setVisibleChoices(true)}
        />
        {visibleChoices && (
          <View style={{ gap: 8 }}>
            {typeVerification.map((item) => {
              return (
                <Text
                  onPress={() => {
                    //@ts-ignore
                    changeType(item);
                  }}
                  style={{
                    borderColor: "#BFC1C7",
                    borderBottomWidth: 1,
                    padding: 8,
                  }}
                >
                  {item.label}
                </Text>
              );
            })}
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Комментарий</Text>
        <TextInput
          style={[styles.input, styles.textArea]} // Добавляем стили для textArea
          multiline={true} // Разрешаем многострочный ввод
          onChangeText={(text) => {
            setIsComment(text);
          }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => showImagePicker()}>
        <Text style={styles.buttonText}>Загрузить фотографии</Text>
      </TouchableOpacity>
      {selectedImages.length > 0 && (
        <Fragment>
          <Text style={styles.label}>Загруженные файлы</Text>
          <View style={styles.selectedImagesContainer}>
            {selectedImages.map((image, index) => {
              return (
                <Image
                  key={index}
                  //@ts-ignore
                  source={{ uri: `${apiConfig.baseUrlMedia}${image.url}` }}
                  style={styles.selectedImage}
                />
              );
            })}
          </View>
        </Fragment>
      )}
      <TouchableOpacity
        style={styles.buttonGreen}
        onPress={() => createInspections()}
      >
        <Text style={styles.buttonText}>Создать</Text>
      </TouchableOpacity>
      <ImagePickerExample
        isVisible={isImagePickerVisible}
        onClose={() => hideImagePicker()}
        onImagePick={(e) => {
          loadImage(e);
        }}
      />
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
    position: "relative",
    marginTop: 12,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "rgba(0, 16, 61, 0.12)",
    borderWidth: 1,
    fontSize: 14,
    height: 40,
    position: "relative",
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
  buttonGreen: {
    backgroundColor: "#0cc",
    padding: 10,
    height: 40,
    borderRadius: 8,
    marginVertical: 24,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  selectedImage: {
    width: 76,
    height: 76,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", // Вертикальное выравнивание текста вверху
  },
});

export default CreateScreen;
