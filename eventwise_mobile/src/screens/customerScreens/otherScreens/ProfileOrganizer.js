import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../elements/Header";

const ProfileOrganizer = () => {
  const navigator = useNavigation();
  const [activeTab, setActiveTab] = useState('About');

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <View style={styles.content}>
            <Text style={styles.contentTitle}>About</Text>
            <Text style={styles.contentText}>
              I am committed to providing the best possible experience for both customers and service providers. I am dedicated to creating a welcoming and inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community.
            </Text>
          </View>
        );
      case 'Events':
        return (
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Events</Text>
            {/* events */}
          </View>
        );
      case 'Reviews':
        return (
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Reviews</Text>
            {/* reviews */}
          </View>
        );
      default:
        return null;
    }
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
            <Text style={styles.headerText}>Organizer</Text>
          </View>

          <View style={styles.userProfile}>
            <Image
              source={require("../pictures/user.png")}
              style={styles.avatarImage}
            />
            <Text style={styles.userName}>Organizer Name</Text>
            <Image
              source={require("../pictures/line.png")}
              style={styles.line}
              resizeMode="contain"
            />
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setActiveTab('About')} style={[styles.tab, activeTab === 'About' && styles.activeTab]}>
              <Text style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Events')} style={[styles.tab, activeTab === 'Events' && styles.activeTab]}>
              <Text style={[styles.tabText, activeTab === 'Events' && styles.activeTabText]}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Reviews')} style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}>
              <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeTabText]}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {renderContent()}

          <Button
            style={{ ...styles.goback }}
            labelStyle={{ color: "#fff" }}
            onPress={() => {
              navigator.goBack();
            }}
          >
            Go Back
          </Button>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userProfile: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  line: {
    marginTop: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tab: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#e6b800',
  },
  tabText: {
    color: '#fff',
    fontSize: 18,
  },
  activeTabText: {
    color: '#e6b800',
  },
  content: {
    marginTop: 20,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#fff',
  },
  goback: {
    marginTop: 50,
  },
});

export default ProfileOrganizer;
