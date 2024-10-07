import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import { useNavigation } from "@react-navigation/native";
const MyProfileAdmin = () => {
  const navigation = useNavigation();
  const { userName, userEmail } = useStore();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: "rgba(194,176,103,0.17)",
          height: 218,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#C2B067",
          // top: 60,
          marginTop: 60,
          display: "flex",

          flexDirection: "column",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        },
      ]}
    >
      <View
        style={{
          display: "flex",

          flexDirection: "column",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",

          bottom: 90,
        }}
      >
        <Image
          source={require("../../../../../assets/profilepic.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            position: "absolute",
            zIndex: 1,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
          bottom: 10,
        }}
      >
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.title}>{userEmail}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfileAdmin")}
        >
          <View
            style={[
              {
                backgroundColor: "gold",
                borderRadius: "15",
                width: 130,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 15,
                borderRadius: 15,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={23}
              color="white"
            />
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileAdmin;
