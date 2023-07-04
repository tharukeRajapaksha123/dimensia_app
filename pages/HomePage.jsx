import React, { useContext, useEffect, useState } from "react";
import { EmotionContext } from "../contexts/EmotionContext";
import ScanPage from "./ScanPage";
import AudioPlayerPage from "./AudioPlayerPage";
import GetAgePage from "./GetAgePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "./LoadingPage";
const HomePage = () => {
  const { currentEmotion } = useContext(EmotionContext);
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Data found
        console.log(value);
        setAge(value);
      } else {
        console.log("not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getData("age").then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!age) {
    return <GetAgePage />;
  }

  return currentEmotion ? <AudioPlayerPage /> : <ScanPage />;
};

export default HomePage;
