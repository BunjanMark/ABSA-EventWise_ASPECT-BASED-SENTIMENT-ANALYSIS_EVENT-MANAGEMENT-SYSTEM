import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, Modal } from "react-native";
import PieChart from "react-native-pie-chart";
import styles from "../../styles/styles"; // Ensure path is correct
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventFeedbackSentiment = ({
  eventId,
  title,
  eventName,
  feedbackData,

  sliceColor,
}) => {
  const navigation = useNavigation();
  const handleGoToButtonPress = () => {
    navigation.push("FeedbackEventDetails", { eventId });
    // FeedbackEventDetails
  };

  const widthAndHeight = 160;
  const [modalVisiblePositive, setModalVisiblePositive] = useState(false);
  const [modalVisibleNegative, setModalVisibleNegative] = useState(false);
  const [modalVisibleNeutral, setModalVisibleNeutral] = useState(false);
  // Extract positive, negative, and neutral counts from feedbackData

  const classifiedFeedbackData = {
    positive: feedbackData.filter(
      (feedback) => feedback.sentiment === "positive"
    ),
    negative: feedbackData.filter(
      (feedback) => feedback.sentiment === "negative"
    ),
    neutral: feedbackData.filter(
      (feedback) => feedback.sentiment === "neutral"
    ),
  };
  const positiveCount = classifiedFeedbackData.positive.length;
  const negativeCount = classifiedFeedbackData.negative.length;
  const neutralCount = classifiedFeedbackData.neutral.length;
  const series = [negativeCount, positiveCount, neutralCount];

  return (
    <SafeAreaView>
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
              },
            ]}
            lineBreakMode="tail"
            numberOfLines={1}
          >
            {eventName} Total Feedback
          </Text>
          <TouchableOpacity onPress={handleGoToButtonPress}>
            <Text style={styles.subtitle}>go to</Text>
            <AntDesign name="swapright" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.feedbackSubContainer}>
          <View style={styles.sentimentBlock}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.6}
            />
          </View>
          <View style={styles.sentimentBlock}>
            <View style={[styles.sentimentList, { marginBottom: 15 }]}>
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                Total feedbacks:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {/* {series.reduce((a, b) => a + b, 0)}
                 */}
                {feedbackData.length}
              </Text>
            </View>

            {/* Modal Trigger Buttons */}
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
                        Number of Positive feedbacks: {positiveCount}
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
                        Number of Negative feedbacks: {negativeCount}
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
                        Number of Neutral feedbacks: {neutralCount}
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
    </SafeAreaView>
  );
};

export default EventFeedbackSentiment;
