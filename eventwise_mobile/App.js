import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { AuthProvider } from "./src/services/authContext";
// import { Navigator } from "./src/helper/Navigator";

import Navigator from "./src/helper/Navigator";

export default function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
