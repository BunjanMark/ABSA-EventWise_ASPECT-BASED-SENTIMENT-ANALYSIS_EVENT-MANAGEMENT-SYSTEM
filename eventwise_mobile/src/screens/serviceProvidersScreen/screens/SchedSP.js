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
import moment from "moment";

export default function SchedSP() {
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
              <TouchableOpacity key={index} onPress={() => openModal(event)} style={styles.eventContainer}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text style={styles.noEventsText}>
            {selectedDate ? "No events for this date." : "Select a date to see the schedule."}
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
            <Text style={styles.modalDate}>{moment(selectedDate).format("MMMM D, YYYY")}</Text>
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
                      <Text style={styles.modalDescription}>{timeEvent.description}</Text>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#f9f9f9",
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
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "red",
  },
  modalDate: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  modalTime: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  modalBody: {
    flexDirection: "column",
  },
  timeContainer: {
    alignItems: "flex-start",
  },
  timeEntry: {
    flexDirection: "row",
    marginBottom: 10,
  },
  circleContainer: {
    alignItems: "center",
    marginRight: 10,
    marginVertical: 5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#eeba2b",
  },
  
  bottomLine: {
    height: 40, // Adjust for gap below circle
    width: 2,
    backgroundColor: "#ccc",
    marginTop: 2, // Space between circle and line
  },
  timeDetails: {
    flex: 1,
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
  },
  closeButtonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});