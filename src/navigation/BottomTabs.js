import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chats from '../screens/Chats';
import Profile from '../screens/Profile';
import { SIZES, COLORS } from '../styles';
import useTheme from '../theme/useTheme';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { theme, darkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: theme.button,

        tabBarInactiveTintColor: darkMode ? '#B0B0B0' : 'gray',

        tabBarStyle: {
          height: SIZES.larger,

          paddingBottom: SIZES.xtraExtras,

          paddingTop: SIZES.xtraExtras,

          backgroundColor: theme.card,

          borderTopColor: darkMode ? '#2A2A2A' : '#E5E5E5',
        },

        tabBarLabelStyle: {
          color: theme.text,
        },
      })}
    >
      <Tab.Screen name="Chats" component={Chats} />

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
