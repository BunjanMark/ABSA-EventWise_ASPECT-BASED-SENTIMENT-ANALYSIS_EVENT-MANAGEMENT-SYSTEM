// src/services/organizer/organizerServices.js

import axios from "axios";
import API_URL from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImageToSupabase } from "./uploadSupabaseService";

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    Accept: "application/json",
  },
});

// Axios interceptor to attach auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle the error
  }
);

// Function to submit a new package
const submitPackage = async (packageData) => {
  try {
    console.log("Submitting Package:", packageData);

    let coverPhotoURL = null;
    if (packageData.coverPhoto) {
      const fileName = packageData.coverPhoto.split("/").pop();
      coverPhotoURL = await uploadImageToSupabase(
        packageData.coverPhoto,
        fileName
      );
      console.log("Image uploaded to Supabase. URL:", coverPhotoURL);
    }

    const formData = {
      packageName: packageData.packageName,
      eventType: packageData.eventType,
      services: packageData.services,
      totalPrice: packageData.totalPrice,
      packageCreatedDate: packageData.packageCreatedDate,
      coverPhoto: coverPhotoURL, // URL from Supabase Storage
    };

    const response = await api.post("/admin/packages", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Package submitted successfully:", response.data);
    return response.data; // Return the response data on success
  } catch (error) {
    console.error(
      "Error submitting package:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { submitPackage };
