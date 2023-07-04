import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";


const LoadingPage = () => {
  

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <ActivityIndicator size="large" color={"#71C8F1"} />
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
