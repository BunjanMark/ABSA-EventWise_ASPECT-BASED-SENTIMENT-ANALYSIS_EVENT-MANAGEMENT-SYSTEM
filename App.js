import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import landing from './screens/landing'; 
import home from './screens/home';       
import feedback from './screens/feedback';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='landing'
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
      >
        <Stack.Screen
          name="landing"
          component={landing}
        />
        <Stack.Screen
          name="home"
          component={home}
        />
        <Stack.Screen
          name="feedback"
          component={feedback}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
