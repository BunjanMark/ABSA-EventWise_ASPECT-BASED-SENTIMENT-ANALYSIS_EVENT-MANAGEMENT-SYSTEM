import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccountProfile, getUser } from "./authServices";
import { switchProfile } from "./profileServices";
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const user = await getUser();
        const response = await getAccountProfile();
        const userProfiles = response.data.filter(
          (profile) => profile.user_id === user.id
        );
        setProfiles(userProfiles);

        // Load the active profile from AsyncStorage if it exists
        const storedProfile = await AsyncStorage.getItem("activeProfile");
        if (storedProfile) {
          setActiveProfile(JSON.parse(storedProfile));
        } else {
          setActiveProfile(userProfiles[0]); // Set the first profile as active by default
        }
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const switchProfile = async (profiles) => {
    try {
      setProfiles(profiles);
      await AsyncStorage.setItem("activeProfile", JSON.stringify(profiles));
      console.log("current contextc profile: ", profiles);
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profiles, activeProfile, switchProfile, loading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
