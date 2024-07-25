import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../elements/Header";

const Settings = () => {
    const [language, setLanguage] = useState('English');
    const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
    const [timeZone, setTimeZone] = useState('GMT');
  
    const saveSettings = () => {
        alert(`Settings Saved:\nLanguage: ${language}\nDate Format: ${dateFormat}\nTime Zone: ${timeZone}`);
      };
    
    const handleHelpPress = () => {
        alert('Navigate to Help & FAQs');
      };

    return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Settings</Text>
          </View>

          <View style={styles.set}>
          <Text style={styles.label}>Language</Text>
            <Picker
                selectedValue={language}
                style={styles.picker}
                onValueChange={(itemValue) => setLanguage(itemValue)}
            >
                <Picker.Item label="English" value="English" color='white'/>
                <Picker.Item label="Spanish" value="Spanish" color='white'/>
                <Picker.Item label="French" value="French" color='white'/>
                <Picker.Item label="German" value="German" color='white'/>
            </Picker>

            <Text style={styles.label}>Time Zone</Text>
            <Picker
                selectedValue={timeZone}
                style={styles.picker}
                onValueChange={(itemValue) => setTimeZone(itemValue)}
            >
                <Picker.Item label="GMT" value="GMT" color='white'/>
                <Picker.Item label="CET" value="CET" color='white'/>
                <Picker.Item label="EST" value="EST" color='white'/>
                <Picker.Item label="PST" value="PST" color='white'/>
            </Picker>
            
            <Text style={styles.label}>Date Format</Text>
            <Picker
                selectedValue={dateFormat}
                style={styles.picker}
                onValueChange={(itemValue) => setDateFormat(itemValue)}
            >
                <Picker.Item label="MM/DD/YYYY" value="MM/DD/YYYY" color='white' />
                <Picker.Item label="DD/MM/YYYY" value="DD/MM/YYYY" color='white'/>
                <Picker.Item label="YYYY/MM/DD" value="YYYY/MM/DD" color='white'/>
            </Picker>

            <Button mode="contained" onPress={saveSettings} style={styles.saveButton}>
                Save
            </Button>

            <TouchableOpacity style={styles.helpContainer} onPress={handleHelpPress}>
                <Icon name="question-circle" size={24} color="#fff" />
                <Text style={styles.helpText}>Help & FAQs</Text>
            </TouchableOpacity>

            </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  set: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#fff",
    marginBottom: -60
  },
  picker: {
    width: '100%',
    marginBottom: -50
  },
  saveButton: {
    marginTop: 60,
    backgroundColor: '#EFBF04',
    marginLeft: 90,
    marginRight: 90,
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 100,
  },
  helpText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff', 
  },
});

export default Settings;