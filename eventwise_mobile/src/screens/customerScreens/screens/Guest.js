import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button } from 'react-native';
import { Divider } from "react-native-paper";
import Header from "../elements/Header";

const Guest = () => {
  const [guests, setGuests] = useState([
    { id: 1, name: 'name', email: 'name@example.com' },
    { id: 2, name: 'name', email: 'name@example.com' },
    { id: 3, name: 'name', email: 'name@example.com' },
    { id: 4, name: 'name', email: 'name@example.com' },
  ]);

  const [editingGuest, setEditingGuest] = useState(null);

  const handleNameChange = (id, newName) => {
    setGuests(guests.map(guest => guest.id === id ? { ...guest, name: newName } : guest));
  };

  const handleEmailChange = (id, newEmail) => {
    setGuests(guests.map(guest => guest.id === id ? { ...guest, email: newEmail } : guest));
  };

  const handleDelete = (id) => {
    setGuests(guests.filter(guest => guest.id !== id));
    setEditingGuest(null);
  };

  const handleEditClick = (guest) => {
    setEditingGuest(guest.id);
  };

  const handleCancelEdit = () => {
    setEditingGuest(null);
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
            <Text style={styles.headerText}>Guest List</Text>
            <Text style={styles.sub}>People Invited</Text>
          </View>
             
          <View style={styles.tableBg}>
            <View style={styles.tableHeaderText}>
              <Text style={styles.textHe}>The Booked Event (People To Invite) </Text>
            </View>
            <Text style={styles.tableSubText}>People Invited</Text>
            <View style={styles.tableNameEmail}>
              {guests.map(guest => (
                <View key={guest.id} style={styles.tableTextContainer}>
                  {editingGuest === guest.id ? (
                    <View>
                      <TextInput
                        style={styles.tableText}
                        value={guest.name}
                        onChangeText={text => handleNameChange(guest.id, text)}
                      />
                      <TextInput
                        style={styles.tableText}
                        value={guest.email}
                        onChangeText={text => handleEmailChange(guest.id, text)}
                      />
                      <Button
                        title="Save"
                        onPress={() => handleCancelEdit()}
                        color="#27ae60"
                      />
                      <Button
                        title="Delete"
                        onPress={() => handleDelete(guest.id)}
                        color="#e74c3c"
                      />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => handleEditClick(guest)}>
                      <Text style={styles.tableText}>{guest.name}</Text>
                      <Text style={styles.tableText}>{guest.email}</Text>
                    </TouchableOpacity>
                  )}
                  <Divider />
                </View>
              ))}
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
    marginVertical: 10,
  },
  tableText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Guest;
