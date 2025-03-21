import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchUserBookingEvents } from "../../../services/organizer/adminEventServices";

const EventCardBookings = ({ currentEvents, likedEvents, toggleLike }) => {
  const navigation = useNavigation();
  const [userBookingDetails, setUserBookingDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (currentEvents) {
          const userDetails = await fetchUserBookingEvents(
            currentEvents.id,
            currentEvents.user_id
          );
          setUserBookingDetails(userDetails);
        }
      } catch (error) {
        console.log("Error fetching event details: ", error);
      }
    };
    fetchDetails();
  }, [currentEvents]);

  // If the event's status is "declined", return null to avoid rendering it
  if (currentEvents?.status === "declined") {
    return null;
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":"); // Split the time string into hours and minutes
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
  
    // Format the time as h:mm AM/PM
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };
  

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EventBookingDetails", {
            eventData: currentEvents,
            userBookingDetails: userBookingDetails,
          })
        }
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: currentEvents?.coverPhoto || "defaultImageURL", // Fallback if coverPhoto is undefined
            }}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => toggleLike(currentEvents?.id)}
          >
            <MaterialCommunityIcons
              name={
                likedEvents?.[currentEvents?.id] ? "heart" : "heart-outline"
              }
              color={likedEvents?.[currentEvents?.id] ? "#FFD700" : "#fff"}
              size={25}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>
            {currentEvents?.name || "Default Event"}
          </Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar" size={16} color="#eeba2b" />
            <Text style={styles.infoText}>{currentEvents?.date || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#eeba2b"
            />
            <Text style={styles.infoText}>
              {currentEvents?.location || "N/A"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="account-group"
              size={16}
              color="#eeba2b"
            />
            <Text style={styles.infoText}>
              {`Guests: ${currentEvents?.pax || 0}`}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock" size={16} color="#eeba2b" />
            <Text style={styles.infoText}>
              {`Time: ${
                currentEvents?.time ? formatTime(currentEvents.time) : "N/A"
              }`}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="tag" size={16} color="#eeba2b" />
            <Text style={styles.infoText}>{`Type: ${
              currentEvents?.type || "N/A"
            }`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    width: 230,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 20,
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});

export default EventCardBookings;
