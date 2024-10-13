import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header2 from "../elements/Header2";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header2 />
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
                <Picker.Item label="English" value="English" color='black'/>
                <Picker.Item label="Spanish" value="Spanish" color='black'/>
                <Picker.Item label="French" value="French" color='black'/>
                <Picker.Item label="German" value="German" color='black'/>
            </Picker>

            <Text style={styles.label}>Time Zone</Text>
            <Picker
                selectedValue={timeZone}
                style={styles.picker}
                onValueChange={(itemValue) => setTimeZone(itemValue)}
            >
                <Picker.Item label="GMT" value="GMT" color='black'/>
                <Picker.Item label="CET" value="CET" color='black'/>
                <Picker.Item label="EST" value="EST" color='black'/>
                <Picker.Item label="PST" value="PST" color='black'/>
            </Picker>
            
            <Text style={styles.label}>Date Format</Text>
            <Picker
                selectedValue={dateFormat}
                style={styles.picker}
                onValueChange={(itemValue) => setDateFormat(itemValue)}
            >
                <Picker.Item label="MM/DD/YYYY" value="MM/DD/YYYY" color='black' />
                <Picker.Item label="DD/MM/YYYY" value="DD/MM/YYYY" color='black'/>
                <Picker.Item label="YYYY/MM/DD" value="YYYY/MM/DD" color='black'/>
            </Picker>

            <Button mode="contained" onPress={saveSettings} style={styles.saveButton}>
                Save
            </Button>

            <TouchableOpacity style={styles.helpContainer} onPress={handleHelpPress}>
                <Icon name="question-circle" size={24} color="black" />
                <Text style={styles.helpText}>Help & FAQs</Text>
            </TouchableOpacity>

            </View>

        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  set: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black",
    marginBottom: -60,
    fontFamily: "Poppins",
  },
  picker: {
    width: '100%',
    marginBottom: -50,
  },
  saveButton: {
    marginTop: 60,
    backgroundColor: '#FFC42B',
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
    fontSize: 16,
    color: 'black',
    fontFamily: "Poppins",
  },
  accountsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  accDivider: {
    height: 7,
    width: 50,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 20,
  },
  accountsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    fontFamily: "Poppins",
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 8,
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  accountInfo: {
    flex: 1,
    marginLeft: 10,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Poppins",
  },
  accountType: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins",
  },
  dots: {
    marginRight: 20,
  },
  logoutButton: {
    backgroundColor: '#FFC42B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 35,
    marginLeft: 80,
    marginRight: 80,
  },
  logoutButtonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Poppins",
  },
});

export default Settings;
