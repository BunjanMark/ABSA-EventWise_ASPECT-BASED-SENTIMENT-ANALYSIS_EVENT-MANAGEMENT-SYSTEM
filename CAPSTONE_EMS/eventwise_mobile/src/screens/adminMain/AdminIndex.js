import React from "react";
import DrawerNavigator from "./navigators/DrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminIndex = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerNavigator />
    </SafeAreaView>
  );
};

export default AdminIndex;
