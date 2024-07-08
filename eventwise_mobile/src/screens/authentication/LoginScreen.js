import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormTextField from "../../components/TextInput";
import axios from "axios";
import { Platform } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.23:8081/api/login",
        {
          email,
          password,
          device_name: `${Platform.OS}-${Platform.Version}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Login successful");
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  // async function handleLogin() {
  //   try {
  //     await axios.post(
  //       "http://localhost:8081/api/login",
  //       {
  //         email,
  //         password,
  //         device_name: `${Platform.OS}-${Platform.Version}`,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     alert("Login successful");
  //   } catch (error) {
  //     console.log(error, "something went wrong");
  //   }
  // }
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ padding: 20, justifyContent: "center" }}>
        <Text>Login</Text>
        <FormTextField
          label={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <FormTextField
          label={"Password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
