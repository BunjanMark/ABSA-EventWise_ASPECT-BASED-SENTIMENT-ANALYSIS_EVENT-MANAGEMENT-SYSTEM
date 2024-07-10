import React, { useState } from "react";
import { SafeAreaView, ImageBackground, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import { Text, Button, TextInput, Menu, Divider, Provider as PaperProvider, Checkbox, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
  const navigator = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HideEntry, setHideEntry] = useState(true);
  const [role, setRole] = useState("");
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

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setRole(value);
    closeMenu();
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, { duration: Toast.durations.LONG });
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);

      if (username === "" || email === "" || password === "" || phoneNumber === "" || role === "" || !termsAccepted) {
        showToast("Please input required data and accept terms and conditions");
        setIsError(true);
        return;
      }

      if (password !== repassword) {
        showToast("Passwords do not match");
        setIsError(true);
        return;
      }

      const data = {
        username,
        email,
        password,
        role,
        phoneNumber,
        validID,      
      };

      const result = await fetch("apiurl", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resultJson = await result.json();
      if (resultJson.message != null) {
        showToast(resultJson?.message);
      } else {
        navigator.navigate("Login");
      }
    } catch (e) {
      console.error(e.toString());
      showToast("An error occurred");
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
    <ImageBackground source={require("../customerScreens/pictures/signupbg.png")} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : heightPercentageToDP("10%")}
        >
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.headerText}>Registration Form</Text>
            <PaperProvider>
              <View style={[styles.inputContainer, { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 2, borderColor: "#C2B067", borderRadius: 5, margin: 30, width: widthPercentageToDP("80%"), alignItems: "center", mode: "contained-tonal" }]}>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  contentStyle={{ backgroundColor: 'white', zIndex: 999, alignItems: "center" }}
                  anchor={
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={[styles.menuStyle, { backgroundColor: '#C2B067', padding: 1, borderRadius: 30, marginBottom: 5, marginTop: 5, margin: 18, zIndex: 999 }]}>
                        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", margin: 10 }}>
                          {selectedRole ?? 'User Role: '}
                        </Text>
                      </View>
                      <Icon name="arrow-down-bold-circle" size={40} color="white" style={{ marginLeft: 10 }} onPress={openMenu} />
                    </View>
                  }
                  style={{ position: 'absolute', zIndex: 999, top: 85, left: 90,}}
                >
                  <Menu.Item title="PLEASE SELECT" />
                  <Menu.Item onPress={() => handleRoleChange('SERVICE PROVIDER')} title="SERVICE PROVIDER" />
                  <Menu.Item onPress={() => handleRoleChange('CUSTOMER')} title="CUSTOMER" />
                </Menu>
              </View>
              <View style={[styles.inputStyleContainer, { borderRadius: 5, margin: 30, width: widthPercentageToDP("80%"), alignItems: "center", marginTop: -15 }]}>
              <TextInput
                style={styles.inputStyle}
                mode="contained-tonal"
                label="Username"
                placeholder="Enter your username"
                error={isError}
                value={username}
                onChangeText={(text) => setUsername(text)}
                theme={{
                  colors: { primary: "#fff", text: "#fff", placeholder: "#fff", background: "#fff" }
                }}
                left={<TextInput.Icon icon={() => <Icon name="account" size={24} color="#fff" />} />}
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
                  colors: { primary: "#fff", text: "#fff", placeholder: "#fff", background: "#fff" }
                }}
                left={<TextInput.Icon icon={() => <Icon name="email" size={24} color="#fff" />} />}
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
                  colors: { primary: "#fff", text: "#fff", placeholder: "#fff", background: "#fff" }
                }}
                left={<TextInput.Icon icon={() => <Icon name="phone" size={24} color="#fff" />} />}
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
                right={<TextInput.Icon onPress={toggleSecureEntry} icon={!HideEntry ? "eye" : "eye-off"} />}
                theme={{
                  colors: { primary: "#fff", text: "#fff", placeholder: "#fff", background: "#fff" }
                }}
                left={<TextInput.Icon icon={() => <Icon name="lock" size={24} color="#fff" />} />}
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
                right={<TextInput.Icon onPress={toggleSecureEntry} icon={!HideEntry ? "eye" : "eye-off"} />}
                theme={{
                  colors: { primary: "#fff", text: "#fff", placeholder: "#fff", background: "#fff" }
                }}
                left={<TextInput.Icon icon={() => <Icon name="lock" size={24} color="#fff" />} />}
              />
              <View style={styles.genderContainer}>
              <Text style={styles.Gender}>Gender    </Text>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'Male' && styles.selectedGender]}
                  onPress={() => setGender('Male')}
                >
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'Female' && styles.selectedGender]}
                  onPress={() => setGender('Female')}
                >
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dateContainer}>
              <Text style={styles.Date}>Date of Birth     </Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                maximumDate={new Date()}
                textColor="#000"
                theme={{ colors: { primary: "#FFC42B", text: "#000", placeholder: "#FFC42B", background: "#fff" }}}
              />
              </View>

              <TextInput
                style={styles.inputStyle}
                mode="contained-tonal"
                label="Enter Valid ID No."
                placeholder="Enter valid ID number"
                error={isError}
                value={validID}
                onChangeText={(text) => setvalidID(text)}
                theme={{ colors: { primary: "#fff", text: "#fff", placeholder: "#fff", background: "#fff" }}}
              />

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
                <Text style={{ color: "black" }}>Upload Valid ID Photo</Text>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>

              <View style={styles.checkboxContainer}>
              <View style={styles.checkboxWrapper}>
                  <Checkbox
                    status={termsAccepted ? 'checked' : 'unchecked'}
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    color="black"
                  />
                </View>
                <Text style={styles.checkboxText}>Agree with terms & conditions</Text>
              </View>
              <Button
                loading={loading}
                disabled={loading}
                style={styles.buttonStyle}
                mode="contained"
                onPress={handleRegistration}
                labelStyle={{ color: "white", fontWeight: "bold" }}
              >
                Register Account
              </Button>
              <SafeAreaView
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Already have an account?</Text>
                  <Button
                    labelStyle={{ color: "#A97E00" }}
                    loading={loading}
                    disabled={loading}
                    onPress={() => navigator.navigate("Login")}
                  >
                    Login Now
                  </Button>
                </SafeAreaView>
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
    marginTop: heightPercentageToDP("-2%"),
    color: "#A97E00",
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
    color: "#fff"
  },
  Date: {
    padding: 10,
    borderRadius: 30,
    width: "30%",
    alignItems: "center",
    color: "#fff"
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
    marginBottom: heightPercentageToDP("2%"),
    borderColor: "#FFC42B",
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#A97E00',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightPercentageToDP("2%"),
  },
  checkboxWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    borderRadius: 15, 
    padding: -5, 
    marginRight: 10
  },
  checkboxText: {
    color: "white",
  },
  buttonStyle: {
    width: widthPercentageToDP("80%"),
    height: heightPercentageToDP("6%"),
    marginBottom: heightPercentageToDP("2%"),
    backgroundColor: "#CEB64C",
  },
  menuStyle: {
    width: widthPercentageToDP("50%"),
  },
});

export default Register;

