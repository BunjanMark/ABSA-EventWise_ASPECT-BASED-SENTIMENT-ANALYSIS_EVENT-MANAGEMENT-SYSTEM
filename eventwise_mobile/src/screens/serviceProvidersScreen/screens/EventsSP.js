import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { RefreshControl } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEventStore } from "../../../stateManagement/admin/useEventStore";
import { fetchEvents } from "../../../services/organizer/adminEventServices";
import { useCallback } from "react";
const eventsData = [
  {
    id: "1",
    title: "Mr. & Mrs. Malik Weddings",
    image: require("../assets/event1.png"),
    date: "2024-07-01",
    address: "CDO",
  },
  {
    id: "2",
    title: "Elizabeth Birthday",
    image: require("../assets/event2.png"),
    date: "2024-08-12",
    address: "CDO",
  },
  {
    id: "3",
    title: "Class of 1979 Reunion",
    image: require("../assets/event3.png"),
    date: "2024-09-25",
    address: "CDO",
  },
  {
    id: "4",
    title: "Corporate Party",
    image: require("../assets/event1.png"),
    date: "2024-10-30",
    address: "CDO",
  },
  {
    id: "5",
    title: "Annual Gala",
    image: require("../assets/event2.png"),
    date: "2024-11-15",
    address: "CDO",
  },
  {
    id: "6",
    title: "New Year Celebration",
    image: require("../assets/event3.png"),
    date: "2024-12-31",
    address: "CDO",
  },
  {
    id: "7",
    title: "Music Festival",
    image: require("../assets/event1.png"),
    date: "2024-06-22",
    address: "CDO",
  },
  {
    id: "8",
    title: "Art Exhibition",
    image: require("../assets/event2.png"),
    date: "2024-07-05",
    address: "CDO",
  },
];

const EventsSP = ({ navigation }) => {
  const { currentEvents, setCurrentEvents } = useEventStore();
  const [likedEvents, setlikedEvents] = useState({});
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [overlayVisible, setOverlayVisible] = useState({});
  useEffect(() => {
    refreshEvents();
  }, []);
  const toggleLikeEvent = (currentEventsID) => {
    setlikedEvents((prevLikedPackages) => {
      const newLikedEvents = { ...prevLikedPackages };
      if (newLikedEvents[currentEventsID]) {
        delete newLikedEvents[currentEventsID];
      } else {
        newLikedEvents[currentEventsID] = true;
      }
      return newLikedEvents;
    });
  };
  const [refreshingEvents, setRefreshingEvents] = useState(false);
  const [refreshingPackages, setRefreshingPackages] = useState(false);

  const refreshEvents = useCallback(async () => {
    setRefreshingEvents(true);
    try {
      const updatedEvents = await fetchEvents();
      setCurrentEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setRefreshingEvents(false);
    }
  }, [setCurrentEvents]);
  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = eventsData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(eventsData);
    }
  };

  const toggleOverlay = (eventId) => {
    setOverlayVisible((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{JSON.stringify(item)}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>

      {/* 3-dots icon at the bottom-right corner */}
      <TouchableOpacity
        style={styles.dotsIcon}
        onPress={() => toggleOverlay(item.id)}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#888" />
      </TouchableOpacity>

      {/* Overlay */}
      {overlayVisible[item.id] && (
        <Animated.View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayItem}
            onPress={() => {
              navigation.navigate("InventorySP");
              toggleOverlay(item.id);
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              size={20}
              color="#fff"
            />
            <Text style={styles.overlayText}>Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlayItem}
            onPress={() => {
              navigation.navigate("EquipmentSPDataTable", {
                eventId: item.id,
                eventName: item.title,
                eventDate: item.date,
                eventAddress: item.address,
              });
            }}
            //   () => {
            //   navigation.navigate("EquipmentSP", {
            //     eventId: item.id,
            //     eventName: item.title,
            //     eventDate: item.date,
            //     eventAddress: item.address,
            //   });
            //   toggleOverlay(item.id);
            // }}
          >
            <MaterialCommunityIcons name="archive" size={20} color="#fff" />
            <Text style={styles.overlayText}>Equipment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlayItem}
            onPress={() => {
              navigation.navigate("FeedbackSP");
              toggleOverlay(item.id);
            }}
          >
            <MaterialCommunityIcons
              name="message-text"
              size={20}
              color="#fff"
            />
            <Text style={styles.overlayText}>Feedback</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Events"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={currentEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Disable FlatList scrolling
        />
        {/* Add padding to the bottom of the ScrollView */}
        <View style={styles.paddingBottom} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  detailContainer: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 5,
    color: "#666",
  },
  dotsIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "#EEBA2B",
    borderRadius: 8,
    padding: 10,
    bottom: 50, // Adjusted to show below the dots icon
    right: 10,
    zIndex: 9999, // Higher zIndex to appear in front
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 150, // Set a width for the overlay for better visibility
  },
  overlayItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  overlayText: {
    color: "#FFFFFF",
    marginLeft: 10,
    fontSize: 16,
  },
  paddingBottom: {
    height: 60, // Set height for the bottom padding
  },
});

export default EventsSP;
