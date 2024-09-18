import React from "react";
import { SafeAreaView, ImageBackground, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default Landing = () => {
  const navigator = useNavigation();

  return (
    <ImageBackground
      source={require("../customerScreens/pictures/landingbg.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../customerScreens/pictures/logo.png")}
          style={{
            ...styles.logo,
            width: 200,
            height: 300,
          }}
          resizeMode="contain"
        />
        <SafeAreaView style={styles.welcome}>
          <Text
            variant="headlineMedium"
            style={{
              fontSize: widthPercentageToDP("9%"),
              color: "#A97E00",
              marginBottom: heightPercentageToDP("1%"),
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            WELCOME
          </Text>
        </SafeAreaView>

        <SafeAreaView style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              navigator.navigate("AdminStack");
            }}
            style={{
              backgroundColor: "#CEB64C",
              borderWidth: 2,
              width: widthPercentageToDP("70%"),
              height: heightPercentageToDP("6%"),
            }}
            contentStyle={{
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
            }}
            labelStyle={{
              fontSize: widthPercentageToDP("4%"),
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Log In
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              navigator.navigate("Register");
            }}
            style={{
              backgroundColor: "#61481C",
              borderWidth: 2,
              width: widthPercentageToDP("70%"),
              height: heightPercentageToDP("6%"),
            }}
            contentStyle={{
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
            }}
            labelStyle={{
              fontSize: widthPercentageToDP("4%"),
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: heightPercentageToDP("15%"),
  },
  logo: {
    position: "absolute",
    top: heightPercentageToDP("20%"),
  },
  welcome: {
    bottom: 450,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    bottom: 170,
    flexDirection: "column",
    gap: heightPercentageToDP("4%"),
  },
});
