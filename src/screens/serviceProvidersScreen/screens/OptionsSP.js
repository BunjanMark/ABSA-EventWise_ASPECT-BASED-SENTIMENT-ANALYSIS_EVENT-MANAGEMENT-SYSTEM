import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Switch } from "react-native";
import useStore from "../../../stateManagement/store"; // Adjust the path accordingly
import { styling } from "../styles/styles"; // Adjust the path accordingly

const OptionsSP = () => {
  const { theme, setTheme, initializeTheme } = useStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    initializeTheme: state.initializeTheme,
  }));

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    initializeTheme(); // Initialize theme on mount
  }, [initializeTheme]);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const toggleSwitch = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Enable Dark Mode</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
    </View>
  );
};

export default OptionsSP;
