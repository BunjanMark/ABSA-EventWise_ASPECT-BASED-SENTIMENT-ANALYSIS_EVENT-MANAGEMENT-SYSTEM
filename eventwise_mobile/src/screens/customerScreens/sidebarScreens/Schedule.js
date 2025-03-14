import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "../../adminMain/styles/styles";
import { useEventStoreCustomer } from "../../../stateManagement/customer/useEventStoreCustomer";
import { fetchEvents } from "../../../services/organizer/adminEventServices";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../elements/Header";
import { myBookEvents } from "../../../services/organizer/adminEventServices";
const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const { currentEvents, setCurrentEvents } = useEventStoreCustomer();
  const [events, setEvents] = useState([]);
  // Fetch events and store them in Zustand state
  const getEvents = async () => {
    try {
      setRefreshing(true); // Start refreshing
      const events = await myBookEvents();
      setCurrentEvents(events); // Update Zustand state
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setRefreshing(false); // Stop refreshing
    }
  };
  // const loadEvents = async () => {
  //   try {
  //     const fetchedEvents = await myBookEvents();
  //     setEvents(fetchedEvents);
  //   } catch (error) {
  //     showToast("Failed to load events");
  //   }
  // };
  // // Fetch events on mount
  // useEffect(() => {
  //   getEvents();
  // }, []);

  // Update markedDates whenever currentEvents changes
  useEffect(() => {
    const newMarkedDates = {};
    currentEvents.forEach((event) => {
      const eventDate = event.date;

      // Add dots for multiple events on the same day
      if (!newMarkedDates[eventDate]) {
        newMarkedDates[eventDate] = { dots: [] };
      }

      newMarkedDates[eventDate].dots.push({
        color: "blue", // Customize the dot color
      });
    });

    setMarkedDates(newMarkedDates);
  }, [currentEvents]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const eventsForSelectedDate = currentEvents.filter(
    (event) => event.date === selectedDate
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Optional: hides the scrollbar
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getEvents} />
        }
      >
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              dots: markedDates[selectedDate]?.dots || [],
              selectedColor: "blue",
            },
          }}
          markingType="multi-dot"
          theme={{
            selectedDayBackgroundColor: "blue",
            todayTextColor: "red",
            arrowColor: "blue",
          }}
        />

        <View style={styles.agendaContainer}>
          <Text style={styles.selectedDateText}>
            {selectedDate || "Select a date to view schedules"}
          </Text>

          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventContainer}
                onPress={() => console.log("Event Pressed:", event)}
              >
                <Text style={styles.eventTitle}>{event.name}</Text>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Time: </Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Location: </Text>
                  <Text style={styles.eventDescription}>
                    {event.location || "No location specified"}
                  </Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Description: </Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noEventsText}>No events for this date.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;
