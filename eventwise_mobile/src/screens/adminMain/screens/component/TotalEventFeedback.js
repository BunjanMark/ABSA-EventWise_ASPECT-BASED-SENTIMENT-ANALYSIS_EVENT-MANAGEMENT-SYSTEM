import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import styles from "../../styles/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import useStore from "../../../../stateManagement/useStore";
import { useState } from "react";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TotalEventFeedback = ({ eventData, sliceColor }) => {
  // Initialize counters
  const navigation = useNavigation();
  const totalEvents = eventData.length;
  const feedbackCount = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };
  const [modalVisiblePositive, setModalVisiblePositive] = useState(false);
  const [modalVisibleNegative, setModalVisibleNegative] = useState(false);
  const [modalVisibleNeutral, setModalVisibleNeutral] = useState(false);
  // Process all feedback data across events
  eventData.forEach((event) => {
    event.feedbackData.forEach((feedback) => {
      // Tally feedback based on sentiment
      if (feedback.sentiment in feedbackCount) {
        feedbackCount[feedback.sentiment]++;
      } else {
        feedbackCount[feedback.sentiment] = 1;
      }
    });
  });
  const handleGoToButtonPress = () => {
    console.log("Go to FeedbackAdmin");
    navigation.navigate("Feedback");
    // FeedbackEventDetails
  };
  return (
    <SafeAreaView style={[styles.container]}>
      {/* <View style={[styles.header, {}]}>
        <Text style={styles.title}>Feedback Summary</Text>
      </View> */}
      <View style={[styles.feedbackMainContainer]}>
        <View
          style={[
            styles.header,
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              // backgroundColor: "red",
              padding: 10,
              paddingHorizontal: 40,
            },
          ]}
        >
          <Text
            style={[
              // styles.title,
              {
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
                width: "100%",

                marginBottom: -5,
                fontSize: 20,
                fontWeight: "500",
                color: "black",
              },
            ]}
            lineBreakMode="tail"
            numberOfLines={1}
          >
            Total Feedback Summary
          </Text>
          <TouchableOpacity onPress={handleGoToButtonPress}>
            <Text style={styles.subtitle}>go to</Text>
            <AntDesign name="swapright" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.feedbackContainer,
            {
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: 7,
            },
          ]}
        >
          <View style={[styles.sentimentBlock, {}]}>
            <PieChart
              widthAndHeight={160}
              series={[
                feedbackCount.negative,
                feedbackCount.positive,
                feedbackCount.neutral,
              ]}
              sliceColor={sliceColor}
              coverRadius={0.6}
            />
          </View>
          <View style={[styles.sentimentBlock, {}]}>
            <View
              style={[
                styles.sentimentList,
                {
                  marginBottom: 30,
                  flexDirection: "column",

                  alignItems: "flex-start",
                  // backgroundColor: "white",
                },
              ]}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Total Events: {totalEvents}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Total feedbacks:
                {feedbackCount.positive +
                  feedbackCount.negative +
                  feedbackCount.neutral}
              </Text>
            </View>
            <View>
              <View style={styles.sentimentList}>
                <Pressable
                  onPress={() => setModalVisiblePositive(true)}
                  style={styles.sentimentList}
                >
                  <PieChart
                    widthAndHeight={32}
                    series={[100]}
                    sliceColor={["rgba(9,226,0,1)"]}
                  />
                  <Text>Positive</Text>
                </Pressable>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisiblePositive}
                  onRequestClose={() => setModalVisiblePositive(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Number of Positive feedbacks: {feedbackCount.positive}
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisiblePositive(false)}
                      >
                        <Text style={styles.textStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.sentimentList}>
                <Pressable
                  onPress={() => setModalVisibleNegative(true)}
                  style={styles.sentimentList}
                >
                  <PieChart
                    widthAndHeight={32}
                    series={[100]}
                    sliceColor={["#ff3c00"]}
                  />
                  <Text>Negative</Text>
                </Pressable>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisibleNegative}
                  onRequestClose={() => setModalVisibleNegative(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Number of Negative feedbacks: {feedbackCount.negative}
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisibleNegative(false)}
                      >
                        <Text style={styles.textStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.sentimentList}>
                <Pressable
                  onPress={() => setModalVisibleNeutral(true)}
                  style={styles.sentimentList}
                >
                  <PieChart
                    widthAndHeight={32}
                    series={[100]}
                    sliceColor={["#fbd203"]}
                  />
                  <Text>Neutral</Text>
                </Pressable>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisibleNeutral}
                  onRequestClose={() => setModalVisibleNeutral(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Number of Neutral feedbacks: {feedbackCount.neutral}
                      </Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisibleNeutral(false)}
                      >
                        <Text style={styles.textStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Display total counts for each sentiment */}
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#f8f9fa",
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     marginVertical: 4,
//   },
// });

export default TotalEventFeedback;
