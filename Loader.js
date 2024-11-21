import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
const Loader = () => {
  // useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.getItem("user")
  //       .then((data) => {
  //         if (data) {
  //           navigation.navigate("Home");
  //         } else {
  //           navigation.navigate("LoginScreen");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   })();
  // }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default Loader;
