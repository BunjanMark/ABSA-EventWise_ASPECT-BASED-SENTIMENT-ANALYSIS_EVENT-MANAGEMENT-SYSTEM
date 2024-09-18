import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const { width } = Dimensions.get('window');

const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', day: 'Mon', location: 'CDO', date: '2024-07-01', status: 'Ongoing' },
  { id: '2', title: 'Elizabeth Birthday', day: 'Thu', location: 'CDO', date: '2024-08-12', status: 'Upcoming' },
  { id: '3', title: 'Class of 1979 Reunion', day: 'Wed', location: 'CDO', date: '2024-09-25', status: 'Upcoming' },
  { id: '4', title: 'Corporate Party', day: 'Tue', location: 'CDO', date: '2024-10-30', status: 'Upcoming' },
  { id: '5', title: 'Annual Gala', day: 'Fri', location: 'CDO', date: '2024-11-15', status: 'Upcoming' },
  { id: '6', title: 'New Year Celebration', day: 'Tue', location: 'CDO', date: '2024-12-31', status: 'Upcoming' },
  { id: '7', title: 'Music Festival', day: 'Sat', location: 'CDO', date: '2024-06-22', status: 'Ongoing' },
  { id: '8', title: 'Art Exhibition', day: 'Fri', location: 'CDO', date: '2024-07-05', status: 'Upcoming' },
];

const SchedSp = () => {
  const navigation = useNavigation();
  const currentWeek = Array.from({ length: 7 }).map((_, index) => moment().startOf('week').add(index, 'days'));
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleCreateSchedule = () => {
    Alert.alert('Create Schedule', 'Functionality to create a new schedule.');
  };

  const handleToggleReminder = () => {
    setIsReminderSet((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Week Section */}
        <View style={styles.weekSection}>
          <Text style={styles.weekText}>Calendar</Text>
          <Text style={styles.dateText}>{moment().format('D-MMMM YYYY')}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {currentWeek.map((day, index) => (
              <View key={index} style={styles.tableHeaderItem}>
                <Text style={styles.tableHeaderText}>{day.format('ddd')}</Text>
                <Text style={styles.tableHeaderDate}>{day.format('D')}</Text>
              </View>
            ))}
          </View>
          <View style={styles.tableBody}>
            {currentWeek.map((day, index) => (
              <View key={index} style={styles.tableCell}>
                {Math.random() > 0.5 && (
                  <View style={styles.event}>
                    <View style={styles.eventCircle} />
                    <Text style={styles.eventText}>1-5pm</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* My Schedule Section */}
        <View style={styles.allContainer}>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>My Schedule</Text>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Category</Text>
                <Ionicons name="chevron-down" size={16} color="black" />
              </TouchableOpacity>
            </View>
            {eventsData.map((event) => (
              <View key={event.id} style={styles.eventDateTextContainer}>
                <View style={styles.eventDateTextInnerContainer}>
                  <Text style={styles.eventDateText}>{moment(event.date).format('D MMM YYYY')}</Text>
                  <Text style={styles.ongoingEventText}>{event.status}</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <View style={styles.dayCircle}>
                    <Text style={styles.dayText}>{event.day}</Text>
                  </View>
                  <View style={styles.eventDetailsWrapper}>
                    <View style={styles.eventDetailsContainer}>
                      <View style={styles.eventDetails}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <View style={styles.eventLocation}>
                          <Ionicons name="location-outline" size={16} color="black" />
                          <Text style={styles.eventLocationText}>{event.location}</Text>
                        </View>
                        <View style={styles.profilePictures}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                              key={index}
                              source={require('../assets/pro_pic.png')} // Updated to use pro_pic.png
                              style={[styles.profilePicture, { left: index * 15 }]}
                            />
                          ))}
                        </View>
                      </View>
                      <View style={styles.reminderContainer}>
                        <Text style={styles.reminderText}>Set reminder</Text>
                        <TouchableOpacity onPress={handleToggleReminder}>
                          <Ionicons
                            name={isReminderSet ? 'toggle-sharp' : 'toggle-outline'}
                            size={24}
                            color={isReminderSet ? '#FFC42B' : 'gray'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  scrollContainer: {
    padding: 20,
  },
  weekSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeaderItem: {
    alignItems: 'center',
  },
  tableHeaderText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableHeaderDate: {
    color: 'black',
    fontSize: 14,
  },
  tableBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableCell: {
    width: width / 7,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  event: {
    backgroundColor: '#FFC42B',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCircle: {
    backgroundColor: '#FFF',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginBottom: 5,
  },
  eventText: {
    color: 'black',
    fontSize: 12,
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC42B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    color: 'black',
  },
  eventDateTextContainer: {
    marginBottom: 20,
  },
  eventDateTextInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDateText: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
  },
  ongoingEventText: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
  },
  scheduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCircle: {
    backgroundColor: '#FFC42B',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dayText: {
    color: 'black',
    fontSize: 20,
  },
  eventDetailsWrapper: {
    flex: 1,
  },
  eventDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  eventDetails: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventLocationText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5,
  },
  profilePictures: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: -10,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderText: {
    color: 'black',
    fontSize: 14,
  },
});

export default SchedSp;
