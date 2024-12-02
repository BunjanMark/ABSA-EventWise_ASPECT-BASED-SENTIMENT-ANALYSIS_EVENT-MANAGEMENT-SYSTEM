import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL_FLASK from "../constants/constantFlask";

const api = axios.create({
  baseURL: `${API_URL_FLASK}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const submitFeedback = async (feedback) => {
  try {
    const response = await api.post("/submit_feedback", feedback);
    console.log("Feedback submittedss: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting feedback:",
      error.response || error.message
    );
    throw error;
  }
};

const getFeedback = async () => {
  try {
    const response = await api.get("/get_feedback");
    console.log("Feedback results getFeedback: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting feedbacks:", error.response || error.message);
    throw error;
  }
};

export { submitFeedback, getFeedback };
