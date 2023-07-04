import { ImageBackground, Dimensions } from "react-native";
import { EmotionProvider } from "../contexts/EmotionContext";
import { StyleSheet } from "react-native";
import HomePage from "../pages/HomePage";

const bgImage = require("../images/bg.png");
const height = Dimensions.get("window").height;
const Home = () => {
  return (
    <EmotionProvider>
      <ImageBackground source={bgImage} style={styles.backgroundImage}>
        <HomePage />
      </ImageBackground>
    </EmotionProvider>
  );
};

export default Home;
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", 
    elevation: 0,
    height : 300,
  },
});
