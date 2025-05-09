import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes } from "../enums/navigation.enum";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationRoutes.HOME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={NavigationRoutes.HOME} component={HomeScreen} />
      <Stack.Screen name={NavigationRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={NavigationRoutes.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
