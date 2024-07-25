import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../elements/SearchBAr';

const conversations = [
  { id: '1', name: 'Adelyn Eyana', lastMessage: 'Hey there!', time: '9:41' },
  { id: '2', name: 'Adelyn Eyana', lastMessage: 'See you soon.', time: '9:41' },
  { id: '3', name: 'Adelyn Eyana', lastMessage: 'Got it, thanks!', time: '9:41' },
  { id: '4', name: 'Adelyn Eyana', lastMessage: 'Call me back.', time: '9:41' },
  { id: '5', name: 'Adelyn Eyana', lastMessage: 'Meeting at 3 PM.', time: '9:41' },
  { id: '6', name: 'Adelyn Eyana', lastMessage: 'Can we reschedule?', time: '9:41' },
  { id: '7', name: 'Adelyn Eyana', lastMessage: 'Check this out!', time: '9:41' },
  { id: '8', name: 'Adelyn Eyana', lastMessage: 'Good night.', time: '9:41' },
];

const InboxView = () => {
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
            <Text style={styles.title}>Messages</Text>
          </View>
     <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Customer</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Supplier</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Groups</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Add More</Text></TouchableOpacity>
      </View>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contactsList}
      />
      <TouchableOpacity 
        style={styles.newMessageButton} 
        onPress={() => navigator.navigate('SelectContactView')}
      >
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.newMessageButtonText}>Create New Message</Text>
      </TouchableOpacity>
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
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  title: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 25,
    fontWeight: 'bold',
    color: "#EFBF04",
    alignItems: "center"
  },
  titleCon: {
    alignSelf: "center",
    marginTop: -20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e6b800',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
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
  newMessageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6b800',
    padding: 16,
    borderRadius: 20,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  newMessageButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default InboxView;