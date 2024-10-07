// components/TotalGuestsCard.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";

const TotalGuestsCard = ({ event, navigation }) => {
  const handlePress = () => {
    // Navigate to the guest list screen
    navigation.navigate("GuestListAdmin", {
      eventId: event.eventId,
      totalGuests: event.totalGuests,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.totalGuestsCard}>
      <Text style={styles.totalGuestsText}>
        Total Guests: {event.totalGuests}
      </Text>
    </TouchableOpacity>
  );
};

export default TotalGuestsCard;
