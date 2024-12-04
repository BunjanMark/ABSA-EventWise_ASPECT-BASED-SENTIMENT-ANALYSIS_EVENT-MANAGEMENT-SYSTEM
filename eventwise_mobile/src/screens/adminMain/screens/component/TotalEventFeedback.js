import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const TotalEventFeedback = ({ eventFeedback, sliceColor }) => {
  const navigation = useNavigation();
  const handleGoToButtonPress = () => {
    console.log("Go to FeedbackAdmin");
    navigation.navigate("Feedback");
  };

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
    <SafeAreaView style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.chartTitle}>Total Feedback </Text>
        <TouchableOpacity onPress={handleGoToButtonPress}>
          <Text style={styles.subtitle}>Go to Feedback</Text>
          <AntDesign name="swapright" size={24} color="black" />
        </TouchableOpacity>
        {feedbackAggregatedData.length > 0 ? (
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
        ) : (
          <View style={styles.noFeedback}>
            <Text style={styles.noFeedbackText}>
              No feedback data available yet.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    // backgroundColor: "green",
    // margin: 5,
  },
  feedbackContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(255,252,221,99)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  chartSection: { alignItems: "center", marginBottom: 20 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  noFeedback: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  noFeedbackText: {
    fontSize: 16,
    color: "#888",
  },
});

export default TotalEventFeedback;
