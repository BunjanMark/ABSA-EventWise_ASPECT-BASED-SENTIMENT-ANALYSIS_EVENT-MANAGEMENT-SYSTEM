import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Book from "./screens/Book";
import BookingContinuation2 from "./otherScreens/BookingContinuation2";
import BookingContinuation3 from "./otherScreens/BookingContinuation3";
import BookingContinuation4 from "./otherScreens/BookingContinuation4";

const BookStack = createStackNavigator();

const BookStackScreen = () => {
  return (
    <BookStack.Navigator>
      <BookStack.Screen
        name="Book"
        component={Book}
        options={{ headerShown: false }} 
      />
      <BookStack.Screen
        name="BookingContinuation2"
        component={BookingContinuation2}
        options={{ headerShown: false }} 
      />
      <BookStack.Screen
        name="BookingContinuation3"
        component={BookingContinuation3}
        options={{ headerShown: false }} 
      />
      <BookStack.Screen
        name="BookingContinuation4"
        component={BookingContinuation4}
        options={{ headerShown: false }} 
      />
    </BookStack.Navigator>
  );
};

export default BookStackScreen;
