import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Audio } from "expo-av";
import { fetchAudio } from "../services/AudioService";
import LoadingPage from "./LoadingPage";
import ImageCarausel from "../components/ImageCarausel";
import { EmotionContext } from "../contexts/EmotionContext";

const AudioPlayerPage = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentEmotion, emotionSetter } = useContext(EmotionContext);
  useEffect(() => {
    async function loadAudio(url) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: url });
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    }
    setIsLoading(true);
    fetchAudio(currentEmotion).then(async (res) => {
      if (res.length > 0) {
        var randomNumber = Math.floor(Math.random() * res.length);
        console.log(`random num ${randomNumber}`);
        const url = res[randomNumber].getUrl();
        await loadAudio(url);
        console.log("audi file loaded");
      }
      setIsLoading(false);
    });
  }, []);
  const togglePlayback = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }

        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    //console.log(`status is ${status.durationMillis} ${status.positionMillis}`);
    if (status.durationMillis === status.positionMillis) {
      // The audio track has ended
      setIsPlaying(false);
      emotionSetter(null);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <View style={styles.container}>
      <ImageCarausel />
      <View style={styles.wrapper}>
        <Image
          source={require("../images/sound_icon.png")}
          style={styles.icon}
        />
        <Image source={require("../images/track.png")} />
      </View>
      <TouchableOpacity style={styles.button} onPress={togglePlayback}>
        <Text style={styles.playButton}>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 32,
    backgroundColor: "white",
  },
  playButton: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    width: 75,
    height: 75,
    marginBottom: 16,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 250,
    backgroundColor: "#71C8F1",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 0,
    marginBottom: 16,
  },
});
