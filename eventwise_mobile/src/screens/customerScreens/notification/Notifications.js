import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../elements/SearchBAr';

const conversations = [
    { id: '1', name: 'Mr. & Mrs. Malik Wedding', participants: 'Diwata pares, Jane Photography, and 35 others joined events', time: '1d ago' },
    { id: '2', name: 'Mr. & Mrs. Malik Wedding', participants: 'Diwata pares, Jane Photography, and 35 others joined events', time: '1d ago' },
    { id: '3', name: 'Mr. & Mrs. Malik Wedding', participants: 'Diwata pares, Jane Photography, and 35 others joined events', time: '1d ago' },
    { id: '4', name: 'Mr. & Mrs. Malik Wedding', participants: 'Diwata pares, Jane Photography, and 35 others joined events', time: '1d ago' },
    { id: '5', name: 'Mr. & Mrs. Malik Wedding', participants: 'Diwata pares, Jane Photography, and 35 others joined events', time: '1d ago' },
];

const Notification = () => {
  const navigator = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All'); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={styles.notificationCard} 
      onPress={() => navigator.navigate('NotifView', { contact: { name: 'Organizer/Admin' } })}
    >
      <View style={styles.notificationContent}>
        <Image source={{ uri: 'https://placekitten.com/80/80' }} style={styles.eventImage} />
        
        <View style={styles.eventDetails}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.participants}>{item.participants}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.timeAgo}>{item.time}</Text>
          <TouchableOpacity onPress={() => openModal(item)}>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigator.goBack()}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowSearch(true)}
          style={styles.searchIconButton}
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

      <View style={styles.titleCon}>
        <Text style={styles.title}>Notifications</Text>
      </View>  

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'All' && styles.activeTab]}
          onPress={() => setSelectedTab('All')}
        >
          <Text style={[styles.tabText, selectedTab === 'All' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'This Week' && styles.activeTab]}
          onPress={() => setSelectedTab('This Week')}
        >
          <Text style={[styles.tabText, selectedTab === 'This Week' && styles.activeTabText]}>This Week</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
      />

     {selectedEvent && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                <Icon name="close" size={24} color="#6B6B6B" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{selectedEvent.name}</Text>

              <View style={styles.eventDateContainer}>
                <Text style={styles.eventDateLabel}>Event Date</Text>
                <Text style={styles.eventDateValue}>{selectedEvent.date}</Text>
              </View>

              <Image source={require("../pictures/invitationCard.png")}  style={styles.modalImage} />

              <TouchableOpacity 
                style={styles.viewGuestsButton}
                onPress={() => {
                  closeModal();
                  navigator.navigate('Guest', { event: selectedEvent });
                }}
              >
                <Text style={styles.viewGuestsText}>View Event Guest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
  },
  searchIconButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  title: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    color: "#000",
  },
  titleCon: {
    alignSelf: "center",
    marginTop: -20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  tabButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    width: 120,
  },
  activeTab: {
    backgroundColor: '#FDCB58',
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: '#000',
    textAlign: "center"
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  notificationsList: {
    paddingBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    color: '#000',
  },
  participants: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
    fontFamily: "Poppins",
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  timeAgo: {
    color: '#999',
    fontSize: 14,
    fontFamily: "Poppins",
  },
  viewDetails: {
    color: '#FFC42B',
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 10,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  eventDateContainer: {
    marginBottom: 20,
  },
  eventDateLabel: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    alignSelf: "flex-start",
  },
  eventDateValue: {
    fontSize: 16,
    fontFamily: "Poppins",
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    borderColor: '#000',
    borderWidth: .4,
  },
  modalImage: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
  viewGuestsButton: {
    backgroundColor: '#FFC42B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  viewGuestsText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Notification;
