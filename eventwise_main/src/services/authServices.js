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
    const response = await api.post("/user/login", { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    await api.post("/user/signup", userData);
  } catch (error) {
    if (error.response) {
      console.error("Signup error response data:", error.response.data);
      console.error("Signup error response status:", error.response.status);
      console.error("Signup error response headers:", error.response.headers);
    } else {
      console.error("Signup error message:", error.message);
    }
    throw error;
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
    const response = await api.get("/user/me");
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
