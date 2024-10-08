import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, SafeAreaView, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Header2 from "../elements/Header2";

const EditProfile = () => {
  const navigator = useNavigation();
  const navigation = useNavigation();
  const [editableUsername, setEditableUsername] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [editablePhoneNumber, setEditablePhoneNumber] = useState("");
  const [editablePassword, setEditablePassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPhoneNumber = await AsyncStorage.getItem("phoneNumber");
        const storedProfilePicture = await AsyncStorage.getItem("profilePicture");
        
        setEditableUsername(storedUsername || "");
        setEditableEmail(storedEmail || "");
        setEditablePhoneNumber(storedPhoneNumber || "");
        
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setProfilePicture(selectedImage.uri);

        await AsyncStorage.setItem("profilePicture", selectedImage.uri);

        const formData = new FormData();
        formData.append("profilePicture", {
          uri: selectedImage.uri,
          type: selectedImage.type || "image/jpeg",
          name: "profilePicture.jpg",
        });

        const response = await fetch("http://192.168.254.110:8000/uploadProfilePicture", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "Custom-Header": "Custom-Value",
          },
        });

        const data = await response.json();
        console.log("Image uploaded successfully:", data);
      } else {
        console.warn("Image selection canceled by user.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem("username", editableUsername);
      await AsyncStorage.setItem("email", editableEmail);
      await AsyncStorage.setItem("phoneNumber", editablePhoneNumber);
      await AsyncStorage.setItem("password", editablePassword);

      setModalVisible(true);
    } catch (error) {
      console.error("Error saving profile to AsyncStorage:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}> 
        <Header2 />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
             
          <View style={styles.userProfile}>
            <View style={styles.userAvatar}>
              <Image
                source={
                  profilePicture
                    ? { uri: profilePicture }
                    : require("../pictures/user.png")
                }
                style={styles.avatarImage}
              />
            </View>
            <TouchableOpacity
              onPress={handleEditProfilePicture}
              style={styles.editProfileIcon}
            >
              {loading && <ActivityIndicator size="large" color="#3498db" />}
              <Ionicons name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.accDet}>Account Details</Text>
          <View style={styles.accountDetails}>
            <Text style={styles.inputText}>Edit Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Username"
              value={editableUsername}
              onChangeText={setEditableUsername}
            />
            <Text style={styles.inputText}>Edit Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              value={editableEmail}
              onChangeText={setEditableEmail}
              keyboardType="email-address"
            />
            <Text style={styles.inputText}>Edit Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Phone Number"
              value={editablePhoneNumber}
              onChangeText={setEditablePhoneNumber}
              keyboardType="phone-pad"
            />
            <Text style={styles.inputText}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your New Password"
              value={editablePassword}
              onChangeText={setEditablePassword}
              secureTextEntry
            />
          </View>
          
          <Button
            style={{ ...styles.buttonStyle, backgroundColor: "#FFC42B" }}
            mode="contained-tonal"
            labelStyle={{ color: "black", fontWeight: "bold" }}
            onPress={handleSaveProfile}
          >
            Save
          </Button>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
             <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeIcon}
            >
              <Ionicons name="close" size={30} color="#6B6B6B" />
            </TouchableOpacity>
                <Image source={require("../pictures/success.png")} style={styles.modalImage} />
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => navigator.navigate("CreateAnotherAccount")}>
          <View style={styles.createButton}>
            <FontAwesome
              name="user-plus"
              size={24}
              color={"black"}
            />
            <Text style={styles.createButtonText}>
              Create Another Account
            </Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  accDet: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputText: {
    color: '#000',
    fontSize: 14,
  },
  userProfile: {
    alignItems: "center",
    marginTop: 5,
  },
  userAvatar: {
    position: "relative",
    width: 120,
    height: 110,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#000",
  },
  editProfileIcon: {
    justifyContent: "center",
    alignItems: "center",
    top: 75,
    left: 210,
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: "darkgray",
    position: "absolute",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  accountDetails: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#C2B067',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  buttonStyle: {
    marginVertical: 20,
    marginLeft: 90,
    marginRight: 90,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1,
  },
  createButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 200,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 290,
  },
  createButtonText: {
    color: "black",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default EditProfile;
