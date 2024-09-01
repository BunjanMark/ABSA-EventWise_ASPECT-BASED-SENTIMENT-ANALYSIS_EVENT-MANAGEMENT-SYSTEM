import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import HeaderSP from "../components/HeaderSP";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeSP = ({ navigation }) => {
  const handleMessagePress = () => {
    // Navigate to the message screen
    navigation.navigate("Messages");
  };

  const handleNotificationPress = () => {
    // Navigate to the notification screen
    navigation.navigate("Notifications");
  };
  return (
    <SafeAreaView>
      <Text>This is the home screen</Text>
      <Button
        title="Go to About Screen"
        onPress={() => navigation.navigate("AboutMeSP")} // We added an onPress event which would navigate to the About screen
      />
      <View style={styles.center}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default HomeSP;
