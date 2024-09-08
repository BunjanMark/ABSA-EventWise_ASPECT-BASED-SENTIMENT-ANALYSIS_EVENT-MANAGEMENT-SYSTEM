import React from "react";
import { View, Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { ProfileStackNavigator, SettingStackNavigator } from "./StackNavigator";
// import CustomDrawerContent from "./CustomDrawerContentcp";
// import BottomTabNavigator from "./BottomTabNavgator";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderAdmin from "../components/header/HeaderAdmin";
import AdminDrawerContent from "./AdminDrawerContent";
import BottomTabNavigator from "./BottomTabNavigator";
const AppDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <AppDrawer.Navigator
      initialRouteName="HomeAdmin"
      drawerContent={(props) => (
        <SafeAreaView>
          <View style={{ height: "100%", width: "100%" }}>
            <AdminDrawerContent {...props} />
          </View>
        </SafeAreaView>
      )}
      screenOptions={({ navigation, route }) => ({
        drawerStyle: {
          backgroundColor: "white",
          width: Platform.OS === "ios" ? 310 : 290,
        },
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (focused) {
            iconName = "home";
          } else {
            iconName = "home-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        header: () => (
          <HeaderAdmin
            // title={route.name}
            title={""}
            navigation={navigation} // Pass navigation prop here
            onMessagePress={() => console.log("Message pressed")}
            onNotificationPress={() => console.log("Notification pressed")}
          />
        ),
      })}
    >
      <AppDrawer.Screen
        name="HomeAdmin"
        component={BottomTabNavigator}
        options={{
          headerShown: true,
        }}
      />
      {/* <AppDrawer.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: true,
        }}
      /> */}
    </AppDrawer.Navigator>
  );
};

export default DrawerNavigator;
