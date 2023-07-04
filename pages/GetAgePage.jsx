import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetAgePage = () => {
  const [age, setAge] = useState(0);
  const [message, setMessage] = useState("");
  const storeData = async (key, value) => {
    if (age < 40 || age > 80) {
      setMessage("Age should be between 40-80");
      return;
    }
    try {
      setMessage("");
      await AsyncStorage.setItem(key, value);
      console.log("age saved in loacal storafe");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styleSheed.container}>
      <Text style={styleSheed.text}>{message}</Text>
      <Text style={styleSheed.text}>Enter user age</Text>
      <TextInput
        onChangeText={(e) => {
          setAge(e);
        }}
        style={styleSheed.textInput}
        placeholder="Enter here"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styleSheed.button}
        onPress={() => {
          storeData("age", age);
        }}
      >
        <Text style={styleSheed.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetAgePage;

const styleSheed = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 800,
  },
  text: {
    color: "#D3D3D3",
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 16,
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
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
  buttonText: {
    color: "white",
  },
});
