import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SidebarMenu = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../pictures/bg.png")}
          style={styles.background}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.option} onPress={() => handlePress("Profile")}>
            <Icon name="person" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.option} onPress={() => handlePress("Home")}>
            <Icon name="home" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => handlePress("InventoryTracker")}>
            <Icon name="list" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Inventory Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => handlePress("Schedule")}>
            <Icon name="calendar-today" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => handlePress("Settings")}>
            <Icon name="settings" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={() => handlePress("Login")}>
              <Icon name="exit-to-app" size={24} color="#fff" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 5,
    marginLeft: -5
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default SidebarMenu;
