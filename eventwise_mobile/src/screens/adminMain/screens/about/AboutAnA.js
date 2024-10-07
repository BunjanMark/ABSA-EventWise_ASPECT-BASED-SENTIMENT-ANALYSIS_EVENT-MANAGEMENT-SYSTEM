import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/styles";

const AboutAnA = () => {
  const [active, setActive] = useState(0);

  const handleAnAPress = () => {
    setActive(0);
  };

  const handleEventWisePress = () => {
    setActive(1);
  };

  return (
    <View
      style={[
        styles.container,
        {
          display: "flex",
          flexDirection: "column",
          gap: 20,
          flex: 1,
          //   backgroundColor: "red",
          paddingBottom: 50,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              fontSize: 22,
            },
          ]}
        >
          About
        </Text>
      </View>
      <View>
        <View style={[styles.header, { justifyContent: "center", gap: 40 }]}>
          <Pressable onPress={handleAnAPress}>
            <Text
              style={[
                styles.title,
                {
                  color: active === 0 ? "#EFBF04" : "black",
                  textDecorationLine: active === 1 ? "none" : "underline",
                },
              ]}
            >
              A&A Events
            </Text>
          </Pressable>
          <Pressable onPress={handleEventWisePress}>
            <Text
              style={[
                styles.title,
                {
                  color: active === 1 ? "#EFBF04" : "black",
                  textDecorationLine: active === 0 ? "none" : "underline",
                },
              ]}
            >
              EventWise
            </Text>
          </Pressable>
        </View>
        <View style={[{ position: "relative" }]}>
          {active === 0 ? (
            <View style={styles.active}>
              <Text
                style={[
                  styles.subtitle,
                  styles.text,
                  { textAlign: "center", marginBottom: 20 },
                ]}
              >
                A&A Events is committed to providing the best possible
                experience for both customers and service providers. I am
                Dedicated to creating a welcoming inclusive atmosphere that
                celebrates diversity & promotes cultural exchange. With
                continuing to set the standard for event organization and
                curation in the world event community
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.subtitle,
                styles.text,
                { textAlign: "center", marginBottom: 20 },
              ]}
            >
              EventWise is lorem ipsum dolor sit amet, consectetuer adipiscing
              elit. Aenean commodo ligula eget dolor.
            </Text>
          )}
        </View>
      </View>
      {/* footer */}
      <View
        style={[
          styles.footer,
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgb(245,245,245)",
            paddingVertical: 10,
            borderTopWidth: 0.2,
            borderBlockColor: "gray",
          },
        ]}
      >
        <View style={{ borderBottomWidth: 1, borderBottomColor: "black" }} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "black",
            marginTop: 5,
          }}
        >
          EventWise &copy; 2024
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "black",
            marginBottom: 5,
            height: 50,
          }}
        >
          Powered by EventTech
        </Text>
      </View>
    </View>
  );
};

export default AboutAnA;
