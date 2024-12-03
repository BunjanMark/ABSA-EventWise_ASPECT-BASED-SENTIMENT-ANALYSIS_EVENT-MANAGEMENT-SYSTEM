import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useFeedbackStore = create((set) => ({
  currentFeedbacks: [],

  setCurrentFeedbacks: (currentFeedbacks) => set({ currentFeedbacks }),
}));

export { useFeedbackStore };
