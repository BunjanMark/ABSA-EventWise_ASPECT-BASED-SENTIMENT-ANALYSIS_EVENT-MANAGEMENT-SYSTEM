import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../elements/SearchBAr";
import Svg, { LinearGradient, Stop, Rect, Defs } from "react-native-svg";

const Venue = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleChoosePress = (pkg) => {
    setSelectedPackage(pkg.image);
    setSelectedVenue(pkg.venue);
    setSelectedAddress(pkg.address);
    setDetailVisible(true);
  };

  const handleConfirmPress = () => {
    navigation.navigate("Book", { selectedVenueLocation: selectedVenue });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.head}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Image
              source={require("../pictures/logo1.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Image
            source={require("../pictures/line.png")}
            style={styles.line}
            resizeMode="contain"
          />
          <View style={styles.header}>
            <Text style={styles.headText}>Venue</Text>
            <TouchableOpacity
              onPress={() => setShowSearch(true)}
              style={styles.iconButton}
            >
              <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {showSearch && (
            <SearchBar
              onClose={() => setShowSearch(false)}
              onSearch={handleSearch}
            />
          )}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
              source={require("../pictures/ellipse2.png")}
              style={styles.bannerImage}
            />
            <Text style={styles.headerText}>Check Out Top Venues</Text>
            <Text style={styles.debutText}>Debut Venues</Text>
            <Image
              source={require("../pictures/vec.png")}
              style={styles.line}
              resizeMode="contain"
            />
            <View style={styles.pack}>
              {packageData.map((pkg, index) => (
                <View key={index} style={styles.packageButton}>
                  <View style={styles.venueHead}>
                    <Text style={styles.headerEType}>Venue </Text>
                    <TouchableOpacity
                      style={styles.chooseButton}
                      onPress={() => handleChoosePress(pkg)}
                    >
                      <Text style={styles.chooseText}>CHOOSE</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Image source={pkg.image} style={styles.packageImage} />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={detailVisible}
          onRequestClose={() => setDetailVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.popupContainer}>
              <Svg height="100%" width="100%" style={styles.svgBackground}>
                <Defs>
                  <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#EFBF04" />
                    <Stop offset="100%" stopColor="#fff" />
                  </LinearGradient>
                </Defs>
                <Rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#grad)"
                />
              </Svg>
              <TouchableOpacity
                style={styles.closeDetails}
                onPress={() => setDetailVisible(false)}
              >
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
              <View style={styles.popupContent}>
                <View style={styles.infoContainer}>
                  <Text style={styles.packageHead}>VENUE</Text>
                  <Image source={selectedPackage} style={styles.popupImage} />
                  <View style={styles.contentVA}>
                    <ImageBackground
                      source={require("../pictures/bgVenue.png")}
                      style={styles.popupBackground}
                    >
                      <View style={styles.popupText}>
                        <View style={styles.popupTextHead}>
                          <Text style={styles.headPopup}>
                            Get in there to reach
                          </Text>
                          <Text style={styles.subPopup}>
                            Get Direction to the Event
                          </Text>
                        </View>
                        <View style={styles.popupTextHead}>
                          <View style={styles.venueContainer}>
                            <Icon name="home" size={18} color="#EFBF04" />
                            <Text style={styles.venHead}>VENUE</Text>
                          </View>
                          <Text style={styles.cityName}>{selectedVenue}</Text>
                          <View style={styles.addressContainer}>
                            <Icon name="map-marker" size={18} color="#EFBF04" />
                            <Text style={styles.addHead}>ADDRESS</Text>
                          </View>
                          <Text style={styles.addressText}>
                            {selectedAddress}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                  <Text style={styles.modalSpace}></Text>
                </View>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleConfirmPress}
                >
                  <Text style={styles.submitButtonText}>CONFIRM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const packageData = [
  {
    venue: "Limketkai Luxe Hotel",
    address: "22-B, W White Road, Lapasan, CDO, 234567",
    image: require("../pictures/v.png"),
  },
  {
    venue: "Venue B",
    address: "Address B",
    image: require("../pictures/v1.png"),
  },
  {
    venue: "Venue C",
    address: "Address C",
    image: require("../pictures/v2.png"),
  },
  {
    venue: "Venue D",
    address: "Address D",
    image: require("../pictures/v3.png"),
  },
  {
    venue: "Venue E",
    address: "Address E",
    image: require("../pictures/v4.png"),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  closeButton: {
    padding: 10,
  },
  logo: {
    flex: 1,
    height: 50,
    marginEnd: 50,
  },
  iconButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    marginTop: 5,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headText: {
    color: "#e6b800",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerText: {
    color: "#e6b800",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  debutText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  pack: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  packageButton: {
    width: "45%",
    marginBottom: 15,
    marginHorizontal: "2.5%",
  },
  packageImage: {
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  venueHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 15,
  },
  chooseButton: {
    backgroundColor: "#C2B067",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  headerEType: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chooseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "90%",
    height: "80%",
    backgroundColor: "transparent",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  popupContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    padding: 50,
    marginLeft: -40,
    marginRight: -40,
  },
  popupImage: {
    width: "60%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  contentVA: {
    flex: 1,
    width: "100%",
    borderRadius: 25,
    overflow: "hidden",
  },
  popupBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  closeDetails: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  packageHead: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: -15,
  },
  infoContainer: {
    backgroundColor: "rgba(80, 79, 79, 0.3)",
    borderRadius: 50,
    padding: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  popupText: {
    flexDirection: "column",
  },
  popupTextHead: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  headPopup: {
    color: "#e6b800",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: -10,
  },
  subPopup: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  venueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  venHead: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  addHead: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cityName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  addressText: {
    fontSize: 15,
    color: "#fff",
  },
  modalSpace: {
    margin: 10,
  },
  submitButton: {
    backgroundColor: "#61481C",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: -25,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Venue;
