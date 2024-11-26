import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const EventCardHome = ({
  currentEvents,
  likedEvents,
  toggleLike,
  handleDeleteEvent,
  handleEditEvent,
}) => {
  const navigation = useNavigation();
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (currentEvents) {
          const details = await fetchEventDetails(currentEvents?.id);
          console.log("fetch event details in the card: " + details);
          setEventDetails(details);
        }
      } catch (error) {
        console.log("Error fetching event details: ", error);
      }
    };
    fetchDetails();
  }, [currentEvents]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EventCardDetails", {
            eventData: currentEvents,
          })
        }
      >
        <Image
          source={{
            uri: currentEvents?.coverPhoto || "defaultImageURL", // Fallback if coverPhoto is undefined
          }}
          style={styles.image}
        />
        <View style={styles.serviceCardHeader}>
          <Text style={styles.serviceName}>
            {currentEvents?.name || "Default Event Name"}
          </Text>
          <TouchableOpacity
            onPress={() => toggleLike(currentEvents?.id)}
            style={styles.heartIcon}
          >
            <MaterialCommunityIcons
              name={
                likedEvents?.[currentEvents?.id] ? "heart" : "heart-outline"
              }
              color={likedEvents?.[currentEvents?.id] ? "#FF0000" : "#888"}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.serviceCategory}>
          Event Type: {currentEvents?.type || "Not specified"}
        </Text>
        {/* <Text style={styles.servicePrice}>
          Price: ₱{currentEvents?.totalPrice || "0.00"}
        </Text> */}
      </TouchableOpacity>

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            navigation.navigate("EditPackageScreen", {
              eventData: currentEvents,
            }); // Pass service data to the Edit screen
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteEvent(currentEvents?.id)} // Now using the prop
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.buttonContainer}>
        <Text>{JSON.stringify(currentEvents, null, 2)}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    width: 250,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff9900",
  },
  serviceCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  heartIcon: {
    // position: "absolute",
    // top: 220,
    // right: 30,
    // top: 10,
    // right: 10,
    // backgroundColor: "red",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff9900",
    marginBottom: 10,
    marginTop: 10,
  },
  serviceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  servicePrice: {
    fontSize: 14,
    color: "#ff9900",
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceFeatures: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  serviceFeaturesDetails: {
    marginLeft: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#ff9900",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
};

export default EventCardHome;
