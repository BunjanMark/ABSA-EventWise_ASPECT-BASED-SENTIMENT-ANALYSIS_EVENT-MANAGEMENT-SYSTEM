import axios from "axios";
import {
  registerForPushNotificationsAsync,
  sendTokenToBackend,
} from "./notification/notificationService";
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
export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    console.log("this is the response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Signup error response data:", error.response.data);
      console.error("Signup error response status:", error.response.status);
      // console.error("Signup error response headers:", error.response.headers);
    } else {
      console.error("Signup error message:", error.message);
    }
    throw error;
  }
};
export const sendVerificationEmail = async (email) => {
  try {
    const response = await api.post("/verify-email", { email });

    if (response.data.message.includes("Email is already in use")) {
      throw new Error("Email is already in use");
    }

    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Email verification error:", error.response.data);
    } else {
      console.error("Email verification error:", error.message);
    }
    throw error;
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await api.post(`/verify-email-code`, {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    console.error("Verification error:", error);
    throw new Error("Verification failed");
  }
};
export const login = async (email, password) => {
  try {
    // Fetch the push token first
    const pushToken = await registerForPushNotificationsAsync();
    if (!pushToken) {
      console.warn("Push token could not be obtained.");
      return;
    }

    // Include push_token in the login request
    const response = await api.post("/auth/login", {
      email,
      password,
      push_token: pushToken,
    });

    const { token } = response.data;
    console.log(response.data);
    await AsyncStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    console.error("Login errors:", error);
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
    const response = await api.post("/auth/logout");
    if (response.status === 200) {
      await AsyncStorage.removeItem("authToken");
    } else {
      console.error("Logout API call failed");
    }
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

export const updateUser = async (updatedData) => {
  try {
    const response = await api.put("/auth/update", updatedData); // Adjust endpoint as needed
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
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
    const response = await api.get("admin/account-management");
    console.log("Account profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get account profile error:", error);
    throw error;
  }
};

export const addEquipment = async (equipmentData) => {
  try {
    const response = await api.post("/equipment", equipmentData); 
    return response.data; 
  } catch (error) {
    if (error.response) {
      console.error("Add equipment error response:", error.response.data);
    } else {
      console.error("Add equipment error:", error.message);
    }
    throw error;
  }
};

