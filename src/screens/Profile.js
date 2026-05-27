import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
} from 'react-native';

import {AuthContext} from '../services/AuthProvider';
import useTheme from '../theme/useTheme';

import {
  SIZES,
  FONT_SIZE,
  BORDER_RADIUS,
  ELEVATION,
} from '../styles';

const Profile = () => {

  const {user, logout} = useContext(AuthContext);

  const {
    darkMode,
    toggleTheme,
    theme,
  } = useTheme();

  return (

    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >

      {/* STATUS BAR */}

      <StatusBar
        backgroundColor={theme.background}
        barStyle={
          darkMode
            ? 'light-content'
            : 'dark-content'
        }
      />

      {/* PROFILE CARD */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
          },
        ]}
      >

        <Image
          source={{
            uri:
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.image}
        />

        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          My Profile
        </Text>

        <Text
          style={[
            styles.email,
            {
              color: theme.text,
            },
          ]}
          numberOfLines={1}
        >
          {user?.email}
        </Text>

        {/* THEME TOGGLE */}

        <View
          style={[
            styles.themeContainer,
            {
              backgroundColor: darkMode
                ? '#2A2A2A'
                : '#ECECEC',
            },
          ]}
        >

          <Text
            style={[
              styles.themeText,
              {
                color: theme.text,
              },
            ]}
          >
            Dark Mode
          </Text>

          <Switch
            value={darkMode}
            onValueChange={toggleTheme}
          />

        </View>

        {/* LOGOUT BUTTON */}

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.button,
            },
          ]}
          activeOpacity={0.8}
          onPress={logout}
        >
          <Text style={styles.btnText}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  card: {
    width: '100%',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,

    ...ELEVATION.elevationFive,
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },

  email: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30,
  },

  themeContainer: {
    width: '100%',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 28,
  },

  themeText: {
    fontSize: 16,
    fontWeight: '700',
  },

  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

});