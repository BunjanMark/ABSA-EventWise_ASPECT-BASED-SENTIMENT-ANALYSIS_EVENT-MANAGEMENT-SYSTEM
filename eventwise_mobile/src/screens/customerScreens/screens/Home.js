import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  BackHandler,
} from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../elements/Header";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const responsivePadding = width * 0.05;
const responsiveMarginHorizontal = width * -0.05;

const Home = () => {
  const navigator = useNavigation();
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedProfilePicture = await AsyncStorage.getItem(
          "profilePicture"
        );

        setUsername(storedUsername || "Customer Name");
        if (storedProfilePicture) {
          setProfilePicture(storedProfilePicture);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);
  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    });

    const unsubscribeBlur = navigator.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigator]);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={{ flex: 1 }}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.accountsSection}>
            <View style={styles.userProfile}>
              <Image
                source={
                  profilePicture
                    ? { uri: profilePicture }
                    : require("../pictures/user.png")
                }
                style={styles.accountImage}
              />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>Welcome,</Text>
                <Text style={styles.userName}>{username}</Text>
              </View>
              <View style={styles.accInfo}>
                <View>
                  <Text style={styles.placeName}>Cagayan de Oro</Text>
                  <Divider style={styles.accDiv} />
                </View>
                <FontAwesome
                  name="map-marker"
                  size={20}
                  color={"#9F7E1C"}
                  style={styles.dot}
                />
              </View>
            </View>
            <Image
              source={require("../pictures/background.png")}
              style={styles.backImage}
            />
          </View>

          <View style={styles.accountCard}>
            <Image
              source={require("../pictures/user.png")}
              style={styles.accountImage}
            />
            <View style={styles.accountInfo}>
              <Text style={styles.orgName}>Organizer Name</Text>
              <Text style={styles.accountType}>Event Organizer</Text>
            </View>
            <View style={styles.accButton}>
              <View style={styles.aButton}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => alert("Message pressed")}
                >
                  <FontAwesome name="comment" size={18} color={"#333"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => alert("Phone call pressed")}
                >
                  <FontAwesome name="phone-square" size={18} color={"#333"} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.viewProfileButton}
                  onPress={() => {
                    navigator.navigate("ProfileOrganizer");
                  }}
                >
                  <Text style={styles.viewProfileButtonText}>View Profile</Text>
                  <Divider style={styles.viewLine} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Image
            source={require("../pictures/line.png")}
            style={styles.line}
            resizeMode="contain"
          />
          <Text style={styles.sectionTitle}>Popular Events</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.eventList}
          >
            {[
              {
                title: "Mr. & Mrs. Malik Wedding",
                location: "Cagayan de Oro City",
                date: "23 Sept, 23",
                image: require("../pictures/event1.png"),
              },
              {
                title: "Barbella's Birthday",
                location: "Cagayan de Oro City",
                date: "27 July, 23",
                image: require("../pictures/event2.png"),
              },
              {
                title: "Class of 1979 Reunion",
                location: "Cagayan de Oro City",
                date: "12 August, 23",
                image: require("../pictures/event3.png"),
              },
              {
                title: "Barbella's Debut",
                location: "Cagayan de Oro City",
                date: "23 Sept, 25",
                image: require("../pictures/event4.png"),
              },
              {
                title: "Kids Party",
                location: "Cagayan de Oro City",
                date: "12 August, 24",
                image: require("../pictures/event5.png"),
              },
            ].map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Image source={event.image} style={styles.eventImage} />
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          <Text style={styles.venueTitle}>Packages</Text>
          <View style={styles.recommendationsContainer}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <View key={index} style={styles.recommendationItem} />
              ))}
          </View>
          <Text style={styles.venueTitle}>Venue</Text>
          <Image
            source={require("../pictures/venue.png")}
            style={styles.venueImage}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingBottom: 40,
  },
  userProfile: {
    alignItems: "flex-end",
    marginVertical: 6,
    flexDirection: "row",
    marginTop: -10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  accountsSection: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "rgba(84, 84, 84, 0.9)",
    borderRadius: 60,
    marginLeft: -20,
    marginRight: -20,
    marginBottom: 50,
  },
  accDivider: {
    height: 7,
    width: 50,
    backgroundColor: "#878787",
    alignSelf: "center",
    marginBottom: 20,
  },
  accountsSection: {
    marginTop: 10,
    padding: responsivePadding,
    backgroundColor: "rgba(84, 84, 84, 0.9)",
    borderRadius: 60,
    marginLeft: responsiveMarginHorizontal,
    marginRight: responsiveMarginHorizontal,
    marginBottom: 50,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  backImage: {
    width: "auto",
    height: 200,
    padding: responsivePadding,
    marginLeft: responsiveMarginHorizontal,
    marginRight: responsiveMarginHorizontal,
    marginBottom: -50,
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  accInfo: {
    marginLeft: 10,
    flexDirection: "row",
  },
  accountInfo: {
    flex: 1,
    marginLeft: 10,
  },
  accountName: {
    fontSize: 10,
    color: "#fff",
  },
  placeName: {
    fontSize: 10,
    color: "#fff",
    marginTop: 8,
  },
  accDiv: {
    width: 70,
  },
  orgName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  accountType: {
    fontSize: 14,
    color: "#888",
  },
  dot: {
    marginLeft: 7,
    marginRight: 10,
    marginBottom: 5,
  },
  dots: {
    marginRight: 20,
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 25,
  },
  accButton: {
    flexDirection: "column",
  },
  aButton: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewProfileButton: {
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  viewProfileButtonText: {
    color: "#EFBF04",
    fontSize: 12,
    fontWeight: "bold",
  },
  viewLine: {
    width: 65,
    backgroundColor: "#EFBF04",
  },
  sectionTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginVertical: 20,
  },
  eventList: {
    marginVertical: 10,
  },
  eventItem: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    width: 200,
    marginHorizontal: 8,
  },
  eventImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "gray",
  },
  eventDate: {
    fontSize: 14,
    color: "gray",
  },
  recommendationsTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
  recommendationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recommendationItem: {
    backgroundColor: "white",
    width: "48%",
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  venueTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginVertical: 20,
  },
  venueImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
