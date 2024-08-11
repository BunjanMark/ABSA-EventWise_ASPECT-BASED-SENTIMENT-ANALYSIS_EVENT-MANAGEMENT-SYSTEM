import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "./SidebarMenu";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBAr";

const HeaderSP = ({ onBackPress, showBackButton }) => {
  const navigator = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#FFC42B" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}
        >
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        {showDropdown && <SidebarMenu onClose={() => setShowDropdown(false)} />}
        <Image
          source={require("../pictures/logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("InboxView");
            }}
            style={styles.iconButton}
          >
            <Icon name="message" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigator.navigate("Notification");
            }}
            style={styles.iconButton}
          >
            <Icon name="notifications" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSearch(true)}
            style={styles.searchIconButton}
          >
            <Icon name="search" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Image
        source={require("../pictures/line.png")}
        style={styles.line}
        resizeMode="contain"
      />
      {showSearch && (
        <SearchBar
          onClose={() => setShowSearch(false)}
          onSearch={handleSearch}
        />
      )}
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
    marginTop: -20,
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
    marginTop: 5,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -40,
  },
  iconButton: {
    padding: 10,
    marginHorizontal: -10,
  },
  searchIconButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default HeaderSP;
