import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchEvents } from '../../../services/organizer/adminEventServices';
import event1 from '../assets/event1.png';
import event2 from '../assets/event2.png';
import event3 from '../assets/event3.png';

const EventsSP = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState({});

  const coverPhotos = [event1, event2, event3];

  // Fetch events on component mount
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data = await fetchEvents();
        // Assign cover photos in a circular fashion
        const eventsWithImages = data.map((event, index) => ({
          ...event,
          image: coverPhotos[index % coverPhotos.length],
        }));
        setEvents(eventsWithImages);
        setFilteredEvents(eventsWithImages);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchAllEvents();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(events);
    }
  };

  const toggleOverlay = (eventId) => {
    setOverlayVisible((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#2A93D5" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.dotsIcon}
        onPress={() => toggleOverlay(item.id)}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#888" />
      </TouchableOpacity>

      {overlayVisible[item.id] && (
  <Animated.View style={styles.overlay}>
    <TouchableOpacity
      style={styles.overlayItem}
      onPress={() => navigation.navigate('InventorySP', { eventId: item.id })}
    >
      <MaterialCommunityIcons name="checkbox-marked-outline" size={20} color="#fff" />
      <Text style={styles.overlayText}>Inventory</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.overlayItem}
      onPress={() => navigation.navigate('EquipmentSP', { eventId: item.id })}
    >
      <MaterialCommunityIcons name="archive" size={20} color="#fff" />
      <Text style={styles.overlayText}>Equipment</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.overlayItem}
      onPress={() => {
        navigation.navigate('FeedbackSP');
        toggleOverlay(item.id);
      }}
    >
      <MaterialCommunityIcons name="message-text" size={20} color="#fff" />
      <Text style={styles.overlayText}>Feedback</Text>
    </TouchableOpacity>
    <TouchableOpacity
  style={styles.overlayItem}
  onPress={() => {
    console.log('Navigating to GuestSP', { eventId: item.id, eventName: item.name });
    navigation.navigate('GuestSP', { eventId: item.id, eventName: item.name });
  }}
>
  <MaterialCommunityIcons name="account-group" size={20} color="#fff" />
  <Text style={styles.overlayText}>Guest</Text>
</TouchableOpacity>

  </Animated.View>
)}

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
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
        <View style={styles.paddingBottom} />
      </ScrollView>
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
  dotsIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: '#EEBA2B',
    borderRadius: 8,
    padding: 10,
    bottom: 50, // Adjusted to show below the dots icon
    right: 10,
    zIndex: 9999, // Higher zIndex to appear in front
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 150, // Set a width for the overlay for better visibility
  },
  overlayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  overlayText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
  },
  paddingBottom: {
    height: 60, // Set height for the bottom padding
  },
});

export default EventsSP;
