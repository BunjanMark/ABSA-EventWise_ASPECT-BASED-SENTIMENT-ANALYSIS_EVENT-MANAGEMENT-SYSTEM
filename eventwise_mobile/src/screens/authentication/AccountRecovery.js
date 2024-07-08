import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Provider as PaperProvider, Text, Button } from "react-native-paper";
import { FormStyle } from "../../components/customerScreens/Styles/FormStyle";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-root-toast";

const CustomIcon = ({ name, size, color }) => {
  return <Icon name={name} size={size} color={color} />;
};

const AccountRecovery = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  
  const handleSendCode = async () => {
    try {
      setLoading(!loading);
      if (email === "") {
        showToast("Please enter your email");
        setIsError(true);
        return false;
      }
      
      const data = {
        email,
      };

      const result = await fetchServices.postData(url, data);

      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigator.navigate("CodeVerificationScreen", { email });
      }
    } catch (e) {
      console.error(e.toString());
      showToast("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../customerScreens/pictures/forgotbg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={FormStyle.formContainer}>
            <Text
              variant="headlineLarge"
              style={{
                top: 250,
                fontWeight: "bold",
                fontSize: widthPercentageToDP("8%"),
                color: "#A97E00"
              }}
            >
              FORGOT PASSWORD
            </Text>
            <TextInput
              style={{ ...styles.inputStyle }}
              mode="contained-tonal"
              label="Email"
              placeholder="Enter your email"
              inputMode="email"
              value={email}
              error={isError}
              onChangeText={(text) => setEmail(text)}
              theme={{
                colors: {
                  primary: "#fff",
                  text: "#fff",
                  placeholder: "#fff",
                  background: "#fff",
                },
              }}
              left={<TextInput.Icon icon={() => <CustomIcon name="email" size={24} color="white" />} />}
            />
            <Button
              loading={loading}
              disabled={loading}
              style={{ ...styles.buttonStyle, backgroundColor: "#CEB64C" }}
              mode="contained-tonal"
              onPress={handleSendCode}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              >
              Send 
            </Button>
            <Button
              style={{ ...styles.goback }}
              labelStyle={{ color: "#A97E00" }}
              onPress={() => {
                navigator.goBack();
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
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("20%"),
    marginTop: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  buttonStyle: {
    marginBottom: 130,
    marginVertical: -130,
  },
  goback: {
    marginBottom: 250,
    marginVertical: -100,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default AccountRecovery;