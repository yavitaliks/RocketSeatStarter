import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./Pages/main";
import Product from "./Pages/product";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#837FFF",
            },
            headerTintColor: "#FFF",
          }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#837FFF",
            },
            headerTintColor: "#FFF",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
