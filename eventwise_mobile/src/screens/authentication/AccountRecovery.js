import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { Provider as PaperProvider, Text, Button } from "react-native-paper";
import { FormStyle } from "../customerScreens/Styles/FormStyle";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

const AccountRecovery = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const handlePasswordRecovery = async () => {
    if (!email) {
      showToast("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://phplaravel-1381591-5105067.cloudwaysapps.com/api/password/recovery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        showToast(data.message);
      } else {
        showToast(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      showToast("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../customerScreens/pictures/authbg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={[FormStyle.formContainer, { paddingTop: 100 }]}>
          <Text variant="headlineLarge" style={styles.headlineText}>
            Forgot
          </Text>
          <Text variant="headlineLarge" style={styles.headlineText}>
            Password
          </Text>
          <TextInput
            style={styles.inputStyle}
            mode="contained-tonal"
            label="Email"
            placeholder="Enter your email"
            inputMode="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            theme={{
              colors: {
                primary: "#000",
                text: "#000",
                placeholder: "#000",
                background: "#000",
              },
            }}
            left={<TextInput.Icon icon="email" />}
          />
          <Button
            loading={loading}
            disabled={loading}
            style={styles.buttonStyle}
            mode="contained-tonal"
            onPress={handlePasswordRecovery}
            labelStyle={{ color: "white", fontWeight: "bold" }}
          >
            Send
          </Button>
          <Button
            style={styles.goback}
            labelStyle={{ color: "#A97E00" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Go Back
          </Button>
        </SafeAreaView>
      </ImageBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  headlineText: {
    top: 70,
    fontWeight: "bold",
    fontSize: widthPercentageToDP("8%"),
    color: "#fff",
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("20%"),
    marginTop: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  buttonStyle: {
    marginBottom: 130,
    marginVertical: -120,
    width: widthPercentageToDP("40%"),
    backgroundColor: "#EEBA2B",
  },
  goback: {
    marginBottom: 250,
    marginVertical: -100,
  },
});

export default AccountRecovery;
