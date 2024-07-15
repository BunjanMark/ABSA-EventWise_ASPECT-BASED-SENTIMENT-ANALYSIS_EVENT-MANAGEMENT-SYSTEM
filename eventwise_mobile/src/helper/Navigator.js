import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { LogBox } from "react-native";
import { AuthContext } from "../services/authContext";

// stacks
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "../screens/authentication/Register";
import Login from "../screens/authentication/Login";
import AccountRecovery from "../screens/authentication/AccountRecovery";
import Landing from "../screens/authentication/Landing";

import GuestLanding from "../screens/authentication/GuestLanding";

// Admin Stack here

// Customer Stack here
import TabNav from "../screens/customerScreens/tabNavigation/TabNav";
import InboxView from "../screens/customerScreens/message/InboxView";
import ConvoView from "../screens/customerScreens/message/ConvoView";
import SelectContactView from "../screens/customerScreens/message/SelectContactView";
// Guest Stack here
const Stack = createNativeStackNavigator();

// const Navigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
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
//         {/* <Stack.Screen
//             name="BookEvent"
//             component={BookEvent}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="EventDetails"
//             component={EventDetails}
//             options={{ headerShown: false }}
//           /> */}
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
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const AuthenticationStack = () => {
  LogBox.ignoreAllLogs();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <ActivityIndicator />; // A screen or component to show while loading
  }
  return (
    <Stack.Navigator
      initialRouteName={
        user
          ? user.role_id === 2
            ? "CustomerStack"
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
        name="AccountRecovery"
        component={AccountRecovery}
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

function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
            name="BookEvent"
            component={BookEvent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          /> */}
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
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return <AuthenticationStack />;
}
// export default Navigator;
