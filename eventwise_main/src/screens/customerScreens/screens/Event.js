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
  searchQuery
} from "react-native";
import { Searchbar } from "react-native-paper";
import Header from "../elements/Header";

const Event = () => {
  return (
    <ImageBackground
      source={require("../pictures/bg.png")}
      style={styles.backgroundImage}
    >
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
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
  },
  searchBar: {
    marginVertical: 20,
  },
});

export default Event;
