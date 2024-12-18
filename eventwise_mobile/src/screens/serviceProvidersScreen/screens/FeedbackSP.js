import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute
import { getFeedbackByEvent } from "../../../services/serviceProvider/serviceProviderServices"; // Import the service

const FeedbackPage = () => {
  const route = useRoute(); // Access the route prop
  const { event_id } = route.params; // Destructure the event_id passed from the parent component

  // State to store feedback data and error status
  const [feedbackData, setFeedbackData] = useState({
    negative_count: 0,
    neutral_count: 0,
    positive_count: 0,
    total_feedback: 0,
  });
  const [error, setError] = useState(false); // Track error state

  // Fetch feedback data when the component mounts
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getFeedbackByEvent(event_id); // Call the API
        setFeedbackData(data); // Store the response data in state
        setError(false); // Reset error if data is fetched successfully
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setError(true); // Set error to true if the API call fails
      }
    };

    fetchFeedback(); // Call the function to fetch feedback data
  }, [event_id]); // Dependency array ensures the effect runs when event_id changes

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Feedback for Event ID: {event_id}
          </Text>
        </View>

        {error ? (
          <Text style={styles.feedbackText}>No feedback data yet</Text> // Display error message
        ) : (
          <SafeAreaView>
            <View>
              <Text>Event's overall feedback</Text>
            </View>
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackText}>
                Negative Feedback: {feedbackData.negative_count}
              </Text>
              <Text style={styles.feedbackText}>
                Neutral Feedback: {feedbackData.neutral_count}
              </Text>
              <Text style={styles.feedbackText}>
                Positive Feedback: {feedbackData.positive_count}
              </Text>
              <Text style={styles.feedbackText}>
                Total Feedback: {feedbackData.total_feedback}
              </Text>
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#eeba2b",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Center header text
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
});

export default FeedbackPage;
