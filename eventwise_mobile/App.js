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
import Navigator from "./src/helper/Navigator";
// Gateway
import { AuthProvider } from "./src/services/authContext";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
