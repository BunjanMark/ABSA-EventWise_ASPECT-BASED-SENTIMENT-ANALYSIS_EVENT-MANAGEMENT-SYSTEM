import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importing icons

export default function SchedSP({ route }) {
  const navigation = useNavigation();
  
  // Manage the activeButton state locally, default to "checklist" if not passed via route
  const [activeButton, setActiveButton] = useState(route.params?.activeButton || "checklist");
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const schedules = {
    "2024-09-21": [
      {
        time: "09:00 AM",
        title: "Team Meeting",
        description: "Discuss project status.",
        timeline: [
          { time: "09:00 AM", description: "Event Start" },
          { time: "09:15 AM", description: "Introduction to the team" },
          { time: "09:30 AM", description: "Updates from each member" },
          { time: "10:00 AM", description: "Discussion on blockers" },
          { time: "10:30 AM", description: "Wrap up and next steps" },
        ],
      },
      {
        time: "02:00 PM",
        title: "Client Call",
        description: "Review client requirements.",
        timeline: [
          { time: "02:00 PM", description: "Event Start" },
          { time: "02:05 PM", description: "Introduction to the client" },
          { time: "02:15 PM", description: "Review requirements" },
          { time: "02:45 PM", description: "Discuss feedback" },
          { time: "03:00 PM", description: "Next steps and follow-up actions" },
        ],
      },
    ],
  }; 

  const markedDates = Object.keys(schedules).reduce((acc, date) => {
    acc[date] = { marked: true, dots: [{ color: "#eeba2b" }] };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.iconButton, activeButton === "checklist" && styles.activeButton]}
          onPress={() => {
            setActiveButton("checklist");
            navigation.navigate("SchedSP", { activeButton: "checklist" });
          }}
        >
          <Ionicons name="checkbox-outline" size={24} color={activeButton === "checklist" ? "#fff" : "#888"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, activeButton === "calendar" && styles.activeButton]}
          onPress={() => {
            setActiveButton("calendar");
            navigation.navigate("SetSchedSP", { activeButton: "calendar" });
          }}
        >
          <Ionicons name="calendar-outline" size={24} color={activeButton === "calendar" ? "#fff" : "#888"} />
        </TouchableOpacity>
      </View>

      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        markingType="multi-dot"
      />

      <ScrollView style={styles.agendaContainer}>
        {selectedDate && schedules[selectedDate] ? (
          <>
            <Text style={styles.agendaTitle}>
              Agenda for {moment(selectedDate).format("MMMM D, YYYY")}
            </Text>
            {schedules[selectedDate].map((event, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openModal(event)}
                style={styles.eventContainer}
              >
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text style={styles.noEventsText}>
            {selectedDate
              ? "No events for this date."
              : "Select a date to see the schedule."}
          </Text>
        )}
      </ScrollView>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Time Frame</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDate}>
              {moment(selectedDate).format("MMMM D, YYYY")}
            </Text>
            <Text style={styles.modalTime}>{selectedEvent?.time}</Text>
            <View style={styles.horizontalDivider} />
            <View style={styles.modalBody}>
              <View style={styles.timeContainer}>
                {selectedEvent?.timeline.map((timeEvent, index) => (
                  <View key={index} style={styles.timeEntry}>
                    <Text style={styles.eventTime}>{timeEvent.time}</Text>
                    <View style={styles.circleContainer}>
                      <View style={styles.topLine} />
                      <View style={styles.circle} />
                      <View style={styles.bottomLine} />
                    </View>
                    <View style={styles.timeDetails}>
                      <Text style={styles.modalDescription}>
                        {timeEvent.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


// Styles (same as before)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  iconButton: {
    width: 100,
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    marginHorizontal: -15,
  },
  activeButton: {
    backgroundColor: "#EEBA2B",
  },
  agendaContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  agendaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  eventContainer: {
    backgroundColor: "#F9EDC6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderColor: "#eeba2b",
  },
  eventTime: {
    fontSize: 16,
    color: "#888",
    marginRight: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  noEventsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "#EEBA2B",
  },
  modalDate: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  modalTime: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  modalBody: {
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  timeEntry: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  circleContainer: {
    alignItems: "center",
    width: 30,
  },
  topLine: {
    height: 20,
    width: 2,
    backgroundColor: "#888",
    marginBottom: 5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#eeba2b",
  },
  bottomLine: {
    height: 20,
    width: 2,
    backgroundColor: "#888",
    marginTop: 5,
  },
  timeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
  },
});
