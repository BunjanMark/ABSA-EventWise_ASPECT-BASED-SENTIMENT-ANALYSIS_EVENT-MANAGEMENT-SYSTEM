import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator, Modal, } from 'react-native';
import Header from "../elements/Header";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Schedule = () => {
  const navigation = useNavigation();
  const swiper = useRef(null);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewEventPressed, setViewEventPressed] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  const filteredEvents = events.filter(event =>
    moment(event.event_date).isSame(value, 'day')
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
            <Text style={styles.headerText}>View Schedule</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={[styles.buttonView, { backgroundColor: '#C2B067' }]}
                onPress={() => navigation.navigate('Schedule')}
                >
                <Icon name="calendar-month" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.buttonSet, viewEventPressed ? { backgroundColor: '#C2B067' } : null]}
                onPress={() => navigation.navigate('SetSchedule')}
                >
                <Icon name="edit-calendar" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={(ind) => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={`week-${index}`}>
                {dates.map((item, dateIndex) => {
                  const isActive = value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableOpacity
                      key={`date-${dateIndex}`}
                      onPress={() => setValue(item.date)}
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: '#111',
                          borderColor: '#111',
                        },
                      ]}>
                      <Text style={[styles.itemWeekday, isActive && { color: '#fff' }]}>
                        {item.weekday}
                      </Text>
                      <Text style={[styles.itemDate, isActive && { color: '#fff' }]}>
                        {item.date.getDate()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={styles.subtitle}>{value.toDateString()}</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={styles.placeholder}>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((item) => (
                    <View key={item.event_id} style={styles.scheduleItemContainer}>
                      <Text style={styles.eventName}>{item.event_name}</Text>
                      <Text style={styles.scheduleDetails}>
                        {moment(item.event_date).format('YYYY-MM-DD')} {item.event_time}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noScheduleText}>No schedule available</Text>
                )}
              </View>
            )}
              <TouchableOpacity onPress={() => handleTabPress('Viewsched')}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>View Full Calendar</Text>
                </View>
              </TouchableOpacity>
          </View>
        </ScrollView>
             
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
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: -10,
    marginBottom: 15,
    alignSelf: "center",
    backgroundColor: 'rgba(194, 176, 103, 0.2)',
    borderRadius: 25,
    paddingLeft: 1,
    paddingRight: 1,
  },
  buttonView: {
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,  
  },
  buttonSet: {
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
    color: '#FFF',
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  scheduleItemContainer: {
    marginBottom: 10,
  },
  eventName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleDetails: {
    color: '#999',
    fontSize: 14,
  },
  noScheduleText: {
    color: '#999',
    fontSize: 16,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#FFC42B',
    borderColor: '#FFC42B',
    marginBottom: 60,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default Schedule;
