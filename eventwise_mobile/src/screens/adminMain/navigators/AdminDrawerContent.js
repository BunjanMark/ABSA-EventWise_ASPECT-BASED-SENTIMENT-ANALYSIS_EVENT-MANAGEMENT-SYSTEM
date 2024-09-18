import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { Linking } from "react-native";
import logo from "../../../../assets/logo.png";
import profilepic from "../../../../assets/profilepic.jpg";
import logoWhite from "../../../../assets/logoWhite.png";
import { Avatar } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AdminDrawerContent = (props) => {
  const [selectedItem, setSelectedItem] = useState("HomeAdmin");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const DrawerItem = ({ iconComponent, label, screenName }) => (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        screenName === selectedItem && { backgroundColor: "#FFC42B" },
      ]}
      onPress={() => {
        switch (screenName) {
          case "HomeAdmin":
            setSelectedItem(screenName);
            navigation.navigate("HomeAdmin");
            break;
          case "Attendee Tracker":
            setSelectedItem(screenName);
            navigation.navigate("Attendee Tracker");
            break;
          case "Inventory Tracker":
            setSelectedItem(screenName);
            navigation.navigate("Inventory Tracker");
            break;
          default:
            break;
        }
      }}
    >
      {/* <MaterialCommunityIcons
        name={icon}
        size={24}
        color={screenName === selectedItem ? "black" : "dark-gray"}
        style={styles.drawerIcon}
      /> */}
      {iconComponent}
      <Text
        style={[
          styles.drawerItemText,
          { color: screenName === selectedItem ? "white" : "black" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  const DropdownItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
      <Ionicons
        name={icon}
        size={20}
        color="black"
        style={styles.dropdownIcon}
      />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      colors={["#FFFF", "#FFC42B"]}
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 2.1 }} // Bottom
      style={styles.drawerContent}
    >
      {/* <View style={styles.drawerSeparator} /> */}
      <View style={styles.drawerHeader}>
        <Image source={logoWhite} style={styles.logo} resizeMode="center" />
      </View>
      <View style={styles.userInfo}>
        <Avatar.Image
          size={50}
          source={profilepic}
          style={styles.profilePicture}
        />
        <TouchableOpacity
          style={styles.userInfoTop}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.userName}>Avril Carasco</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="black"
              style={styles.userInfoIcon}
            />
          </View>

          <Text style={styles.userRole}>Admin</Text>
        </TouchableOpacity>
        {/* Switch profile section */}
      </View>

      <DrawerContentScrollView
        {...props}
        style={{
          display: "flex",
          flex: 1,
          marginTop: -5,
        }}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <DrawerItem
          label="Home"
          iconComponent={
            <Ionicons
              name={selectedItem === "HomeAdmin" ? "home" : "home-outline"}
              size={24}
              color={selectedItem === "HomeAdmin" ? "black" : "dark-gray"}
              style={styles.drawerIcon}
            />
          }
          icon={"view-dashboard"}
          screenName={"HomeAdmin"}
          onPress={() => props.navigation.navigate("HomeAdmin")}
        />
        <DrawerItem
          label="Attendee Tracker"
          iconComponent={
            <Ionicons
              name={
                selectedItem === "Attendee Tracker"
                  ? "people-circle-sharp"
                  : "people-circle-outline"
              }
              size={24}
              color={
                selectedItem === "Attendee Tracker" ? "black" : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          onPress={() =>
            props.navigation.navigate("AtendeeTrackerStackNavigator")
          }
          screenName={"Attendee Tracker"}
          icon={"people-group"}
        />
        <DrawerItem
          label="Inventory Tracker"
          iconComponent={
            <MaterialCommunityIcons
              name={
                selectedItem === "Inventory Tracker"
                  ? "toolbox"
                  : "toolbox-outline"
              }
              size={24}
              color={
                selectedItem === "Inventory Tracker" ? "black" : "dark-gray"
              }
              style={styles.drawerIcon}
            />
          }
          screenName={"Inventory Tracker"}
          onPress={() => props.navigation.navigate("OptionsSP")}
        />
      </DrawerContentScrollView>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <DropdownItem
            icon="person"
            label="Profile"
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("Profile");
              console.log("Profile");
            }}
          />
          <DropdownItem
            icon="settings"
            label="Settings"
            onPress={() => {
              setDropdownVisible(false);
              navigation.navigate("Settings");
              console.log("Settings");
            }}
          />
          <DropdownItem
            icon="log-out"
            label="Logout"
            onPress={() => {
              setDropdownVisible(false);
              // Handle logout functionality here
            }}
          />
        </View>
      )}
      {/* Footer Content */}

      <View style={styles.sidebarFooter}>
        <Text style={{ ...styles.footerText, color: "black" }}>
          Version 1.0.0
        </Text>
        {/* <View style={styles.socialIcons}>
          <Ionicons name="logo-facebook" size={24} color="#3b5998" />
          <Ionicons name="logo-twitter" size={24} color="#00acee" />
          <Ionicons name="logo-instagram" size={24} color="#C13584" />
        </View> */}
        <Text style={{ ...styles.footerText, color: "black" }}>
          © 2024{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            EventWise
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default AdminDrawerContent;
