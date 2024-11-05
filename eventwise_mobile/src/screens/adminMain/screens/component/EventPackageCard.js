// src/components/EventPackageCard.js

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";

const EventPackageCard = ({ event, likedEvents, toggleLike }) => {
  // console.log(event);
  return (
    <View key={event.id} style={styles.eventCard}>
      <Image source={event.image} style={styles.image} />
      {/* <Image
        source={
          event.image
            ? event.image
            : require("../../../../../assets/event2.png")
        }
        style={styles.eventImage}
      /> */}

      <TouchableOpacity
        onPress={() => toggleLike(event.id)}
        style={[
          styles.heartIcon,
          likedEvents[event.id] ? styles.heartLiked : null,
        ]}
      >
        <MaterialCommunityIcons
          name={likedEvents[event.id] ? "heart" : "heart-outline"}
          color={likedEvents[event.id] ? "#FF0000" : "#888"}
          size={20}
        />
      </TouchableOpacity>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.eventPackageDetailRow}>
        <View style={styles.eventDetailContainer}>
          <Text style={styles.eventDetailText}>Date: {event.date}</Text>
        </View>
      </View>
      <Text style={styles.priceText}>Price: ${event.price}</Text>
      <Text style={styles.descriptionText}>{event.type}</Text>
    </View>
  );
};

export default EventPackageCard;
