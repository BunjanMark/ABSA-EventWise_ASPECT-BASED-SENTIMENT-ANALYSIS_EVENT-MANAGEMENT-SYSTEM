import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
import { VictoryPie, VictoryLabel } from "victory-native"; // VictoryPie for better charting

const TotalEventFeedback = ({ eventFeedback, sliceColor }) => {
  const navigation = useNavigation();

  // Function to aggregate feedback sentiment (positive, neutral, negative)
  const aggregateFeedback = (feedbackData) => {
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    feedbackData.forEach((feedback) => {
      if (feedback.overall_sentiment === "positive") positive += 1;
      if (feedback.overall_sentiment === "neutral") neutral += 1;
      if (feedback.overall_sentiment === "negative") negative += 1;
    });

    return { positive, neutral, negative };
  };

  const sentimentData = aggregateFeedback(eventFeedback);

  // Data for PieChart
  const feedbackAggregatedData = [
    { name: "Positive", population: sentimentData.positive, color: "green" },
    { name: "Neutral", population: sentimentData.neutral, color: "gray" },
    { name: "Negative", population: sentimentData.negative, color: "red" },
  ];

  return (
    <SafeAreaView style={styles.feedbackSection}>
      <Text style={styles.eventTitle}>Event Feedback Overview</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FeedbackDetailView", {
            feedbackData: eventFeedback,
          })
        }
      >
        <Text style={styles.feedbackCount}>
          Total Feedback Submitted: {eventFeedback.length}
        </Text>
      </TouchableOpacity>

      {/* VictoryPie Chart for sentiment visualization */}
      <View style={{ padding: 10 }}>
        <VictoryPie
          data={feedbackAggregatedData}
          colorScale={["green", "gray", "red"]}
          labelRadius={50}
          style={{
            labels: { fontSize: 14, fill: "white", fontWeight: "bold" },
          }}
          innerRadius={50} // Hole in the middle for a donut chart effect
          labelComponent={<VictoryLabel angle={45} />}
        />
      </View>

      {/* Displaying feedback details */}
      <View style={styles.feedbackList}>
        {eventFeedback.map((feedback, index) => (
          <View key={index} style={styles.feedbackItem}>
            <Text style={styles.feedbackType}>
              Catering Feedback: {feedback.catering_feedback}
            </Text>
            <Text style={styles.feedbackType}>
              Decoration Feedback: {feedback.decoration_feedback}
            </Text>
            <Text style={styles.feedbackType}>
              Event Feedback: {feedback.event_feedback}
            </Text>
            <Text style={styles.feedbackType}>
              Venue Feedback: {feedback.venue_feedback}
            </Text>
            <Text style={styles.feedbackSentiment}>
              Sentiment: {feedback.overall_sentiment}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  feedbackSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  feedbackCount: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  feedbackList: {
    marginTop: 20,
  },
  feedbackItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  feedbackType: {
    fontSize: 14,
    color: "#444",
  },
  feedbackSentiment: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
  },
});

export default TotalEventFeedback;
