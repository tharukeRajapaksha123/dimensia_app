import { useState, useEffect, useContext } from "react";
import { Image, View, StyleSheet, Text, Dimensions } from "react-native";

import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import constants from "../constants";
import axios from "axios";
import { EmotionContext } from "../contexts/EmotionContext";

import { ActivityIndicator } from "react-native";

const ScanPage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { emotionSetter } = useContext(EmotionContext);

  const requestCameraAndStoragePermission = async () => {
    try {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
      );

      if (status === "granted") {
        console.log("Camera and Storage permissions granted");
      } else {
        console.log("Camera and Storage permissions denied");
      }
    } catch (err) {
      console.warn("Error requesting camera and storage permission:", err);
    }
  };
  const handleImagePicker = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,

      aspect: [1, 1],
      quality: 1,
    };

    const result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const send = async () => {
    try {
      let filename = imageUri.split("/").pop();
      console.log(`file name ${filename}`);
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log(`file type ${type}`);
      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        name: filename,
        type: type,
      });

      // Make the Axios POST request
      setIsLoading(true);
      await axios
        .post(`${constants.baseUrl}/predict`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.status);
          console.log(res.data);
          emotionSetter(res.data["emotion"]);
        })
        .catch((err) => {
          console.log(`Axios ERROR ${err}`);
        });
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    requestCameraAndStoragePermission();
  }, []);

  return (
    <View style={stylSheed.container}>
      {!imageUri && (
        <Button
          onPressed={() => {
            handleImagePicker();
          }}
          text={"Pick an image"}
          style={stylSheed.buttonStyle}
        />
      )}
      {imageUri && (
        <View style={stylSheed.card}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={stylSheed.image}
          />
          {isLoading ? (
            <View style={stylSheed.wrapper}>
              <Text style={stylSheed.scanningStyle}>SCANNING ...</Text>
              <ActivityIndicator size={50} />
            </View>
          ) : (
            <View style={stylSheed.row}>
              <Button
                onPressed={() => {
                  send();
                }}
                text={"Send"}
                style={stylSheed.buttonStyle}
              />
              <Button
                onPressed={() => {
                  handleImagePicker();
                }}
                text={"Pick Another"}
                style={stylSheed.buttonStyle}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ScanPage;

const stylSheed = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: 800,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: "#71C8F1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: 150,
    height: 50,
    marginTop: 16,
    marginBottom: 16,
  },
  image: {
    width: 350,
    height: 450,
  },
  card: {
    width: 800,
    display: "flex",
    flexDirection: "column",
    height: 600,
    alignItems: "center",
    justifyContent: "space-around",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
  },
  scanningStyle: {
    color: "#10658C",
    fontSize: 18,
    fontWeight: "bold",
  },
  wrapper: {
    height: 100,
  },
});
