import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { LogBox } from "react-native";
import { AuthContext } from "../services/authContext";

// stacks
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "../screens/authentication/Register";
import Login from "../screens/authentication/Login";
import AccountRecovery from "../screens/authentication/AccountRecovery";
import Landing from "../screens/authentication/Landing";
import Register2 from "../screens/authentication/Register2";

import GuestLanding from "../screens/authentication/GuestLanding";

// Admin Stack here
import AdminIndex from "../screens/adminMain/AdminIndex";

// Customer Stack here
import TabNav from "../screens/customerScreens/TabNav";
import InboxView from "../screens/customerScreens/message/InboxView";
import ConvoView from "../screens/customerScreens/message/ConvoView";
import Notification from "../screens/customerScreens/notification/Notifications";
import SelectContactView from "../screens/customerScreens/message/SelectContactView";
import ProfileSwitcher from "../screens/customerScreens/screens/ProfileSwitcher";
import EventDetails from "../screens/customerScreens/otherScreens/EventDetails";
import CreateAnotherAccount from "../screens/customerScreens/otherScreens/CreateAnotherAccount";
import ProfileOrganizer from "../screens/customerScreens/otherScreens/ProfileOrganizer";
import Package from "../screens/customerScreens/otherScreens/Package";
import CustomizePackage from "../screens/customerScreens/otherScreens/CustomizePackage";
import HomeSP from "../screens/serviceProvidersScreen/screens/HomeSP";

import EventFeedbackDetails from "../screens/adminMain/screens/feedback/EventFeedbackDetails";
// import Feedback from "../screens/customerScreens/otherScreens/Feedback";

// Service Provider Stack here
import ServiceProviderIndex from "../screens/serviceProvidersScreen/ServiceProviderIndex";

// Guest Stack here

// Profile switcher screen
import { ProfileContext } from "../services/profileContext";
import Venue from "../screens/customerScreens/otherScreens/Venue";
import GuestIndex from "../screens/guestScreens/GuestIndex";
const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  LogBox.ignoreAllLogs();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (loading) {
    return <ActivityIndicator />; // A screen or component to show while loading
  }
  return (

    
    <Stack.Navigator
      initialRouteName={
        user
          ? user.role_id === 2
            ? "CustomCustomerStack"
            : "OrganizerStack"
          : "Landing"
      }
    >
    
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register2"
        component={Register2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountRecovery"
        component={AccountRecovery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomCustomerStack"
        component={CustomCustomerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminStack"
        component={AdminStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuestStack"
        component={GuestIndex}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ServiceProviderStack"
        component={ServiceProviderStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// AdminStack
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminStackIndex"
        component={AdminIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FeedbackEventDetails"
        component={EventFeedbackDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
    
}

// ServiceProvider StacK

function ServiceProviderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeSP"
        component={ServiceProviderIndex}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
}

// CustomerStack
function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{ headerShown: false }}
      />

      {/* Profile Switcher */}

      <Stack.Screen
        name="InboxView"
        component={InboxView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConvoView"
        component={ConvoView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSwitcher"
        component={ProfileSwitcher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectContactView"
        component={SelectContactView}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAnotherAccount"
        component={CreateAnotherAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileOrganizer"
        component={ProfileOrganizer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Package"
        component={Package}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomizePackage"
        component={CustomizePackage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Venue"
        component={Venue}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }}
        /> */}
    </Stack.Navigator>
  );
}

// function CustomCustomerStack() {
//   LogBox.ignoreAllLogs();
//   const { profiles, activeProfile, switchProfile, loading } =
//     useContext(ProfileContext);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   if (loading) {
//     return <ActivityIndicator />; // A screen or component to show while loading
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName={
//         profiles.id === 5 ? "ServiceProviderStack" : "CustomerStack" //to be change to default ID
//       }
//       // screenOptions={{ headerShown: profiles.id === 3 ? false : true }}
//     >
//       <Stack.Screen
//         name="ServiceProviderStack"
//         component={ServiceProviderStack}
//       />
//       <Stack.Screen name="CustomerStack" component={CustomerStack} />
//     </Stack.Navigator>
//   );
// }
const CustomCustomerStack = () => {
  LogBox.ignoreAllLogs();
  const { profiles, loading } = useContext(ProfileContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (profiles.id !== 3) {
        navigation.navigate("ServiceProviderStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "ServiceProviderStack" }],
        });
      } else {
        navigation.navigate("CustomerStack");
        navigation.reset({
          index: 0,
          routes: [{ name: "CustomerStack" }],
        });
      }
    }
  }, [profiles.id, loading, navigation]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        profiles.id === 5 ? "ServiceProviderStack" : "CustomerStack"
      }
    >
      <Stack.Screen
        name="ServiceProviderStack"
        component={ServiceProviderStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default function Navigator() {
  return <AuthenticationStack />;
}
// export default Navigator;
