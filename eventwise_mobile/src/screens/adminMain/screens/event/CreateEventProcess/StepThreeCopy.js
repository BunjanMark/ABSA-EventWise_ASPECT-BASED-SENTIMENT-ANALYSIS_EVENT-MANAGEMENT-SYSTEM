import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const StepThree = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
  nextStep,
  prevStep,
  submitForm,
  currentPackages,
  selected,
  setSelected,
  renderItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPackageDetails, setCurrentPackageDetails] = useState(null);

  const packageData = (currentPackages || [])
    .filter((pkg) => pkg.packageName && pkg.id)
    .map((pkg) => ({
      label: pkg.packageName,
      id: pkg.id,
      totalPrice: pkg.totalPrice,
      packageType: pkg.packageType,
      value: pkg.id,
      coverPhoto: pkg.coverPhotoUrl,
      category: pkg.eventType,
      inclusions: pkg.services.map((service, index) => service.serviceName),
      // JSON.stringify(pkg.services.map((service) => service.serviceName)) ||
      // "No inclusions provided", // Add inclusions field
    }));

  const handleSelectionChange = (items) => {
    setSelected(items);
    setFieldValue(
      "currentPackages",
      items.map((item) => item.value) // Update Formik's field with selected package IDs
    );
    console.log("Selected packages:", items);
  };

  const showPackageDetails = (pkg) => {
    setCurrentPackageDetails(pkg);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={packageData}
        labelField="label"
        valueField="value"
        placeholder="Select packages"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={handleSelectionChange}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <View style={styles.selectedItemContainer}>
            <View style={styles.selectedItem}>
              <Text style={styles.selectedText}>{item.label}</Text>
              {/* View Details Button */}
              <TouchableOpacity onPress={() => showPackageDetails(item)}>
                <AntDesign
                  color="black"
                  name="eye"
                  size={20}
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>
              {/* Delete Button */}
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <AntDesign color="black" name="delete" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal for package details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {/* Package details: {JSON.stringify(currentPackageDetails, null, 2)} */}
              {/* {currentPackageDetails?.label || "Package Details"} */}
            </Text>
            <Text style={styles.modalText}>
              Package name: {currentPackageDetails?.label || "Package Name"}
            </Text>
            <Text style={styles.modalText}>
              Package price:{" "}
              {currentPackageDetails?.totalPrice || "Package Name"}
            </Text>
            <Text style={styles.modalText}>
              Package for type of event:{" "}
              {currentPackageDetails?.category || "Package Name"}
            </Text>
            <Text style={styles.modalText}>
              Package inclusions:{" "}
              {currentPackageDetails.inclusions.map((item, index) => (
                <Text key={index} style={styles.inclusionItem}>
                  {"\n"}• {item}
                </Text>
              ))}
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonRow}>
        <Button onPress={prevStep} style={styles.button} mode="contained">
          Back
        </Button>
        <Button onPress={nextStep} style={styles.button} mode="contained">
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  placeholderStyle: {
    color: "#999",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#333",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  selectedText: {
    marginRight: 10,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 0.45,
  },
});
