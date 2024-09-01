import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useStore from "../../../stateManagement/store"; // Ensure correct import path
import { styling } from "../styles/styles"; // Ensure correct import path

const EventsSP = () => {
  const { theme, initializeTheme } = useStore((state) => ({
    theme: state.theme,
    initializeTheme: state.initializeTheme,
  }));

  useEffect(() => {
    initializeTheme(); // Initialize theme on mount
  }, [initializeTheme]);

  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>EventsSP</Text>
    </View>
  );
};

export default EventsSP;
