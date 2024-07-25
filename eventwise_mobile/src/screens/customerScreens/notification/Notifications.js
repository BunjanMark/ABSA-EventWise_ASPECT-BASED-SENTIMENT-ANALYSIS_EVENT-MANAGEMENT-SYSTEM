import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../elements/SearchBAr';

const conversations = [
    { id: '1', name: 'Organizer', lastMessage: 'Hey there!', time: '9:41' },
    { id: '2', name: 'Organizer', lastMessage: 'See you soon.', time: '9:41' },
    { id: '3', name: 'Organizer', lastMessage: 'Got it, thanks!', time: '9:41' },
    { id: '4', name: 'Organizer', lastMessage: 'Call me back.', time: '9:41' },
    { id: '5', name: 'Organizer', lastMessage: 'Meeting at 3 PM.', time: '9:41' },
    { id: '6', name: 'Organizer', lastMessage: 'Can we reschedule?', time: '9:41' },
    { id: '7', name: 'Organizer', lastMessage: 'Check this out!', time: '9:41' },
    { id: '8', name: 'Organizer', lastMessage: 'Good night.', time: '9:41' },
];

const Notification = () => {
  const navigator = useNavigation();
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);

  const renderConversation = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactContainer} 
      onPress={() => navigator.navigate('ConvoView', { contact: item })}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactMessage}>{item.lastMessage}</Text>
      <Text style={styles.contactTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <View style={styles.container}>
    <ImageBackground
      source={require("../pictures/bg.png")}
      style={styles.background}
    >
     <View style={styles.head}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => setShowSearch(true)}
            style={styles.searchIconButton}
          >
            <Icon name="search" size={20} color="#fff" />
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
  <FlatList
    data={conversations}
    renderItem={renderConversation}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.contactsList}
  />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background: {
    flex: 1,
    padding: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 5,
    marginLeft: -5
  },
  searchIconButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 5,
    marginLeft: -5
  },
  title: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 25,
    fontWeight: 'bold',
    color: "#EFBF04",
  },
  titleCon: {
    alignSelf: "center",
    marginTop: -20,
  },
  contactsList: {
    paddingBottom: 16,
    backgroundColor: "white",
    borderRadius: 30,
  },
  contactContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactMessage: {
    color: '#666',
    marginVertical: 4,
  },
  contactTime: {
    color: '#999',
    alignSelf: 'flex-end',
  },
});

export default Notification;