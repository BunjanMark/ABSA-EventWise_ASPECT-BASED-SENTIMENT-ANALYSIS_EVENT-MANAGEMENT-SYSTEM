import React, { useEffect, useRef } from "react";
import DrawerNavigator from "./navigators/DrawerNavigator";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications"; // Import Expo notifications
import FlashMessage, { showMessage } from "react-native-flash-message";

const AdminIndex = () => {
  const insets = useSafeAreaInsets(); // Get device-specific safe area insets
  const notificationListener = useRef(null); // Track listener

  useEffect(() => {
    // Check if a listener has already been added, and only add one if not
    if (!notificationListener.current) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          const { title, body } = notification.request.content;
          console.log("Foreground notification:", title, body);

          // Show the notification using FlashMessage
          showMessage({
            message: title,
            description: body,
            type: "info",
            icon: "default", // Automatically choose the icon based on type
            duration: 5000, // Duration of the notification
          });
        });
    }

    // Cleanup listener when component unmounts or when effect runs again
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
        notificationListener.current = null; // Clear the ref
      }
    };
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        {
          paddingTop: insets.top || StatusBar.currentHeight, // Adjust dynamically
        },
      ]}
    >
      <FlashMessage
        position="top"
        titleStyle={styles.flashMessageTitle} // Custom styles for the title
        style={styles.flashMessageContainer} // Custom container style
        descriptionStyle={styles.flashMessageDescription} // Custom description style
      />
      <DrawerNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  flashMessageContainer: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    flexDirection: "row",
    alignItems: "center", // Centering the icon and text
    justifyContent: "space-between",
  },
  flashMessageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // White color for the title
  },
  flashMessageDescription: {
    fontSize: 14,
    color: "#ffffff", // White color for the description text
  },
});

export default AdminIndex;
