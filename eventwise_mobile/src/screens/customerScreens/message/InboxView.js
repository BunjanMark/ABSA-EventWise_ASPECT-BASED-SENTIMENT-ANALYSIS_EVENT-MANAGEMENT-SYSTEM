import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const navigation = useNavigation();

  const renderConversation = ({ item }) => (
    <TouchableOpacity 
      style={styles.contactContainer} 
      onPress={() => navigation.navigate('ConversationView', { contact: item })}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactMessage}>{item.lastMessage}</Text>
      <Text style={styles.contactTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Notifications</Text>
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
        onPress={() => navigation.navigate('SelectContactView')}
      >
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.newMessageButtonText}>Create New Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  goBackButton: {
    marginLeft: 10,
    marginTop: 18,
  },
  title: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 25,
    fontWeight: 'bold',
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