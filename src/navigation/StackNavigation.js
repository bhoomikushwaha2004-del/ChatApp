import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreens from '../screens/OnBoardingScreens';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signup from '../screens/Signup'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const navigation = useNavigation()

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
          {/* <Stack.Screen
          name='signup'
          component={Signup} 
          /> */}
        </>
      ) : (
        <> 
        <Stack.Screen
          name="login"
          component={Login}
        />
        <Stack.Screen
          name='signup'
          component={Signup}
          // options={() => ({
          // title: '',
          // headerStyle: {
          //   backgroundColor: '#f9fafd',
          //   shadowColor: '#f9fafd',
          //   elevation: 0,
          // },
          // headerLeft: () => (
          //   <View style={{marginLeft: 10}}>
          //     <FontAwesome.Button 
          //       name="long-arrow-left"
          //       size={25}
          //       backgroundColor="#f9fafd"
          //       color="#333"
          //       onPress={() => navigation.navigate('Login')}
          //     />
          //   </View>
          // ),
        // })} 
          />
          </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
