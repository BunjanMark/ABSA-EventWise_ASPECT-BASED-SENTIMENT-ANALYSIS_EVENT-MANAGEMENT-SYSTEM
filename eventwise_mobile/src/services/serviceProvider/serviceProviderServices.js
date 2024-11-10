// src/services/service/serviceServices.js

import axios from "axios";
import API_URL from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImageToSupabase } from "../organizer/uploadSupabaseService";

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
    return Promise.reject(error);
  }
);

// Function to create a new service
const createService = async (serviceData) => {
  try {
    let servicePhotoURL =
      "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/" +
      serviceData.servicePhotoURL;
    // if (serviceData.servicePhotoURL) {
    //   const fileName = serviceData.serviceImage.split("/").pop();
    //   servicePhotoURL = await uploadImageToSupabase(
    //     serviceData.servicePhotoURL,
    //     fileName
    //   );
    //   console.log("Service Image uploaded to Supabase. URL:", servicePhotoURL);
    // }
    const response = await api.post("/services", serviceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("createService: ", response);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error, serviceData);
    throw error;
  }
};

// Function to update a service
const updateService = async (id, updatedService) => {
  console.log(id, updatedService);
  try {
    const response = await api.put(`/services/${id}`, updatedService);
    return response.data;
  } catch (error) {
    console.error("Error updating service:<<:", error);
    throw error;
  }
};

// Function to delete a service
const deleteService = async (id) => {
  try {
    const result = await api.delete(`/services/${id}`);
    return result.data; // Check if the response status is 204 No Content
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Function to fetch all services
const fetchServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export { createService, updateService, deleteService, fetchServices };
