import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { fetchEvents } from "../../../../services/organizer/adminEventServices";
import { useCallback } from "react";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
const EquipmentPanel = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { currentEvents, setCurrentEvents } = useEventStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEvents();
        console.log("Fetched events:", response);
        setEvents(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  const handleEventPress = (eventId) => {
    navigation.navigate("EquipmentPanelDetails", { eventId });
  };
  const refreshEvents = useCallback(async () => {
    setRefreshing(true); // Start refreshing
    try {
      const updatedEvents = await fetchEvents();
      setCurrentEvents(updatedEvents); // Update events in store
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  }, [setCurrentEvents]);

  // console.log("currentevents:" + currentEvents);
  // console.log("events only:" + events);
  return (
    // <SafeAreaView>
    //   <FlatList
    //     data={events}
    //     renderItem={({ item }) => (
    //       <TouchableOpacity onPress={() => handleEventPress(item.id)}>
    //         <View>
    //           <Text>{item.name}</Text>
    //         </View>
    //       </TouchableOpacity>
    //     )}
    //     keyExtractor={(item) => item.id.toString()}
    //   />
    // </SafeAreaView>
    <SafeAreaView style={[styles.container, { paddingBottom: 100 }]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              refreshEvents();
            }} // Trigger both refresh functions
            colors={["#ff9900"]}
            tintColor="#ff9900"
          />
        } // Trigger refresh on pull-to-refresh
      >
        <FlatList
          data={currentEvents}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleEventPress(item.id)}>
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EquipmentPanel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    padding: 12,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    // backgroundColor: "green",
    // margin: 5,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 10,
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
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  brokenBox: {
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 80,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF5F5",
  },
  brokenBoxText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
});
