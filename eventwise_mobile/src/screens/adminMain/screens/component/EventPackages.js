import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import styles from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { Button } from "react-native";

import event2 from "../../../../../assets/event2.png";

import useStore from "../../../../stateManagement/useStore";
import { useEffect } from "react";
const events = [
  {
    id: 1,
    image: event2,
    title: "Wedding Package",
  },
  {
    id: 2,
    image: event2,
    title: "Birthday Package",
  },
  {
    id: 3,
    image: event2,
    title: "Reunion Package",
  },
];
const EventPackages = () => {
  const { count, increaseCount, decreaseCount, likedEvents, toggleLike } =
    useStore(); // Accessing store values and functions
  const initializeLikedEvents = useStore(
    (state) => state.initializeLikedEvents
  );

  useEffect(() => {
    initializeLikedEvents(); // Load liked events from storage
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* test */}
      {/* <Button title="Increase" onPress={increaseCount} />
      <Button title="Decrease" onPress={decreaseCount} /> */}
      <View>
        <Text style={styles.header}>
          <Text style={styles.title}>Event Packages</Text>
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={event.image} style={styles.eventImage} />
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
            <View style={styles.eventDetailRow}>
              <View style={styles.eventDetailContainer}>
                <Text style={styles.eventDetailText}>{event.date}</Text>
              </View>
              <View style={styles.eventDetailContainer}>
                <Text style={styles.eventDetailText}>{event.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventPackages;
