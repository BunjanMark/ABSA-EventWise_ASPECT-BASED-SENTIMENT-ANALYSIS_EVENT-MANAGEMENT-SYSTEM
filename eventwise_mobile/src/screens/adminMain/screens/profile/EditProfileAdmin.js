import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/styles";
import MyButtonComponent from "../component/MyButtonComponent";
import useStore from "../../../../stateManagement/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import MyModal from "../component/MyModal";
const EditProfileAdmin = () => {
  // Zustand store for form fields
  const {
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    userPhone,
    setUserPhone,
  } = useStore();

  // Local state variables to hold the current input values
  const [inputUserName, setInputUserName] = useState(userName);
  const [inputUserEmail, setInputUserEmail] = useState(userEmail);
  const [inputUserPassword, setInputUserPassword] = useState(userPassword);
  const [inputUserPhone, setInputUserPhone] = useState(userPhone);

  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility

  const handleAddAnotherAccount = () => {
    navigation.navigate("AddAccountScreenAdmin");
  };
  const navigation = useNavigation();
  const handleSave = async () => {
    try {
      // Optional: Save to AsyncStorage if needed
      await AsyncStorage.setItem(
        "userProfile",
        JSON.stringify({
          userName: inputUserName,
          userEmail: inputUserEmail,
          userPassword: inputUserPassword,
          userPhone: inputUserPhone,
        })
      );

      // Update Zustand state with local input values
      setUserName(inputUserName);
      setUserEmail(inputUserEmail);
      setUserPassword(inputUserPassword);
      setUserPhone(inputUserPhone);

      // Show modal upon successful save
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={require("../../../../../assets/profilepic.jpg")}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.accountDetails}>
        <Text style={[styles.sectionTitle, { textAlign: "center" }]}>
          Account Details
        </Text>

        <View style={styles.inputGroup}>
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            value={inputUserEmail} // Use local state here
            onChangeText={setInputUserEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text>Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Username"
            value={inputUserName} // Use local state here
            onChangeText={setInputUserName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text>Change Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your New Password"
            secureTextEntry
            value={inputUserPassword} // Use local state here
            onChangeText={setInputUserPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Contact Number"
            keyboardType="phone-pad"
            value={inputUserPhone} // Use local state here
            onChangeText={setInputUserPhone}
          />
        </View>

        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 40,
            },
          ]}
        >
          <MyButtonComponent
            title="Save"
            icon="content-save"
            onPress={handleSave}
            backgroundColor="green"
            textColor="white"
            borderRadius={10}
            iconColor="white"
            fontSize={16}
          />
          <MyButtonComponent
            title="Add Another Account"
            icon="plus"
            onPress={handleAddAnotherAccount}
            backgroundColor="green"
            textColor="white"
            borderRadius={10}
            iconColor="white"
            fontSize={16}
            width={150}
          />
        </View>
      </View>
      <MyModal />
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)} // Handle the back button
      >
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <LinearGradient
            colors={["#FFFF", "#FFC42B"]}
            start={{ x: 0, y: 0 }} // Top
            end={{ x: 0, y: 2.1 }} // Bottom
            style={{
              height: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              width: "80%",
            }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={100}
              color="green"
            />
            <Text style={[styles.modalText, { fontSize: 15 }]}>
              You have Successfully Edited your Profile!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default EditProfileAdmin;
