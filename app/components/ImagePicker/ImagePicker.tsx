import React, { FC, useState, useEffect } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ImagePickerExampleProps {
  isVisible: boolean;
  onClose: () => void;
  onImagePick: (imageUris: string[]) => void; // Callback function to handle image pick
}

const ImagePickerExample: FC<ImagePickerExampleProps> = ({
  isVisible,
  onClose,
  onImagePick,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true, // Enable multiple selection
    });

    if (!result.canceled) {
      //@ts-ignore
      const selectedUris = result.assets.map((asset: any) => asset);
      setSelectedImages(selectedUris);
      onImagePick(selectedUris); // Notify the parent component about the selected images
    }
  };

  useEffect(() => {
    if (isVisible) {
      pickImage(); // Call pickImage when the component is visible
    }
  }, [isVisible]);

  useEffect(() => {
    if (selectedImages.length > 0) {
      onClose();
    }
  }, [selectedImages]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: isVisible ? "flex" : "none",
      }}
    ></View>
  );
};

export default ImagePickerExample;
