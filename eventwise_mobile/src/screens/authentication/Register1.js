import React, { useState } from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  Divider,
  Provider as PaperProvider,
  Checkbox,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { signup } from "../../services/authServices";

const Register1 = () => {
  const navigator = useNavigation();
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [repassword, setRepassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState("");
  const [validID, setvalidID] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [image, setImage] = React.useState(null);

  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);

    closeMenu();
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, { duration: Toast.durations.LONG });
  };

  const handleRegistration = async () => {
    // Reset error state before starting validation
    setIsError(false);

    // Form validation
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      repassword.trim() === "" ||
      phoneNumber.trim() === "" ||
      !selectedRole ||
      !termsAccepted
    ) {
      showToast(
        "Please fill in all required fields and accept the terms and conditions"
      );
      setIsError(true);
      setLoading(false);
      return;
    }

    if (password !== repassword) {
      showToast("Passwords do not match");
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      // setLoading(true);

      // const data = {
      //   name: username,
      //   email,
      //   password,
      //   role_id: selectedRole,
      //   phoneNumber,
      //   dateOfBirth: date,
      //   gender,
      //   validID,
      // };

      // const response = await fetch("apiurl", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // const resultJson = await response.json();
      const roleMapping = {
        "SERVICE PROVIDER": "3",
        CUSTOMER: "2",
      };
      const data = {
        name: username,
        email,
        password,
        role_id: roleMapping[selectedRole],
        phoneNumber,
        dateOfBirth: date,
        gender,
        validID,
      };
      const result = await signup(data);

      console.log("result", result);
      showToast(result?.message);

      if (result?.message != null) {
        showToast(result?.message);
      } else {
        showToast(result?.error);
      }

      // if (result.message != null) {
      //   showToast(result?.message);
      // } else {
      //   navigator.navigate("Login");
      // }

      // if (response.ok) {
      //   // Handle success response
      //   showToast(resultJson?.message || "Registration successful!");
      //   navigator.navigate("Login");
      // } else {
      //   // Handle failure response
      //   showToast(
      //     resultJson?.message || "Registration failed. Please try again."
      //   );
      //   setIsError(true);
      // }
    } catch (error) {
      console.error("Registration Error:", error);

      // showToast("Email already exists. Please try again.");

      setIsError(true);
      console.log("data:" + JSON.stringify(data));
    } finally {
      setLoading(false);
    }
  };

  const handleDateConfirm = (date) => {
    setDate(date);
    setDatePickerVisibility(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground
      source={require("../customerScreens/pictures/authbg.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 0 : heightPercentageToDP("10%")
          }
        >
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.headerText}>Registration</Text>
            <Text style={styles.headerTe}>Form</Text>

            <PaperProvider>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: 2,
                    borderColor: "#C2B067",
                    borderRadius: 5,
                    margin: 30,
                    width: widthPercentageToDP("80%"),
                    alignItems: "center",
                    mode: "contained-tonal",
                  },
                ]}
              >
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  contentStyle={styles.menuContent}
                  anchor={
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={[
                          styles.menuStyle,
                          {
                            backgroundColor: "#C2B067",
                            padding: 1,
                            borderRadius: 30,
                            marginBottom: 5,
                            marginTop: 5,
                            margin: 18,
                            zIndex: 999,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: 10,
                          }}
                        >
                          {selectedRole ?? "User Role: "}
                        </Text>
                      </View>
                      <Icon
                        name="arrow-down-bold-circle"
                        size={40}
                        color="#000"
                        style={{ marginLeft: 10 }}
                        onPress={openMenu}
                      />
                    </View>
                  }
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    top: 85,
                    left: 90,
                  }}
                >
                  <View style={styles.menuItemContainer}>
                    <Text style={styles.menuTitle}>PLEASE SELECT</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.menuItemButton,
                      selectedRole === "SERVICE PROVIDER" &&
                        styles.selectedMenuItemButton,
                    ]}
                    onPress={() => handleRoleChange("SERVICE PROVIDER")}
                  >
                    <Text style={styles.menuItemText}>SERVICE PROVIDER</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.menuItemButton,
                      selectedRole === "CUSTOMER" &&
                        styles.selectedMenuItemButton,
                    ]}
                    onPress={() => handleRoleChange("CUSTOMER")}
                  >
                    <Text style={styles.menuItemText}>CUSTOMER</Text>
                  </TouchableOpacity>
                </Menu>
              </View>
              <View
                style={[
                  styles.inputStyleContainer,
                  {
                    borderRadius: 5,
                    margin: 30,
                    width: widthPercentageToDP("80%"),
                    alignItems: "center",
                    marginTop: -15,
                  },
                ]}
              >
                <TextInput
                  style={styles.inputStyle}
                  mode="contained-tonal"
                  label="Username"
                  placeholder="Enter your username"
                  error={isError}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      placeholder: "#000",
                      background: "#000",
                    },
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <Icon name="account" size={24} color="#000" />
                      )}
                    />
                  }
                />

                <TextInput
                  style={styles.inputStyle}
                  mode="contained-tonal"
                  label="Email"
                  placeholder="Enter your email"
                  inputMode="email"
                  value={email}
                  error={isError}
                  onChangeText={(text) => setEmail(text)}
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      placeholder: "#000",
                      background: "#000",
                    },
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => <Icon name="email" size={24} color="#000" />}
                    />
                  }
                />
                <TextInput
                  style={styles.inputStyle}
                  mode="contained-tonal"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  error={isError}
                  onChangeText={(text) => setPhoneNumber(text)}
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      placeholder: "#000",
                      background: "#000",
                    },
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => <Icon name="phone" size={24} color="#000" />}
                    />
                  }
                />
                <TextInput
                  mode="contained-tonal"
                  style={styles.inputStyle}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={HideEntry}
                  error={isError}
                  right={
                    <TextInput.Icon
                      onPress={toggleSecureEntry}
                      icon={!HideEntry ? "eye" : "eye-off"}
                    />
                  }
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      placeholder: "#000",
                      background: "#000",
                    },
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => <Icon name="lock" size={24} color="#000" />}
                    />
                  }
                />
                <TextInput
                  mode="contained-tonal"
                  style={styles.inputStyle}
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={repassword}
                  onChangeText={(text) => setRepassword(text)}
                  secureTextEntry={HideEntry}
                  error={isError}
                  right={
                    <TextInput.Icon
                      onPress={toggleSecureEntry}
                      icon={!HideEntry ? "eye" : "eye-off"}
                    />
                  }
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      placeholder: "#000",
                      background: "#000",
                    },
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => <Icon name="lock" size={24} color="#000" />}
                    />
                  }
                />

                <Button
                  loading={loading}
                  disabled={loading}
                  style={styles.buttonStyle}
                  mode="contained"
                  onPress={() => navigator.navigate("Register2")}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                >
                  Next
                </Button>
              </View>
            </PaperProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    alignItems: "center",
    paddingVertical: heightPercentageToDP("5%"),
  },
  headerText: {
    marginTop: heightPercentageToDP("4%"),
    color: "#fff",
    fontWeight: "bold",
    fontSize: widthPercentageToDP("10%"),
  },
  headerTe: {
    marginTop: heightPercentageToDP("1%"),
    marginBottom: heightPercentageToDP("5%"),
    color: "#fff",
    fontWeight: "bold",
    fontSize: widthPercentageToDP("10%"),
  },
  inputStyle: {
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#C2B067",
  },
  menuContent: {
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
    width: 250,
    marginLeft: -50,
  },
  menuItemContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
  menuTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  menuItemButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C2B067",
    marginVertical: 5,
    width: 200,
  },
  selectedMenuItemButton: {
    backgroundColor: "#C2B067",
  },
  menuItemText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFC42B",
    borderRadius: 30,
    marginBottom: 10,
    width: widthPercentageToDP("80%"),
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthPercentageToDP("80%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  Gender: {
    padding: 10,
    borderRadius: 30,
    width: "23%",
    alignItems: "center",
    color: "#fff",
  },
  Date: {
    padding: 10,
    borderRadius: 30,
    width: "30%",
    alignItems: "center",
    color: "#fff",
  },
  genderButton: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    width: "30%",
    alignItems: "center",
  },
  selectedGender: {
    backgroundColor: "#A97E00",
  },
  genderText: {
    color: "white",
    fontWeight: "bold",
  },
  datePickerButton: {
    width: widthPercentageToDP("55%"),
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: heightPercentageToDP("2%"),
  },
  datePickerText: {
    color: "white",
    fontWeight: "bold",
  },
  uploadButton: {
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#FFC42B",
    width: "60%",
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightPercentageToDP("3%"),
  },
  checkboxWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    borderRadius: 12,
    marginRight: 10,
    height: 23,
  },
  checkboxText: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    width: widthPercentageToDP("30%"),
    height: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#EEBA2B",
  },
  menuStyle: {
    width: widthPercentageToDP("50%"),
  },
});

export default Register1;
