import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Divider } from "react-native-paper";
import Header from "../elements/Header";

const Guest = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Guest List</Text>
            <Text style={styles.sub}>People Invited</Text>
          </View>
             
          <View style={styles.tableBg}>
            <View style={styles.tableHeaderText}>
            <Text style={styles.textHe}>Mr. & Mrs. Malik Wedding</Text>
            </View>
            <Text style={styles.tableSubText}>People Invited</Text>
            <View style={styles.tableNameEmail}>
              <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.tableTextContainer} onPress={() => alert('Name and email clicked')}>
                  <Text style={styles.tableText}>Name and email</Text>
                </TouchableOpacity>
                <Divider />
            </View>
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
  sub: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tableBg: {
    margin: -5,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#555",
    borderRadius: 10,
  },
  tableNameEmail: {
    margin: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  tableHeaderText: {
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#777",
  },
  textHe: {
    alignItems: "center",
    marginBottom: 5,
    color: '#e6b800',
    fontWeight: "bold",

  },
  tableSubText: {
    marginTop: 20,
    color: "white",
    fontWeight: "bold",
  },
  tableTextContainer: {
    margin: 10,
  },
  tableText: {
    fontSize: 16,
  },
});

export default Guest;
