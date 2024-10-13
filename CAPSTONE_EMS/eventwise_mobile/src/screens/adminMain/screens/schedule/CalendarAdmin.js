import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";

import Timeline from "react-native-timeline-flatlist";
import { Picker } from "@react-native-picker/picker";
const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const schedules = {
    "2024-09-01": [
      {
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        title: "Team Meeting",
        description: "Discuss project status.",
      },
      {
        startTime: "02:00 PM",
        endTime: "03:00 PM",
        title: "Client Call",
        description: "Review client requirements.",
      },
    ],
    "2024-09-02": [
      {
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        title: "Meeting sa Team",
        description: "Review recent PRs with the team.",
      },
      {
        startTime: "04:00 PM",
        endTime: "05:30 PM",
        title: "Design Discussion",
        description: "Discuss new floor designs.",
      },
    ],
    "2024-09-20": [
      {
        startTime: "8:00 AM",
        endTime: "1:00 PM",
        title: "Mr. & Mrs. Malik Weddings ",
        description: "Plan Q4 campaigns.",
      },
    ],
  };
  const timeline = [
    {
      time: "8:00 am",
      title: "Start of Event",
      description: "Introduction to the event",
    },
    {
      time: "8:15 am",
      title: "wedding preparation",
      description: "Make up and attire for the bride and groom their entourage",
    },
    {
      time: "8:50 am",
      title: "Preparation PhotoShoot",
      description:
        "Final for the preparation of bride and groom and creative shoots for their entourage",
    },
    {
      time: "9:30 am",
      title: "Depart to Church",
      description:
        "Prepare everyone to go to church, check all the entourage especially the groom and bride and their families",
    },
    {
      time: "9:50 am",
      title: "Wedding at Church",
      description: "Prepare for the ceremony",
    },
    {
      time: "10:50 am",
      title: "Depart to the Reception",
      description: "Prepare for the reception",
    },
    {
      time: "11:30 am",
      title: "Lunch",
      description:
        "Prepare the food and some entertainment while the guest are eating their lunch",
    },
    {
      time: "12:30 am",
      title: "Thanksgiving",
      description:
        "About to the Bride and Groom prepare their thank you message to the guest",
    },
    {
      time: "1:00 pm",
      title: "End of event",
      description: "End of event, let's evaluate",
    },
  ];
  // Dynamically mark the dates that have schedules
  useEffect(() => {
    const newMarkedDates = {};
    Object.keys(schedules).forEach((date) => {
      newMarkedDates[date] = {
        marked: true,
        dotColor: "blue",
        selectedColor: "green",
      };
    });
    setMarkedDates(newMarkedDates);
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };
  // Add a new state to store the modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Add a new state to store the event date
  const [eventDate, setEventDate] = useState(null);

  // Add a new state to store the event start time
  const [eventStartTime, setEventStartTime] = useState(null);

  // Add a new state to store the event end time
  const [eventEndTime, setEventEndTime] = useState(null);

  // Add a new state to store the time frames
  const [timeFrames, setTimeFrames] = useState([]);

  return (
    <View style={styles.container}>
      {/* Calendar Component */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: markedDates[selectedDate]?.marked,
            selectedColor: "blue",
          },
        }}
        theme={{
          selectedDayBackgroundColor: "blue",
          todayTextColor: "red",
          arrowColor: "blue",
        }}
      />

      {/* Detailed Agenda for Selected Day */}
      <View style={styles.agendaContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDate || "Select a date to view schedule"}
        </Text>

        {selectedDate && schedules[selectedDate] ? (
          <ScrollView style={styles.agendaScroll}>
            {schedules[selectedDate].map((event, index) => (
              <TouchableOpacity
                key={index}
                style={styles.eventContainer}
                onPress={() => handleEventPress(event)}
              >
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Time: </Text>
                  <Text style={styles.eventTime}>
                    {event.startTime} - {event.endTime}
                  </Text>
                </View>
                <View style={styles.eventDetailRow}>
                  <Text style={styles.label}>Description: </Text>
                  <Text style={styles.eventDescription}>
                    {event.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noEventsText}>No events for this date.</Text>
        )}
      </View>

      {/* Modal for Detailed Event Information */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalContent, { borderRadius: 14 }]}>
            {selectedEvent && (
              <View>
                <View
                  style={[
                    styles.header,
                    {
                      // backgroundColor: "red",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 14,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalTitle,
                      { fontWeight: "bold", left: 10 },
                    ]}
                  >
                    Time Frame
                  </Text>

                  <TouchableOpacity
                    onPress={closeModal}
                    style={[{ position: "absolute", top: 10, right: 12 }]}
                  >
                    <SimpleLineIcons name="close" size={27} color="black" />
                  </TouchableOpacity>
                </View>

                <View>
                  <View style={[styles.modalBodyHeader, {}]}>
                    <Text style={styles.modalh2Title}>Event Title: </Text>
                    <Text>{selectedEvent.title}</Text>
                    <View>
                      <Text style={styles.subtitle}>
                        {selectedDate} | {selectedEvent.startTime} {"- "}
                        {selectedEvent.endTime}
                      </Text>
                    </View>
                  </View>

                  {/* <Text style={styles.modalDescription}>
                    Description: {selectedEvent.description}
                  </Text> */}
                  {/* timeline flatlist  */}
                </View>
                <SafeAreaView
                  style={{
                    backgroundColor: "rgba(255,235,137,0.10)",
                    height: 480,
                    width: "100%",
                    paddingHorizontal: "2.3%",
                  }}
                >
                  <Timeline
                    data={timeline}
                    circleSize={20}
                    innerCircle={"dot"}
                    circleColor="gold"
                    lineColor="#CECECE"
                    timeContainerStyle={{
                      minWidth: Platform.OS === "ios" ? 90 : "25.2%",
                    }}
                    separator
                    separatorStyle={{ backgroundColor: "#CECECE" }}
                    eventDetailStyle={{ marginTop: -13 }}
                    eventContainerStyle={{ marginTop: 5, marginBottom: 10 }}
                    timeStyle={{
                      textAlign: "center",

                      color: "#5E616B",
                      padding: 5,
                      borderRadius: 13,
                    }}
                    descriptionStyle={{ color: "gray" }}
                    options={{
                      style: { paddingTop: 5 },
                    }}
                    isUsingFlatlist={true}
                    titleStyle={{ color: "black", marginBottom: 10 }}
                  />
                </SafeAreaView>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalContent, { borderRadius: 14 }]}>
            <Text style={[styles.modalTitle, { fontWeight: "bold" }]}>
              Create Time Frame
            </Text>
            <View style={{ padding: 20 }}>
              <Text style={styles.label}>Choose Event:</Text>
              <Picker
                selectedValue={selectedEvent}
                onValueChange={(itemValue) => setSelectedEvent(itemValue)}
              >
                {Object.keys(schedules).map((date) => (
                  <Picker.Item label={date} value={date} key={date} />
                ))}
              </Picker>
              <Text style={styles.label}>Choose Event Date:</Text>
              <TextInput
                value={eventDate}
                onChangeText={(text) => setEventDate(text)}
                placeholder="YYYY-MM-DD"
              />
              <Text style={styles.label}>Set Event Started:</Text>
              <TextInput
                value={eventStartTime}
                onChangeText={(text) => setEventStartTime(text)}
                placeholder="HH:MM"
              />
              <Text style={styles.label}>Set Event Ended:</Text>
              <TextInput
                value={eventEndTime}
                onChangeText={(text) => setEventEndTime(text)}
                placeholder="HH:MM"
              />
              <Text style={styles.label}>Time Frames:</Text>
              <View style={{ height: 200, overflow: "scroll" }}>
                {timeFrames.map((timeFrame, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.label}>Time:</Text>
                    <TextInput
                      value={timeFrame.time}
                      onChangeText={(text) =>
                        setTimeFrames((prevTimeFrames) => {
                          const newTimeFrames = [...prevTimeFrames];
                          newTimeFrames[index].time = text;
                          return newTimeFrames;
                        })
                      }
                    />
                    <Text style={styles.label}>Event:</Text>
                    <TextInput
                      value={timeFrame.event}
                      onChangeText={(text) =>
                        setTimeFrames((prevTimeFrames) => {
                          const newTimeFrames = [...prevTimeFrames];
                          newTimeFrames[index].event = text;
                          return newTimeFrames;
                        })
                      }
                    />
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                      value={timeFrame.description}
                      onChangeText={(text) =>
                        setTimeFrames((prevTimeFrames) => {
                          const newTimeFrames = [...prevTimeFrames];
                          newTimeFrames[index].description = text;
                          return newTimeFrames;
                        })
                      }
                    />
                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={() =>
                  setTimeFrames((prevTimeFrames) => [
                    ...prevTimeFrames,
                    { time: "", event: "", description: "" },
                  ])
                }
              >
                <Text style={styles.label}>Add Time Frame</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setTimeFrames((prevTimeFrames) => prevTimeFrames.slice(0, -1))
                }
              >
                <Text style={styles.label}>Delete Time Frame</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Save the time frames
                  // ...
                  setIsAddModalVisible(false);
                }}
              >
                <Text style={styles.label}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Timeline
        data={timeline}
        circleSize={20}
        innerCircle={"dot"}
        circleColor="gold"
        lineColor="gray"
        timeContainerStyle={{ minWidth: 90, marginTop: -5 }}
        separator
        separatorStyle={{ backgroundColor: "gray" }}
        eventDetailStyle={{ marginTop: 5 }}
        eventContainerStyle={{ marginTop: 15, marginBottom: 5 }}
        timeStyle={{
          textAlign: "center",
          backgroundColor: "#ff9797",
          color: "white",
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{ color: "gray" }}
        options={{
          style: { paddingTop: 5 },
        }}
        isUsingFlatlist={true}
      /> */}
      {/* // Add the floating add button */}
      <View
        style={{
          position: "absolute",

          backgroundColor: "rgba(255,200,89,1)",

          width: 50,
          height: 50,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          borderRadius: 25,
          bottom: 120,
          right: 40,
        }}
      >
        <TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
          <MaterialIcons
            name="format-list-bulleted-add"
            size={27}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleScreen;
