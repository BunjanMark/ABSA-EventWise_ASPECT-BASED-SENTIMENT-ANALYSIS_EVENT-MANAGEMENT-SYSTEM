import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const Header2 = ({ onBackPress, showBackButton }) => {
  const navigator = useNavigation();
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
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
    backgroundColor: "#fff", 
    zIndex: 1,
    marginTop: -20,
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 15,
    marginLeft: -5
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

export default Header2;
