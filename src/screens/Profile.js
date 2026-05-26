import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { AuthContext } from '../services/AuthProvider';
import useTheme from '../theme/useTheme';
import { SIZES, FONT_SIZE, BORDER_RADIUS } from '../styles';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const { darkMode, toggleTheme, theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        }}
        style={styles.image}
      />

      <Text
        style={[
          styles.name,
          {
            color: theme.text,
          },
        ]}
      >
        {user?.email}
      </Text>

      {/* THEME TOGGLE */}

      <View style={styles.themeRow}>
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

        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.button,
          },
        ]}
        onPress={logout}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: SIZES.largest,
    height: SIZES.largest,
    borderRadius: BORDER_RADIUS.xxxl,
    marginBottom: SIZES.xxs,
  },

  name: {
    fontSize: FONT_SIZE.m,
    fontWeight: '700',
    marginBottom: SIZES.extraExtraMedium,
  },

  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },

  themeText: {
    fontSize: 16,
    fontWeight: '600',
  },

  button: {
    paddingHorizontal: SIZES.extraExtraMedium,
    paddingVertical: SIZES.smaller,
    borderRadius: BORDER_RADIUS.xxs,
  },

  btnText: {
    color: '#fff',
    fontSize: FONT_SIZE.xxs,
    fontWeight: '600',
  },
});
