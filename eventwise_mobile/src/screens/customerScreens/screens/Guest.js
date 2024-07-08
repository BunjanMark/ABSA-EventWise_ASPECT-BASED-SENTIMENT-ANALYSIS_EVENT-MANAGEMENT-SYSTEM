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


const Guest = () => {
  return (
    <ImageBackground style={styles.background}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}></ScrollView>
      <TouchableOpacity onPress={() => navigator.navigate("BookEvent")}>
        <View
          style={[styles.logoutButton]}
        >
          <Text
            style={[styles.logoutButtonText]}
          >
            about
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "black",
    flexGrow: 1,
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