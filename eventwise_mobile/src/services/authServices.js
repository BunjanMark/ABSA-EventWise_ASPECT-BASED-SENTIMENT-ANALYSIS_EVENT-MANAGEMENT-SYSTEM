import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../constants/constant";

const api = axios.create({
  baseURL: `${API_URL}/api`,
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



export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      return { error: error.response.data.errors || 'Registration failed' };
    } else if (error.request) {
      // No response was received
      return { error: 'No response from the server' };
    } else {
      // Something happened in setting up the request
      return { error: error.message };
    }
  }
};

export const updateAccount = async (userData) => {
  try {
    await api.patch("/user/me", userData);
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/user/logout");
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const getParticipants = async () => {
  try {
    const response = await api.get("/user/participants");
    return response.data;
  } catch (error) {
    console.error("Get participants error:", error);
    throw error;
  }
};

export const getAccountProfile = async () => {
  try {
    const response = await api.get("/account-management"); // Replace with the appropriate API endpoint for account management backend
    // console.log("Account profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get account profile error:", error);
    throw error;
  }
};
