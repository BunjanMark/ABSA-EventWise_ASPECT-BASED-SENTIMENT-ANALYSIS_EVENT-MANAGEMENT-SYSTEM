import React, { useContext, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { ProfileContext } from "../../../../services/profileContextcp";

import { useFocusEffect } from "@react-navigation/native";
import { getUser, getAccountProfile } from "../../../../services/authServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";
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
        case 3:
          navigation.navigate("CustomAdminStack");
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

export default ProfileSwitchSP;
