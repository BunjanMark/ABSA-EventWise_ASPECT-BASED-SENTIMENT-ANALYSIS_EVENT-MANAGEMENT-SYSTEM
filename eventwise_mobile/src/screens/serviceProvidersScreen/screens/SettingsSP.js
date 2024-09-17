import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SettingSP = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = () => {
    // Handle Submit button press
    console.log('Submit button pressed');
    // Add logic for form submission
  };

  const handleCreatePortfolio = () => {
    // Handle Create New Service Portfolio button press
    console.log('Create New Service Portfolio button pressed');
    // Add navigation or logic for creating a new service portfolio
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        <Text style={styles.headerText}>Settings</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/pro_pic.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>johndoe@example.com</Text>
          </View>
        </View>
        {/* Fading Line */}
        <LinearGradient
          colors={['#00000000', '#000000', '#00000000']} // Black fading effect
          start={{ x: 0, y: 0.5 }} // Horizontal gradient
          end={{ x: 1, y: 0.5 }}   // Horizontal gradient
          style={styles.line}
        />

        {/* Settings Options */}
        <Text style={styles.settingText}>Account Details</Text>

        <View style={styles.content}>
          <Text style={styles.settingsText}>Edit Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.settingsText}>Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Username"
            placeholderTextColor="#B0B0B0"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.settingsText}>Change Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter new Password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.settingsText}>Contact Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Contact Number"
            placeholderTextColor="#B0B0B0"
            value={contactNumber}
            onChangeText={setContactNumber}
          />

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createPortfolioButton}
            onPress={() => navigation.navigate('ServicePortfolioSP')}
          >
            <Ionicons name="add" size={24} color="white" style={styles.icon} />
            <Text style={styles.createPortfolioText}>Create New Service Portfolio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Make ScrollView grow to fill available space
    padding: 20,
    backgroundColor: '#FFFFFF', // White background
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eeba2b', // Black text color
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 20,
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
  settingsText: {
    fontSize: 15,
    color: '#000000', // Black text color
    marginVertical: 10,
  },
  settingText: {
    fontSize: 20,
    color: '#000000', // Black text color
    marginVertical: 10,
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    color: '#000000', // Black text color
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#000000', // Black text color
  },
  submitButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  createPortfolioButton: {
    backgroundColor: '#FFC42B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createPortfolioText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingSP;
