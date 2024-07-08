import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Header from "../elements/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Guest = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}></ScrollView>
        <TouchableOpacity onPress={() => navigator.navigate("BookEvent")}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>about</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 500,
    margin: 100,
    position: "relative",
  },
  logoutButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Guest;
