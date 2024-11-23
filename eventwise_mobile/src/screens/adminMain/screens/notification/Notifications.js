import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import * as Notifications from "expo-notifications"; // Import Expo Notifications

export default NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);

  // Listener to handle incoming notifications
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        const newNotification = {
          id: Date.now(), // Use timestamp as unique ID
          name: title || "Unknown Sender",
          text: body || "No message content",
          image: "https://bootdey.com/img/Content/avatar/avatar6.png", // Default avatar
          attachment: "", // Optional attachment URL
          receivedAt: new Date(),
          isRead: false, // Set initial state as unread
        };
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]); // Add new notification to the top
      }
    );

    // Cleanup listener
    return () => subscription.remove();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]); // Clears all notifications
  };

  return (
    <>
      <Button title="Clear All" onPress={clearAllNotifications} />
      <FlatList
        style={styles.root}
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const timeAgo = formatDistanceToNow(new Date(item.receivedAt), {
            addSuffix: true,
          });
          return (
            <TouchableOpacity
              style={[
                styles.container,
                { backgroundColor: item.isRead ? "#FFFFFF" : "#F0F8FF" },
              ]}
              onPress={() => markAsRead(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.content}>
                <View style={styles.mainContent}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>{item.text}</Text>
                  </View>
                  <Text style={styles.timeAgo}>{timeAgo}</Text>
                </View>
                {item.attachment ? (
                  <Image
                    style={styles.attachment}
                    source={{ uri: item.attachment }}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  timeAgo: {
    color: "gray",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#e1e1e1",
  },
  attachment: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});
