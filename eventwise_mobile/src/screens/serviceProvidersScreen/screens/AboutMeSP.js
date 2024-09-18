import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const AboutMeSP = () => {
  const [selectedAbout, setSelectedAbout] = useState("A&A");
  const fadeAnim = useRef(new Animated.Value(1)).current; // for description fade animation
  const lineAnim = useRef(new Animated.Value(0)).current; // for line animation (X translation)
  const [currentDescription, setCurrentDescription] = useState("A&A");

  // Descriptions for the "A&A" and "EMS"
  const descriptions = {
    "A&A":
      "A&A is a leading provider of event management solutions, offering innovative and customized services to make your events memorable. With a focus on creativity and attention to detail, A&A has become synonymous with excellence in the event industry.",
    EMS:
      "EMS is a premier service provider specializing in equipment and logistics for large-scale events. Our solutions ensure seamless execution and support, making EMS the preferred choice for organizations looking for reliable event services.",
  };

  useEffect(() => {
    // Start fade-out animation, then change the content, and fade-in
    Animated.timing(fadeAnim, {
      toValue: 0, // fade out
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After fade-out completes, change the content
      setCurrentDescription(selectedAbout);
      // Fade back in
      Animated.timing(fadeAnim, {
        toValue: 1, // fade in with new content
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    // Animate the line position when selectedAbout changes
    const newX = selectedAbout === "A&A" ? 0 : width * 0.5; // 50% of the screen width
    Animated.timing(lineAnim, {
      toValue: newX,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedAbout]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>

      {/* Tab Navigation for A&A and EMS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setSelectedAbout("A&A")}
        >
          <Text
            style={[
              styles.tabText,
              selectedAbout === "A&A" && styles.activeTabText,
            ]}
          >
            A&A
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setSelectedAbout("EMS")}
        >
          <Text
            style={[
              styles.tabText,
              selectedAbout === "EMS" && styles.activeTabText,
            ]}
          >
            EMS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated Line */}
      <View style={styles.lineContainer}>
        <Animated.View
          style={[
            styles.activeLine,
            { transform: [{ translateX: lineAnim }] },
          ]}
        />
      </View>

      {/* Animated Description */}
      <Animated.View style={[styles.descriptionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.descriptionText}>
          {descriptions[currentDescription]}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF", // White background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000", // Black text color
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    position: "relative", // Ensure relative positioning for the line
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 18,
    color: "#888", // Gray color for inactive tabs
  },
  activeTabText: {
    color: "#eeba2b", // Highlight color for active tab
    fontWeight: "bold",
  },
  lineContainer: {
    width: "100%",
    height: 3,
    position: "relative",
    marginTop: 5, // Adjust the margin to ensure the line appears correctly
  },
  activeLine: {
    width: "43%", // Line covers half the width (one tab)
    height: 3,
    backgroundColor: "#eeba2b", // Line color
    position: "absolute",
    left: 0,
    alignItems: "center",
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#000", // Black text color for description
    lineHeight: 24,
    textAlign: "center",
  },
});

export default AboutMeSP;
