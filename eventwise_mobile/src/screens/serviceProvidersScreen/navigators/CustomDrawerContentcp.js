import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logoWhite.png";

const CustomDrawerContent = (props) => {
  return (
    <LinearGradient
      colors={["#FFFF", "#FFC42B"]}
      start={{ x: 0, y: 0 }} // Top
      end={{ x: 0, y: 1 }} // Bottom
      style={styles.drawerContent}
    >
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image source={logoWhite} style={styles.logo} resizeMode="center" />
        </View>
        <View style={styles.drawerSeparator} />
        <DrawerItem
          label="Home"
          icon={({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate("HomeSP")}
        />
        <DrawerItem
          label="Profile"
          icon={({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate("Profile")}
        />
        <DrawerItem
          label="Settings"
          icon={({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate("OptionsSP")}
        />
        {/* Footer Content */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <View style={styles.socialIcons}>
            <Ionicons name="logo-facebook" size={24} color="#3b5998" />
            <Ionicons name="logo-twitter" size={24} color="#00acee" />
            <Ionicons name="logo-instagram" size={24} color="#C13584" />
          </View>
          <Text style={styles.footerText}>© 2024 Your Company</Text>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginVertical: 5,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginVertical: 10,
  },
  drawerHeader: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
