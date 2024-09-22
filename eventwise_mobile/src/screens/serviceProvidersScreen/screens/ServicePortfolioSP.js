import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ServicePortfolioSP = () => {
  const navigation = useNavigation();
  const [serviceType, setServiceType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleAddCoverPhoto = () => {
    Alert.alert('Add Cover Photo', 'Functionality to choose an image for the cover photo.');
  };

  const handleCreatePortfolio = () => {
    Alert.alert('Create Service Portfolio', 'Functionality to create a new service portfolio.');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent} 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Header with a back icon and Service Details text */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfileSP')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={32} color="#FFC42B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Service Details</Text>
        </View>

        {/* Add Cover Photo Section */}
        <TouchableOpacity
          style={styles.coverPhotoContainer}
          onPress={handleAddCoverPhoto}
        >
          <Ionicons name="add" size={24} color="black" style={styles.coverPhotoIcon} />
          <Text style={styles.coverPhotoText}>Add Cover</Text>
        </TouchableOpacity>

        {/* Fading Line */}
        <LinearGradient
          colors={['#00000000', '#000000', '#00000000']}  // Black fading effect
          start={{ x: 0, y: 0.5 }}  // Horizontal gradient
          end={{ x: 1, y: 0.5 }}    // Horizontal gradient
          style={styles.line}
        />

        <Text style={styles.labels}>Service Details</Text>

        {/* Service Type */}
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Type of Services"
          placeholderTextColor="#B0B0B0"
          value={serviceType}
          onChangeText={setServiceType}
        />

        {/* Price Range */}
        <Text style={styles.label}>Price Range</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Price Range"
          placeholderTextColor="#B0B0B0"
          value={priceRange}
          onChangeText={setPriceRange}
        />

        {/* Create Service Portfolio Button */}
        <TouchableOpacity
          style={styles.createPortfolioButton}
          onPress={handleCreatePortfolio}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.createPortfolioText}>Create Service Portfolio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background color
    paddingBottom: 100,
  },
  scrollView: {
    flex: 1, // Ensure ScrollView takes full height
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eeba2b', // Black text color
    flex: 1,
    textAlign: 'center',
  },
  coverPhotoContainer: {
    flexDirection: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 100,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black', // Black border color
    borderStyle: 'dashed',
  },
  coverPhotoIcon: {
    marginRight: 10,
  },
  coverPhotoText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000', // Black text color
    marginBottom: 10,
  },
  labels: {
    fontSize: 20,
    color: '#000000', // Black text color
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    color: '#000000',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    shadowColor: '#000000', // Box shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  createPortfolioButton: {
    backgroundColor: '#FFC42B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFC42B',
  },
  createPortfolioText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ServicePortfolioSP;
