import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import register from "./components/authentication/register";
import login from "./components/authentication/login";
import AccountRecovery from "./components/authentication/AccountRecovery";
import landing from "./components/authentication/landing";

import GuestLanding from "./components/authentication/GuestLanding";

import Screen from "./components/screens/Screen";
import BookEvent from "./components/screens/BookEvent";  
import EventDetails from "./components/screens/EventDetails";
import InboxView from "./components/screens/InboxView";
import ConversationView from "./components/screens/ConversationView";
import SelectContactView from "./components/screens/SelectContactView";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="landing"
            component={landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GuestLanding"
            component={GuestLanding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="register"
            component={register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountRecovery"
            component={AccountRecovery}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Screen"
            component={Screen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookEvent"
            component={BookEvent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="InboxView"
            component={InboxView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConversationView"
            component={ConversationView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectContactView"
            component={SelectContactView}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;