import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Header2 from "../elements/Header2";

const About = () => {
  const navigator = useNavigation();
  const [activeTab, setActiveTab] = useState('A&A Events');

  const renderContent = () => {
    switch (activeTab) {
      case 'A&A Events':
        return (
          <View style={styles.content}>
            <Text style={styles.contentText}>
              A&A Events is committed to providing the best possible experience for both customers and service providers. I am dedicated to creating a welcoming and inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community.
            </Text>
          </View>
        );
      case 'EventWise':
        return (
          <View style={styles.content}>
            <Text style={styles.contentText}>
              EventWise is committed to providing the best possible experience for both customers and service providers. I am dedicated to creating a welcoming and inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community.
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>About</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('A&A Events')} style={[styles.tab, activeTab === 'A&A Events' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'A&A Events' && styles.activeTabText]}>A&A Events</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('EventWise')} style={[styles.tab, activeTab === 'EventWise' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'EventWise' && styles.activeTabText]}>EventWise</Text>
          </TouchableOpacity>
        </View>

        {renderContent()}

        <View style={styles.divider} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              <Text
                style={{ color: "#8d8d8d" }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                EventWise
              </Text>
              {" "} © 2024
            </Text>
            <Text style={styles.footerText}>
              Powered by{" "}
              <Text
                style={{ color: "#8d8d8d" }}
                onPress={() => Linking.openURL("http://google.com")}
              >
                EventTech
              </Text>
            </Text>
          </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Poppins",
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
    color: '#000',
    fontSize: 16,
    fontFamily: "Poppins",
  },
  activeTabText: {
    fontWeight: 'bold',
    color: "#e6b800",
  },
  content: {
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#000',
    fontFamily: "Poppins",
    textAlign: "justify",
  },
  divider: {
    marginTop: 300,
    height: 1,
    backgroundColor: "#9a9a9a",
    marginVertical: 10,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: '#8d8d8d',
  },
});

export default About;
