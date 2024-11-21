import { View, Text } from "react-native";
import { useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { TextInput } from "react-native-gesture-handler";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.27:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response:", response);

      const data = await response.json();
      console.log("Data:", data);

      console.log("hello? ", data.user.id);

      if (response.ok) {
        console.log("Login successful");

        await AsyncStorage.setItem("user", JSON.stringify(data.user)).then(
          async () => {
            console.log("User data stored in AsyncStorage");

            await AsyncStorage.getItem("pushToken")
              .then((token) => {
                console.log("Push token:", token);

                if (token) {
                  fetch("http://192.168.1.27:8000/api/add-expo-token", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      token: token,
                      user_id: data.user.id,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Token sent to backend:", data);
                    })
                    .catch((error) => {
                      console.error("Error sending token to backend:", error);
                    });
                }
              })
              .catch((error) => {
                console.error("Error getting push token:", error);
              });
            navigation.navigate("Home");
          }
        );
      } else {
        console.log("Login failed");
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text>Enter your Email and Password to login.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={{ color: "blue" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
};
