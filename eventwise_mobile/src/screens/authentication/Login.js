import React, { useContext } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  Platform,
  View,
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

  const navigateBasedOnRole = (role_id) => {
    try {
      if (role_id === 2) {
        console.log("Navigating to CustomCustomerStack...");
        navigation.navigate("CustomCustomerStack");
      } else if (role_id === 1) {
        console.log("Navigating to AdminStack...");
        navigation.navigate("AdminStack");
      } else if (role_id === 3) {
        console.log("Navigating to GuestStack...");
        navigation.navigate();
      } else {
        showToast("Role not recognized");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      showToast("An error occurred during navigation.");
    }
  };
  const handleLogin = async () => {
    // try {
    //   setLoading(!loading);

    //   if (username === "" || password === "") {
    //     showToast("Please input required data");
    //     setIsError(true);
    //     return false;
    //   }

    //   const result = await signIn(username, password);
    //   // showToast(result?.message);
    //   showToast(result?.message);

    //   const user = await getUser();
    //   console.log(user);

    //   // Navigate vased on user's role
    //   navigateBasedOnRole(user.role_id);

    //   if (result.message != null) {
    //     showToast(result?.message);
    //   } else {
    //     navigator.navigate("Tabs");
    //   }
    // } catch (e) {
    //   console.error("Login error:", error);
    //   showToast("An error occurred during login.");
    // } finally {
    //   setLoading(false);
    // }
    navigator.navigate("ServiceProviderStack");
   
  };

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  return (
    <PaperProvider>
      <ImageBackground
        source={require("../customerScreens/pictures/loginbg.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.formContainer}
            // keyboardVerticalOffset={
            //   Platform.OS === "ios" ? 0 : heightPercentageToDP("15%")
            // }
            keyboardVerticalOffset={heightPercentageToDP("15%")}
            enabled
          >
            <SafeAreaView style={styles.welcome}>
              <Text
                variant="headlineMedium"
                style={{
                  fontSize: widthPercentageToDP("9%"),
                  color: "#A97E00",
                  marginBottom: heightPercentageToDP("1%"),
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
                    primary: "#fff",
                    text: "#fff",
                    placeholder: "#fff",
                    label: "#fff",
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon name="account" size={24} color="white" />
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
                    primary: "#fff",
                    text: "#fff",
                    placeholder: "#fff",
                    label: "#fff",
                  },
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon name="lock" size={24} color="white" />
                    )}
                  />
                }
              />
              <View style={styles.forgotPasswordContainer}>
                <Text style={{ color: "white" }}>Forgot Password? </Text>
                <Button
                  labelStyle={{ color: "#A97E00" }}
                  onPress={() => {
                    navigator.navigate("AccountRecovery");
                  }}
                >
                  Recover
                </Button>
              </View>
              <Button
                style={{ ...styles.buttonStyle, backgroundColor: "#CEB64C" }}
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                labelStyle={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: widthPercentageToDP("4%"),
                }}
              >
                Log In
              </Button>

              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30,
                }}
              >
                <Text style={{ color: "white" }}>Not a member? </Text>
                <Button
                  mode="text"
                  labelStyle={{ color: "#A97E00" }}
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
                  labelStyle={{ color: "#A97E00" }}
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
    // paddingBottom: heightPercentageToDP("-1%"),
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
