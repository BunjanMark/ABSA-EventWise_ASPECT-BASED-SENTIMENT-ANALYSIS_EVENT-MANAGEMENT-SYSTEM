import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import SidebarMenu from "./SidebarMenu";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CustomHeader = ({ onBackPress, showBackButton }) => {
  const navigator = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.headerContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <Icon name="menu" size={24} color="black" />
        </TouchableOpacity>
        {showDropdown && <SidebarMenu onClose={() => setShowDropdown(false)} />}
        <Image
          source={require("../../../../assets/logoWhite.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("InboxView");
            }}
            style={styles.iconmessage}
          >
            <AntDesign name="message1" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigator.navigate("Notification");
            }}
            style={styles.iconButton}
          >
            <Icon name="notifications" size={24} color="black" />
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
    backgroundColor: "white",  
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
    marginLeft: "15",
    marginRight: "auto",
  },
  line: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -35,
    marginRight: -7,
    padding: 10,
  },
  iconmessage: {
    padding: 10,
    marginHorizontal: -5,
    marginTop: 3,
  },
  iconButton: {
    padding: 10,
    marginHorizontal: -5,
  },
  searchIconButton: {
    backgroundColor: '#D3D3D3', 
    borderRadius: 20,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default CustomHeader;
