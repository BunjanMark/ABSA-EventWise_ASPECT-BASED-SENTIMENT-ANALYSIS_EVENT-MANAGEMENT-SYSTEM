import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import { useNavigation } from "@react-navigation/native";
import AddEventOrPackageModal from "../component/AddEventOrPackageModal";
import event2 from "../../../../../assets/event2.png";
import MyButtonComponent from "../component/MyButtonComponent";
import { AntDesign } from "@expo/vector-icons";
const ProfileMyEvents = () => {
  const eventData = useStore((state) => state.eventData); // Fetch event data from useStore
  const [selectedMonthEvents, setSelectedMonthEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isModalVisiblePackage, setIsModalVisiblePackage] = useState(false);
  const navigation = useNavigation();

  const handleMonthPress = (month) => {
    // Filter events based on the selected month
    const filteredEvents = eventData.filter(
      (event) => new Date(event.eventDate).getMonth() + 1 === month
    );
    setSelectedMonthEvents(filteredEvents);
    setIsModalVisible(true); // Show the modal
  };

  const handleEventPress = (event) => {
    // Navigate to event details with the event data
    navigation.navigate("EventDetails", { event });
  };

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];
  // const monthparsed = months[parsed - 1].value;
  const parsed = parseInt(selectedMonthEvents[0]?.eventDate.split("-")[1]);
  // console.log(selectedMonthEvents[0].eventDate.split("-")[1]);

  // console.log(parsed);

  // console.log(parsed);
  // console.log(parsed === months[parsed] ? "july" : false);
  // console.log(months[parsed - 1].name ? "july" : false);
  // console.log(months[parsed - 1]["name"]);

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <Text style={styles.header}>
        <Text style={styles.title}>My Events</Text>
      </Text>
      <View
        style={[
          {
            height: 120,
            width: "100%",
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.scrollViewEventPackage]}
        >
          <View style={[{ marginVertical: -10, marginRight: 10 }]}>
            <MyButtonComponent
              onPress={() => setIsAddModalVisible(true)}
              icon={"plus"}
              title={"Add Event"}
              backgroundColor={"#2A93D5"}
              textColor={"white"}
              width={130}
              height={"100%"}
              borderRadius={15}
              iconSize={23}
              iconColor={"white"}
              fontSize={16}
            />
          </View>
          {months.map((month) => (
            <View
              style={[
                {
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  height: 120,
                  width: "100%",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                key={month.value}
                onPress={() => handleMonthPress(month.value)}
              >
                <View
                  style={[
                    styles.EventPackageOrEventCard,
                    { height: "100%", width: 140 },
                  ]}
                >
                  <Text style={styles.monthText}>{month.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Modal to display events */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: "#ffff", paddingTop: 100 },
          ]}
        >
          <View
            style={[
              {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                position: "absolute",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bottom: 30,
                left: 240,
                width: 50,
                height: 50,
                borderRadius: 25,
                zIndex: 1,
              }}
            >
              <AntDesign name="close" size={30} color="black" />
              {/* <MyButtonComponent
                  icon={"close"}
                  title={""}
                  color={"white"}
                  textColor="black"
                  iconColor="black"
                  onPress={() => setIsModalVisible(false)}
                /> */}
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Events in Month of{" "}
              {parsed === months[parsed - 1]?.value
                ? months[parsed - 1].name
                : parsed}
            </Text>
          </View>
          <ScrollView>
            {/* Check if there are events for the selected month */}
            {selectedMonthEvents.length > 0 ? (
              selectedMonthEvents.map((event) => (
                <TouchableOpacity
                  key={event.eventId}
                  onPress={() => handleEventPress(event)}
                >
                  <View
                    style={[
                      styles.eventContainer,
                      {
                        marginBottom: 10,
                        width: 370,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Image
                      source={event.eventImage}
                      style={styles.eventImage}
                    />
                    <Text style={styles.eventTitle}>{event.eventName}</Text>
                    <View style={styles.eventPackageDetailRow}>
                      <Text style={styles.subtitle}>
                        {event.eventDate} at {event.eventTime}
                      </Text>
                      <Text style={styles.subtitle}>{event.eventLocation}</Text>
                    </View>
                    <Text style={[styles.subtitle, { color: "black" }]}>
                      {event.eventDescription}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noEventContainer}>
                <Text style={styles.noEventText}>No events this month</Text>
              </View>
            )}
          </ScrollView>

          <Pressable
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
      <AddEventOrPackageModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        type="event" // Set type to "package"
      />
    </SafeAreaView>
  );
};

export default ProfileMyEvents;
