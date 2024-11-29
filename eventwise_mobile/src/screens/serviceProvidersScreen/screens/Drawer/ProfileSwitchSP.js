import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ProfileContext } from "../../../../services/profileContextcp";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getUser, getAccountProfile } from "../../../../services/authServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import useStore from "../../../../stateManagement/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import API_URL from "../../../../constants/constant";
const ProfileSwitchSP = () => {
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
  const navigation = useNavigation();
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  // const { switchProfile } = useContext(ProfileContext);

  // const { user, accountProfiles, setUser, setAccountProfiles } = useStore();

  // const handleSwitchProfile = (profile) => {
  //   console.log("Trying to switch to profile:", profile);
  //   try {
  //     setActiveProfile(profile);
  //     console.log("Active profile set to:", activeProfile);
  //     switchProfile(profile.role_id);
  //     console.log("Switched to role ID:", profile.role_id);
  //     console.log("Active profile after switch:", activeProfile);
  //   } catch (error) {
  //     console.error("Error switching profile:", error);
  //   }
  // };

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
      const response = await api.post("auth/createProfileCustomer", {
        service_provider_name: serviceName,
        description: description,
      });
      console.log(response);
      Alert.alert("Success", "Customer profile created successfully!");
      setServiceName("");
      setDescription("");
      setFormVisible(false); // Hide form after successful submission
    } catch (error) {
      console.error("Error creating Customer profile:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create Customer profile."
      );
    }
  };
  const handleSwitchProfile = (profile) => {
    try {
      // Use Zustand's setActiveProfile to ensure the active profile state updates across all instances
      setActiveProfile(profile);
      console.log("Switched to role ID:", profile.role_id);
      console.log("what;s the active profile:", activeProfile);
      // Navigate based on role_id
      switch (profile.role_id) {
        case 1:
          navigation.navigate("CustomAdminStack");
          break;
        case 2:
          navigation.navigate("CustomCustomerStack");
          break;
        case 3:
          navigation.navigate("CustomServiceProviderStack");
          break;
        default:
          console.error("Invalid role_id:", profile.role_id);
      }

      switchProfile(profile.role_id);
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchAccountProfile = async () => {
        try {
          const fetchedUser = await getUser();
          setUser(fetchedUser);
          const profileResponse = await getAccountProfile();
          const profiles = profileResponse.data;
          console.log("Fetched user:", fetchedUser);

          // Filter profiles that match the current user
          const filteredProfiles = profiles.filter(
            (profile) => profile.user_id === fetchedUser.id
          );
          setAccountProfiles(filteredProfiles);
          setActiveProfile(filteredProfiles[0] || null); // Set the first profile or null if empty
        } catch (error) {
          console.error("Error fetching account profiles:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountProfile();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (!user || !activeProfile) {
    return <Text>Loading user or profile data...</Text>;
  }

  if (!accountProfiles.length) {
    return <Text>No profiles available</Text>;
  }
  // console.log("profileswitch:", accountProfiles);
  // console.log(accountProfiles);
  // count the number of service provider profiles

  return (
    <SafeAreaView>
      <View>
        {/* Switch Profile Button */}

        <Text style={styles.header}>Create a New Profile</Text>
        {isFormVisible ? (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Customer Name</Text>
            <TextInput
              style={styles.input}
              value={serviceName}
              onChangeText={setServiceName}
              placeholder="Enter Customer Name"
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
            <Text style={styles.addProfileText}>Create Customer Profile</Text>
          </TouchableOpacity>
        )}

        <Text>
          {/* Current Account: {user ? user.name : "No User Data"}
           */}
          Current User: {user ? user.name : "No User Data"}
        </Text>
        <Text>
          current profile:{" "}
          {activeProfile && activeProfile === 1 ? "Admin" : "Service Provider"}
        </Text>

        {accountProfiles.map((profile) => (
          <Text key={profile.id}>{profile.service_provider_name}</Text>
        ))}
        {accountProfiles.map((profile) => (
          <Button
            key={profile.role_id}
            title={`Switch to ${profile.service_provider_name}`}
            onPress={() => handleSwitchProfile(profile)}
            // disabled={profile.id === 5} // Assuming service provider profile ID is 5
          />
        ))}
      </View>
    </SafeAreaView>
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

export default ProfileSwitchSP;
