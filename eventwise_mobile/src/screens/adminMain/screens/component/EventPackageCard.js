import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import event2 from "../../../../../assets/event2.png";
const EventPackageCard = ({ event, likedEvents, toggleLike }) => {
  return (
    <View key={event.id} style={styles.eventCard}>
      <Image source={event2} style={styles.eventImage} />
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
          <Text style={styles.eventDetailText}>{event.date}</Text>
        </View>
        <View style={styles.eventDetailContainer}>
          <Text style={styles.eventDetailText}>{event.location}</Text>
        </View>
      </View>
    </View>
  );
};

export default EventPackageCard;
