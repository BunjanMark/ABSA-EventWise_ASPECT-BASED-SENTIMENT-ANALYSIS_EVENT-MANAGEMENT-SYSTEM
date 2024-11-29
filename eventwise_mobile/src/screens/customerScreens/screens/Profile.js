import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../elements/Header";
import { useNavigation } from "@react-navigation/native";
import API_URL from "../../../constants/constant";
import event1 from "../pictures/event1.png";
import event2 from "../pictures/event2.png";
import event3 from "../pictures/event3.png";
import event4 from "../pictures/event4.png";
import event5 from "../pictures/event5.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { getUser } from "../../../services/authServices";
import { getAccountProfile } from "../../../services/authServices";
import useStore from "../../../stateManagement/useStore";
const Profile = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  // const { switchProfile } = useContext(ProfileContext);
  const switchProfile = useStore((state) => state.switchProfile);
  const profiles = useStore((state) => state.profiles);
  const activeProfile = useStore((state) => state.activeProfile);
  // const setProfiles = useStore((state) => state.setProfiles);
  const setActiveProfile = useStore((state) => state.setActiveProfile);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const accountProfiles = useStore((state) => state.accountProfiles);
  const setAccountProfiles = useStore((state) => state.setAccountProfiles);
  const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      Accept: "application/json",
    },
  });
  // Axios interceptor to attach auth token
  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const handleCreateProfile = async () => {
    try {
      const response = await api.post("auth/createProfileServiceProvider", {
        service_provider_name: serviceName,
        description: description,
      });
      console.log(response);
      Alert.alert("Success", "Service provider profile created successfully!");
      setServiceName("");
      setDescription("");
      setFormVisible(false); // Hide form after successful submission
    } catch (error) {
      console.error("Error creating service provider profile:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to create service provider profile."
      );
    }
  };
  const handleSwitchProfile = (profile) => {
    try {
      // either of profiles will switch to SP
      // setActiveProfile(profile);
      // console.log("profile iD", activeProfile);

      switchProfile(profile.role_id);
      console.log("profile roleID ", profile.role_id);
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchAccountProfile = async () => {
        try {
          const user = await getUser();
          setUser(user);

          const profileResponse = await getAccountProfile();
          const profiles = profileResponse.data;
          // console.log("prswtcherAdminCurrent user: ", user);

          const filteredProfiles = profiles.filter(
            (profile) => profile.user_id === user.id
          );

          setAccountProfiles(filteredProfiles);
          // if (filteredProfiles.length > 0) {
          //   setActiveProfile(filteredProfiles[0]);
          // }

          console.log("current profile", activeProfile);
        } catch (error) {
          console.error("Error fetching account profiles:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountProfile();
    }, [])
  );

  const navigator = useNavigation();

  // Static dataset for events
  const events = [
    {
      id: 1,
      name: "Event One",
      image: event1,
      location: "New York",
      date: "12/12/2024",
    },
    {
      id: 2,
      name: "Event Two",
      image: event2,
      location: "Los Angeles",
      date: "01/01/2025",
    },
    {
      id: 3,
      name: "Event Three",
      image: event3,
      location: "Chicago",
      date: "03/15/2025",
    },
    {
      id: 4,
      name: "Event Four",
      image: event4,
      location: "Houston",
      date: "05/20/2025",
    },
    {
      id: 5,
      name: "Event Five",
      image: event5,
      location: "Phoenix",
      date: "07/25/2025",
    },
  ];

  const [favorites, setFavorites] = useState([]); // State to track favorite events

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((eventId) => eventId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Profile Content */}
      <View style={styles.container}>
        <View style={styles.profileBox}>
          {/* Profile Picture */}
          <Image
            source={require("../pictures/user.png")} // Replace with your image path
            style={styles.profilePicture}
          />
          {/* Name */}
          <Text style={styles.name}>Customer Name</Text>
          {/* Username */}
          <Text style={styles.username}>@username</Text>
          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigator.navigate("EditProfile")}
          >
            <FontAwesome name="pencil-square" size={16} color={"#fff"} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Switch Profile Button */}

        <Text style={styles.header}>Create a New Profile</Text>
        {isFormVisible ? (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Service Provider Name</Text>
            <TextInput
              style={styles.input}
              value={serviceName}
              onChangeText={setServiceName}
              placeholder="Enter service provider name"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCreateProfile}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addProfileButton}
            onPress={() => setFormVisible(true)}
          >
            <FontAwesome name="plus-circle" size={24} color="#fff" />
            <Text style={styles.addProfileText}>Create New Profile</Text>
          </TouchableOpacity>
        )}

        <SafeAreaView>
          <View>
            <Text>
              {/* Current Account: {user ? user.name : "No User Data"}
               */}
              Current User: {user ? user.name : "No User Data"}
            </Text>
            <Text>
              current profile:{" "}
              {activeProfile && activeProfile === 1
                ? "Admin"
                : "Service Provider"}
            </Text>
            {accountProfiles.map((profile) => (
              <Button
                key={profile.role_id}
                title={`Switch to ${profile.service_provider_name}`}
                onPress={() => handleSwitchProfile(profile)}
                // disabled={profile.id === 5} // Assuming service provider profile ID is 5
              />
            ))}
            {/* {accountProfiles.map((profile) => (
            <Button
              key={profile.id}
              title={`Delete ${profile.service_provider_name}`}
              onPress={() => {
                //  Implement delete profile functionality
                console.log("Deleting profile:", profile.id);
              }}
            />
          ))} */}
          </View>
        </SafeAreaView>
        {/* My Events Header */}
        <Text style={styles.header}>My Events</Text>

        {/* Events Container */}
        <ScrollView horizontal={true} style={styles.eventsContainer}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              {/* Event Image with Heart Icon */}
              <View style={styles.imageContainer}>
                <Image source={event.image} style={styles.eventImage} />
                <TouchableOpacity
                  style={[
                    styles.heartIcon,
                    favorites.includes(event.id) && styles.heartIconActive,
                  ]}
                  onPress={() => toggleFavorite(event.id)}
                >
                  <FontAwesome name="heart" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              {/* Event Details */}
              <Text style={styles.eventName}>{event.name}</Text>
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <FontAwesome name="calendar" size={14} color="#2A93D5" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <FontAwesome name="map-marker" size={14} color="#2A93D5" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  profileBox: {
    borderColor: "#C2B067",
    borderWidth: 2,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
    top: 50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    position: "absolute",
    top: -50,
  },
  name: {
    marginTop: 60,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
  },
  editButton: {
    marginTop: 15,
    backgroundColor: "#FFC42B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
  },
  switchProfileButton: {
    top: 70,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  switchProfileText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginTop: 90,
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    height: 220,
    width: 200,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 50,
  },
  heartIconActive: {
    backgroundColor: "red",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FF9900",
  },
  eventDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventDetailText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#777",
  },
});

export default Profile;
