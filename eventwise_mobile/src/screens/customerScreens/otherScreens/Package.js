import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../elements/SearchBAr';

const Package = () => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleChoosePress = (image) => {
    setSelectedPackage(image);
    setDetailVisible(true);
  };

  const handleConfirmPress = () => {
    navigation.navigate('Book', { selectedPackage: selectedPackage });
  };

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
            <TouchableOpacity style={styles.customizeButton} onPress={() => navigation.navigate('CustomizePackage')}>
              <Text style={styles.customizeButtonText}>CLICK HERE IF YOU WANT TO CUSTOMIZE</Text>
            </TouchableOpacity>
            <Text style={styles.shText}>Packages</Text>
            <View style={styles.pack}>
              {packageData.map((pkg, index) => (
                <View key={index} style={styles.packageButton}>
                  <TouchableOpacity onPress={() => handleImagePress(pkg.image)}>
                    <Image source={pkg.image} style={styles.packageImage} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chooseButton} onPress={() => handleChoosePress(pkg.image)}>
                    <Text style={styles.chooseText}>CHOOSE</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <ImageBackground
                source={require('../pictures/Popup1.png')}
                style={styles.modalBackground}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.closeImage} onPress={() => setModalVisible(false)}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                  <Image source={selectedImage} style={styles.fullImage} />
                </View>
              </ImageBackground>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={detailVisible}
            onRequestClose={() => {
              setDetailVisible(!detailVisible);
            }}
          >
            <View style={styles.popupContainer}>
              <ImageBackground
                source={require('../pictures/Popup2.png')}
                style={styles.popupBackground}
              >
                <View style={styles.popupContent}>
                  <Text style={styles.packageHead}>PACKAGE</Text>
                  <TouchableOpacity style={styles.closeDetails} onPress={() => setDetailVisible(false)}>
                    <Icon name="close" size={24} color="#000" />
                  </TouchableOpacity>
                  <Image source={selectedPackage} style={styles.popupImage} />
                  <TouchableOpacity style={styles.submitButton} onPress={handleConfirmPress}>
                    <Text style={styles.submitButtonText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

const packageData = [
  { image: require('../pictures/p.png') },
  { image: require('../pictures/p1.png') },
  { image: require('../pictures/p2.png') },
  { image: require('../pictures/p3.png') },
  { image: require('../pictures/p.png') },
  { image: require('../pictures/p1.png') },
  { image: require('../pictures/p2.png') },
  { image: require('../pictures/p3.png') },
  { image: require('../pictures/p.png') },
  { image: require('../pictures/p1.png') },
  { image: require('../pictures/p2.png') },
  { image: require('../pictures/p3.png') },
];

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
  closeImage: {
    padding: 15,
    marginTop: -70,
    marginBottom: -20,
    alignSelf: "flex-end"
  },
  closeDetails: {
    padding: 15,
    marginTop: -50,
    marginBottom: -20,
    alignSelf: "flex-end",
    marginRight: -20
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
  customizeButton: {
    backgroundColor: '#e6b800',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  customizeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  packageButton: {
    width: '45%',
    marginBottom: 15,
    marginHorizontal: '2.5%',
  },
  packageImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  chooseButton: {
    backgroundColor: '#C2B067',
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: -20,
    margin: 30,
  },
  chooseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    borderRadius: 25,
  },
  modalContent: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBackground: {
    width: '95%',
    height: '95%',
    alignSelf: "center"
  },
  popupContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    marginTop: 50
  },
  packageHead: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -50,
  },
  popupImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  submitButton: {
    backgroundColor: '#61481C',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: -20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Package;
