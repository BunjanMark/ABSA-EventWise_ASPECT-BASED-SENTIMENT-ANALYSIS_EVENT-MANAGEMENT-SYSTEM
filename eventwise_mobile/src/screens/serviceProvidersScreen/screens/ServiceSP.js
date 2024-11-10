import React, { useState } from "react";
import ManualTestImage from "../../adminMain/screens/component/ManualTestImage";
import { testSupabaseConnectivity } from "../../adminMain/screens/component/testSupabaseConnectivity";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import ServiceManager from "./ServiceTab/ServiceManager";
import ServiceManager2 from "./ServiceTab/ServiceManager2";
import ServicesLists from "./ServiceTab/ServicesLists";
import { Button } from "react-native-paper";

const ServiceSP = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigation = useNavigation(); // Get the navigation prop

  const renderServiceItem = ({ item }) => {
    if (item.isBrokenBox) {
      return (
        <TouchableOpacity
          style={styles.brokenBox}
          onPress={() => navigation.navigate("ServicePortfolioSP")} // Navigate to CreateServiceSP
        >
          <Text style={styles.brokenBoxText}>Add Service</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedService(item);
          setModalVisible(true);
        }}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ServiceManager2 /> */}
      <ServiceManager />
      {/* test connectivity */}
      {/* <Text style={styles.title}>Services</Text>
      <Button title="test" onPress={testSupabaseConnectivity} />
      <ManualTestImage /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    padding: 12,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    // backgroundColor: "green",
    // margin: 5,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  brokenBox: {
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed",
    padding: 80,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF5F5",
  },
  brokenBoxText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default ServiceSP;
