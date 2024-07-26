import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars';

const Viewsched = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    try {
      const eventsData = await getEvents();
      const formattedData = eventsData.reduce((acc, item) => {
        const date = item.event_date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({
          id: item.event_id,
          name: item.event_name,
          data: item.event_description,
          time: item.event_time,
          location: item.event_location,
          organizer: item.organizer,
        });
        return acc;
      }, {});
      setItems(formattedData);
    } catch (error) {
      console.error('Error fetching events data:', error);
    }
  };

  const handleItemPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const renderEmptyData = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Schedule Available</Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
          <AntDesign name="arrowleft" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Schedule</Text>
        <Text style={styles.text}>View your schedule below</Text>
        <SafeAreaView style={styles.agendaContainer}>
          <Agenda
            items={items}
            renderItem={(item) => (
              <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.time}</Text>
              </TouchableOpacity>
            )}
            renderEmptyData={renderEmptyData}
          />
        </SafeAreaView>

        {/* Modal for Event Details */}
        {selectedEvent && (
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
                <Text style={styles.modalText}>Description: {selectedEvent.data}</Text>
                <Text style={styles.modalText}>Time: {selectedEvent.time}</Text>
                <Text style={styles.modalText}>Location: {selectedEvent.location}</Text>
                <Text style={styles.modalText}>Organizer: {selectedEvent.organizer}</Text>
                <Pressable style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  agendaContainer: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Viewsched;