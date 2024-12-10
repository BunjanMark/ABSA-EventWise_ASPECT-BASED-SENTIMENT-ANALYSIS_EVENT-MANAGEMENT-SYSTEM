import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { Provider as PaperProvider, Text, Button, TextInput } from "react-native-paper";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { sendPasswordResetCode, verifyPasswordResetCode } from "../../services/authServices"; // Update this service accordingly

const CustomIcon = ({ name, size, color }) => <Icon name={name} size={size} color={color} />;

const AccountRecovery = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function to display toast notifications
  const showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: "#444",
      textColor: "#fff",
      shadow: true,
      animation: true,
    });
  };

  // Function to handle sending reset code
  const handleSendCode = async () => {
    setLoading(true);
    setIsError(false);

    if (!email.trim()) {
      setIsError(true);
      showToast("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const result = await sendPasswordResetCode(email.trim());

      if (result?.message === "Email not found") {
        setIsError(true);
        showToast("Email not found");
      } else {
        setIsCodeSent(true);
        showToast("Reset code sent! Check your email.");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      showToast("An error occurred while sending the reset code.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle verifying the reset code
  const handleVerifyCode = async () => {
    setLoading(true);
    setIsError(false);
  
    if (!resetCode.trim()) {
      setIsError(true);
      showToast("Please enter the reset code.");
      setLoading(false);
      return;
    }
  
    try {
      const result = await verifyPasswordResetCode(email, resetCode);
  
      if (result?.message === "Invalid reset code") {
        setIsError(true);
        showToast("Invalid reset code.");
      } else {
        showToast("Code verified successfully!");
        navigation.navigate("PasswordResetScreen", {
          email: email.trim(),
          resetCode: resetCode.trim(),
        });
      }
    } catch (error) {
      console.error("Error verifying reset code:", error);
      showToast("An error occurred while verifying the reset code.");
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
        <SafeAreaView style={styles.formContainer}>
          <Text variant="headlineLarge" style={styles.titleText}>
            Forgot Password
          </Text>

          {/* Email Input */}
          {!isCodeSent && (
            <TextInput
              style={styles.inputStyle}
              mode="contained-tonal"
              label="Email"
              placeholder="Enter your registered email"
              value={email}
              error={isError}
              onChangeText={(text) => {
                setEmail(text);
                setIsError(false); // Clear error state on new input
              }}
              theme={{
                colors: {
                  primary: "#000",
                  text: "#000",
                  placeholder: "#000",
                  background: "#fff",
                },
              }}
              left={<TextInput.Icon icon={() => <CustomIcon name="email" size={24} color="#000" />} />}
            />
          )}

          {/* Reset Code Input */}
          {isCodeSent && (
            <>
              <TextInput
                style={styles.inputStyle}
                mode="contained-tonal"
                label="Enter Reset Code"
                placeholder="Enter the code sent to your email"
                value={resetCode}
                error={isError}
                onChangeText={(text) => {
                  setResetCode(text);
                  setIsError(false); // Clear error state on new input
                }}
                theme={{
                  colors: {
                    primary: "#000",
                    text: "#000",
                    placeholder: "#000",
                    background: "#fff",
                  },
                }}
                left={<TextInput.Icon icon={() => <CustomIcon name="key-variant" size={24} color="#000" />} />}
              />
            </>
          )}

          {/* Send Reset Code Button */}
          {!isCodeSent && (
            <Button
              loading={loading}
              disabled={loading}
              style={styles.buttonStyle}
              mode="contained"
              onPress={handleSendCode}
              labelStyle={styles.buttonLabel}
            >
              Send Reset Code
            </Button>
          )}

          {/* Verify Reset Code Button */}
          {isCodeSent && (
            <Button
              loading={loading}
              disabled={loading}
              style={styles.buttonStyle}
              mode="contained"
              onPress={handleVerifyCode}
              labelStyle={styles.buttonLabel}
            >
              Verify Reset Code
            </Button>
          )}

          {/* Go Back Button */}
          <Button
            style={styles.gobackButton}
            onPress={() => navigation.goBack()}
            labelStyle={styles.gobackLabel}
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
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: widthPercentageToDP("8%"),
    color: "#fff",
    marginBottom: heightPercentageToDP("5%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("3%"),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#C2B067",
    borderRadius: 5,
  },
  buttonStyle: {
    width: widthPercentageToDP("40%"),
    marginBottom: heightPercentageToDP("5%"),
    backgroundColor: "#C2B067",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  gobackButton: {
    width: widthPercentageToDP("40%"),
  },
  gobackLabel: {
    color: "#A97E00",
    fontWeight: "bold",
  },
});

export default AccountRecovery;
