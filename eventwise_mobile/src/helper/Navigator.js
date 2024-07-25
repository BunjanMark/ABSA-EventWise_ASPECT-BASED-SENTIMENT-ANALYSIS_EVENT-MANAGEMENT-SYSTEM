import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { LogBox } from "react-native";
import { AuthContext } from "../services/authContext";

// stacks
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Authentication
import Register from "../screens/authentication/Register";
import Login from "../screens/authentication/Login";
import AccountRecovery from "../screens/authentication/AccountRecovery";
import Landing from "../screens/authentication/Landing";

import GuestLanding from "../screens/authentication/GuestLanding";

// Admin Stack here
// import Index from "../screens/admin/Index";

// Customer Stack here
import TabNav from "../screens/customerScreens/TabNav";
import InboxView from "../screens/customerScreens/message/InboxView";
import ConvoView from "../screens/customerScreens/message/ConvoView";
import Notification from "../screens/customerScreens/notification/Notifications";
import SelectContactView from "../screens/customerScreens/message/SelectContactView";
import Profile from "../screens/customerScreens/sidebarScreens/Profile";
import EditProfile from "../screens/customerScreens/otherScreens/EditProfile";
import InventoryTracker from "../screens/customerScreens/sidebarScreens/InventoryTracker";
import Schedule from "../screens/customerScreens/sidebarScreens/Schedule";
import SetSchedule from "../screens/customerScreens/sidebarScreens/SetSchedule";
import Viewsched from "../screens/customerScreens/sidebarScreens/Viewsched";
import Settings from "../screens/customerScreens/sidebarScreens/Settings";
import EventDetails from "../screens/customerScreens/otherScreens/EventDetails";
import CreateAnotherAccount from "../screens/customerScreens/otherScreens/CreateAnotherAccount";
import ProfileOrganizer from "../screens/customerScreens/otherScreens/ProfileOrganizer";
import Package from "../screens/customerScreens/otherScreens/Package";
import CustomizePackage from "../screens/customerScreens/otherScreens/CustomizePackage";
import Venue from "../screens/customerScreens/otherScreens/Venue";

// Guest Stack here

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestLanding"
          component={GuestLanding}
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
          name="AccountRecovery"
          component={AccountRecovery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="InventoryTracker"
            component={InventoryTracker}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SetSchedule"
            component={SetSchedule}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Viewsched"
            component={Viewsched}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
        />
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
        /><Stack.Screen
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const AuthenticationStack = () => {
//   LogBox.ignoreAllLogs();
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <ActivityIndicator />; // A screen or component to show while loading
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName={
//         user
//           ? user.role_id === 2
//             ? "CustomerStack"
//             : "OrganizerStack"
//           : "Landing"
//       }
//     >
//       <Stack.Screen
//         name="Landing"
//         component={Landing}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Register"
//         component={Register}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="AccountRecovery"
//         component={AccountRecovery}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CustomerStack"
//         component={CustomerStack}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="AdminStack"
//         component={AdminStack}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// AdminStack
// function AdminStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="AdminStack"
//         component={Index}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }
// CustomerStack
// function CustomerStack() {
//   return (
//     <Stack.Navigator>
//        <Stack.Screen
//           name="Landing"
//           component={Landing}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="GuestLanding"
//           component={GuestLanding}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="Register"
//           component={Register}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AccountRecovery"
//           component={AccountRecovery}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="TabNav"
//           component={TabNav}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="Profile"
//             component={Profile}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="EditProfile"
//             component={EditProfile}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="InventoryTracker"
//             component={InventoryTracker}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="Schedule"
//             component={Schedule}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="SetSchedule"
//             component={SetSchedule}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="Viewsched"
//             component={Viewsched}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//             name="Settings"
//             component={Settings}
//             options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="InboxView"
//           component={InboxView}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="ConvoView"
//           component={ConvoView}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SelectContactView"
//           component={SelectContactView}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Notification"
//           component={Notification}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="EventDetails"
//           component={EventDetails}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="CreateAnotherAccount"
//           component={CreateAnotherAccount}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="ProfileOrganizer"
//           component={ProfileOrganizer}
//           options={{ headerShown: false }}
//         /><Stack.Screen
//           name="Package"
//           component={Package}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="CustomizePackage"
//           component={CustomizePackage}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Venue"
//           component={Venue}
//           options={{ headerShown: false }}
//         />
//     </Stack.Navigator>
//   );
// }

// export default function Navigator() {
//   return <AuthenticationStack />;
// }
export default Navigator;
