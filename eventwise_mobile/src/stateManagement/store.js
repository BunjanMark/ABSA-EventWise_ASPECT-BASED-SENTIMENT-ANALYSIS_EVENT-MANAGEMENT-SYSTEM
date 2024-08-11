import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create((set) => ({
  user: null,
  accountProfiles: [],
  activeProfile: null,
  loading: true,
  navigation: null, // Store navigation object here

  setUser: (user) => set({ user }),
  setAccountProfiles: (profiles) => set({ accountProfiles: profiles }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
  setLoading: (loading) => set({ loading }),
  setNavigation: (navigation) => set({ navigation }),

  // Fetch and set user and account profiles
  fetchUserAndProfiles: async () => {
    set({ loading: true });
    try {
      const user = await getUser();
      set({ user });

      const profileResponse = await getAccountProfile();
      const profiles = profileResponse.data.filter(
        (profile) => profile.user_id === user.id
      );
      set({ accountProfiles: profiles });

      const storedProfile = await AsyncStorage.getItem("activeProfile");
      if (storedProfile) {
        set({ activeProfile: JSON.parse(storedProfile) });
      } else if (profiles.length > 0) {
        set({ activeProfile: profiles[0] });
      }
    } catch (error) {
      console.error("Error fetching user and profiles:", error);
    } finally {
      set({ loading: false });
    }
  },

  switchProfile: async (profile) => {
    try {
      set({ activeProfile: profile });
      await AsyncStorage.setItem("activeProfile", JSON.stringify(profile));

      // Handle token update if necessary
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        await AsyncStorage.setItem(`authToken-${profile.id}`, token);
      }

      // Navigate to the main screen after profile switch
      const { navigation } = get();
      if (navigation) {
        navigation.navigate("CustomerStack", { screen: "TabNav" }); // Adjust the route as needed
      }
    } catch (error) {
      console.error("Error switching profile:", error);
    }
  },
}));

export default useStore;
