import { View, Text, SafeAreaView } from "react-native";
import React from "react";

import EventFeedbackSentiment from "../component/EventFeedbackSentiment";
import styles from "../../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import LongPressComponent from "./LongPressComponent";
import EventFeedbackAspect from "./EventFeedbackAspect";
const FeedbackAdmin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, {}]}>
        <Text style={styles.title}>Feedback Analysis</Text>
        <TouchableOpacity>
          {/* <Text style={styles.subtitle}>Go to</Text> */}
        </TouchableOpacity>
      </View>
      {/* Components */}
      <EventFeedbackSentiment />
      <EventFeedbackAspect />
    </SafeAreaView>
  );
};

export default FeedbackAdmin;
