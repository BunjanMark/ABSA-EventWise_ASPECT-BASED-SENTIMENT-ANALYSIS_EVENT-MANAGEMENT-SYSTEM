import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ onBackPress }) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigation.navigate("landing");
    toggleDropdown();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={20} color="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Image
        source={require("../assets/EMSLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={toggleDropdown}>
        <Ionicons name="person-circle" size={24} color="black" style={styles.profileIcon} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dropdownVisible}
        onRequestClose={toggleDropdown}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={toggleDropdown}
        >
          <View style={styles.modalContent}>
      
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 100,
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    zIndex: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  logo: {
    marginLeft: 85,
    marginRight: "auto",
    width: "40%",
    height: "70%",
    resizeMode: "contain",
  },
  backIcon: {
    marginLeft: 15,
    marginBottom: 5,
  },
  profileIcon: {
    marginLeft: "auto",
    marginBottom: 5,
    marginRight: 17,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    position: "absolute",
    top: 130, 
    right: 10,
    backgroundColor: "rgba(255, 196, 43, 0.7)", 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 140,
    flexDirection: "column",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 18,
    textAlign: "center",
  },
  logoutButton: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
  },
  cancelText: {
    color: "white",
  },
  logoutText: {
    color: "white",
  },
});

export default CustomHeader;
