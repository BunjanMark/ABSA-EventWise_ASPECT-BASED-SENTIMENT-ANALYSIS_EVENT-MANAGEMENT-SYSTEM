import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
} from "react-native";
import CustomHeader from "../elements/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Feedback = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleFeedbackSubmit = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToHomeScreen = () => {
    navigation.navigate("home");
  };

  return (
    <View style={styles.background}>
      <CustomHeader
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.textStyle}>Please Give Feedback</Text>

        {/* Feedback Questions */}
        <Text style={styles.questionText}>How satisfied are you with the event?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            placeholderTextColor="#888"
            onChangeText={(text) => setFeedback({ ...feedback, question1: text })}
            value={feedback.question1}
          />
        </View>

        <Text style={styles.questionText}>What did you like most about the service?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            placeholderTextColor="#888"
            onChangeText={(text) => setFeedback({ ...feedback, question2: text })}
            value={feedback.question2}
          />
        </View>

        <Text style={styles.questionText}>What can we improve for future events?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            placeholderTextColor="#888"
            onChangeText={(text) => setFeedback({ ...feedback, question3: text })}
            value={feedback.question3}
          />
        </View>

        <Text style={styles.questionText}>Any additional comments or suggestions?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Type your feedback here"
            placeholderTextColor="#888"
            onChangeText={(text) => setFeedback({ ...feedback, question5: text })}
            value={feedback.question5}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={handleFeedbackSubmit}
        >
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalMessage}>Thank you for your feedback!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>

      {/* Bottom Navigation Icons */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHomeScreen}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={[styles.navText, { color: "black" }]}>Event</Text>
        </TouchableOpacity>
        <View style={styles.navItem}>
          <Ionicons name="chatbubble" size={24} color="#FFC42B" />
          <Text style={[styles.navText, { color: "#FFC42B" }]}>Feedback</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  background: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 26,
    marginVertical: 20,
    color: "black",
    paddingTop: 5,
    paddingBottom: 15,
  },
  questionText: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 10,
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  inputStyle: {
    height: 50,
    paddingHorizontal: 50,
    color: "black",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#FFC42B",
    borderRadius: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FFC42B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 90,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "black",
    marginTop: 3,
  },
});

export default Feedback;
