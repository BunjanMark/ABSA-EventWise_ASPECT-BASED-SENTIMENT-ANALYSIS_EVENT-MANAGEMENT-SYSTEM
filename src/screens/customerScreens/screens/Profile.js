import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header2 from "../elements/Header2";

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
    <View style={styles.container}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.box}>
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
            <Text style={styles.userName}>{email}</Text>
            <Image
              source={require("../pictures/line.png")}
              style={styles.line}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity onPress={() => navigator.navigate("EditProfile")}>
            <View style={styles.editButton}>
              <FontAwesome
                name="pencil-square"
                size={16}
                color={"#fff"}
              />
              <Text style={styles.editButtonText}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 65,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontFamily: "Poppins",
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
    borderColor: "#ccc",
    marginTop: -90,
  },
  userCus: {
    marginTop: 10,
    fontSize: 20,
    color: "#000",
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Poppins",
  },
  line: {
    marginTop: 8,
  },
  lineSec: {
    marginTop: 25,
  },
  editButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 30,
    position: "relative",
    flexDirection: "row",
    width: 170,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins",
    marginLeft: 10,
  },
  box: {
    borderWidth: 1.5,
    borderColor: "#d9cda0",
    backgroundColor: '#f2eee1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#000", 
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default Profile;
