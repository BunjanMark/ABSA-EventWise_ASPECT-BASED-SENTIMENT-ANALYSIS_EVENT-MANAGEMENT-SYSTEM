import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../elements/SearchBAr';

const CustomizePackage = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Photographer');
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceData = {
    Photographer: [
      { name: 'Diwata Photography', price: 10, image: require('../pictures/cp2.png') },
      { name: 'Diwata Photography', price: 10, image: require('../pictures/cp2.png') },
      { name: 'Diwata Photography', price: 10, image: require('../pictures/cp2.png') },
    ],
    'Food Catering': [
      { name: 'Diwata Pares', price: 10, image: require('../pictures/cp1.png') },
      { name: 'Pitik ni Diwata', price: 10, image: require('../pictures/cp.png') },
      { name: 'Diwata Decor', price: 10, image: require('../pictures/cp.png') },
    ],
    Decoration: [
      { name: 'Diwata Decor', price: 10, image: require('../pictures/cp3.png') },
      { name: 'Diwata Decor', price: 10, image: require('../pictures/cp3.png') },
      { name: 'Diwata Decor', price: 10, image: require('../pictures/cp3.png') },
    ],
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.some((item) => item.name === service.name)
        ? prev.filter((item) => item.name !== service.name)
        : [...prev, { ...service, type: selectedTab }]
    );
  };

  const handleSubmitPress = () => {
    const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
    navigation.navigate('Book', { selectedPackage: selectedServices, totalPrice: total });
  };
  

  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.head}>
              <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
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
          </SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.headText}>Package</Text>
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
          <ScrollView>
            <Image source={require('../pictures/ellipse.png')} style={styles.bannerImage} />
            <Text style={styles.headerText}>Check Out Top Event Services</Text>
            <Text style={styles.debutText}>Debut Packages</Text>
            <Image
              source={require("../pictures/vec.png")}
              style={styles.line}
              resizeMode="contain"
            />
            <Image
              source={require("../pictures/line.png")}
              style={styles.line2}
              resizeMode="contain"
            />
            <Text style={styles.customizeText}>CUSTOMIZE</Text>
            <Text style={styles.headerEType}>Add Services</Text>
            <View style={styles.tabContainer}>
              {Object.keys(serviceData).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text style={[styles.tabButtonText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
              {serviceData[selectedTab].map((service, index) => (
                <TouchableOpacity key={index} style={styles.serviceButton} onPress={() => toggleService(service)}>
                  <Image source={service.image} style={styles.serviceImage} />
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.addButtonContainer}>
                    <Text style={styles.addButton}>{selectedServices.some((item) => item.name === service.name) ? '✔️' : '+'}</Text>
                  </View>
                  <Text style={styles.servicePrice}>{service.price}k</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Name</Text>
              <Text style={styles.summaryTitle}>Type</Text>
              <Text style={styles.summaryTitle}>Price</Text>
            </View>
            <View style={styles.summaryContainer}>
              {selectedServices.map((service, index) => (
                <View key={index} style={styles.summaryRow}>
                  <Text style={styles.summaryText}>{service.name}</Text>
                  <Text style={styles.summaryText}>{service.type}</Text>
                  <Text style={styles.summaryText}>{service.price}k</Text>
                </View>
              ))}
              <Text style={styles.totalText}>TOTAL: {total}k</Text>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    padding: 10,
    marginTop: 5,
    marginLeft: 8
  },
  logo: {
    flex: 1,
    height: "100%",
    marginEnd: 50,
  },
  iconButton: {
    marginLeft: -20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 5
  },
  line2: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headText: {
    color: '#e6b800',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#e6b800',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 10,
  },
  shText: {
    color: '#fff',
    fontSize: 16,
    textAlign: "left",
    marginStart: 20,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
  },
  debutText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  customizeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  headerEType: {
    color: '#fff',
    fontSize: 14,
    marginBottom: -2,
    marginTop: 20,
    marginLeft: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6b800',
    marginHorizontal: 3,
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: '#e6b800',
  },
  activeTabText: {
    color: '#1e1e1e',
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  serviceButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    marginRight: 10,
  },
  serviceImage: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  serviceName: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
    textAlign: "left"
  },
  servicePrice: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
    textAlign: "left"
  },
  addButtonContainer: {
    backgroundColor: '#000',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButton: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: '33%',
    textAlign: 'center',
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    color: '#000',
    fontSize: 14,
    width: '33%',
    textAlign: 'center',
  },
  totalText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#CEB64C',
    padding: 15,
    borderRadius: 25,
    marginLeft: 100,
    marginRight: 100,
    margin: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#1e1e1e',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomizePackage;
