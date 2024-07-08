import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownMenu from "./DropdownMenu";

const CustomHeader = ({ onBackPress, showBackButton }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SafeAreaView>
    <SafeAreaView style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFC42B" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Icon name="menu" size={24} color="white" />
      </TouchableOpacity>
      {showDropdown && <DropdownMenu onClose={() => setShowDropdown(false)} />}
      <Image
        source={require("../pictures/logo1.png")} 
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.rightIcons}>       
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="message" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
    <Image
    source={require("../pictures/line.png")} 
    style={styles.line}
    resizeMode="contain"
  />
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 1,
    marginTop: -20
  },
  backButton: {
    position: "absolute",
    marginTop: 35,
    left: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  dropdownButton: {
    padding: 10,
  },
  logo: {
    flex: 1,
    height: "100%",
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  line: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 5
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: -20,
  },
  iconButton: {
    marginLeft:-20,
    padding: 10,
  },
});

export default CustomHeader;
