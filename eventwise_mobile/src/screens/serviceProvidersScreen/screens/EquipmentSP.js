import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

let inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 0, status: "" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 0, status: "" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 0, status: "" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 0, status: "" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 0, status: "" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 0, status: "" },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Complete":
      return { color: "green" };
    case "Missing":
      return { color: "orange" };
    case "Broken":
      return { color: "red" };
    default:
      return { color: "black" }; // Changed to black
  }
};

const EquipmentSP = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);

  const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  const handleAddItem = () => {
    if (newItem && newItemCount) {
      inventoryData.push({ item: newItem, noOfItems: parseInt(newItemCount), noOfSortItems: 0, status: "" });
      setNewItem("");
      setNewItemCount("");
      setModalVisible(false);
    }
  };

  const handleRemoveItem = (index) => {
    inventoryData.splice(index, 1);
    setRemoveMode(false); // Exit remove mode after deletion
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.navigate('EventDetailsSP')}>
            <Ionicons name="arrow-back" size={24} color="#FFCE00" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Equipment
          </Text>
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
              <Text style={styles.tableRowText}>{item.noOfSortItems}</Text>
              <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
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
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryText}>Total Items Broken: {totalBroken}</Text>
          <Text style={styles.summaryText}>Total Items Missing: {totalMissing}</Text>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
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
    backgroundColor: 'white', // Background color set to white
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
    color: "#FFCE00", // Equipment text color
    marginLeft: 88,
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
    color: "black", // Header text color
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
    color: "black", // Row text color
    flex: 1,
    textAlign: "center",
  },
  removeIcon: {
    marginRight: 10,
  },
  summary: {
    margin: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: '#eeba2b', // Button color
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white', // Button text color
    fontSize: 16,
    marginLeft: 5,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#eeba2b', // Button color
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white', // Button text color
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black', // Modal text color
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 10,
    color: 'black', // Input text color
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#eeba2b',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white', // Button text color
    fontSize: 16,
  },
});

export default EquipmentSP;
