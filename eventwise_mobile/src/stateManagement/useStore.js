import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";
const useStore = create((set) => ({
  user: null,
  accountProfiles: [],
  activeProfile: null,
  loading: true,
  navigation: null, // Store navigation object here

  // Theme-related state and methods
  theme: "default", // Initial theme state
  setTheme: async (theme) => {
    await AsyncStorage.setItem("Theme", theme); // Persist the theme
    set({ theme });
  },
  initializeTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("Theme");
    if (savedTheme) {
      set({ theme: savedTheme });
    } else {
      set({ theme: "default" });
    }
  },

  // User-related state and methods
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
  // profile infomration
  userName: "Avril Carasco",
  userEmail: "AvrilCarasco@gmail.com",
  userPhone: "1234567890",
  userPassword: "1234567890",
  setUserName: (name) => set({ userName: name }),
  setUserEmail: (email) => set({ userEmail: email }),
  setUserPhone: (phone) => set({ userPhone: phone }),
  setUserPassword: (password) => set({ userPassword: password }),

  // handling save for backend API
  // const handleSave = async () => {
  //   try {
  //     await AsyncStorage.setItem('userProfile', JSON.stringify({
  //       userName,
  //       userEmail,
  //       userPassword,
  //       userPhone,
  //     }));
  //     Alert.alert("Success", "Profile saved locally!");
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to save profile.");
  //     console.error(error);
  //   }
  // };
  // switch profile
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
  // adminDrawerContent Drawer Admin
  selectedDrawerScreen: "HomeAdmin",
  setSelectedDrawerScreen: (screenName) =>
    set({ selectedDrawerScreen: screenName }),

  // calendar-related state and methods

  // attendee-related state and methods attendee modals
  attendeeSeries: [150, 700, 500], // Add series state
  attendeeSliceColor: ["#ff3c00", "rgba(9,226,0,1)", "#fbd203"], // Add sliceColor state
  modalVisiblePresent: false,
  modalVisibleAbsent: false,
  modalVisibleLate: false,
  setmodalVisiblePresent: (visible) => set({ modalVisiblePresent: visible }),
  setmodalVisibleAbsent: (visible) => set({ modalVisibleAbsent: visible }),
  setmodalVisibleLate: (visible) => set({ modalVisibleLate: visible }),
  // feedback-related state and methods feedback analysis, feedback form,
  // event and feedback concern

  // For event data and methods also package
  // Event-related state and methods
  count: 0,
  increaseCount: async () => {
    set((state) => {
      const newCount = state.count + 1;
      AsyncStorage.setItem("likedEventsCount", JSON.stringify(newCount));
      return { count: newCount };
    });
  },
  decreaseCount: async () => {
    set((state) => {
      const newCount = state.count - 1;
      AsyncStorage.setItem("likedEventsCount", JSON.stringify(newCount));
      return { count: newCount };
    });
  },

  likedEvents: {},

  toggleLike: async (eventId) => {
    set((state) => {
      const updatedLikedEvents = {
        ...state.likedEvents,
        [eventId]: !state.likedEvents[eventId],
      };

      // Update count based on whether the event is liked or not
      const updatedCount = state.count + (state.likedEvents[eventId] ? -1 : 1);

      // Persist the updated liked events and count
      AsyncStorage.setItem("likedEvents", JSON.stringify(updatedLikedEvents));
      AsyncStorage.setItem("likedEventsCount", JSON.stringify(updatedCount));

      return {
        likedEvents: updatedLikedEvents,
        count: updatedCount,
      };
    });
  },

  initializeLikedEvents: async () => {
    const savedLikedEvents = await AsyncStorage.getItem("likedEvents");
    const savedCount = await AsyncStorage.getItem("likedEventsCount");

    if (savedLikedEvents) {
      set({ likedEvents: JSON.parse(savedLikedEvents) });
    }

    if (savedCount) {
      set({ count: JSON.parse(savedCount) });
    }
  },

  addEvent: (newEvent) =>
    set((state) => ({
      events: [...state.events, { ...newEvent, id: Date.now() }], // Add unique ID
    })),
  addEventPackage: (newPackage) =>
    set((state) => ({
      eventPackages: [
        ...state.eventPackages,
        { ...newPackage, packageId: Date.now().toString() },
      ], // Add unique packageId
    })),
  eventData: [
    {
      eventId: "event1",
      eventName: "Mr & Mrs Malik's Event",
      eventDate: "2023-06-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "Mao ni ang kuan ba, sample lang",
      eventImage: `${event2}`,
      feedbackData: [
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Food" },
        { sentiment: "negative", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "positive", aspect: "Venue" },
        { sentiment: "positive", aspect: "Entertainment" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        // ... more feedback data
      ],
      totalGuests: 100,
      guestData: [
        {
          name: "John Doe1",
          email: "p3k9x@example.com",
          phone: "123-456-7890",
          role: "Host",
        },
        {
          name: "Jane Doe2",
          email: "p3k9x@example.com2",
          phone: "123-456-7890",
          role: "Attendee2",
        },
      ],
    },
    {
      eventId: "event2",
      eventName: "Mr & Mrs Malik's Event",
      eventDate: "2023-05-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "Mao ni ang kuan ba, sample lang",
      eventImage: `${event3}`,
      feedbackData: [
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Food" },
        { sentiment: "negative", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "positive", aspect: "Venue" },
        { sentiment: "positive", aspect: "Entertainment" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        // ... more feedback data
      ],
      totalGuests: 100,
    },
    {
      eventId: "event3",
      eventName: "Mr & Mrs Malik's Event",
      eventDate: "2023-06-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "Kasal nila ni kuan ba",
      eventImage: `${event2}`,
      feedbackData: [
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Food" },
        { sentiment: "negative", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "neutral", aspect: "Food" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "positive", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "negative", aspect: "Service" },
        { sentiment: "positive", aspect: "Venue" },
        { sentiment: "positive", aspect: "Entertainment" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "negative", aspect: "Decoration" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        // ... more feedback data
      ],
      totalGuests: 200,
    },
    {
      eventId: "event4",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: "",
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
    },
    {
      eventId: "event5",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: `${event2}`,
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
      totalGuests: 1230,
    },
    {
      eventId: "event6",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: `${event2}`,
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
      totalGuests: 320,
    },
    {
      eventId: "event6",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: `${event2}`,
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
      totalGuests: 60,
    },
    {
      eventId: "event6",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: "",
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
      totalGuests: 70,
      guestData: [
        {
          name: "John Doe",
          email: "p3k9x@example.com",
          phone: "123-456-7890",
          role: "Host",
        },
        {
          name: "Jane Doe",
          email: "p3k9x@example.com",
          phone: "123-456-7890",
          role: "Attendee",
        },
      ],
    },
    {
      eventId: "event6",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: "",
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
    },
    {
      eventId: "event6",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-07-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: "",
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
    },
    {
      eventId: "event7",
      eventName: "Angela’s 18th Birthday",
      eventDate: "2023-01-01",
      eventTime: "10:00 AM",
      eventLocation: "123 Main St, Anytown USA",
      eventDescription: "This is a description of the event.",
      eventImage: "",
      feedbackData: [
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Music" },
        { sentiment: "positive", aspect: "Food" },
        { sentiment: "negative", aspect: "Organization" },
        { sentiment: "negative", aspect: "Ambiance" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "negative", aspect: "Parking" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },
        { sentiment: "neutral", aspect: "Overall Experience" },

        // ... more feedback data
      ],
    },
    // ... more events
  ],
  eventPackages: [
    {
      packageId: "package1",
      packageName: "Gold Food Catering",
      packageType: "Food",
      packagePrice: "$1000",
      packageDescription: "Includes a full 3-course meal for 100 guests.",
    },
    {
      packageId: "package2",
      packageName: "Silver Photography",
      packageType: "Photography",
      packagePrice: "$500",
      packageDescription: "Includes professional photography for 5 hours.",
    },
    {
      packageId: "package3",
      packageName: "Basic Videography",
      packageType: "Videography",
      packagePrice: "$600",
      packageDescription: "Covers 6 hours of event videography.",
    },
    // Add more packages as needed
  ],
  // eventData: [
  //   {
  //     eventId: "event1",
  //     eventName: "Summer Picnic",
  //     feedbackData: [
  //       { aspect: "Food", positive: 10, negative: 2, neutral: 1 },
  //       { aspect: "Entertainment", positive: 8, negative: 1, neutral: 3 },
  //       { aspect: "Venue", positive: 12, negative: 0, neutral: 2 },
  //       { aspect: "Organization", positive: 9, negative: 3, neutral: 1 },
  //     ],
  //   },
  //   {
  //     eventId: "event2",
  //     eventName: "Company Gala",
  //     feedbackData: [
  //       { aspect: "Decor", positive: 15, negative: 1, neutral: 2 },
  //       { aspect: "Food", positive: 12, negative: 2, neutral: 3 },
  //       { aspect: "Entertainment", positive: 10, negative: 3, neutral: 2 },
  //       { aspect: "Networking", positive: 8, negative: 2, neutral: 4 },
  //     ],
  //   },
  //   {
  //     eventId: "event3",
  //     eventName: "Product Launch",
  //     feedbackData: [
  //       { aspect: "Presentation", positive: 18, negative: 1, neutral: 2 },
  //       { aspect: "Product Demo", positive: 15, negative: 2, neutral: 3 },
  //       { aspect: "Venue", positive: 12, negative: 3, neutral: 2 },
  //       { aspect: "Networking", positive: 8, negative: 4, neutral: 3 },
  //     ],
  //   },
  //   {
  //     eventId: "event4",
  //     eventName: "Team Building Workshop",
  //     feedbackData: [
  //       { aspect: "Activities", positive: 16, negative: 2, neutral: 3 },
  //       { aspect: "Food", positive: 14, negative: 3, neutral: 2 },
  //       { aspect: "Teamwork", positive: 18, negative: 1, neutral: 2 },
  //       { aspect: "Organization", positive: 15, negative: 2, neutral: 3 },
  //     ],
  //   },
  //   {
  //     eventId: "event5",
  //     eventName: "Charity Gala",
  //     feedbackData: [
  //       { aspect: "Cause", positive: 20, negative: 0, neutral: 1 },
  //       { aspect: "Entertainment", positive: 18, negative: 2, neutral: 2 },
  //       { aspect: "Food", positive: 15, negative: 3, neutral: 2 },
  //       { aspect: "Organization", positive: 17, negative: 2, neutral: 3 },
  //     ],
  //   },
  // ],
  // series: [150, 700, 500], // Add series state this is just a sample for feedback component pie chart
  sliceColor: ["#ff3c00", "rgba(9,226,0,1)", "#fbd203"], // Add sliceColor state
  // function to set event data
  setEventData: (data) => set({ eventData: data }),

  // function to calculate feedback series based on event data
  calculateFeedbackSeries: () => {
    const { eventData } = get(); // Get event data from store
    const feedbackData = eventData.feedbackData || []; // Handle potential missing data

    const positiveCount = feedbackData.filter(
      (feedback) => feedback.sentiment === "positive"
    ).length;
    const negativeCount = feedbackData.filter(
      (feedback) => feedback.sentiment === "negative"
    ).length;
    const neutralCount = feedbackData.filter(
      (feedback) => feedback.sentiment === "neutral"
    ).length;

    const series = [negativeCount, positiveCount, neutralCount];
    return series;
  },
  setFeedbackSeries: () => {
    const series = calculateFeedbackSeries();
    set({ series });
  },
}));

// Helper functions
export const saveString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const save = async (key, value) =>
  saveString(key, JSON.stringify(value));

export const get = async (key) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default useStore;
