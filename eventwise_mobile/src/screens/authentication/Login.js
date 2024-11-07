import React, { useContext } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Platform,
  View,
  Alert,
} from "react-native";
import {
  Button,
  Provider as PaperProvider,
  TextInput,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { AuthContext } from "../../services/authContext";
import { getUser } from "../../services/authServices";

const Login = ({ navigation }) => {
  const navigator = useNavigation();
  const [HideEntry, setHideEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const CustomIcon = ({ name, size, color }) => {
    return <Icon name={name} size={size} color={color} />;
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const navigateBasedOnRole = (role) => {
    if (role === "service provider") {
        navigation.navigate('ServiceProviderStack');
    } else if (role === "admin") {
        // navigate to the admin page
    } else if (role === "client") {
        // navigate to the client page
    } else {
        // handle unknown role or default case
        showToast("Unknown role");
    }
};


const handleLogin = async () => {
  try {
      setLoading(true);
      
      if (username === "" || password === "") {
          showToast("Please input required data");
          setIsError(true);
          return false;
      }

      console.log("Attempting to login with:", { username, password });

      const response = await fetch('https://bc73-64-226-56-54.ngrok-free.app/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
          const errorResponse = await response.json();
          console.log("Error response:", errorResponse);
          showToast(`Error: ${errorResponse.error}`);
          return;
      }

      const result = await response.json();
      console.log("Login result:", result);
      showToast(result.message);

      if (result.message === "Login successful") {
          Alert.alert("Login Successful", "You have logged in successfully!", [
              { text: "OK" },
          ]);
          navigateBasedOnRole(result.user.role); // Pass the role to determine navigation
      }

  } catch (e) {
      console.error("Login error:", e);
      showToast("An error occurred during login.");
  } finally {
      setLoading(false);
  }
};




  

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  return (
    <PaperProvider>
      <ImageBackground
        source={require("../customerScreens/pictures/authbg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.formContainer}
            // keyboardVerticalOffset={
            //   Platform.OS === "ios" ? 0 : heightPercentageToDP("15%")
            // }
            keyboardVerticalOffset={heightPercentageToDP("-25%")}
            enabled
          >
            <SafeAreaView style={styles.welcome}>
              <Text
                variant="headlineMedium"
                style={{
                  fontSize: widthPercentageToDP("9%"),
                  color: "#fff",
                  marginBottom: heightPercentageToDP("15%"),
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                Login
              </Text>
            </SafeAreaView>

            <SafeAreaView
              style={{ ...styles.input, gap: heightPercentageToDP("1%") }}
            >
              <TextInput
                style={styles.inputStyle}
                mode="contained-tonal"
                label="Username"
                placeholder="Enter your username"
                inputMode="username"
                value={username}
                error={isError}
                onChangeText={(text) => {
                  setUsername(text);
                }}
                theme={{
                  colors: {
                    primary: "#000",
                    text: "#000",
                    placeholder: "#000",
                    label: "#000",
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon name="account" size={24} color="black" />
                    )}
                  />
                }
              />
              <TextInput
                mode="contained-tonal"
                style={styles.inputStyle}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={HideEntry}
                right={
                  <TextInput.Icon
                    onPress={toggleSecureEntry}
                    icon={() => (
                      <CustomIcon
                        name={!HideEntry ? "eye" : "eye-off"}
                        size={24}
                        color="white"
                      />
                    )}
                  />
                }
                theme={{
                  colors: {
                    primary: "#000",
                    text: "#000",
                    placeholder: "#000",
                    label: "#000",
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon name="lock" size={24} color="black" />
                    )}
                  />
                }
              />
              <View style={styles.forgotPasswordContainer}>
                <Text style={{ color: "black" }}>Forgot Password? </Text>
                <Button
                  labelStyle={{ color: "#EEBA2B" }}
                  onPress={() => {
                    navigator.navigate("AccountRecovery");
                  }}
                >
                  Recover
                </Button>
              </View>
              <Button
                style={{ ...styles.buttonStyle, backgroundColor: "#EEBA2B" }}
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                labelStyle={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: widthPercentageToDP("4%"),
                }}
              >
                Login
              </Button>

              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30,
                }}
              >
                <Text style={{ color: "black" }}>Not a member? </Text>
                <Button
                  mode="text"
                  labelStyle={{ color: "#EEBA2B" }}
                  onPress={() => {
                    navigator.navigate("Register");
                  }}
                  loading={loading}
                  disabled={loading}
                >
                  Register Now
                </Button>
              </SafeAreaView>
              <View>
                <Button
                  style={{ ...styles.goback }}
                  labelStyle={{ color: "#000" }}
                  onPress={() => {
                    navigator.goBack();
                  }}
                >
                  Go Back
                </Button>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: heightPercentageToDP("8%"),
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP("100%"),

    position: "absolute",
  },
  logo: {
    top: heightPercentageToDP("5%"),
  },
  welcome: {
    top: heightPercentageToDP("-5%"),
  },
  input: {
    marginBottom: heightPercentageToDP("12%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("3%"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  buttonStyle: {
    width: widthPercentageToDP("50%"),
    height: heightPercentageToDP("6%"),
    marginBottom: heightPercentageToDP("5%"),
    marginTop: heightPercentageToDP("-10%"),
    alignSelf: "center",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: heightPercentageToDP("10%"),
    marginTop: -15,
  },
});

export default Login;
