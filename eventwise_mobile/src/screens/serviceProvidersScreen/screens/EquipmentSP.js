import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import { fetchEquipment } from "../../../services/organizer/adminEquipmentServices";
import { fetchMyEquipments } from "../../../services/serviceProvider/serviceProviderServices";
import { addEquipment } from "../../../services/authServices"; 
 

const EquipmentSP = ({ route }) => {
  const { eventId } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryData2, setInventoryData2] = useState([]);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(null);

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        // Simulating data fetch
        const response = [
          {
            id: 1,
            item: "Camera",
            number_of_items: 5,
            number_of_sort_items: 0,
            status: "",
          },
          {
            id: 2,
            item: "Tripod",
            number_of_items: 3,
            number_of_sort_items: 0,
            status: "",
          },
        ]; // Replace this with `fetchMyEquipments(eventId)`
        const formattedItems = response.map((item) => ({
          key: item.id,
          item: item.item,
          noOfItems: item.number_of_items,
          noOfSortItems: item.number_of_sort_items,
          status: item.status,
        }));
        const response2 = await fetchMyEquipments(eventId);
        const formattedItems2 = response2.map((item) => ({
          key: item.id,
          item: item.item,
          noOfItems: item.number_of_items,
          noOfSortItems: item.number_of_sort_items,
          status: item.status,
        }));
        setInventoryData(formattedItems);
        setInventoryData2(formattedItems2);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchEquipmentData();
  }, [eventId]);

  // Add item handler
  const handleAddItem = async () => {
    if (newItem && newItemCount) {
      try {
        // Prepare the equipment data
        const equipmentData = {
          item: newItem,
          number_of_items: newItemCount,
          number_of_sort_items: 0, // Default value
          status: "", // Default status
          event_id: eventId, // Ensure eventId is available
        };
  
        // Call the backend integration function
        const responseData = await addEquipment(equipmentData);
  
        // Update inventory data with the new item
        setInventoryData((prevInventory) => [
          ...prevInventory,
          {
            item: responseData.item,
            noOfItems: responseData.number_of_items,
            noOfSortItems: responseData.number_of_sort_items,
            status: responseData.status,
          },
        ]);
  
        // Clear inputs and close modal
        setNewItem("");
        setNewItemCount("");
        setModalVisible(false);
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");

//       const newInventory = [
//         ...inventoryData,
//         {
//           key: Date.now().toString(),
//           item: newItem,
//           noOfItems: parseInt(newItemCount, 10),
//           noOfSortItems: 0,
//           status: "",
//         },
//       ];
//       setInventoryData(newInventory);
//       setNewItem("");
//       setNewItemCount("");
//       setModalVisible(false);

    }
  };

  // Remove item handler
  const handleRemoveItem = (index) => {
    const newInventory = inventoryData.filter((_, i) => i !== index);
    setInventoryData(newInventory);
  };

  // Sort items handler
  const handleSortItemsChange = (index, change) => {
    const newInventory = [...inventoryData];
    newInventory[index].noOfSortItems = Math.max(
      0,
      newInventory[index].noOfSortItems + change
    );
    setInventoryData(newInventory);
  };

  // Status change handler
  const handleStatusChange = (index, status) => {
    const newInventory = [...inventoryData];
    newInventory[index].status = status;
    setInventoryData(newInventory);
    setSelectedStatusIndex(null);
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setSelectedStatusIndex(selectedStatusIndex === index ? null : index);
  };

  // Save handler
  const handleSave = () => {
    console.log("Updated Inventory Data:", inventoryData);
    alert("Inventory data saved successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFCE00" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Equipment</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>ITEM</Text>
            <Text style={styles.tableHeaderText}>NO. OF ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF SORT ITEMS</Text>
            <Text style={styles.tableHeaderText}>STATUS</Text>
          </View>

          {inventoryData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {removeMode && (
                <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              )}
              <Text style={styles.tableRowText}>{item.item}</Text>
              <Text style={styles.tableRowText}>{item.noOfItems}</Text>
              <View style={styles.sortItemsContainer}>
                <TouchableOpacity
                  onPress={() => handleSortItemsChange(index, -1)}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={20}
                    color="red"
                  />
                </TouchableOpacity>
                <Text style={styles.sortItemsText}>{item.noOfSortItems}</Text>
                <TouchableOpacity
                  onPress={() => handleSortItemsChange(index, 1)}
                >
                  <Ionicons name="add-circle-outline" size={20} color="green" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => toggleDropdown(index)}
                style={styles.statusContainer}
              >
                <Text style={{ color: item.status ? "black" : "gray" }}>
                  {item.status || "Set Status"}
                </Text>
                <Ionicons name="chevron-down-outline" size={20} color="gray" />
              </TouchableOpacity>
              {selectedStatusIndex === index && (
                <View style={styles.statusDropdown}>
                  <TouchableOpacity
                    onPress={() => handleStatusChange(index, "Complete")}
                  >
                    <Text style={{ color: "green" }}>Complete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleStatusChange(index, "Missing")}
                  >
                    <Text style={{ color: "orange" }}>Missing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleStatusChange(index, "Broken")}
                  >
                    <Text style={{ color: "red" }}>Broken</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => setRemoveMode(!removeMode)}
        >
          <Ionicons name="remove-circle-outline" size={24} color="white" />
          <Text style={styles.removeButtonText}>Remove Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Name of Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter item name"
              value={newItem}
              onChangeText={setNewItem}
            />
            <Text>No. of Items</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter count"
              keyboardType="numeric"
              value={newItemCount}
              onChangeText={setNewItemCount}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddItem}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#FFCE00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 20,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFCE00",
    marginLeft: 70,
  },
  table: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableHeaderText: {
    color: "black",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
    color: "black",
  },
  sortItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  removeIcon: {
    marginRight: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 80,
  },
  addButtonText: {
    color: "white",
    marginLeft: 10,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    marginLeft: 10,
  },
  summary: {
    marginTop: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  statusDropdown: {
    position: "absolute",
    top: 30,
    left: 240,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    zIndex: 1,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: "black",
  },
  modalButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
  },
});

export default EquipmentSP;
