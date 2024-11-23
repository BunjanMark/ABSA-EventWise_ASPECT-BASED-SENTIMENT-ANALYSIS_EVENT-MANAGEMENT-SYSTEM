import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header2 from "../elements/Header2";
import { useNavigation } from "@react-navigation/native";

import event1 from "../pictures/event1.png";
import event2 from "../pictures/event2.png";
import event3 from "../pictures/event3.png";
import event4 from "../pictures/event4.png";
import event5 from "../pictures/event5.png";

const Profile = () => {
  const navigator = useNavigation();

  // Static dataset for events
  const events = [
    { id: 1, name: "Event One", image: event1, location: "New York", date: "12/12/2024" },
    { id: 2, name: "Event Two", image: event2, location: "Los Angeles", date: "01/01/2025" },
    { id: 3, name: "Event Three", image: event3, location: "Chicago", date: "03/15/2025" },
    { id: 4, name: "Event Four", image: event4, location: "Houston", date: "05/20/2025" },
    { id: 5, name: "Event Five", image: event5, location: "Phoenix", date: "07/25/2025" },
  ];

  const [favorites, setFavorites] = useState([]); // State to track favorite events

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((eventId) => eventId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <>
      {/* Header */}
      <Header2 />

      {/* Main Profile Content */}
      <View style={styles.container}>
        <View style={styles.profileBox}>
          {/* Profile Picture */}
          <Image
            source={require("../pictures/user.png")} // Replace with your image path
            style={styles.profilePicture}
          />
          {/* Name */}
          <Text style={styles.name}>Customer Name</Text>
          {/* Username */}
          <Text style={styles.username}>@username</Text>
          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigator.navigate("EditProfile")}
          >
            <FontAwesome name="pencil-square" size={16} color={"#fff"} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Switch Profile Button */}
        <TouchableOpacity style={styles.switchProfileButton}>
          <Text style={styles.switchProfileText}>Switch Profile</Text>
        </TouchableOpacity>

        {/* My Events Header */}
        <Text style={styles.header}>My Events</Text>

        {/* Events Container */}
        <ScrollView horizontal={true} style={styles.eventsContainer}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              {/* Event Image with Heart Icon */}
              <View style={styles.imageContainer}>
                <Image source={event.image} style={styles.eventImage} />
                <TouchableOpacity
                  style={[
                    styles.heartIcon,
                    favorites.includes(event.id) && styles.heartIconActive,
                  ]}
                  onPress={() => toggleFavorite(event.id)}
                >
                  <FontAwesome name="heart" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              {/* Event Details */}
              <Text style={styles.eventName}>{event.name}</Text>
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <FontAwesome name="calendar" size={14} color="#2A93D5" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <FontAwesome name="map-marker" size={14} color="#2A93D5" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  profileBox: {
    borderColor: "#C2B067",
    borderWidth: 2,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
    top: 50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    position: "absolute",
    top: -50,
  },
  name: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
  },
  editButton: {
    marginTop: 15,
    backgroundColor: "#FFC42B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
  },
  switchProfileButton: {
    top: 70,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  switchProfileText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginTop: 90,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    height: 220,
    width: 200,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 50,
  },
  heartIconActive: {
    backgroundColor: "red",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FF9900",
  },
  eventDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#777",
  },
});

export default Profile;
