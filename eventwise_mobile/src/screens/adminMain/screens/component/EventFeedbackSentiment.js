import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import PieChart from "react-native-pie-chart";
import styles from "../../styles/styles";
import { Modal } from "react-native";
import { useState } from "react";
import useStore from "../../../../stateManagement/useStore";
const EventFeedbackSentiment = () => {
  const widthAndHeight = 160;
  //   get the series and sliceColor and modal visible from the store
  const {
    modalVisiblePositive,
    modalVisibleNegative,
    modalVisibleNeutral,
    series,
    sliceColor,
    setModalVisiblePositive,
    setModalVisibleNegative,
    setModalVisibleNeutral,
  } = useStore();
  return (
    <SafeAreaView>
      {/* <View style={styles.header}>
        <Text style={styles.title}>Feedback Sentiment Analysis</Text>
        <TouchableOpacity></TouchableOpacity>
      </View> */}
      <View style={styles.feedbackMainContainer}>
        <View style={styles.sentimentBlock}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.6}
          />
        </View>
        <View
          style={{
            ...styles.sentimentBlock,
          }}
        >
          <View
            style={[
              styles.sentimentList,
              { marginBottom: 15, flexDirection: "column" },
            ]}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Total feedbacks:
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {series.reduce((a, b) => a + b)}
            </Text>
          </View>
          {/* Pressable modal for number of feedbacks */}
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
                      Number of Positive feedbacks: {series[1]}
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

            {/*
             */}

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
                <Text>Negative </Text>
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
                      Number of Negative feedbacks: {series[0]}
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

            {/*
             */}

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
                      Number of Negative feedbacks: {series[2]}
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
    </SafeAreaView>
  );
};

export default EventFeedbackSentiment;
