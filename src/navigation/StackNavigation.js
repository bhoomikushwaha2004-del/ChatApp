import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreens from '../screens/OnBoardingScreens';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../services/AuthProvider';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import BottomTabs from './BottomTabs';
import Messages from '../screens/Messages';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(val => {
      if (val == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }

      GoogleSignin.configure({
        webClientId:
          '51246210108-jrt7jfn89eoscee0ka8enmln5tgn54c9.apps.googleusercontent.com',
        offlineAccess: true,
      });
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="main" component={BottomTabs} />

          <Stack.Screen name="messages" component={Messages} />
        </>
      ) : (
        <>
          {isFirstLaunch && (
            <Stack.Screen name="onboard" component={OnBoardingScreens} />
          )}

          <Stack.Screen name="login" component={Login} />

          <Stack.Screen name="signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
