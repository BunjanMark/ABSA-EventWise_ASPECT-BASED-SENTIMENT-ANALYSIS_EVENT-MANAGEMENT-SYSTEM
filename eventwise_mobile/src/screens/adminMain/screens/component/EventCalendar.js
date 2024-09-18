import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // handling events schedule to navigate to the main screen of Schedule
  const handleEventSchedule = () => {
    console.log("test");
    navigation.navigate("Schedule");
  };
  // Get today's date
  const today = moment().format("YYYY-MM-DD");

  // Sample schedules for different dates
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
        title: "Code Review",
        description: "Review recent PRs with the team.",
      },
      {
        startTime: "04:00 PM",
        endTime: "05:30 PM",
        title: "Design Discussion",
        description: "Discuss new UI designs.",
      },
    ],
    "2024-09-03": [
      {
        startTime: "11:00 AM",
        endTime: "12:00 PM",
        title: "Marketing Strategy",
        description: "Plan Q4 campaigns.",
      },
    ],
  };

  const formatDate = (date) => moment(date).format("YYYY-MM-DD");

  // Marked Dates - Dates that have events
  const markedDates = Object.keys(schedules).map((date) => {
    return {
      date,
      dots: [
        {
          color: "#007aff",
          selectedColor: "#007aff", // Dot color when the date is selected
        },
      ],
    };
  });

  let customDatesStyles = [
    {
      dateNameStyle: {
        color: "white",
      },
      dateNumberStyle: {
        color: "white",
        fontWeight: "bold",
      },
      dateContainerStyle: {
        backgroundColor: "#eeba2b",
        borderWidth: 0.8,
        borderColor: "#eeba2b",
        borderRadius: 30,
      },

      //   startDate: today,
    },
  ];
  let startDate = moment();
  //   for (let i = 0; i < 1; i++) {
  //     customDatesStyles.push({
  //       startDate: startDate.clone().add(i, "days"), // Single date since no endDate provided
  //       dateNameStyle: styles.dateNameStyle,
  //       dateNumberStyle: styles.dateNumberStyle,
  //       // Random color...
  //       dateContainerStyle: {
  //         // backgroundColor: `#${`#00000${(
  //         //   (Math.random() * (1 << 24)) |
  //         //   0
  //         // ).toString(16)}`.slice(-6)}`,
  //         backgroundColor: "red",
  //       },
  //     });
  //   }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Date Today</Text>
        <TouchableOpacity
          style={styles.scheduleTitleContainer}
          onPress={handleEventSchedule}
        >
          <Text style={styles.subtitle}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Strip */}
      <CalendarStrip
        style={styles.calendar}
        iconLeft={null}
        iconRight={null}
        customDatesStyles={customDatesStyles}
        scrollable
        // calendarHeaderStyle={{
        //   color: "#333",
        //   fontSize: 10,
        //   // backgroundColor: "green",
        //   display: "flex",
        //   width: "100%",
        //   marginTop: 10,
        //   right: 110,
        // }}
        calendarHeaderContainerStyle={{
          display: "flex",
          // right: 110,
          width: 0,
          height: 0,
        }}
        dateNumberStyle={{ color: "#333" }}
        dateNameStyle={{ color: "#333" }}
        onDateSelected={(date) => setSelectedDate(date.toDate())}
        selectedDate={selectedDate}
        daySelectionAnimation={{
          type: "background",
          duration: 1100,
          highlightColor: "rgba(218,218,218,0.6)", //color sa day selected (gray)
        }}
        highlightDateNumberStyle={{ color: "black" }}
        highlightDateNameStyle={{ color: "black" }}
        markedDates={markedDates} // Adding dots and marking the current date
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markingType="multi-dot"
      />

      {/* Schedule Content */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <ScrollView style={styles.placeholder}>
          <View style={styles.placeholderInset}>
            {/* {schedules[formatDate(selectedDate)] ? (
              schedules[formatDate(selectedDate)].map((event, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Text style={styles.scheduleTime}>{event.time}</Text>
                  <View style={styles.scheduleDetails}>
                    <Text style={styles.scheduleTitle}>{event.title}</Text>
                    <Text style={styles.scheduleDescription}>
                      {event.description}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noScheduleText}>No events for today</Text>
            )} */}
            {schedules[formatDate(selectedDate)] &&
              schedules[formatDate(selectedDate)].length > 0 && (
                <>
                  {/* Toggle Button */}
                  <TouchableOpacity
                    onPress={toggleDropdown}
                    style={styles.toggleButton}
                  >
                    <Text style={styles.toggleButtonText}>
                      {isDropdownOpen ? "Hide Events" : "Show Events"}
                    </Text>
                  </TouchableOpacity>

                  {/* Dropdown Content */}
                  {isDropdownOpen && (
                    <View style={styles.dropdown}>
                      {schedules[formatDate(selectedDate)].map(
                        (event, index) => (
                          <TouchableOpacity
                            style={styles.scheduleTitleContainer}
                            onPress={handleEventSchedule}
                          >
                            <View key={index} style={styles.scheduleItem}>
                              {/* Event Title */}
                              <Text style={styles.scheduleTitle}>
                                {event.title}
                              </Text>

                              {/* Event Time */}
                              <View style={styles.scheduleDetailRow}>
                                <Text style={styles.label}>Time: </Text>
                                <Text style={styles.scheduleTime}>
                                  {event.startTime} - {event.endTime}
                                </Text>
                              </View>

                              {/* Event Description */}
                              <View style={styles.scheduleDetailRow}>
                                <Text style={styles.label}>Description: </Text>
                                <Text style={styles.scheduleDescription}>
                                  {event.description}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  )}
                </>
              )}
          </View>
        </ScrollView>
      </View>

      {/* <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Add Schedule</Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    padding: 12,
    // backgroundColor: "green",

    // margin: 5,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // backgroundColor: "red",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "black",
    // marginBottom: 12,
  },
  calendar: {
    height: 70,

    // apply glass effect
    backgroundColor: "rgba(255,252,221,99)", //yellow ni sya sa calendar strip

    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: -3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "300",
    color: "rgba(53,53,53,0.9)",
    // marginBottom: 12,
    paddingTop: 11,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    // borderWidth: 3,
    // borderColor: "#e5e7eb",
    // borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 4,
    // padding: 0,
  },
  scheduleItem: {
    marginBottom: 13,
    padding: 10,
    // backgroundColor: "#f9f9f9",
    backgroundColor: "rgba(249,250,237,1)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleTitleContainer: {
    marginBottom: 8,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  scheduleDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  toggleButtonText: {
    color: "black",
    textAlign: "center",
  },
  dropdown: {
    // backgroundColor: "red",
    marginTop: 10,
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007aff",
  },
  scheduleDescription: {
    fontSize: 14,
    color: "#666",
  },
  // scheduleItem: {
  //   flexDirection: "row",
  //   marginBottom: 16,
  // },
  // scheduleTime: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#007aff",
  //   marginRight: 12,
  // },
  // scheduleDetails: {
  //   flex: 1,
  // },
  // scheduleTitle: {
  //   fontSize: 16,
  //   fontWeight: "700",
  //   color: "#333",
  // },
  // scheduleDescription: {
  //   fontSize: 14,
  //   color: "#666",
  // },
  // noScheduleText: {
  //   fontSize: 16,
  //   color: "#999",
  //   textAlign: "center",
  //   marginTop: 20,
  // },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
