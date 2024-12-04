import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import EventFeedbackSentiment from "../component/EventFeedbackSentiment";
import styles from "../../styles/styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import useStore from "../../../../stateManagement/useStore";
import { useFeedbackStore } from "../../../../stateManagement/admin/useFeedbackStore";
const FeedbackAdmin = () => {
  const { eventData, sliceColor } = useStore(); // Using your state store
  const { currentFeedbacks, setCurrentFeedbacks } = useFeedbackStore();
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.header, {}]}>
        <Text
          style={[
            styles.title,
            {
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 15,
            },
          ]}
        >
          Event Feedbacks
        </Text>
      </View>
      {/* Components */}
      <ScrollView>
        <SafeAreaView style={[styles.scrollViewContentFeedback]}>
          {/* {currentFeedbacks.map((event) => (
            <EventFeedbackSentiment
              key={event.eventId}
              eventId={event.eventId}
              eventName={event.eventName}
              feedbackData={currentFeedbacks || []} // Handle empty feedbackData
              sliceColor={sliceColor}
            />
          ))} */}
          {currentFeedbacks.map((event) => (
            <EventFeedbackSentiment
              key={event.eventId}
              eventId={event.eventId}
              eventName={event.eventName}
              feedbackData={currentFeedbacks || []} // Handle empty feedbackData
              sliceColor={sliceColor}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackAdmin;
