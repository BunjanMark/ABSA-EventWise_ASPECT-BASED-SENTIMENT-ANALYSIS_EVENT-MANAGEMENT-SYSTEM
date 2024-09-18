import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import logo from "../../../../../assets/logo.png";
const HeaderAdmin = ({
  title,
  onMessagePress,
  onNotificationPress,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu-outline" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      <Image source={logo} style={styles.logo} />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onMessagePress} style={styles.headerButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.headerButton}
        >
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeaderAdmin;
