import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

const servicesData = [
  { id: '1', name: 'Service A', image: require('../assets/service1.png'), price: '$100' },
  { id: '2', name: 'Service B', image: require('../assets/service2.png'), price: '$150' },
  { id: '3', name: 'Service C', image: require('../assets/service1.png'), price: '$200' },
  { id: '4', name: 'Service D', image: require('../assets/service2.png'), price: '$250' },
  { id: '5', name: 'Service E', image: require('../assets/service1.png'), price: '$300' },
  { id: '6', name: 'Service F', image: require('../assets/service2.png'), price: '$350' },
];

const ServiceSP = () => {
  const [filteredServices, setFilteredServices] = useState(servicesData);

  const renderServiceItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service</Text>
      <ScrollView contentContainerStyle={styles.list}>
        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white', // Ensure the background color is consistent
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});

export default ServiceSP;
