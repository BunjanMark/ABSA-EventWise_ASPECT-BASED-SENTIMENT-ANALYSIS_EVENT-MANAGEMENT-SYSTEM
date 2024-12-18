import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFeedbackStore } from "../../../../stateManagement/admin/useFeedbackStore";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";
import { useNavigation } from "@react-navigation/native";

const FeedbackAdmin = () => {
  const {
    currentFeedbacks,
    setCurrentFeedbacks,
    feedbacksByEvent,
    setFeedbacksByEvent,
  } = useFeedbackStore();
  const { currentEvents, setCurrentEvents } = useEventStore();
  const navigation = useNavigation();
  console.log(
    "this is the feedbacks by event" + JSON.stringify(feedbacksByEvent)
  );
  console.log("Current Events", JSON.stringify(currentEvents, ["id", 2]));

  const renderFeedbackItem = ({ item }) => {
    const event = currentEvents.find((event) => event.id === item.event_id);
    return (
      <View style={styles.eventContainer}>
        <TouchableOpacity
          style={styles.feedbackItem}
          onPress={() =>
            navigation.navigate("FeedbackDetail", {
              event: event,
              feedback: item,
            })
          }
        >
          <Text style={styles.eventName}>{event?.name}</Text>
          <Text style={styles.eventId}>Event ID: {item.event_id}</Text>
          <View style={styles.feedbackSummary}>
            <Text style={[styles.sentimentText, styles.positive]}>
              Positive: {item.positive}
            </Text>
            <Text style={[styles.sentimentText, styles.neutral]}>
              Neutral: {item.neutral}
            </Text>
            <Text style={[styles.sentimentText, styles.negative]}>
              Negative: {item.negative}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback by Event</Text>
      <FlatList
        data={feedbacksByEvent.events}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.event_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  feedbackItem: {
    borderBottomWidth: 0,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventId: {
    fontSize: 16,
    marginBottom: 5,
  },
  feedbackSummary: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  sentimentText: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
  },
  positive: {
    color: "green",
  },
  neutral: {
    color: "#e9a800", // Dark shade of yellow
  },
  negative: {
    color: "red",
  },
});

export default FeedbackAdmin;
