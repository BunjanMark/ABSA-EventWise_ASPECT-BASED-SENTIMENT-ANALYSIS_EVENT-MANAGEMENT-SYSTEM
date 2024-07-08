import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  onChangeSearch,
  searchQuery,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../elements/Header";


const Event = () => {
  return (
    <ImageBackground style={styles.background}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Searchbar
          placeholder="Search Event"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {/* <MyCarousel /> */}
      </ScrollView>
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

export default Event;