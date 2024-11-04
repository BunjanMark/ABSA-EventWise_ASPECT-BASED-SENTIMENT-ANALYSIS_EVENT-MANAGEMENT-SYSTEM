// src/components/ManualTestImage.js

import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ManualTestImage = () => {
  const signedURL =
    "https://ktmddejbdwjeremvbzbl.supabase.co/storage/v1/object/sign/capstone/test_uploads/cover_photo_1729017769972.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYXBzdG9uZS90ZXN0X3VwbG9hZHMvY292ZXJfcGhvdG9fMTcyOTAxNzc2OTk3Mi5qcGciLCJpYXQiOjE3MjkwMTc3NzMsImV4cCI6MTcyOTAyMTM3M30.qTlgikZlNtA8bmokpSSdcUZ1T3z_XcWEiYFNUdzyDPg";
  return (
    <View style={styles.container}>
      <Image source={{ uri: signedURL }} style={styles.testImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  testImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default ManualTestImage;
