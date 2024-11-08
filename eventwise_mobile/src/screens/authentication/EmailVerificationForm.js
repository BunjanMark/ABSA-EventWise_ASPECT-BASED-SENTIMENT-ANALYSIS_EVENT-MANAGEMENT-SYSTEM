import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Menu,
  Provider as PaperProvider,
  Checkbox,
} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendVerificationEmail } from "../../services/authServices";
const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  verificationCode: Yup.string()
    .min(6, "Code must be 6 characters")
    .required("Verification code is required"),
});

export default function EmailVerificationForm() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "", verificationCode: "" },
      validationSchema: emailValidationSchema,
      onSubmit: async (values) => {
        try {
          if (emailVerificationSent) {
            // Submit the verification code
            const verificationResult = await verifyCode(
              values.email,
              values.verificationCode
            );
            if (verificationResult.success) {
              alert("Email verified successfully!");
            } else {
              alert("Invalid verification code.");
            }
          }
        } catch (error) {
          console.error(error);
          alert("Something went wrong.");
        }
      },
    });

  // Function to trigger email verification process
  // Triggered when user clicks "Verify email" button
  const handleVerifyEmail = async () => {
    try {
      const response = await sendVerificationEmail(values.email);
      if (response.message) {
        setIsCodeSent(true);
        alert("Verification code sent to your email.");
      } else {
        alert("Error sending verification code.");
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      alert("Failed to send verification email.");
    }
  };

  // Triggered when the user submits the verification code
  const verifyCode = async (email, code) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email-code`, {
        email,
        code,
      });
      return response.data;
    } catch (error) {
      console.error("Verification error:", error);
      throw new Error("Verification failed");
    }
  };

  return (
    <View>
      <TextInput
        label="Email Address"
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        style={styles.input}
        mode=" "
      />
      {touched.email && errors.email && (
        <Text style={styles.errorText}>{errors.email}</Text>
      )}

      <TouchableOpacity
        onPress={handleVerifyEmail}
        style={[
          {
            backgroundColor: "#EEBA2B",
            position: "absolute",
            bottom: 30,
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
            // borderRadius: 10,
            padding: 10,
            bottom: 12,
            left: 248,
            height: 56,
          },
        ]}
      >
        <Text>Verify email</Text>
      </TouchableOpacity>

      {isCodeSent && (
        <>
          <TextInput
            label="Verification Code"
            value={values.verificationCode}
            onChangeText={handleChange("verificationCode")}
            onBlur={handleBlur("verificationCode")}
            style={styles.input}
            mode="outlined"
          />
          {touched.verificationCode && errors.verificationCode && (
            <Text style={styles.errorText}>{errors.verificationCode}</Text>
          )}
          <Button title="Submit Code" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}
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
