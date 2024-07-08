import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "./src/screens/authentication/Register";
import Login from "./src/screens/authentication/Login";
import AccountRecovery from "./src/screens/authentication/AccountRecovery";
import Landing from "./src/screens/authentication/Landing";

import GuestLanding from "./src/screens/authentication/GuestLanding";

import TabNav from "./src/screens/customerScreens/tabNavigation/TabNav";

import InboxView from "./src/screens/customerScreens/message/InboxView"; 
import ConvoView from "./src/screens/customerScreens/message/ConvoView";
import SelectContactView from "./src/screens/customerScreens/message/SelectContactView";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
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
      </NavigationContainer>
  );
};

export default App;
