import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; // Icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for fading effect

const screenWidth = Dimensions.get("window").width; // Get the screen width

// Sample events data
const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('../assets/event1.png'), date: '2024-07-01', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  { id: '2', title: 'Elizabeth Birthday', image: require('../assets/event2.png'), date: '2024-08-12', address: 'CDO', buttons: ['Attendee', 'Feedback', 'Inventory'] },
  { id: '3', title: 'Class of 1979 Reunion', image: require('../assets/event3.png'), date: '2024-09-25', address: 'CDO', buttons: ['Edit', 'Equipment'] },
  // Additional events...
];

const HomeSP = () => {
  // Function to render each event item
  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Gray Rectangle */}
      <View style={styles.rectangle}>
        <View style={styles.row}>
          {/* Left Side: Profile Image */}
          <Image source={require("../assets/pro_pic.png")} style={styles.profileImage} />

          {/* Middle: Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.nameText}>Service Provider</Text>
          </View>

          {/* Right Side: Location */}
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text style={styles.locationText}>Cagayan de Oro City</Text>
          </View>
        </View>

        {/* Below the First Row: Home Image */}
        <Image source={require("../assets/home.png")} style={styles.homeImage} />
      </View>

      {/* Fading Line */}
      <LinearGradient
        colors={['rgba(255,196,43,0)', 'rgba(255,196,43,1)', 'rgba(255,196,43,0)']} // Transparent at both ends, solid in the middle
        start={{ x: 0, y: 0 }} // Start of the line (left side, transparent)
        end={{ x: 1, y: 0 }}   // End of the line (right side, transparent again)
        style={styles.fadingLine}
      />

      {/* Popular Event Text */}
      <Text style={styles.popularEventText}>Popular Events</Text>

      {/* Horizontal Scrolling Event List */}
      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  rectangle: {
    backgroundColor: "#d3d3d3", // Gray background for the rectangle
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center", // Align content to center horizontally
  },
  row: {
    flexDirection: "row", // Align profile, text, and location horizontally
    alignItems: "center", // Vertically center items
    justifyContent: "space-between",
    width: "100%", // Ensure it takes up the full width of the rectangle
  },
  profileImage: {
    width: 50,  // Small profile image size
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 16,
    color: "#777",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
  },
  homeImage: {
    width: screenWidth - 32,  // Dynamically fit image to screen width
    height: (screenWidth - 32) * 0.5,  // Maintain a good aspect ratio
    marginTop: 20,
    resizeMode: "contain",  // Ensures the image scales correctly
  },
  fadingLine: {
    height: 2,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  popularEventText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailContainer: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    color: '#2A93D5',
    marginLeft: 5,
  },
  eventsListContainer: {
    paddingBottom: 20, // Adjust this based on your needs
    
  },
});

export default HomeSP;
