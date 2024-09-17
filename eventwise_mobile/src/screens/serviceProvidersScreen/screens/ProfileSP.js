import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('../assets/service1.png'), date: '2024-07-01', address: 'CDO', buttons: ['Feedback'] },
  { id: '2', title: 'Elizabeth Birthday', image: require('../assets/service1.png'), date: '2024-08-12', address: 'CDO', buttons: ['Feedback'] },
  { id: '3', title: 'Class of 1979 Reunion', image: require('../assets/service1.png'), date: '2024-09-25', address: 'CDO', buttons: ['Feedback'] },
  { id: '4', title: 'Corporate Party', image: require('../assets/service1.png'), date: '2024-10-30', address: 'CDO', buttons: ['Feedback'] },
  { id: '5', title: 'Annual Gala', image: require('../assets/service1.png'), date: '2024-11-15', address: 'CDO', buttons: ['Feedback'] },
  { id: '6', title: 'New Year Celebration', image: require('../assets/service1.png'), date: '2024-12-31', address: 'CDO', buttons: ['Feedback'] },
  { id: '7', title: 'Music Festival', image: require('../assets/service1.png'), date: '2024-06-22', address: 'CDO', buttons: ['Feedback'] },
  { id: '8', title: 'Art Exhibition', image: require('../assets/service1.png'), date: '2024-07-05', address: 'CDO', buttons: ['Feedback'] },
];

const ProfileSP = () => {
  const navigation = useNavigation();

  // Function to render each event item
  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
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
    </View>
  );

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/pro_pic.png')}
          style={styles.profilePicture}
        />
        <Text style={styles.nameText}>Organizer</Text>
        <Text style={styles.addressText}>Service Provider Address</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileSP')} // Update to navigate to the Settings page
          >
            <Ionicons name="pencil" size={24} color="white" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Event Text */}
      <Text style={styles.popularEventText}>Popular Events</Text>

      {/* Horizontal Scrolling Event List */}
      <FlatList
        data={eventsData}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventsListContainer}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileSection: {
    borderColor: '#C2B067', // Border color of the rectangle
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    backgroundColor: '#FFFFFF', // Set background color to white
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, // Increase shadow offset
    shadowOpacity: 0.3, // Increase shadow opacity
    shadowRadius: 10, // Increase shadow radius
    elevation: 8, // Increase elevation
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Set text color to black
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#000', // Set text color to black
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#eeba2b', // Set background color to #eeba2b
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF', // Set text color to white
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  popularEventText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Set text color to black
    marginTop: 30,
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: '#FFFFFF', // Set background color to white
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, // Increase shadow offset
    shadowOpacity: 0.3, // Increase shadow opacity
    shadowRadius: 10, // Increase shadow radius
    elevation: 8, // Increase elevation
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#000', // Set text color to black
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailContainer: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    color: '#2A93D5',
    marginLeft: 5,
  },
  eventsListContainer: {
    paddingBottom: 20, // Adjust this based on your needs
  },
});

export default ProfileSP;
