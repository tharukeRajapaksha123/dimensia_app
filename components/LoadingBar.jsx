import React, { useEffect,useState } from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, View} from "react-native";

const LoadingBar = () => {
  const progress = useState(0.0);

  useEffect(() => {
    // const animateProgress = Animated.loop(
    //     Animated.timing(progress, {
    //       toValue: 1,
    //       duration: 2000, // Total duration for each loop
    //       useNativeDriver: true,
    //     })
    //   );
    //   animateProgress.start();
    //   return () => {
    //     animateProgress.stop();
    //   };
  }, [progress]);

  return (
    <View style={styles.container}>
        <Progress.Bar progress={progress} color="#10658C"/>
    </View>
  );
};

export default LoadingBar;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
