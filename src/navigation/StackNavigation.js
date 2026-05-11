import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreens from '../screens/OnBoardingScreens';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(val => {
      if (val === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="onboard"
          component={OnBoardingScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    );
  }
   else {
    <Login />
   }
  return (
    // <Stack.Navigator >
    //   <Stack.Screen name="onboard" component={OnBoardingScreens} options={{headerShown:false}} />
    //   <Stack.Screen name='login' component={Login} />
    // </Stack.Navigator>
    <Login />
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
