import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../elements/Header";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const Settings = () => {
    const [language, setLanguage] = useState('English');
    const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
    const [timeZone, setTimeZone] = useState('GMT');
  
    const saveSettings = () => {
        alert(`Settings Saved:\nLanguage: ${language}\nTime Zone: ${timeZone}\nDate Format: ${dateFormat}`);
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
                            <Picker.Item label="English" value="English" color='black'/>
                            <Picker.Item label="Spanish" value="Spanish" color='black'/>
                            <Picker.Item label="Bisaya" value="Bisaya" color='black'/>
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
                            Save Changes
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
        marginHorizontal: widthPercentageToDP("5%"),
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
    },
    header: {
        alignItems: 'center',
        marginVertical: heightPercentageToDP("3%"),
    },
    headerText: {
        color: '#e6b800',
        fontSize: heightPercentageToDP("4%"),
        fontWeight: 'bold',
    },
    set: {
        marginTop: heightPercentageToDP("3%"),
    },
    label: {
        fontSize: heightPercentageToDP("2.5%"),
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: heightPercentageToDP("1%"),
    },
    picker: {
        width: '100%',
        marginBottom: heightPercentageToDP("2%"),
        color: '#000',
        backgroundColor: '#fff',
    },
    saveButton: {
        marginTop: heightPercentageToDP("5%"),
        backgroundColor: '#EFBF04',
        marginHorizontal: widthPercentageToDP("10%"),
        marginLeft: 100,
        marginRight: 100,
    },
    helpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightPercentageToDP("2%"),
        alignSelf: "center",
        marginBottom: heightPercentageToDP("5%"),
    },
    helpText: {
        marginLeft: widthPercentageToDP("2%"),
        fontSize: heightPercentageToDP("2%"),
        color: '#fff', 
    },
});

export default Settings;
