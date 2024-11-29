import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EquipmentSP = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(null);
  const [inventoryData, setInventoryData] = useState([
    { item: "Spoon", noOfItems: 20, noOfSortItems: 0, status: "" },
    { item: "Fork", noOfItems: 40, noOfSortItems: 0, status: "" },
    { item: "Glass", noOfItems: 16, noOfSortItems: 0, status: "" },
    { item: "Plates", noOfItems: 50, noOfSortItems: 0, status: "" },
    { item: "Mug", noOfItems: 35, noOfSortItems: 0, status: "" },
    { item: "Knife", noOfItems: 45, noOfSortItems: 0, status: "" },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Complete": return { color: "green" };
      case "Missing": return { color: "orange" };
      case "Broken": return { color: "red" };
      default: return { color: "black" };
    }
  };

  const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  const handleAddItem = () => {
    if (newItem && newItemCount) {
      const newInventory = [...inventoryData, { item: newItem, noOfItems: parseInt(newItemCount), noOfSortItems: 0, status: "" }];
      setInventoryData(newInventory);
      setNewItem("");
      setNewItemCount("");
      setModalVisible(false);
    }
  };

  const handleRemoveItem = (index) => {
    const newInventory = inventoryData.filter((_, i) => i !== index);
    setInventoryData(newInventory);
    setRemoveMode(false);
  };

  const handleSortItemsChange = (index, change) => {
    const newInventory = [...inventoryData];
    newInventory[index].noOfSortItems = Math.max(0, newInventory[index].noOfSortItems + change);
    setInventoryData(newInventory);
  };

  const handleStatusChange = (index, status) => {
    const newInventory = [...inventoryData];
    newInventory[index].status = status;
    setInventoryData(newInventory);
    setSelectedStatusIndex(null);
  };

  const toggleDropdown = (index) => {
    setSelectedStatusIndex(selectedStatusIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.navigate('EventsSP')}>
            <Ionicons name="arrow-back" size={24} color="#FFCE00" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Equipment</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF ITEMS</Text>
            <Text style={styles.tableHeaderText}>NO. OF SORT ITEMS</Text>
            <Text style={styles.tableHeaderText}>STATUS</Text>
          </View>
          {inventoryData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {removeMode && (
                <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                  <Ionicons name="remove-circle-outline" size={24} color="red" style={styles.removeIcon} />
                </TouchableOpacity>
              )}
              <Text style={styles.tableRowText}>{item.item}</Text>
              <Text style={styles.tableRowText}>{item.noOfItems}</Text>
              <View style={styles.sortItemsContainer}>
                <TouchableOpacity onPress={() => handleSortItemsChange(index, -1)}>
                  <Ionicons name="remove-circle-outline" size={20} color="red" />
                </TouchableOpacity>
                <Text style={styles.sortItemsText}>{item.noOfSortItems}</Text>
                <TouchableOpacity onPress={() => handleSortItemsChange(index, 1)}>
                  <Ionicons name="add-circle-outline" size={20} color="green" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => toggleDropdown(index)} style={styles.statusContainer}>
                <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                  {item.status || "Set Status"}
                </Text>
                <Ionicons name="chevron-down-outline" size={20} color="gray" />
              </TouchableOpacity>
              {selectedStatusIndex === index && (
                <View style={styles.statusDropdown}>
                  <TouchableOpacity onPress={() => handleStatusChange(index, "Complete")}>
                    <Text style={{ color: 'green' }}>Complete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleStatusChange(index, "Missing")}>
                    <Text style={{ color: 'orange' }}>Missing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleStatusChange(index, "Broken")}>
                    <Text style={{ color: 'red' }}>Broken</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => setRemoveMode(!removeMode)}>
            <Ionicons name="remove-circle-outline" size={24} color="white" />
            <Text style={styles.removeButtonText}>Remove Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => setRemoveMode(!removeMode)}>
            <Ionicons name="remove-circle-outline" size={24} color="white" />
            <Text style={styles.removeButtonText}>Save Item</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryText}>Total Items Broken: {totalBroken}</Text>
          <Text style={styles.summaryText}>Total Items Missing: {totalMissing}</Text>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Name of Item</Text>
            <TextInput
              style={styles.input}
              value={newItem}
              onChangeText={setNewItem}
              placeholder="Enter item name"
              placeholderTextColor="#999"
            />
            <Text style={styles.modalText}>No. of Items</Text>
            <TextInput
              style={styles.input}
              value={newItemCount}
              onChangeText={setNewItemCount}
              placeholder="Enter number of items"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddItem}>
              <Text style={styles.modalButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
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
    marginTop: 20,
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
    top: 40,
    left: 250,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    zIndex: 1,
    width: "30%",
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
    position: 'absolute',
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
