import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { registerForPushNotificationsAsync } from "./PushNotification";
import { sendTokenToBackend } from "./PushNotification";
const HomeScreen = () => {
  const [user, setUser] = useState({ username: "Guest" });
  const [expoPushToken, setExpoPushToken] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        setUser(JSON.parse(data));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        const user = JSON.parse(data);
        if (user && user.id) {
          const token = await registerForPushNotificationsAsync();
          if (token) {
            await sendTokenToBackend(token, user.id);
            await AsyncStorage.setItem("pushToken", token); // Save token for later
          }
        } else {
          console.error("User ID not found!");
        }
      } catch (error) {
        console.error("Error during notification setup:", error);
      }
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const user = JSON.parse(userData);
        if (user && user.id) {
          const token = await registerForPushNotificationsAsync();
          if (token) {
            console.log("Registering push token for user ID:", user.id);
            await sendTokenToBackend(token, user.id);
          } else {
            console.error("Failed to register push token");
          }
        } else {
          console.error("User data not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error during notification setup:", error);
      }
    };

    setupNotifications();
  }, []);

  const handleSendNotification = async () => {
    try {
      const pushToken = await AsyncStorage.getItem("pushToken");
      console.log("token now", pushToken);

      if (pushToken) {
        const response = await fetch(
          "http://192.168.1.27:8000/api/send-notification",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: pushToken,
              sound: "default",
              title: `Hello ${user.username}!`,
              body: "This is a test notification",
              data: { someData: "goes here" },
            }),
          }
        );
        // captune submittions
        console.log("what I pass: ", response);
        // Capture raw response
        const rawResponse = await response.text();
        console.log("Raw response:", rawResponse);

        // Attempt to parse JSON if possible
        if (response.headers.get("content-type").includes("application/json")) {
          const responseJson = JSON.parse(rawResponse);
          console.log("Notification response JSON:", responseJson);
        } else {
          console.error("Response not in JSON format");
        }
      } else {
        console.error("Push token not found");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("pushToken");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {user.username}</Text>
      <Text>You will be able to receive push notifications here.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSendNotification()}
      >
        <Text>Send Push Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
};
export default HomeScreen;
