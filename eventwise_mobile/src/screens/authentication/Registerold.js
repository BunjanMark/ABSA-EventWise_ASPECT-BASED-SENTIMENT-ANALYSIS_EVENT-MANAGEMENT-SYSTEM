import React, { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  Provider as PaperProvider,
  Checkbox,
} from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { signup } from "../../services/authServices";

import { useNavigation } from "@react-navigation/native";
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Register = () => {
  const [step, setStep] = useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [HideEntry, setHideEntry] = useState(true);
  const [HideEntry2, setHideEntry2] = useState(true);
  const handleNextStep = () => {
    setStep(2);
  };
  const CustomIcon = ({ name, size, color }) => {
    return <Icon name={name} size={size} color={color} />;
  };
  const handlePreviousStep = () => {
    setStep(1);
  };
  const toggleSecureEntry = () => {
    setHideEntry(!HideEntry);
  };
  const toggleSecureEntry2 = () => {
    setHideEntry2(!HideEntry2);
  };
  const handleDateConfirm = (date, setFieldValue) => {
    setFieldValue("dateOfBirth", date);
    setDatePickerVisibility(false);
  };

  const openDatePicker = () => setDatePickerVisibility(true);

  const openRoleMenu = () => setRoleMenuVisible(true);
  const closeRoleMenu = () => setRoleMenuVisible(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (values) => {
    try {
      setIsSubmitting(true);
      signup(values)
        .then((response) => {
          Toast.show("Registration successful", {
            duration: Toast.durations.LONG,
          });
          setIsSubmitting(false);
        })
        .catch((error) => {
          Toast.show("Registration failed", { duration: Toast.durations.LONG });
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error("Registration Error:", error);
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
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContainer}
          >
            <Text
              variant="headlineMedium"
              style={{
                fontSize: widthPercentageToDP("9%"),
                color: "#fff",
                marginBottom: heightPercentageToDP("15%"),
                fontWeight: "bold",
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              Registration Form
            </Text>
            <PaperProvider>
              <Formik
                initialValues={{
                  fullName: "",
                  gender: "",
                  dateOfBirth: new Date(),
                  email: "",
                  phoneNumber: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                  selectedRole: null,
                  termsAccepted: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    {step === 1 ? (
                      <View style={styles.stepContainer}>
                        <TextInput
                          label="Full Name"
                          value={values.fullName}
                          onChangeText={handleChange("fullName")}
                          onBlur={handleBlur("fullName")}
                          style={styles.input}
                          mode="outlined"
                        />
                        {touched.fullName && errors.fullName && (
                          <Text style={styles.errorText}>
                            {errors.fullName}
                          </Text>
                        )}

                        <Menu
                          visible={roleMenuVisible}
                          onDismiss={closeRoleMenu}
                          anchor={
                            <TouchableOpacity onPress={openRoleMenu}>
                              <TextInput
                                label="Gender"
                                value={values.gender}
                                editable={false}
                                style={[styles.input]}
                                mode="outlined"
                              />
                            </TouchableOpacity>
                          }
                          contentStyle={{ width: 200, bottom: 220, right: 30 }}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Menu.Item
                              onPress={() => {
                                setFieldValue("gender", "Male"),
                                  setRoleMenuVisible(false);
                              }}
                              title="Male"
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                            <Menu.Item
                              onPress={() => {
                                setFieldValue("gender", "Female"),
                                  setRoleMenuVisible(false);
                              }}
                              title="Female"
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                            <Menu.Item
                              onPress={() => {
                                setFieldValue("gender", "Other"),
                                  setRoleMenuVisible(false);
                              }}
                              title="Other"
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </View>
                        </Menu>
                        {touched.gender && errors.gender && (
                          <Text style={styles.errorText}>{errors.gender}</Text>
                        )}

                        <TouchableOpacity onPress={openDatePicker}>
                          <TextInput
                            label="Date of Birth"
                            value={values.dateOfBirth.toLocaleDateString()}
                            editable={false}
                            style={styles.input}
                            mode="outlined"
                          />
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={(date) =>
                            handleDateConfirm(date, setFieldValue)
                          }
                          onCancel={() => setDatePickerVisibility(false)}
                        />
                        {touched.dateOfBirth && errors.dateOfBirth && (
                          <Text style={styles.errorText}>
                            {errors.dateOfBirth}
                          </Text>
                        )}

                        <TextInput
                          label="Email Address"
                          value={values.email}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          style={styles.input}
                          mode="outlined"
                        />
                        {touched.email && errors.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}

                        <TextInput
                          label="Phone Number"
                          value={values.phoneNumber}
                          onChangeText={handleChange("phoneNumber")}
                          onBlur={handleBlur("phoneNumber")}
                          style={styles.input}
                          mode="outlined"
                          keyboardType="phone-pad"
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                          <Text style={styles.errorText}>
                            {errors.phoneNumber}
                          </Text>
                        )}

                        <Button
                          mode="contained"
                          onPress={handleNextStep}
                          style={{
                            width: widthPercentageToDP("50%"),
                            height: heightPercentageToDP("6%"),
                            marginBottom: heightPercentageToDP("5%"),
                            marginTop: heightPercentageToDP("2%"),
                            alignSelf: "center",
                            backgroundColor: "#EEBA2B",
                          }}
                        >
                          Next
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() => {
                            navigation.goBack();
                          }}
                          style={{
                            width: widthPercentageToDP("50%"),
                            height: heightPercentageToDP("6%"),
                            marginBottom: heightPercentageToDP("5%"),
                            marginTop: heightPercentageToDP("-3%"),
                            alignSelf: "center",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <Text style={styles.buttonText}>Go back</Text>
                        </Button>
                      </View>
                    ) : (
                      <View style={styles.stepContainer}>
                        <TextInput
                          label="Username"
                          value={values.username}
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          style={styles.input}
                          mode="outlined"
                        />
                        {touched.username && errors.username && (
                          <Text style={styles.errorText}>
                            {errors.username}
                          </Text>
                        )}

                        <TextInput
                          label="Password"
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          style={styles.input}
                          mode="outlined"
                          secureTextEntry={HideEntry2}
                          right={
                            <TextInput.Icon
                              onPress={toggleSecureEntry2}
                              icon={() => (
                                <CustomIcon
                                  name={!HideEntry2 ? "eye" : "eye-off"}
                                  size={24}
                                  color="black"
                                />
                              )}
                            />
                          }
                        />
                        {touched.password && errors.password && (
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        )}

                        <TextInput
                          label="Confirm Password"
                          value={values.confirmPassword}
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          style={styles.input}
                          mode="outlined"
                          secureTextEntry={HideEntry}
                          right={
                            <TextInput.Icon
                              onPress={toggleSecureEntry}
                              icon={() => (
                                <CustomIcon
                                  name={!HideEntry ? "eye" : "eye-off"}
                                  size={24}
                                  color="black"
                                />
                              )}
                            />
                          }
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <Text style={styles.errorText}>
                            {errors.confirmPassword}
                          </Text>
                        )}

                        <Menu
                          visible={roleMenuVisible}
                          onDismiss={closeRoleMenu}
                          anchor={
                            <TouchableOpacity onPress={openRoleMenu}>
                              <TextInput
                                label="User Role"
                                value={values.selectedRole}
                                editable={false}
                                style={styles.input}
                                mode="outlined"
                              />
                            </TouchableOpacity>
                          }
                          contentStyle={{ width: 200, bottom: 220, right: 30 }}
                        >
                          <Menu.Item
                            onPress={() => {
                              setFieldValue("selectedRole", "Service Provider");
                              setRoleMenuVisible(false); // Close the menu when selecting 'Service Provider'
                            }}
                            title="Service Provider"
                          />
                          <Menu.Item
                            onPress={() => {
                              setFieldValue("selectedRole", "Customer");
                              setRoleMenuVisible(false); // Close the menu when selecting 'Customer'
                            }}
                            title="Customer"
                          />
                        </Menu>

                        {touched.selectedRole && errors.selectedRole && (
                          <Text style={styles.errorText}>
                            {errors.selectedRole}
                          </Text>
                        )}

                        <View style={styles.checkboxContainer}>
                          <Checkbox
                            status={
                              values.termsAccepted ? "checked" : "unchecked"
                            }
                            onPress={() =>
                              setFieldValue(
                                "termsAccepted",
                                !values.termsAccepted
                              )
                            }
                          />
                          <Text>I agree to the Terms and Conditions</Text>
                        </View>
                        {touched.termsAccepted && errors.termsAccepted && (
                          <Text style={styles.errorText}>
                            {errors.termsAccepted}
                          </Text>
                        )}

                        <View
                          style={[
                            styles.buttonContainer,
                            {
                              alignSelf: "center",
                              flexDirection: "column",
                              bottom: 15,
                              justifyContent: "space-around",
                              alignItems: "center",
                            },
                          ]}
                        >
                          <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={{
                              width: widthPercentageToDP("50%"),
                              height: heightPercentageToDP("6%"),
                              // marginBottom: heightPercentageToDP("5%"),
                              marginTop: heightPercentageToDP("2%"),
                              alignSelf: "center",
                              backgroundColor: "#EEBA2B",
                            }}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                          <Button
                            mode="outlined"
                            onPress={handlePreviousStep}
                            style={[styles.button, { width: "100%" }]}
                          >
                            Back
                          </Button>
                        </View>
                      </View>
                    )}
                  </>
                )}
              </Formik>
            </PaperProvider>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
    paddingTop: 150,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  stepContainer: {
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});

export default Register;
