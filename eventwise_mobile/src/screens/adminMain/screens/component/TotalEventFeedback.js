import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const TotalEventFeedback = ({ eventFeedback, sliceColor }) => {
  // Aggregate data for pie chart
  const aggregateFeedback = () => {
    let positive = 0,
      neutral = 0,
      negative = 0;

    eventFeedback.forEach((item) => {
      if (item.event_sentiment) {
        positive += item.event_sentiment.pos || 0;
        neutral += item.event_sentiment.neu || 0;
        negative += item.event_sentiment.neg || 0;
      }
      if (item.venue_sentiment) {
        positive += item.venue_sentiment.pos || 0;
        neutral += item.venue_sentiment.neu || 0;
        negative += item.venue_sentiment.neg || 0;
      }
      if (item.catering_sentiment) {
        positive += item.catering_sentiment.pos || 0;
        neutral += item.catering_sentiment.neu || 0;
        negative += item.catering_sentiment.neg || 0;
      }
      if (item.decoration_sentiment) {
        positive += item.decoration_sentiment.pos || 0;
        neutral += item.decoration_sentiment.neu || 0;
        negative += item.decoration_sentiment.neg || 0;
      }
    });

    const total = positive + neutral + negative;

    if (total === 0) return []; // Handle edge case for no feedback

    const positivePercentage = ((positive / total) * 100).toFixed(2);
    const neutralPercentage = ((neutral / total) * 100).toFixed(2);
    const negativePercentage = ((negative / total) * 100).toFixed(2);

    return [
      {
        name: "Positive",
        population: parseFloat(positivePercentage),
        color: sliceColor[1],
      },
      {
        name: "Neutral",
        population: parseFloat(neutralPercentage),
        color: sliceColor[2],
      },
      {
        name: "Negative",
        population: parseFloat(negativePercentage),
        color: sliceColor[0],
      },
    ];
  };

  const feedbackAggregatedData = aggregateFeedback();

  return (
    <View style={styles.container}>
      {/* Display Pie Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Feedback Summary</Text>
        {feedbackAggregatedData.length > 0 && (
          <PieChart
            data={feedbackAggregatedData}
            width={Dimensions.get("window").width - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        )}
      </View>

      {/* Display Detailed Feedbacks */}
      <ScrollView style={styles.feedbackList}>
        <Text style={styles.feedbackListTitle}>Detailed Feedback</Text>
        {eventFeedback.map((feedback, index) => (
          <View key={index} style={styles.feedbackItem}>
            <Text style={styles.feedbackDate}>
              {new Date(feedback.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.feedbackText}>
              Event: {feedback.event_feedback}
            </Text>
            <Text style={styles.feedbackText}>
              Venue: {feedback.venue_feedback}
            </Text>
            <Text style={styles.feedbackText}>
              Catering: {feedback.catering_feedback}
            </Text>
            <Text style={styles.feedbackText}>
              Decoration: {feedback.decoration_feedback}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  chartSection: { alignItems: "center", marginBottom: 20 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  feedbackList: { marginTop: 10 },
  feedbackListTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  feedbackItem: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  feedbackDate: { fontSize: 12, color: "#555", marginBottom: 5 },
  feedbackText: { fontSize: 14, marginBottom: 5 },
});

export default TotalEventFeedback;
