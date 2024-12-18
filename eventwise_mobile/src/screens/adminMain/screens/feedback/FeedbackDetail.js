import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAspectsWithSentimentEvent } from "../../../../services/feedbackServices";
import Ionicons from "react-native-vector-icons/Ionicons";

const FeedbackDetail = ({ route }) => {
  const { event } = route.params;
  const [sentimentData, setSentimentData] = useState(null); // State to store sentiment data
  const [rawFeedbackData, setRawFeedbackData] = useState(null); // State to store raw feedback
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors
  const [expandedAspect, setExpandedAspect] = useState(null); // State to track which aspect is expanded
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await getAspectsWithSentimentEvent(event.id);
        setSentimentData(response.aspects_sentiment_count); // Store sentiment count data
        setRawFeedbackData(response.aspects_raw_feedback); // Store raw feedback data
      } catch (err) {
        setError("Failed to fetch sentiment data"); // Set error state in case of failure
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchSentimentData();
  }, [event.id]);

  const toggleAspect = (aspect) => {
    // Toggle the expanded aspect
    setExpandedAspect(expandedAspect === aspect ? null : aspect);
  };

  const capitalizeWords = (text) => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{event.name}</Text>
      <ScrollView style={styles.sentimentDetails}>
        {sentimentData ? (
          Object.keys(sentimentData).map((aspect) => (
            <View key={aspect} style={styles.aspectContainer}>
              <TouchableOpacity
                onPress={() => toggleAspect(aspect)} // Toggle the clicked aspect
                style={styles.aspectHeader}
              >
                <Text style={styles.aspectTitle}>{capitalizeWords(aspect)}</Text>
                <View style={styles.sentimentSummaryContainer}>
                  <Text style={[styles.sentimentText, styles.positive]}>
                    Positive: {sentimentData[aspect].positive}
                  </Text>
                  <Text style={[styles.sentimentText, styles.neutral]}>
                    Neutral: {sentimentData[aspect].neutral}
                  </Text>
                  <Text style={[styles.sentimentText, styles.negative]}>
                    Negative: {sentimentData[aspect].negative}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Show raw feedback if the aspect is expanded */}
              {expandedAspect === aspect && rawFeedbackData[aspect] && (
                <View style={styles.rawFeedbackContainer}>
                  {rawFeedbackData[aspect].map((feedback, index) => (
                    <View key={index} style={styles.feedbackItem}>
                      <Text style={styles.customerName}>
                        {feedback.customer_name}:
                      </Text>
                      <Text style={styles.rawFeedbackText}>
                        - {feedback.feedback_text}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        ) : (
          <Text>No sentiment data available.</Text>
        )}
      </ScrollView>
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
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sentimentDetails: {
    marginTop: 20,
  },
  aspectContainer: {
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1, // Add this line for border width
    borderColor: "#f0f0f0",
  },
  aspectHeader: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  aspectTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  sentimentSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  sentimentText: {
    fontSize: 14,
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
  rawFeedbackContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  feedbackItem: {
    marginBottom: 5,
  },
  customerName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  rawFeedbackText: {
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default FeedbackDetail;
