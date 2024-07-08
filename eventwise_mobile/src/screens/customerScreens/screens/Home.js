import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import Header from "../elements/Header";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
    <ImageBackground
      source={require("../pictures/bg.png")}
    >
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.nameText}>Your Name</Text>
            <Text style={styles.roleText}>Event Organizer</Text>
          </View>
          <Image
            source={{ uri: "https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/26045656/iNNunLcDKlvfIDbG.png" }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Get Ready*Discover the World</Text>
          <Text style={styles.sectionTitle}>Event's</Text>
        </View>
        <View style={styles.eventContainer}>
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>Mr. & Mrs. Malik Wedding</Text>
            <Text style={styles.eventLocation}>Cagayan de Oro City</Text>
            <Text style={styles.eventDate}>23 Sept, 23</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>Barbella's Birthday</Text>
            <Text style={styles.eventLocation}>Cagayan de Oro City</Text>
            <Text style={styles.eventDate}>25-27 July, 23</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>Barbella's Debut</Text>
            <Text style={styles.eventLocation}>Cagayan de Oro City</Text>
            <Text style={styles.eventDate}>23 Sept, 25</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>Kids Party</Text>
            <Text style={styles.eventLocation}>Cagayan de Oro City</Text>
            <Text style={styles.eventDate}>12 August, 24</Text>
          </View>
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>Class of 1979 Reunion</Text>
            <Text style={styles.eventLocation}>Cagayan de Oro City</Text>
            <Text style={styles.eventDate}>12 August, 23</Text>
            <Text style={styles.eventRole}>Guest</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description Of the Event</Text>
          <Text style={styles.descriptionText}>
            Event Recommendations, Packages, Venue
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
  },
  nameText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  roleText: {
    fontSize: 16,
    color: "white",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  eventContainer: {
    marginVertical: 20,
  },
  eventItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventLocation: {
    fontSize: 16,
    color: "gray",
  },
  eventDate: {
    fontSize: 16,
    color: "gray",
  },
  eventRole: {
    fontSize: 16,
    color: "gray",
  },
  descriptionContainer: {
    marginVertical: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 16,
    color: "white",
  },
  logoutButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
