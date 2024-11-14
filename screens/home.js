import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons'; 
import CustomHeader from "../elements/CustomHeader";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToFeedbackScreen = () => {
    navigation.navigate('feedback');
  };

  return (
    <View style={styles.background}>
      <CustomHeader showBackButton={true} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>You're Invited!</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailText, styles.highlightText]}>Event Name</Text>
            <View style={styles.eventInfoOuterContainer}>
              <Text style={[styles.detailText, { color: 'black' }]}>Mr & Mrs Malik's Wedding</Text>
            </View>

            
            <Image source={require('../assets/invitation.png')} style={styles.invitationImage} />
          </View>
        </View>

        <StatusBar style="auto" />
      </ScrollView>

      {/* Modal for Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Image source={require('../assets/Popup.png')} style={styles.popupImage} />
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Navigation Icons */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navItem}>
          <View style={styles.navDivider}></View>
          <View style={styles.navIconContainer}>
            <Ionicons name="home" size={24} color="#FFC42B" />
          </View>
          <Text style={styles.navText}>Event</Text>
        </View>
        <TouchableOpacity style={styles.navItem} onPress={navigateToFeedbackScreen}>
          <Ionicons name="chatbubble" size={24} color="black" />
          <Text style={[styles.navText, { color: 'black' }]}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 120,
    paddingVertical: 0,
  },
  header: {
    marginBottom: 25,
  },
  headerText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#F9EDC6',
    padding: 25,
    borderRadius: 20,
    width: '230%',
    maxWidth: 900,
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 30,
    paddingLeft: 20,
  },
  detailsContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  eventInfoOuterContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  highlightText: {
    color: '#FFC42B',
    fontWeight: 'bold',
  },
  invitationImage: {
    width: 290, 
    height: 400,
    marginTop: 10, 
  },
  button: {
    backgroundColor: '#FFC42B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
    marginRight: 20,
   
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 90,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: "#FFC42B",
    marginTop: 3,
  },
  
  
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    position: "absolute",
    top: 25,
    right: 25,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  popupImage: {
    width: 250,
    height: 250,
  }
});

export default HomeScreen;
