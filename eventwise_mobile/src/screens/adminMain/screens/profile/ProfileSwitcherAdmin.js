import React, { useContext, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { ProfileContext } from "../../../../services/profileContextcp";

import { useFocusEffect } from "@react-navigation/native";
import { getUser, getAccountProfile } from "../../../../services/authServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";
const ProfileSwitcherAdmin = () => {
  const navigation = useNavigation();
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
  // const { user, accountProfiles, setUser, setAccountProfiles } = useStore();

  // this is the previous state  12;23 nov3
  // const handleSwitchProfile = async (profile) => {
  //   try {
  //     setActiveProfile(profile);
  //     // console.log("Switching profile to:", profile.id);
  //     console.log("switch profile with role_id: ", profile.role_id);
  //     switchProfile(profile.role_id);
  //   } catch (error) {
  //     console.error("Error switching profile:", error);
  //   }
  // };

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
  // const handleSwitchProfile = async (profile) => {
  //   try {
  //     setActiveProfile(profile);
  //     console.log("switch profile with role_id: ", profile.role_id);

  //     // Navigate to the appropriate screen based on the role_id
  //     switch (profile.role_id) {
  //       case 1:
  //         navigation.navigate("AdminScreen");
  //         break;
  //       case 2:
  //         navigation.navigate("CustomerScreen");
  //         break;
  //       case 3:
  //         navigation.navigate("ServiceProviderScreen");
  //         break;
  //       default:
  //         console.error("Invalid role_id:", profile.role_id);
  //     }

  //     switchProfile(profile.role_id);
  //   } catch (error) {
  //     console.error("Error switching profile:", error);
  //   }
  // };
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
  );
};

export default ProfileSwitcherAdmin;
