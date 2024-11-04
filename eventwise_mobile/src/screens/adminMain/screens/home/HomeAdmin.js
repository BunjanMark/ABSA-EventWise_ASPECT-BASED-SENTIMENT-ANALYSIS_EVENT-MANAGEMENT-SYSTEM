import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import EventPackages from "../component/EventPackages";
import EventCalendar from "../component/EventCalendar";
import { ScrollView } from "react-native-gesture-handler";
import { BackHandler } from "react-native";
import { Alert } from "react-native";
import { useEffect } from "react";
import EventFeedbackSentimentHome from "../feedback/EventFeedbackSentimentHome";
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import TotalEventFeedback from "../component/TotalEventFeedback";
import useStore from "../../../../stateManagement/useStore";
import TestUploadComponent from "../component/testUploadComponent";
import EventPackagesHome from "../event/EventPackagesHome";
import EventBookings from "../event/EventBookings";
import UpcomingEvents from "../event/UpcomingEvents";

const HomeAdmin = () => {
  const { eventData, sliceColor } = useStore(); // Using your state store
  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <EventBookings />
        <UpcomingEvents />
        <EventCalendar />

        <EventPackagesHome />
        <TotalEventFeedback eventData={eventData} sliceColor={sliceColor} />
        <View style={{ height: 1000 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeAdmin;
