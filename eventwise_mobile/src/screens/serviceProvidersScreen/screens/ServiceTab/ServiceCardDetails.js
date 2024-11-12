import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const ServiceDetails = ({ route }) => {
  const { service } = route.params;

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Service Name:</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {service.serviceName}
        </Text>
        {service.servicePhotoURL && (
          <Image
            source={{ uri: service.servicePhotoURL }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Service Category:
          </Text>
          <Text>{service.serviceCategory}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Service Price:
          </Text>
          <Text>{service.basePrice}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Availability Status:
          </Text>
          <Text>
            {service.availability_status === 1 ? "Available" : "Not Available"}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Requirements:
          </Text>
          <Text>{service.requirements}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Verified:</Text>
          <Text>{service.verified === 1 ? "Yes" : "No | pending"}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Service Description:
          </Text>
          <Text>{service.serviceDescription}</Text>
        </View>
        {/* <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Service Price:
          </Text>
          <Text>{service.servicePrice}</Text>
        </View> */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Service Features:
          </Text>
          <Text>{service.serviceFeatures}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceDetails;
