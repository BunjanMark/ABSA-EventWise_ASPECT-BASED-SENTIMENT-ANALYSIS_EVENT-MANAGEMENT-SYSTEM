import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { submitFeedback } from "../../../services/feedbackServices";
import Header2 from "../elements/Header2";
import useStore from "../../../stateManagement/useStore";

const FeedbackInputs = ({ navigation, route }) => {
  const activeProfile = useStore((state) => state.activeProfile);
  const user = useStore((state) => state.user);
  const userId = useStore((state) => state.userId);
  // Get eventId from navigation params
  const { eventId } = route.params;

  // State for feedback inputs
  const [eventFeedback, setEventFeedback] = useState("");
  const [venueFeedback, setVenueFeedback] = useState("");
  const [cateringFeedback, setCateringFeedback] = useState("");
  const [decorationFeedback, setDecorationFeedback] = useState("");

  console.log(activeProfile, "this is the tuser", eventId);
  console.log(user, "this is the tuser: user id", userId);
  // Handler to submit feedback
  const handleSubmit = async () => {
    console.log("eventId:", eventId);
    if (!activeProfile) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    const feedback = {
      event_id: parseInt(eventId),
      event_feedback: eventFeedback,
      venue_feedback: venueFeedback,
      catering_feedback: cateringFeedback,
      decoration_feedback: decorationFeedback,
      customer_name: user,
      customer_id: userId,
    };
    console.log("route.params:", route.params);
    console.log("Feedback object:ss================", feedback);
    try {
      const response = await submitFeedback(feedback);
      Alert.alert("Success", "Feedback submitted successfully!");
      console.log(response);
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Submit Feedback</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Feedback"
          value={eventFeedback}
          onChangeText={setEventFeedback}
        />
        <TextInput
          style={styles.input}
          placeholder="Venue Feedback"
          value={venueFeedback}
          onChangeText={setVenueFeedback}
        />
        <TextInput
          style={styles.input}
          placeholder="Catering Feedback"
          value={cateringFeedback}
          onChangeText={setCateringFeedback}
        />
        <TextInput
          style={styles.input}
          placeholder="Decoration Feedback"
          value={decorationFeedback}
          onChangeText={setDecorationFeedback}
        />
        <Button title="Submit Feedback" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});

export default FeedbackInputs;
