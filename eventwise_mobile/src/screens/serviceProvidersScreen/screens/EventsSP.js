import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('../assets/event1.png'), date: '2024-07-01', address: 'CDO', buttons: ['Feedback'] },
  { id: '2', title: 'Elizabeth Birthday', image: require('../assets/event2.png'), date: '2024-08-12', address: 'CDO', buttons: ['Feedback'] },
  { id: '3', title: 'Class of 1979 Reunion', image: require('../assets/event3.png'), date: '2024-09-25', address: 'CDO', buttons: ['Feedback'] },
  { id: '4', title: 'Corporate Party', image: require('../assets/event1.png'), date: '2024-10-30', address: 'CDO', buttons: ['Feedback'] },
  { id: '5', title: 'Annual Gala', image: require('../assets/event2.png'), date: '2024-11-15', address: 'CDO', buttons: ['Feedback'] },
  { id: '6', title: 'New Year Celebration', image: require('../assets/event3.png'), date: '2024-12-31', address: 'CDO', buttons: ['Feedback'] },
  { id: '7', title: 'Music Festival', image: require('../assets/event1.png'), date: '2024-06-22', address: 'CDO', buttons: ['Feedback'] },
  { id: '8', title: 'Art Exhibition', image: require('../assets/event2.png'), date: '2024-07-05', address: 'CDO', buttons: ['Feedback'] },
];

const EventsSP = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [likedEvents, setLikedEvents] = useState({});

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = eventsData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(eventsData);
    }
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.heartIcon, likedEvents[item.id] ? styles.heartLiked : null]}
        onPress={() => toggleLike(item.id)}
      >
        <MaterialCommunityIcons
          name={likedEvents[item.id] ? 'heart' : 'heart-outline'}
          color={likedEvents[item.id] ? '#FF0000' : '#888'}
          size={20}
        />
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        {item.buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              if (button === 'Feedback') {
                navigation.navigate('FeedbackSP');
              } else if (button === 'Inventory') {
                navigation.navigate('InventorySP');
              }
            }}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Events"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  detailContainer: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 5,
    color: '#666',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heartLiked: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 50,
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFCE00',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default EventsSP;
