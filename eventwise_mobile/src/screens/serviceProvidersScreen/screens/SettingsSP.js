import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const SettingSP = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light'); // State for theme selection
  const [textSize, setTextSize] = useState('medium'); // State for text size selection
  const navigation = useNavigation();

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    console.log(`Selected theme: ${selectedTheme}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Settings</Text>

        {/* Language Picker */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Language</Text>
          <Picker
            selectedValue={language}
            style={styles.picker}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="German" value="de" />
          </Picker>
        </View>

        {/* Text Sizing Picker */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Text Size</Text>
          <Picker
            selectedValue={textSize}
            style={styles.picker}
            onValueChange={(itemValue) => setTextSize(itemValue)}
          >
            <Picker.Item label="Small" value="small" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Large" value="large" />
          </Picker>
        </View>

        {/* Theme Selection (Light / Dark) */}
        <View style={styles.settingOption}>
          <Text style={styles.optionLabel}>Theme</Text>
          <View style={styles.themeSelectionContainer}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                theme === 'light' && styles.selectedThemeOption,
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <View style={[styles.themeLight, theme === 'light' && styles.selectedThemeLight]} />
              <Text style={styles.themeText}>Light Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                theme === 'dark' && styles.selectedThemeOption,
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <View style={[styles.themeDark, theme === 'dark' && styles.selectedThemeDark]} />
              <Text style={styles.themeText}>Dark Mode</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Log Out */}
        <View style={styles.settingOption}>
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eeba2b',
    textAlign: 'center',
    marginBottom: 20,
  },
  settingOption: {
    marginBottom: 30,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  themeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeOption: {
    width: '48%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#ddd',
  },
  selectedThemeOption: {
    borderColor: '#eeba2b',
  },
  themeLight: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  themeDark: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedThemeLight: {
    borderColor: '#eeba2b',
    borderWidth: 2,
  },
  selectedThemeDark: {
    borderColor: '#eeba2b',
    borderWidth: 2,
  },
  themeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  button: {
    backgroundColor: '#FFC42B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingSP;
