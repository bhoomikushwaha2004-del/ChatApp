import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chats from '../screens/Chats';
import Profile from '../screens/Profile';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';



const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({focused, color, size}) => {
          let iconName;

            if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
          } 
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: 'gray',

        tabBarStyle: {
          height: SIZES.larger, //65
          paddingBottom: SIZES.xtraExtras, //8
          paddingTop: SIZES.xtraExtras, //8
        },
      })}
    >
      

      <Tab.Screen
        name="Chats"
        component={Chats}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
