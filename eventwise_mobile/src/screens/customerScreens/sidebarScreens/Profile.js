import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../elements/Header";

const Profile = () => {
  const navigator = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        const storedBirthday = await AsyncStorage.getItem("birthday");
        const storedProfilePicture = await AsyncStorage.getItem("profilePicture");

        setUsername(storedUsername || "Customer Name");
        setEmail(storedEmail || "My Email");
        setPhoneNumber(storedPhoneNumber || "My Phone number");
        setBirthday(storedBirthday || "My Birthday");
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Profile</Text>
          </View>
             
          <View style={styles.userProfile}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require("../pictures/user.png")
              }
              style={styles.avatarImage}
            />
            <Text style={styles.userName}>{username}</Text>
            <Image
              source={require("../pictures/line.png")}
              style={styles.line}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>{username}</Text>
            <Divider style={styles.infoDivider}/>
            <Text style={styles.infoText}>{email}</Text>
            <Divider style={styles.infoDivider}/>
            <Text style={styles.infoText}>{phoneNumber}</Text>
            <Divider style={styles.infoDivider}/>
            <Text style={styles.infoText}>{birthday}</Text>
            <Divider style={styles.infoDivider}/>
          </View>

          <TouchableOpacity onPress={() => navigator.navigate("EditProfile")}>
            <View style={styles.editButton}>
              <FontAwesome
                name="pencil-square"
                size={24}
                color={"white"}
              />
              <Text style={styles.editButtonText}>
                Edit My Profile
              </Text>
            </View>
          </TouchableOpacity>
          <Image
              source={require("../pictures/line.png")}
              style={styles.lineSec}
              resizeMode="contain"
            />
          <TouchableOpacity onPress={() => navigator.navigate("CreateAnotherAccount")}>
            <View style={styles.createButton}>
              <FontAwesome
                name="user-plus"
                size={24}
                color={"white"}
              />
              <Text style={styles.createButtonText}>
                Create Another Account
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.accountsSection}>
           <Divider style={styles.accDivider}/>
            <Text style={styles.accountsHeader}>Your Accounts</Text>
            <View style={styles.accountCard}>
              <Image source={require("../pictures/user.png")} style={styles.accountImage} />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>Customer Name</Text>
                <Text style={styles.accountType}>Customer</Text>
              </View>
              <FontAwesome name="ellipsis-h" size={20} color={"#333"} style={styles.dots}/>
            </View>
            <View style={styles.accountCard}>
              <Image source={require("../pictures/user.png")} style={styles.accountImage} />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>SP Name</Text>
                <Text style={styles.accountType}>Service Provider</Text>
              </View>
              <FontAwesome name="ellipsis-h" size={20} color={"#333"} style={styles.dots}/>
            </View>
            <TouchableOpacity onPress={() => navigator.navigate("Login")}>
            <View style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userProfile: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  line: {
    marginTop: 8,
  },
  lineSec: {
    marginTop: 25,
  },
  infoSection: {
    marginVertical: -5,
  },
  infoDivider: {
    marginVertical: 5,
    height: 3,
    backgroundColor: "rgba(230, 184, 0, 0.5)"
  },
  infoText: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 8,
    marginLeft: 15,
  },
  editButton: {
    backgroundColor: "#61481C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 30,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 210,
  },
  editButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  createButton: {
    backgroundColor: "rgba(97, 72, 28, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 50,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 290,
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  accountsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(245, 245, 245, 0.8)",
    borderRadius: 10,
  },
  accDivider: {
    height: 7,
    width: 50,
    backgroundColor: "#878787",
    alignSelf: "center",
    marginBottom: 20,
  },
  accountsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#545454",
    backgroundColor: "#ffe9d2",
    marginBottom: 15,
    borderRadius: 8,
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  accountInfo: {
    flex: 1,
    marginLeft: 10,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountType: {
    fontSize: 14,
    color: "#888",
  },
  dots: {
    marginRight: 20,
  },
  logoutButton: {
    backgroundColor: "#61481C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 35,
    marginLeft: 80,
    marginRight: 80,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Profile;
