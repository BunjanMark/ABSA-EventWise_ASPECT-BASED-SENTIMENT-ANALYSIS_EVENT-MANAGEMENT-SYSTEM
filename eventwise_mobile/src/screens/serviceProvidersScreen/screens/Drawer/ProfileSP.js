import { View, Text } from "react-native";
import React from "react";
import { Button, StyleSheet } from "react-native";
const ProfileSP = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        title="Go to SwitchProfileSP"
        onPress={() => navigation.navigate("ProfileSwitchSP")} // We added an onPress event which would navigate to the About screen
      />
    </View>
  );
};

export default ProfileSP;
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
