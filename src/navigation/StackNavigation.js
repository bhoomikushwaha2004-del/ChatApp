import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreens from '../screens/OnBoardingScreens';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
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
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <>
          <Stack.Screen
            name="onboard"
            component={OnBoardingScreens}
          />
          <Stack.Screen
            name="login"
            component={Login}
          />
        </>
      ) : (
        <Stack.Screen
          name="login"
          component={Login}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
