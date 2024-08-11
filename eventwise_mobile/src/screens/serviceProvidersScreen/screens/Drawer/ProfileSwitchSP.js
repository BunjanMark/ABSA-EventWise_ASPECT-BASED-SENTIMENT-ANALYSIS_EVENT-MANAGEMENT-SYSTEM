import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/store";
import { Button } from "react-native-paper";

const ProfileSwitchSP = () => {
  const { activeProfile } = useStore();
  const navigation = useNavigation();

  // const handleBackPress = () => {
  //   Alert.alert("Exit App", "Are you sure you want to exit?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => BackHandler.exitApp() },
  //   ]);
  //   return true;
  // };

  // useEffect(() => {
  //   const onFocus = () => {
  //     BackHandler.addEventListener("hardwareBackPress", handleBackPress);
  //   };

  //   const onBlur = () => {
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  //   };

  //   navigation.addListener("focus", onFocus);
  //   navigation.addListener("blur", onBlur);

  //   return () => {
  //     navigation.removeListener("focus", onFocus);
  //     navigation.removeListener("blur", onBlur);
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  //   };
  // }, [navigation]);

  const handleSwitchProfile = () => {
    navigation.navigate("CustomerStack");
  };

  if (!activeProfile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No profile selected.</Text>
        <Button onPress={handleSwitchProfile}>Switch Profile</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>This is my profile</Text>
      <Text style={styles.headerText}>Profile Details</Text>
      <Text style={styles.detailText}>Profile ID: {activeProfile.id}</Text>
      <Text style={styles.detailText}>
        Profile Name: {activeProfile.service_provider_name}
      </Text>
      <Text style={styles.detailText}>
        Description: {activeProfile.description}
      </Text>
      <Button onPress={handleSwitchProfile}>Switch Profile</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ProfileSwitchSP;
