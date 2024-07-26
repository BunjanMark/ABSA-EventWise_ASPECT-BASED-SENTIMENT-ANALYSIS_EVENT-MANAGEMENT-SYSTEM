import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from "../elements/Header";

const inventoryData = [
  { item: "Spoon", noOfItems: 20, noOfSortItems: 20, status: "Complete" },
  { item: "Fork", noOfItems: 40, noOfSortItems: 20, status: "Missing" },
  { item: "Glass", noOfItems: 16, noOfSortItems: 20, status: "Broken" },
  { item: "Plates", noOfItems: 50, noOfSortItems: 20, status: "Broken" },
  { item: "Mug", noOfItems: 35, noOfSortItems: 20, status: "Missing" },
  { item: "Knife", noOfItems: 45, noOfSortItems: 20, status: "Complete" },
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
      return { color: "white" };
  }
};

const InventoryTracker = () => {
    const navigation = useNavigation(); 

    const totalItems = inventoryData.reduce((sum, item) => sum + item.noOfItems, 0);
    const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
    const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

    return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Inventory Tracker</Text>
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
              <Text style={styles.tableRowText}>{item.item}</Text>
              <Text style={styles.tableRowText}>{item.noOfItems}</Text>
              <Text style={styles.tableRowText}>{item.noOfSortItems}</Text>
              <Text style={[styles.tableRowText, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryText}>Total Items Broken: {totalBroken}</Text>
          <Text style={styles.summaryText}>Total Items Missing: {totalMissing}</Text>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  table: {
    margin: 20,
    padding: 10,
    backgroundColor: "rgba(163, 151, 39, 0.1)",
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
  },
  tableHeaderText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  tableRowText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  summary: {
    margin: 20,
    padding: 10,
    backgroundColor: "rgba(163, 151, 39, 0.1)",
    borderRadius: 10,
  },
  summaryText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default InventoryTracker;
