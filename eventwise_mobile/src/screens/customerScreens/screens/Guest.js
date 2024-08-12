import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../elements/Header";

const Guest = () => {
  const route = useRoute();
  const { event } = route.params || {};
  const { eventName, guests } = event || {};

  const [guestList, setGuestList] = useState(guests);
  const [editingGuest, setEditingGuest] = useState(null);
  const [guestDetails, setGuestDetails] = useState({ name: "", email: "" });

  const handleEditGuest = (guest) => {
    setEditingGuest(guest.id);
    setGuestDetails({ name: guest.name, email: guest.email });
  };

  const handleSaveGuest = () => {
    setGuestList((prevList) =>
      prevList.map((guest) =>
        guest.id === editingGuest ? { ...guest, ...guestDetails } : guest
      )
    );
    setEditingGuest(null);
  };

  const handleCancelEdit = () => {
    setEditingGuest(null);
  };

  const handleDeleteGuest = (guestId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this guest?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteGuest(guestId) },
      ],
      { cancelable: false }
    );
  };

  const deleteGuest = (guestId) => {
    setGuestList((prevList) =>
      prevList.filter((guest) => guest.id !== guestId)
    );
  };

  const renderGuest = ({ item }) => (
    <View style={styles.guestContainer}>
      {editingGuest === item.id ? (
        <View>
          <TextInput
            style={styles.input}
            value={guestDetails.name}
            onChangeText={(text) =>
              setGuestDetails({ ...guestDetails, name: text })
            }
          />
          <TextInput
            style={styles.input}
            value={guestDetails.email}
            onChangeText={(text) =>
              setGuestDetails({ ...guestDetails, email: text })
            }
          />
          <View style={styles.actionsContainer}>
            <Button title="Save" onPress={handleSaveGuest} />
            <Button title="Cancel" onPress={handleCancelEdit} />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.guestName}>{item.name}</Text>
          <Text style={styles.guestEmail}>{item.email}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => handleEditGuest(item)}
              style={styles.actionButton}
            >
              <Icon name="edit" size={20} color="#e6b800" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteGuest(item.id)}
              style={styles.actionButton}
            >
              <Icon name="trash" size={20} color="#e6b800" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

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
              <Text style={styles.textHe}>{eventName}</Text>
            </View>
            <Text style={styles.tableSubText}>People Invited</Text>
            <View style={styles.tableNameEmail}>
              <FlatList
                data={guestList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderGuest}
              />
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
    resizeMode: "cover",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: "#e6b800",
    fontSize: 24,
    fontWeight: "bold",
  },
  sub: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
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
    color: "#e6b800",
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
  guestContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  guestName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  guestEmail: {
    fontSize: 16,
    color: "#555",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default Guest;
